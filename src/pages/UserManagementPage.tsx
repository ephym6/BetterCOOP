import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/shared/DataTable';
import { SearchFilterBar } from '../components/shared/SearchFilterBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { InputField } from '../components/ui/InputField';
import { usersService } from '../services/api';
import { User } from '../types';
import { UserPlus, ShieldAlert, KeyRound, Check, HelpCircle } from 'lucide-react';

export const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  // Invitation Modal state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'SUPER_ADMIN' | 'COOP_ADMIN' | 'SENIOR_OFFICER'>('SENIOR_OFFICER');
  const [formError, setFormError] = useState('');

  const fetchUsers = async () => {
    const list = await usersService.getUsers();
    setUsers(list);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let output = [...users];

    if (searchText.trim()) {
      const term = searchText.toLowerCase().trim();
      output = output.filter(
        (u) =>
          u.fullName.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term)
      );
    }

    if (roleFilter !== 'ALL') {
      output = output.filter((u) => u.role === roleFilter);
    }

    setFilteredUsers(output);
  }, [users, searchText, roleFilter]);

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !email.trim()) {
      setFormError('Please enter the officer’s name and administrative email.');
      return;
    }

    try {
      await usersService.createUser({
        fullName,
        email,
        role,
        status: 'ACTIVE'
      });

      // Clear fields
      setFullName('');
      setEmail('');
      setRole('SENIOR_OFFICER');
      setIsInviteModalOpen(false);

      fetchUsers(); // restore lists
    } catch (err) {
      setFormError('Could not process invitation links.');
    }
  };

  // Helper to map role strings into beautiful badges
  const renderRolePill = (roleStr: string) => {
    switch (roleStr) {
      case 'SUPER_ADMIN':
        return <span className="px-2.5 py-1 bg-red-100 text-red-800 text-[10px] font-bold rounded-sm uppercase tracking-wider">Super Administrator</span>;
      case 'COOP_ADMIN':
        return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-sm uppercase tracking-wider">Cooperative Admin</span>;
      default:
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-sm uppercase tracking-wider">Senior Officer</span>;
    }
  };

  // Define Columns
  const columns = [
    {
      header: 'Manager Info',
      render: (u: User) => (
        <div className="flex items-center gap-3">
          {u.avatarUrl ? (
            <img
              alt={u.fullName}
              className="w-10 h-10 rounded-full border border-slate-border object-cover"
              src={u.avatarUrl}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-sm select-none">
              {u.fullName.charAt(0)}
            </div>
          )}
          <div className="text-left">
            <p className="font-label-md font-bold text-on-surface leading-tight">{u.fullName}</p>
            <p className="text-xs text-on-surface-variant font-mono mt-0.5">{u.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Authority Role',
      render: (u: User) => <div className="text-left">{renderRolePill(u.role)}</div>
    },
    {
      header: 'System status',
      render: (u: User) => <StatusBadge status={u.status} />
    },
    {
      header: 'Operations',
      render: (u: User) => (
        <button
          onClick={() => alert(`Reviewing permission structures for ${u.fullName}. Contact Security Lead to revoke active administrative tokens.`)}
          className="text-primary hover:underline text-xs font-bold font-label-md bg-transparent border-none outline-none cursor-pointer"
        >
          Audit Authority
        </button>
      )
    }
  ];

  const roleFilterOptions = [
    { value: 'ALL', label: 'All Managed Groups' },
    { value: 'SUPER_ADMIN', label: 'Super Administrators' },
    { value: 'COOP_ADMIN', label: 'Cooperative managers' },
    { value: 'SENIOR_OFFICER', label: 'Field senior officers' }
  ];

  return (
    <DashboardLayout pageTitle="User Management">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 text-left">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface-variant font-bold text-lg">Administrative Team</h3>
          <p className="text-on-surface-variant/60 font-body-sm text-xs">Verify credentials and manage authority guidelines across local union offices.</p>
        </div>
        <Button
          onClick={() => setIsInviteModalOpen(true)}
          icon={<UserPlus className="w-4 h-4" />}
          variant="secondary"
        >
          Invite System Officer
        </Button>
      </div>

      <div className="mb-6">
        <SearchFilterBar
          searchText={searchText}
          onSearchChange={setSearchText}
          searchPlaceholder="Search administrators list..."
          filterLabel1="Authority Group"
          filterValue1={roleFilter}
          onFilterChange1={setRoleFilter}
          filterOptions1={roleFilterOptions}
        />
      </div>

      {/* Main DataTable list */}
      <DataTable
        data={filteredUsers}
        columns={columns}
        keyExtractor={(u) => u._id}
        emptyMessage="No administrators matches your query coordinates."
      />

      {/* Invitation popup Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite New System Officer"
      >
        <form onSubmit={handleInviteSubmit} className="space-y-5 text-left select-none">
          {formError && (
            <div className="p-3 bg-danger/10 text-danger rounded-lg border border-danger/15 text-xs font-medium">
              ❌ {formError}
            </div>
          )}

          <InputField
            label="Full Display Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Samuel Mwangi"
          />

          <InputField
            label="Administrative Email Coordinate"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="samuel.mwangi@bettercoop.agri"
          />

          {/* Select dropdown role */}
          <div className="flex flex-col gap-1">
            <label className="text-label-md font-bold text-on-surface-variant">System Authority Level</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="px-4 py-3 bg-surface-container-low border border-slate-border rounded-lg text-body-md text-on-surface outline-none cursor-pointer"
            >
              <option value="SENIOR_OFFICER">Senior Officer (Field registrations &amp; delivery logging)</option>
              <option value="COOP_ADMIN">Coop Administrator (Savings, approval guidelines)</option>
              <option value="SUPER_ADMIN">Super Administrator (Full financial control override)</option>
            </select>
          </div>

          <div className="p-4 bg-surface-container-low rounded-lg border border-primary/10 flex gap-3 text-left text-sm">
            <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-body-sm text-on-surface-variant leading-relaxed">
              Invited managers will receive a secure credential enrollment link directly at their email address to configure active passwords and Two-Factor keys.
            </p>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-border mt-6">
            <Button type="button" variant="outline" onClick={() => setIsInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Send System Invitation
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
