import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Sprout,
  Lock,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Info,
  Check,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import { usersService } from '../services/api';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  // Form states mapping directly to Mongoose schema values
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cropType, setCropType] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [farmType, setFarmType] = useState('Smallholder');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setTermsAccepted] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleNextStep = () => {
    const errors = {};
    
    // Step validation rules
    if (step === 1) {
      if (!fullName.trim()) errors.fullName = 'Full legal name is required.';
      if (!nationalId.trim()) errors.nationalId = 'National ID number is required.';
      if (!phoneNumber.trim()) errors.phoneNumber = 'A valid mobile phone number is required.';
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
    } else if (step === 2) {
      if (!cropType) errors.cropType = 'Please select a primary crop focus.';
      if (!farmSize || parseFloat(farmSize) <= 0) errors.farmSize = 'Please enter a valid hectares measure.';
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
    }

    setFormErrors({});
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert('You must accept the BetterCOOP Data Privacy Policy to continue.');
      return;
    }

    // Create a mock session administrator profile corresponding to this input
    const newUser = await usersService.createUser({
      email: email || 'admin@bettercoop.agri',
      fullName: fullName,
      role: 'COOP_ADMIN', // Newly self-onboarded managers become Coop Administrators
      status: 'ACTIVE',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8IFvNdwUGbDubGYZvceYNTfcTYraCl4XWd2vM2MuM24yGSgLzvOxxHGoI_AQOGzskgktsODmTfr9b4k4th_VRJxA-6PLznzztQTwRIWPQVNwzgIlz6wPYDOncaGo3uecq--Zb1Rs0L804cqUtckzUeTcT8NGKHK41bEunx4WoqmYxzxE6i5SyhmwFAY-BTJ6S-XgRs1r8GFIFNh33dV0a3hMc38-2vp_SIvtgGqR2HSWsEzjoZ46UQPjWhGYCKf91uDteuS16fCE'
    });

    localStorage.setItem('bettercoop_current_user', JSON.stringify(newUser));
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="bg-slate-surface font-body-md text-on-background min-h-screen flex flex-col justify-between relative overflow-hidden py-12 p-gutter-mobile md:p-gutter-desktop select-none">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary-container rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-2xl mx-auto relative z-10 text-center flex-grow flex flex-col justify-center">
        {/* Brand Header */}
        <div className="mb-8">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-2 tracking-tight font-extrabold text-3xl">
            BetterCOOP
          </h1>
          <p className="text-on-surface-variant text-sm font-medium">
            Empowering Agricultural Growth through Secure Finance
          </p>
        </div>

        {/* Dynamic Stepper Progress Strip */}
        <div className="mb-10 w-full max-w-lg mx-auto relative px-2">
          {/* Connector lines behind steps */}
          <div className="absolute top-5 left-10 right-10 h-0.5 bg-slate-border -z-10" />
          <div 
            className="absolute top-5 left-10 h-0.5 bg-success -z-10 transition-all duration-500 ease-out"
            style={{ width: `${step === 1 ? '0%' : step === 2 ? '50%' : '100%'}` }}
          />

          <div className="flex items-center justify-between">
            {/* Step 1 indicator */}
            <div className="flex flex-col items-center gap-1.5 bg-slate-surface px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                step > 1 ? 'bg-success text-white' : step === 1 ? 'bg-primary text-white ring-4 ring-primary-fixed' : 'bg-surface-container-high text-on-surface-variant'
              }`}>
                {step > 1 ? <Check className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <span className="font-label-md text-label-md text-xs">Personal</span>
            </div>

            {/* Step 2 indicator */}
            <div className="flex flex-col items-center gap-1.5 bg-slate-surface px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                step > 2 ? 'bg-success text-white' : step === 2 ? 'bg-primary text-white ring-4 ring-primary-fixed' : 'bg-surface-container-high text-on-surface-variant'
              }`}>
                {step > 2 ? <Check className="w-5 h-5" /> : <Sprout className="w-5 h-5" />}
              </div>
              <span className="font-label-md text-label-md text-xs">Cooperative</span>
            </div>

            {/* Step 3 indicator */}
            <div className="flex flex-col items-center gap-1.5 bg-slate-surface px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                step === 3 ? 'bg-primary text-white ring-4 ring-primary-fixed' : 'bg-surface-container-high text-on-surface-variant'
              }`}>
                <Lock className="w-5 h-5" />
              </div>
              <span className="font-label-md text-label-md text-xs">Credentials</span>
            </div>
          </div>
        </div>

        {/* Stepper Interactive Form body wrapper */}
        <div className="bg-surface-container-lowest rounded-xl shadow-md p-8 md:p-10 border border-slate-border text-left">
          <form onSubmit={handleCompleteRegistration}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold text-xl mb-1">
                      Personal Details
                    </h2>
                    <p className="text-on-surface-variant text-body-sm">
                      Please provide your legal identification information to initiate your membership.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Full Name input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md text-on-surface-variant">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 h-touch-target bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      />
                      {formErrors.fullName && <p className="text-danger text-xs">{formErrors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* National ID */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-md text-label-md text-on-surface-variant">National ID / Passport Number</label>
                        <input
                          type="text"
                          required
                          value={nationalId}
                          onChange={(e) => setNationalId(e.target.value)}
                          placeholder="e.g. 12345678"
                          className="w-full px-4 h-touch-target bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                        {formErrors.nationalId && <p className="text-danger text-xs">{formErrors.nationalId}</p>}
                      </div>

                      {/* Phone Number */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-md text-label-md text-on-surface-variant">Mobile Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+254 700 000 000"
                          className="w-full px-4 h-touch-target bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                        {formErrors.phoneNumber && <p className="text-danger text-xs">{formErrors.phoneNumber}</p>}
                      </div>
                    </div>

                    {/* Notice Banner */}
                    <div className="p-4 bg-surface-container-low rounded-lg border border-primary/10 flex gap-3.5 text-left text-sm">
                      <Info className="w-5 h-5 text-primary shrink-0 mt-0.5 animate-bounce" />
                      <p className="text-body-sm text-on-surface-variant leading-relaxed">
                        We use your verified phone number for strict multi-factor authentication (MFA) and automated SMS harvest or delivery notifications.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold text-xl mb-1">
                      Cooperative Operations Info
                    </h2>
                    <p className="text-on-surface-variant text-body-sm">
                      Help us map and customize cooperative financial services around your seasonal crop harvests.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Select Crop Type dropdown */}
                    <div className="flex flex-col gap-1.5 justify-start">
                      <label className="font-label-md text-label-md text-on-surface-variant">Primary Crop Focus</label>
                      <select
                        required
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                        className="w-full px-4 h-touch-target bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer"
                      >
                        <option value="">Choose Crop...</option>
                        <option value="Corn">Maize / Corn</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Coffee">Coffee Beans</option>
                        <option value="Cocoa">Cocoa Pods</option>
                        <option value="Rice">Kenyan Rice</option>
                      </select>
                      {formErrors.cropType && <p className="text-danger text-xs">{formErrors.cropType}</p>}
                    </div>

                    {/* Farm Hectares input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md text-on-surface-variant">Farm Cultivated Area (in Hectares)</label>
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        required
                        value={farmSize}
                        onChange={(e) => setFarmSize(e.target.value)}
                        placeholder="e.g. 4.5"
                        className="w-full px-4 h-touch-target bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      />
                      {formErrors.farmSize && <p className="text-danger text-xs">{formErrors.farmSize}</p>}
                    </div>

                    {/* Visual operation buttons */}
                    <div className="space-y-1.5 text-left">
                      <label className="font-label-md text-label-md text-on-surface-variant block">Cooperative Land Classification</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFarmType('Smallholder')}
                          className={`p-4 border-2 rounded-xl text-left flex flex-col gap-2 transition-all cursor-pointer ${
                            farmType === 'Smallholder'
                              ? 'border-primary bg-primary/5 shadow-xs'
                              : 'border-slate-border hover:border-primary/50'
                          }`}
                        >
                          <span className="font-label-md text-on-surface text-sm font-bold">Smallholder Member</span>
                          <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold leading-tight">Under 5 Hectares</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFarmType('Commercial')}
                          className={`p-4 border-2 rounded-xl text-left flex flex-col gap-2 transition-all cursor-pointer ${
                            farmType === 'Commercial'
                              ? 'border-primary bg-primary/5 shadow-xs'
                              : 'border-slate-border hover:border-primary/50'
                          }`}
                        >
                          <span className="font-label-md text-on-surface text-sm font-bold">Commercial Farmer</span>
                          <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-extrabold leading-tight">Over 5 Hectares</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold text-xl mb-1">
                      Credential Creation
                    </h2>
                    <p className="text-on-surface-variant text-body-sm">
                      Set up your secure administrative access credentials to log into the dashboard.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* User Admin Email input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md text-on-surface-variant">Administrative Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="manager@bettercoop.agri"
                        className="w-full px-4 h-touch-target bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      />
                    </div>

                    {/* Password input with vis toggler */}
                    <div className="flex flex-col gap-1.5 relative">
                      <label className="font-label-md text-label-md text-on-surface-variant">Secure Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-4 pr-12 h-touch-target bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Privacy Agreement checkboxes */}
                    <div className="flex items-start gap-3 p-2 text-left select-none">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-1 rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="terms" className="text-body-sm text-on-surface-variant leading-relaxed select-none cursor-pointer">
                        I hereby agree to the BetterCOOP Data Protection Standards and Membership Agreement. 
                        My financial, crop delivery, and savings credentials will be processed with tier-1 encryption guidelines.
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progressive Navigation row */}
            <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-border">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center gap-2 px-6 h-touch-target text-primary font-bold hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 text-primary" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-primary hover:bg-emerald-dark text-white px-8 h-touch-target rounded-lg font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!acceptTerms}
                  className="bg-secondary-container hover:bg-amber-dark text-on-secondary-container hover:text-white px-8 h-touch-target rounded-lg font-bold shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>Complete Onboarding</span>
                  <Sparkles className="w-5 h-5 shrink-0" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing login link */}
        <div className="text-center mt-6">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Coordinate with existing credentials?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* Success Modal Container */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-gutter-mobile bg-inverse-surface/60 backdrop-blur-xs select-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface-container-lowest rounded-xl p-10 max-w-md w-full text-center shadow-2xl border border-slate-border"
            >
              <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3 font-extrabold">Onboarding Successful!</h3>
              <p className="text-on-surface-variant text-body-md mb-8 leading-relaxed">
                Welcome to the BetterCOOP family. Your secure admin credentials have been successfully written to the system database. 
                You now have direct administrative access over agricultural ledgers and syndicate operations.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="block w-full py-4 bg-primary hover:bg-emerald-dark text-white rounded-lg font-bold shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                Launch dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Standard Legal copyright */}
      <div className="text-center pb-4 mt-6">
        <p className="text-label-xs text-on-surface-variant opacity-60 font-bold">
          © 2026 BetterCOOP. All rights reserved.
        </p>
      </div>
    </div>
  );
};
