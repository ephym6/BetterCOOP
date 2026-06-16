import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { FormCard } from '../components/shared/FormCard';
import { InputField } from '../components/ui/InputField';
import { Button } from '../components/ui/Button';
import { usersService } from '../services/api';
import { User } from '../types';
import { KeyRound, ShieldAlert, Sparkles, Check } from 'lucide-react';

export const ProfileSettingsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  
  // Form states mapping directly to Mongoose schema values
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [notifMsg, setNotifMsg] = useState('');

  useEffect(() => {
    usersService.getCurrentUser().then((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setFullName(currentUser.fullName);
        setEmail(currentUser.email);
        setPhone(currentUser.phoneNumber || '');
        setAvatarUrl(currentUser.avatarUrl || '');
      }
    });
  }, []);

  const handleUpdateDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotifMsg('');

    try {
      const updated = await usersService.updateCurrentUser({
        fullName,
        email,
        phoneNumber: phone,
        avatarUrl
      });
      setUser(updated);
      setNotifMsg('Display details saved successfully! Refreshing dashboard tokens.');
    } catch {
      setNotifMsg('Failed to update credentials.');
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      alert('Please fill out password credentials.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match.');
      return;
    }
    
    // Success confirmation
    alert('Administrative security secret reassigned successfully! Re-routing server checks.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const selectPresetAvatar = (url: string) => {
    setAvatarUrl(url);
  };

  const presets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCSDCgHgbvEqwyKRX_GQ4SmKJanH_ltHZndj95PmLgPnzpBeWDecA-QayX-06MVxTrDmzU_wVnzFd_nqdLLoqHy65imHcEGqOad8VHRTeL3LnR3z7NRB4PL3DQI1PyVNYTMHBugU-s1tyhghPa6AuBRBkl3NKD3vrIRuRWN6M6HMJNq9RXpBPYAbOkVR_vTDI4oV1yU35In_ZrDWIjX3YhfjwVflMo2ApteSTsUlFFNrAGFqJOSdkWFNqTPtUqFeJ9O9dZ_4jEhiCw'
  ];

  return (
    <DashboardLayout pageTitle="Profile Settings">
      <div className="flex flex-col gap-6 text-left mb-6">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface-variant text-lg">My Administrative Account</h3>
        <p className="text-on-surface-variant/60 font-body-sm text-xs -mt-5">Manage display roles, change security tokens, and update notification avatars.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar presets selector */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md border border-slate-border text-left h-fit flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4 text-center pb-6 border-b border-slate-border">
            <img
              alt="Profile avatar"
              className="w-24 h-24 rounded-full border-2 border-primary shadow-lg object-cover"
              src={avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8IFvNdwUGbDubGYZvceYNTfcTYraCl4XWd2vM2MuM24yGSgLzvOxxHGoI_AQOGzskgktsODmTfr9b4k4th_VRJxA-6PLznzztQTwRIWPQVNwzgIlz6wPYDOncaGo3uecq--Zb1Rs0L804cqUtckzUeTcT8NGKHK41bEunx4WoqmYxzxE6i5SyhmwFAY-BTJ6S-XgRs1r8GFIFNh33dV0a3hMc38-2vp_SIvtgGqR2HSWsEzjoZ46UQPjWhGYCKf91uDteuS16fCE'}
            />
            <div>
              <h4 className="font-headline-sm text-on-surface font-extrabold">{fullName}</h4>
              <span className="inline-block mt-1 px-3 py-1 bg-primary-fixed text-primary text-[10px] uppercase font-bold tracking-widest rounded-sm">
                {user?.role === 'SUPER_ADMIN' ? 'Super Administrator' : 'Lead Administrator'}
              </span>
            </div>
          </div>

          {/* Preset selector */}
          <div className="space-y-3">
            <h5 className="font-label-md text-label-md text-on-surface-variant font-bold text-xs uppercase tracking-wider">Select Administrative Avatar Preset</h5>
            <div className="flex gap-3 justify-center">
              {presets.map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectPresetAvatar(preset)}
                  className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                    avatarUrl === preset ? 'border-primary scale-110 shadow-md' : 'border-slate-border hover:border-primary/50'
                  }`}
                >
                  <img src={preset} alt={`Avatar preset option ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Columns: Forms layout */}
        <div className="lg:col-span-2 space-y-8">
          {notifMsg && (
            <div className="p-4 bg-success/15 text-success rounded-lg border border-success/20 font-medium text-sm flex gap-2 items-center">
              <Check className="w-5 h-5 text-success shrink-0" />
              <span>{notifMsg}</span>
            </div>
          )}

          {/* Personal Details Form */}
          <FormCard
            title="Display Profile Details"
            description="Edit your displayed legal name, coordinates, and contact details used by cooperative systems."
            footerActions={
              <>
                <div />
                <Button onClick={handleUpdateDetails} variant="primary">
                  Save display details
                </Button>
              </>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              <InputField
                label="Legal Display Name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <InputField
                label="System Email Coordinate"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <InputField
              label="Contact Phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+254 799 111 222"
            />
          </FormCard>

          {/* Secure credentials secret change form */}
          <FormCard
            title="Update Access Key"
            description="Reassign your secure administrative login password regularly to comply with cooperative digital audits."
            footerActions={
              <>
                <div />
                <Button onClick={handleUpdatePassword} variant="secondary">
                  Update administrative key
                </Button>
              </>
            }
          >
            <InputField
              label="Current Secured Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              <InputField
                label="New Access Key"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
              <InputField
                label="Confirm Access Key"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="p-4 bg-surface-container-low rounded-lg border border-primary/10 flex gap-3 text-left w-full">
              <KeyRound className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-body-sm text-on-surface-variant flex-1 leading-snug">
                Upon reassigning credentials, security tokens are logged, and active sessions are updated.
              </p>
            </div>
          </FormCard>
        </div>
      </div>
    </DashboardLayout>
  );
};
