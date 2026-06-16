import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { InputField } from '../components/ui/InputField';
import { membersService, transactionsService } from '../services/api';

import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  FileText, 
  Sprout, 
  Settings2, 
  PlusCircle, 
  Wallet, 
  Scale, 
  Check, 
  X,
  History
} from 'lucide-react';

export const MemberDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit member modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFullName, setEditFullName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editCrop, setEditCrop] = useState('');
  const [editSize, setEditSize] = useState('');
  const [editType, setEditType] = useState<'Smallholder' | 'Commercial'>('Smallholder');

  // Ledger Action Modal states
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [txAction, setTxAction] = useState<'SAVINGS' | 'DELIVERY'>('SAVINGS');
  const [txAmount, setTxAmount] = useState('2000');
  const [txWeight, setTxWeight] = useState('150');
  const [txReference, setTxReference] = useState('Direct Mobilization contribution');

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    Promise.all([
      membersService.getMemberById(id),
      transactionsService.getTransactions()
    ]).then(([foundMember, allTxs]) => {
      if (foundMember) {
        setMember(foundMember);

        // Prep edit states
        setEditFullName(foundMember.fullName);
        setEditPhone(foundMember.phoneNumber);
        setEditCrop(foundMember.cropType);
        setEditSize(`${foundMember.farmSize}`);
        setEditType(foundMember.farmType);

        // Filter transactions relative to this member's ID code
        const fitTxs = allTxs.filter((tx) => tx.memberId === foundMember.memberId);
        setTransactions(fitTxs);
      }
      setIsLoading(false);
    });
  }, [id]);

  // Handle status shift dropdown
  const handleStatusShift = async (newStatus) => {
    if (!member) return;
    try {
      const updated = await membersService.updateMember(member._id, { status: newStatus });
      setMember(updated);
    } catch (err) {
      alert('Failed to modify status.');
    }
  };

  // Submit edit profile parameters
  const handleUpdateProfileSubmit = async (e) => {
    e.preventDefault();
    if (!member) return;

    try {
      const updated = await membersService.updateMember(member._id, {
        fullName: editFullName,
        phoneNumber: editPhone,
        cropType: editCrop,
        farmSize: parseFloat(editSize) || 1.0,
        farmType: editType
      });

      setMember(updated);
      setIsEditModalOpen(false);
    } catch (err) {
      alert('Error updating profile information.');
    }
  };

  // Submit new ledger line
  const handleLedgerActionSubmit = async (e) => {
    e.preventDefault();
    if (!member) return;

    try {
      if (txAction === 'SAVINGS') {
        const amt = parseFloat(txAmount) || 0;
        // Logging saving deposit
        const newTx = await transactionsService.createTransaction({
          memberId: member.memberId,
          memberName: member.fullName,
          type: 'Savings Deposit',
          amount: amt,
          status: 'COMPLETED',
          reference: txReference || 'Savings Deposit ledger reconcile'
        });

        // Reconcile Share Capital in member profile of the database
        const updated = await membersService.updateMember(member._id, {
          shareCapital: member.shareCapital + amt
        });

        setMember(updated);
        setTransactions((prev) => [newTx, ...prev]);

      } else {
        // Log Delivery
        const wtUnit = parseFloat(txWeight) || 0;
        const newTx = await transactionsService.createTransaction({
          memberId: member.memberId,
          memberName: member.fullName,
          type: `${member.cropType} Delivery`,
          weightKg: wtUnit,
          status: 'PROCESSING',
          reference: txReference || 'Bulk delivery intake'
        });

        setTransactions((prev) => [newTx, ...prev]);
      }

      setIsTxModalOpen(false);
      setTxReference('Direct Mobilization contribution');
    } catch (err) {
      alert('Error logging transaction.');
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout pageTitle="Loading Profile...">
        <div className="py-24 text-center text-primary font-medium text-lg">
          Synchronizing Ledger Databases...
        </div>
      </DashboardLayout>
    );
  }

  if (!member) {
    return (
      <DashboardLayout pageTitle="Review Profile">
        <div className="py-16 text-center select-none text-left max-w-md mx-auto space-y-6">
          <div className="p-4 bg-danger/10 text-danger rounded-lg border border-danger/20">
            <strong>Farmer profile not found.</strong> Verify ID credentials or contact union registry support.
          </div>
          <Button onClick={() => navigate('/members')} variant="primary" className="w-full">
            Back to Member Directory
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Farmer Details">
      {/* Top Breadcrumb Navigation bar */}
      <div className="mb-6 text-left">
        <button
          onClick={() => navigate('/members')}
          className="font-label-md text-label-md text-primary font-bold hover:underline inline-flex items-center gap-2 mb-4 cursor-pointer bg-transparent border-none outline-none"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Member Directory</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-border pb-6">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-headline-lg text-2xl font-bold text-on-surface">{member.fullName}</h2>
              <span className="font-mono text-xs font-bold bg-surface-container px-2.5 py-1 rounded-sm text-on-surface-variant">
                {member.memberId}
              </span>
            </div>
            <p className="text-on-surface-variant text-body-sm">Entered register under: <strong>{member.joinedDate}</strong></p>
          </div>

          {/* Action Row - Status shift dropdown */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1.5 align-left">
              <label className="text-label-xs font-bold uppercase tracking-wider text-on-surface-variant text-[10px]">Verification Action</label>
              <select
                value={member.status}
                onChange={(e) => handleStatusShift(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-border rounded-lg text-body-md font-medium text-on-surface focus:border-primary outline-none transition-all cursor-pointer shadow-xs"
              >
                <option value="ACTIVE">Mark Active</option>
                <option value="PROBATION">Place on Probation</option>
                <option value="INACTIVE">Deactivate/Suspend</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 text-left">
        {/* Left Column: Demographics & Crop Specifications */}
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md border border-slate-border space-y-6">
          <div className="flex flex-col items-center gap-4 text-center border-b border-slate-border pb-6 select-none">
            {member.avatarUrl ? (
              <img
                alt={member.fullName}
                className="w-24 h-24 rounded-full border-2 border-primary-fixed shadow-md shrink-0 object-cover"
                src={member.avatarUrl}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-3xl select-none shadow-inner border border-primary/10">
                {member.fullName.charAt(0)}
              </div>
            )}
            <div>
              <h4 className="font-headline-sm text-on-surface font-extrabold">{member.fullName}</h4>
              <p className="text-on-surface-variant text-body-sm font-medium mt-1">{member.phoneNumber}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="text-label-md font-bold uppercase tracking-wider text-on-surface-variant text-[10px] select-none">Farmer Coordinates</h5>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-body-sm">
                <FileText className="w-5 h-5 text-on-surface-variant/70" />
                <div>
                  <span className="text-on-surface-variant block text-xs">National ID / PIN</span>
                  <span className="text-on-surface font-semibold font-mono">{member.nationalId}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-body-sm">
                <Sprout className="w-5 h-5 text-on-surface-variant/70" />
                <div>
                  <span className="text-on-surface-variant block text-xs">Primary Harvest Segment</span>
                  <span className="text-on-surface font-semibold">{member.cropType} Focus</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-body-sm">
                <MapPin className="w-5 h-5 text-on-surface-variant/70" />
                <div>
                  <span className="text-on-surface-variant block text-xs">Farm Specifications</span>
                  <span className="text-on-surface font-semibold">{member.farmSize} Hectares ({member.farmType})</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setIsEditModalOpen(true)}
            icon={<Settings2 className="w-4 h-4" />}
            variant="outline"
            className="w-full mt-4"
          >
            Edit Profile Info
          </Button>
        </div>

        {/* Right Column: Financial Status and Harvest Ledger Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Share Capital Display */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md border border-slate-border flex gap-4 items-center">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Accumulated Share Capital</p>
                <h4 className="font-mono text-display-kpi text-xl font-bold text-primary mt-1">
                  Ksh {member.shareCapital.toLocaleString('en-US')}
                </h4>
              </div>
            </div>

            {/* Total crops log indicator */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md border border-slate-border flex gap-4 items-center">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">Harvest Dispatch Tracker</p>
                <h4 className="font-display-kpi text-xl font-bold text-primary mt-1">
                  {transactions.filter((t) => t.weightKg).reduce((sum, t) => sum + (t.weightKg || 0), 0)} Kg Managed
                </h4>
              </div>
            </div>
          </div>

          {/* Interactive Ledger actions */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-md border border-slate-border">
            <div className="flex justify-between items-center border-b border-slate-border pb-4 mb-4 select-none">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-lg flex items-center gap-1.5">
                <History className="w-5 h-5 text-primary" />
                Farmer Ledger Records
              </h3>
              
              <div className="flex gap-2.5">
                <Button
                  onClick={() => {
                    setTxAction('SAVINGS');
                    setIsTxModalOpen(true);
                  }}
                  variant="primary"
                  size="sm"
                  className="px-4 text-xs font-bold"
                >
                  Deposit Shares
                </Button>
                <Button
                  onClick={() => {
                    setTxAction('DELIVERY');
                    setIsTxModalOpen(true);
                  }}
                  variant="outline"
                  size="sm"
                  className="px-4 text-xs font-bold"
                >
                  Log Delivery
                </Button>
              </div>
            </div>

            {/* Embedded details table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm">
                <thead>
                  <tr className="bg-surface-container-low border-b border-slate-border text-on-surface-variant text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 font-semibold">Ledger Entry Type</th>
                    <th className="px-4 py-3 font-semibold">Recorded Date</th>
                    <th className="px-4 py-3 font-semibold">Reference Note</th>
                    <th className="px-4 py-3 font-semibold text-right">Volume / Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-border text-sm">
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center italic text-on-surface-variant/70">
                        No financial or delivery logs registered for this farmer profile.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((tx) => (
                      <tr key={tx._id} className="hover:bg-slate-surface/40">
                        <td className="px-4 py-3.5">
                          <span className={`font-semibold ${tx.amount ? 'text-primary' : 'text-indigo-800'}`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-on-surface-variant font-mono">{tx.date}</td>
                        <td className="px-4 py-3.5 text-on-surface-variant max-w-[200px] truncate" title={tx.reference}>{tx.reference}</td>
                        <td className="px-4 py-3.5 text-right font-mono font-bold">
                          {tx.amount ? (
                            <span className={tx.amount > 0 ? 'text-success' : 'text-danger'}>
                              {tx.amount > 0 ? '+' : ''}Ksh {tx.amount.toLocaleString()}
                            </span>
                          ) : tx.weightKg ? (
                            <span className="text-on-surface">
                              {tx.weightKg.toLocaleString()} Kg
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Action 1: Edit Profile details popup Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Farmer Demographics"
      >
        <form onSubmit={handleUpdateProfileSubmit} className="space-y-5 text-left select-none">
          <InputField
            label="Legal Full Name"
            required
            value={editFullName}
            onChange={(e) => setEditFullName(e.target.value)}
          />

          <InputField
            label="Mobile Phone Details"
            required
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-label-md font-bold text-on-surface-variant">Crop Focus</label>
              <select
                value={editCrop}
                onChange={(e) => setEditCrop(e.target.value)}
                className="px-4 py-3 bg-surface-container-low border border-slate-border rounded-lg text-body-md text-on-surface outline-none cursor-pointer"
              >
                <option value="Rice">Rice</option>
                <option value="Corn">Corn/Maize</option>
                <option value="Coconut">Coconut</option>
                <option value="Cassava">Cassava</option>
                <option value="Coffee">Coffee Bean</option>
                <option value="Cocoa">Cocoa Focus</option>
              </select>
            </div>

            <InputField
              label="Hectares Area"
              type="number"
              step="0.1"
              required
              value={editSize}
              onChange={(e) => setEditSize(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-label-md font-bold text-on-surface-variant">Cooperative Classification</label>
            <select
              value={editType}
              onChange={(e) => setEditType(e.target.value)}
              className="px-4 py-3 bg-surface-container-low border border-slate-border rounded-lg text-body-md text-on-surface outline-none cursor-pointer"
            >
              <option value="Smallholder">Smallholder (Under 5 Ha)</option>
              <option value="Commercial">Commercial (Over 5 Ha)</option>
            </select>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-border mt-6">
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save demographic changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Action 2: Ledger Action Modal (Deposits and Deliveries) */}
      <Modal
        isOpen={isTxModalOpen}
        onClose={() => setIsTxModalOpen(false)}
        title={txAction === 'SAVINGS' ? 'Deposit Share Capital' : 'Reconcile Crop Intake'}
      >
        <form onSubmit={handleLedgerActionSubmit} className="space-y-5 text-left select-none">
          {txAction === 'SAVINGS' ? (
            <InputField
              label="Deposit Shares Amount (Ksh)"
              type="number"
              required
              value={txAmount}
              onChange={(e) => setTxAmount(e.target.value)}
              placeholder="2000"
            />
          ) : (
            <InputField
              label="Dispatched Crop Weight (Kg)"
              type="number"
              required
              value={txWeight}
              onChange={(e) => setTxWeight(e.target.value)}
              placeholder="150"
              hint={`Logging primary crops: ${member.cropType}`}
            />
          )}

          <InputField
            label="Audit Reference Memo"
            required
            value={txReference}
            onChange={(e) => setTxReference(e.target.value)}
            placeholder="e.g. Sacco contribution block"
          />

          <div className="flex justify-between items-center pt-4 border-t border-slate-border mt-6">
            <Button type="button" variant="outline" onClick={() => setIsTxModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Reconcile Ledger Entry
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
