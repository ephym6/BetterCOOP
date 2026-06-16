import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DataTable } from '../components/shared/DataTable';
import { SearchFilterBar } from '../components/shared/SearchFilterBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { InputField } from '../components/ui/InputField';
import { membersService } from '../services/api';

import { Plus, UserPlus, FileEdit, ArrowRightLeft, Sprout } from 'lucide-react';

export const MemberManagementPage = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [cropFilter, setCropFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Form states for adding or onboarding a new farmer
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cropType, setCropType] = useState('Rice');
  const [farmSize, setFarmSize] = useState('2.5');
  const [farmType, setFarmType] = useState<'Smallholder' | 'Commercial'>('Smallholder');
  const [shareCapital, setShareCapital] = useState('5000');
  const [formError, setFormError] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Retrieve initial list
  const fetchMembers = async () => {
    const list = await membersService.getMembers();
    setMembers(list);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Filter members on search or select dropdown change
  useEffect(() => {
    let output = [...members];

    if (searchText.trim()) {
      const term = searchText.toLowerCase().trim();
      output = output.filter(
        (m) =>
          m.fullName.toLowerCase().includes(term) ||
          m.memberId.toLowerCase().includes(term) ||
          m.nationalId.includes(term) ||
          m.phoneNumber.includes(term)
      );
    }

    if (cropFilter !== 'ALL') {
      output = output.filter((m) => m.cropType.toUpperCase() === cropFilter.toUpperCase());
    }

    if (statusFilter !== 'ALL') {
      output = output.filter((m) => m.status.toUpperCase() === statusFilter.toUpperCase());
    }

    setFilteredMembers(output);
    setCurrentPage(1); // reset to first page on filter
  }, [members, searchText, cropFilter, statusFilter]);

  // Handle pagination calculation slice
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Form submit handler
  const handleOnboardSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !nationalId.trim() || !phoneNumber.trim()) {
      setFormError('Please fill out all identification fields.');
      return;
    }

    try {
      await membersService.createMember({
        fullName,
        nationalId,
        phoneNumber,
        cropType,
        farmSize: parseFloat(farmSize) || 1.0,
        farmType,
        shareCapital: parseFloat(shareCapital) || 0,
        status: 'ACTIVE' // Starts active
      });

      // Reset fields
      setFullName('');
      setNationalId('');
      setPhoneNumber('');
      setCropType('Rice');
      setFarmSize('2.5');
      setFarmType('Smallholder');
      setShareCapital('5000');
      
      setIsAddModalOpen(false);
      fetchMembers(); // reload table details
    } catch (err) {
      setFormError(err.message || 'Error occurred onboarding member.');
    }
  };

  // Setup dropdown filter coordinates
  const cropFilterOptions = [
    { value: 'ALL', label: 'All Crops' },
    { value: 'Rice', label: 'Rice Focus' },
    { value: 'Corn', label: 'Corn/Maize Focus' },
    { value: 'Coconut', label: 'Coconut Focus' },
    { value: 'Cassava', label: 'Cassava Focus' },
    { value: 'Cocoa', label: 'Cocoa Focus' },
    { value: 'Coffee', label: 'Coffee Focus' }
  ];

  const statusFilterOptions = [
    { value: 'ALL', label: 'All Statuses' },
    { value: 'ACTIVE', label: 'Active Farmers' },
    { value: 'PROBATION', label: 'Probationary' },
    { value: 'INACTIVE', label: 'Inactive/Suspended' }
  ];

  // Define table column structure
  const columns = [
    {
      header: 'Farmer Directory Node',
      render: (m) => (
        <div className="flex items-center gap-3">
          {m.avatarUrl ? (
            <img
              alt={m.fullName}
              className="w-10 h-10 rounded-full border border-slate-border object-cover"
              src={m.avatarUrl}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-sm select-none">
              {m.fullName.charAt(0)}
            </div>
          )}
          <div className="text-left">
            <p className="font-label-md font-bold text-on-surface leading-tight">{m.fullName}</p>
            <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest mt-0.5">{m.memberId}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Crop Focus & Farm size',
      render: (m) => (
        <div className="text-left font-body-sm flex items-center gap-2">
          <Sprout className="w-4 h-4 text-primary" />
          <div>
            <span className="font-bold text-on-surface">{m.cropType}</span>
            <span className="text-on-surface-variant text-xs block font-normal">{m.farmSize} Hectares ({m.farmType})</span>
          </div>
        </div>
      )
    },
    {
      header: 'Share Capital Savings',
      render: (m) => (
        <div className="text-left font-mono font-bold text-sm text-on-surface">
          Ksh {m.shareCapital.toLocaleString('en-US')}
        </div>
      )
    },
    {
      header: 'Verification Status',
      render: (m) => <StatusBadge status={m.status} />
    },
    {
      header: 'Actions',
      render: (m) => (
        <div className="flex gap-2">
          <Button
            onClick={() => navigate(`/members/${m._id}`)}
            variant="outline"
            size="sm"
          >
            Manage Details
          </Button>
        </div>
      )
    }
  ];

  return (
    <DashboardLayout pageTitle="Member Management">
      {/* Header operations row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 text-left">
        <div>
          <h3 className="font-headline-sm text-headline-sm font-semibold text-lg text-on-surface-variant">Farmer Directory</h3>
          <p className="text-on-surface-variant/60 font-body-sm text-xs">Verify land limits, examine outstanding share capitals, and manage member profiles.</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          icon={<UserPlus className="w-4 h-4" />}
          variant="secondary"
        >
          Onboard New Farmer
        </Button>
      </div>

      {/* Filter and query coordinates */}
      <div className="mb-6">
        <SearchFilterBar
          searchText={searchText}
          onSearchChange={setSearchText}
          searchPlaceholder="Search farmer names, ID, phone codes..."
          filterLabel1="Crop Focus"
          filterValue1={cropFilter}
          onFilterChange1={setCropFilter}
          filterOptions1={cropFilterOptions}
          filterLabel2="Activity Status"
          filterValue2={statusFilter}
          onFilterChange2={setStatusFilter}
          filterOptions2={statusFilterOptions}
        />
      </div>

      {/* Main DataTable node */}
      <DataTable
        data={paginatedMembers}
        columns={columns}
        keyExtractor={(m) => m._id}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalRecordsLabel={`Found ${filteredMembers.length} farmers registered in the system`}
      />

      {/* Onboard Farmer popup Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Onboard New Cooperative Farmer"
      >
        <form onSubmit={handleOnboardSubmit} className="space-y-5 text-left select-none">
          {formError && (
            <div className="p-3 bg-danger/10 text-danger rounded-lg border border-danger/15 text-xs font-medium">
              ❌ {formError}
            </div>
          )}

          {/* Member Name */}
          <InputField
            label="Full Legal Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Adebayo Olatunji"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* National ID */}
            <InputField
              label="National ID Number"
              required
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              placeholder="11223344"
            />

            {/* Mobile Contact */}
            <InputField
              label="Phone Number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+254 711 223 344"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Primary Crop */}
            <div className="flex flex-col gap-1">
              <label className="text-label-md font-bold text-on-surface-variant">Primary Crop Focus</label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low border border-slate-border rounded-lg text-body-md text-on-surface outline-none cursor-pointer"
              >
                <option value="Rice">Rice Focus</option>
                <option value="Corn">Corn/Maize Focus</option>
                <option value="Coconut">Coconut Focus</option>
                <option value="Cassava">Cassava Focus</option>
                <option value="Coffee">Coffee Bean Focus</option>
                <option value="Cocoa">Cocoa Focus</option>
              </select>
            </div>

            {/* Area Size */}
            <InputField
              label="Farm Size (Hectares)"
              type="number"
              step="0.1"
              required
              value={farmSize}
              onChange={(e) => setFarmSize(e.target.value)}
              placeholder="2.5"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Farm Classification */}
            <div className="flex flex-col gap-1">
              <label className="text-label-md font-bold text-on-surface-variant">Classification</label>
              <select
                value={farmType}
                onChange={(e) => setFarmType(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container-low border border-slate-border rounded-lg text-body-md text-on-surface outline-none cursor-pointer"
              >
                <option value="Smallholder">Smallholder (Under 5 Ha)</option>
                <option value="Commercial">Commercial (Over 5 Ha)</option>
              </select>
            </div>

            {/* Onboarding Shares deposited */}
            <InputField
              label="Initial Share Capital Deposit (Ksh)"
              type="number"
              required
              value={shareCapital}
              onChange={(e) => setShareCapital(e.target.value)}
              placeholder="5000"
            />
          </div>

          {/* Submission and close buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-border mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Verify &amp; Onboard Member
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
