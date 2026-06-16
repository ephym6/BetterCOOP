import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { FormCard } from '../components/shared/FormCard';
import { InputField } from '../components/ui/InputField';
import { Button } from '../components/ui/Button';
import { settingsService } from '../services/api';

import { Settings, Check, Bell, ToggleLeft, ToggleRight, Radio } from 'lucide-react';

export const AdminSettingsPage = () => {
  const [settings, setSettings] = useState(null);

  // Form states mapping directly to Mongoose schemas
  const [cooperativeName, setCooperativeName] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [currency, setCurrency] = useState('Ksh');
  const [minShareCapital, setMinShareCapital] = useState('5000');
  const [savingsInterest, setSavingsInterest] = useState('14.5');
  const [loansInterest, setLoansInterest] = useState('4.5');
  const [enableSms, setEnableSms] = useState(true);
  const [enable2fa, setEnable2fa] = useState(true);

  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    settingsService.getSettings().then((s) => {
      setSettings(s);
      setCooperativeName(s.cooperativeName);
      setTaxNumber(s.taxRegistrationNumber || '');
      setCurrency(s.currency);
      setMinShareCapital(`${s.minimumShareCapital}`);
      setSavingsInterest(`${s.interestRateSavingsDecimal * 100}`);
      setLoansInterest(`${s.interestRateLoansDecimal * 100}`);
      setEnableSms(s.enableSmsNotifications);
      setEnable2fa(s.enableTwoFactorAuth);
    });
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setFeedback('');

    try {
      const updated = await settingsService.updateSettings({
        cooperativeName,
        taxRegistrationNumber: taxNumber,
        currency,
        minimumShareCapital: parseFloat(minShareCapital) || 5000,
        interestRateSavingsDecimal: (parseFloat(savingsInterest) || 14.5) / 100,
        interestRateLoansDecimal: (parseFloat(loansInterest) || 4.5) / 100,
        enableSmsNotifications: enableSms,
        enableTwoFactorAuth: enable2fa
      });

      setSettings(updated);
      setFeedback('Global Cooperative system configuration saved successfully! Reconciled limits saved in memory.');
    } catch {
      setFeedback('Error saving settings parameters.');
    }
  };

  return (
    <DashboardLayout pageTitle="System Settings">
      <div className="flex flex-col gap-6 text-left mb-6">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface-variant text-lg">Platform &amp; SACCO Configuration</h3>
        <p className="text-on-surface-variant/60 font-body-sm text-xs -mt-5">Regulate minimum share boundaries, adjust interest rates, and configure integration features.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {feedback && (
          <div className="p-4 bg-success/15 text-success rounded-lg border border-success/20 font-medium text-sm flex gap-2 items-center text-left">
            <Check className="w-5 h-5 text-success shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-8">
          {/* Section 1: Cooperative Identity */}
          <FormCard
            title="Cooperative Identity Records"
            description="Official corporate and legal credentials used on invoices, credit ledger templates, and audit exports."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              <InputField
                label="Registered SACCO Name"
                required
                value={cooperativeName}
                onChange={(e) => setCooperativeName(e.target.value)}
              />
              <InputField
                label="Tax Registration Number (PIN)"
                required
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
              />
            </div>

            <InputField
              label="Standard Transaction Currency Symbol"
              required
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="Ksh"
            />
          </FormCard>

          {/* Section 2: Financial Limits and APYs */}
          <FormCard
            title="Sacco Rules &amp; Interest Coordinates"
            description="Configure the default baseline rules for savings interest calculation models, micro-credit loans, and mandatory share capitals."
          >
            <InputField
              label="Mandatory Onboarding Share Capital (Ksh)"
              type="number"
              required
              value={minShareCapital}
              onChange={(e) => setMinShareCapital(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              <InputField
                label="Savings Dividend APY Rate (%)"
                type="number"
                step="0.01"
                required
                value={savingsInterest}
                onChange={(e) => setSavingsInterest(e.target.value)}
                hint="Yield credited on recurring savings capital"
              />
              <InputField
                label="Micro-Credit Loan Interest (%)"
                type="number"
                step="0.01"
                required
                value={loansInterest}
                onChange={(e) => setLoansInterest(e.target.value)}
                hint="Interests calculated monthly on balance"
              />
            </div>
          </FormCard>

          {/* Section 3: Integrations & Gateway toggles */}
          <FormCard
            title="Sms Gateways &amp; Security Toggles"
            description="Configure peripheral components scheduled for Integration in future increments."
            footerActions={
              <>
                <div />
                <Button type="submit" variant="primary">
                  Save settings parameters
                </Button>
              </>
            }
          >
            <div className="space-y-4 text-left">
              {/* SMS Broadcast gate */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low border border-slate-border rounded-xl">
                <div>
                  <h5 className="font-label-md text-sm font-bold text-on-surface">Enable Africa’s Talking Bulk SMS broadcasts</h5>
                  <p className="text-on-surface-variant text-xs mt-0.5">Automate member dispatch reminders, weather alert gates, and share logs upon deliveries.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEnableSms(!enableSms)}
                  className="bg-transparent border-none cursor-pointer text-primary"
                >
                  {enableSms ? (
                    <ToggleRight className="w-12 h-12 text-primary" />
                  ) : (
                    <ToggleLeft className="w-12 h-12 text-on-surface-variant/40" />
                  )}
                </button>
              </div>

              {/* Two Factor authentication gate */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low border border-slate-border rounded-xl">
                <div>
                  <h5 className="font-label-md text-sm font-bold text-on-surface">Implement Secure Two-Factor Authentication (2FA)</h5>
                  <p className="text-on-surface-variant text-xs mt-0.5 font-normal">Require administrators to input OTP symbols sent during logins.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEnable2fa(!enable2fa)}
                  className="bg-transparent border-none cursor-pointer text-primary"
                >
                  {enable2fa ? (
                    <ToggleRight className="w-12 h-12 text-primary" />
                  ) : (
                    <ToggleLeft className="w-12 h-12 text-on-surface-variant/40" />
                  )}
                </button>
              </div>
            </div>
          </FormCard>
        </form>
      </div>
    </DashboardLayout>
  );
};
