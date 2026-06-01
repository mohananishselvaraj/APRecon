/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  RotateCcw, 
  FileText, 
  Layers, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronRight,
  User,
  Calendar,
  Filter,
  CheckSquare,
  Square,
  MoreHorizontal,
  Unlock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Invoice, 
  Batch, 
  MOCK_INVOICES, 
  BUSINESS_UNITS, 
  SOURCES, 
  PAYMENT_TERMS, 
  PAYMENT_METHODS, 
  RECONCILIATION_FLAGS 
} from './types';

// --- Shared Enterprise Components in Redwood Theme ---

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = "" 
}: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost',
  disabled?: boolean,
  className?: string
}) => {
  const baseStyles = "px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 rounded-md shadow-xs active:scale-[0.98]";
  
  const variants = {
    primary: "bg-redwood-accent text-white border border-redwood-accent hover:bg-redwood-accent-hover hover:border-redwood-accent-hover disabled:bg-[#F3ECE6] disabled:border-[#E5DDD5] disabled:text-[#B29E94] disabled:cursor-not-allowed disabled:shadow-none",
    secondary: "bg-redwood-sand-dark text-redwood-text-main border border-redwood-sand-dark hover:bg-redwood-border hover:border-redwood-border disabled:opacity-50 disabled:cursor-not-allowed",
    outline: "bg-transparent text-redwood-text-main border border-redwood-border hover:bg-redwood-sand/40 disabled:border-redwood-sand-dark disabled:text-gray-400 disabled:cursor-not-allowed",
    ghost: "bg-transparent text-redwood-text-muted hover:bg-redwood-sand/50 hover:text-redwood-text-main disabled:opacity-40 disabled:cursor-not-allowed shadow-none"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ label, value, onChange, placeholder, type = "text", mandatory = false }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">
      {label} {mandatory && <span className="text-redwood-accent">*</span>}
    </label>
    <input 
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-redwood-border p-2.5 text-sm bg-white rounded-md focus:outline-hidden focus:ring-2 focus:ring-redwood-accent/30 focus:border-redwood-accent transition-all text-redwood-text-main"
    />
  </div>
);

const Select = ({ label, value, onChange, options, mandatory = false, multiple = false }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">
      {label} {mandatory && <span className="text-redwood-accent">*</span>}
    </label>
    <select 
      value={value}
      onChange={onChange}
      multiple={multiple}
      className={`border border-redwood-border p-2.5 text-sm bg-white rounded-md focus:outline-hidden focus:ring-2 focus:ring-redwood-accent/30 focus:border-redwood-accent transition-all text-redwood-text-main ${multiple ? 'h-24' : ''}`}
    >
      {!multiple && <option value="">Select {label}</option>}
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const Modal = ({ isOpen, onClose, title, children, footer }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-redwood-dark/40 backdrop-blur-xs p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="bg-white border border-redwood-border rounded-xl w-full max-w-2xl shadow-xl overflow-hidden"
      >
        <div className="p-5 border-b border-redwood-border flex justify-between items-center bg-redwood-sand">
          <h2 className="text-base font-bold text-redwood-text-main uppercase tracking-wider">{title}</h2>
          <button onClick={onClose} className="text-2xl font-light text-redwood-text-muted hover:text-redwood-accent transition-colors hover:scale-110 cursor-pointer">&times;</button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto bg-white">
          {children}
        </div>
        {footer && (
          <div className="p-4 border-t border-redwood-border flex justify-end gap-3 bg-redwood-sand">
            {footer}
          </div>
        )}
      </motion.div>
    </div>
  );
};

const LOV = ({ label, value, onChange, options, mandatory = false }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter((opt: string) => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (opt: string) => {
    const newValue = value.includes(opt) 
      ? value.filter((v: string) => v !== opt)
      : [...value, opt];
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      <label className="text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">
        {label} {mandatory && <span className="text-redwood-accent">*</span>}
      </label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="border border-redwood-border p-2.5 text-sm bg-white cursor-pointer flex justify-between items-center min-h-[42px] rounded-md hover:border-redwood-accent transition-colors text-redwood-text-main"
      >
        <span className="truncate">
          {value.length > 0 ? value.join(', ') : `Select ${label}`}
        </span>
        <ChevronRight className={`transition-transform text-redwood-text-muted ${isOpen ? 'rotate-90' : ''}`} size={16} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-redwood-border rounded-md shadow-lg max-h-60 overflow-hidden flex flex-col"
            >
              <div className="p-2 border-b border-redwood-border bg-redwood-sand">
                <input 
                  autoFocus
                  type="text"
                  placeholder="Type to filter..."
                  className="w-full p-2 text-xs border border-redwood-border rounded bg-white focus:outline-hidden focus:ring-1 focus:ring-redwood-accent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt: string) => (
                    <div 
                      key={opt}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOption(opt);
                      }}
                      className="p-2.5 text-xs hover:bg-redwood-sand hover:text-redwood-accent cursor-pointer flex items-center gap-2 text-redwood-text-main transition-colors"
                    >
                      <div className="w-4 h-4 border border-redwood-border rounded flex items-center justify-center transition-colors">
                        {value.includes(opt) && <CheckSquare size={12} className="text-redwood-accent" />}
                      </div>
                      <span className="font-medium">{opt}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-xs italic text-redwood-text-muted">No matches found</div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'batches'>('invoices');
  const [viewMode, setViewMode] = useState<'search' | 'takeAction'>('search');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [selectedForRemoval, setSelectedForRemoval] = useState<string[]>([]);
  const [isMassUpdateOpen, setIsMassUpdateOpen] = useState(false);
  const [isConfirmPaymentOpen, setIsConfirmPaymentOpen] = useState(false);
  const [isConfirmReleaseHoldOpen, setIsConfirmReleaseHoldOpen] = useState(false);
  const [batchToRelease, setBatchToRelease] = useState<string | null>(null);
  const [isConfirmMassUpdateOpen, setIsConfirmMassUpdateOpen] = useState(false);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [currentBatch, setCurrentBatch] = useState<Batch | null>(null);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);

  const ALL_COLUMNS = [
    'Invoice Number',
    'Supplier Name',
    'Supplier Number',
    'Supplier Site',
    'Invoice Date',
    'PV Number',
    'Amount',
    'Installment Amount',
    'Currency',
    'Status'
  ];

  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'Invoice Number',
    'Supplier Name',
    'Supplier Number',
    'Supplier Site',
    'Invoice Date',
    'PV Number',
    'Amount',
    'Installment Amount',
    'Currency',
    'Status'
  ]);

  // Filters
  const [filters, setFilters] = useState({
    businessUnit: 'BU-North',
    supplierName: ['Acme Corp'] as string[],
    invoiceSource: [] as string[],
    invoiceNumber: ''
  });

  const [searchTriggered, setSearchTriggered] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleResetSelection = () => {
    setSelectedInvoices([]);
    setSelectedForRemoval([]);
    setSearchTriggered(false);
    setValidationError(null);
    setFilters({
      businessUnit: '',
      supplierName: [],
      invoiceSource: [],
      invoiceNumber: ''
    });
    setCurrentPage(1);
  };

  const filteredInvoices = useMemo(() => {
    if (!searchTriggered) return [];
    let results = MOCK_INVOICES.filter(inv => {
      if (filters.businessUnit && inv.businessUnit !== filters.businessUnit) return false;
      if (filters.supplierName.length > 0 && !filters.supplierName.includes(inv.supplierName)) return false;
      if (filters.invoiceSource.length > 0 && !filters.invoiceSource.includes(inv.source)) return false;
      if (filters.invoiceNumber && !inv.invoiceNumber.toLowerCase().includes(filters.invoiceNumber.toLowerCase())) return false;
      return true;
    });

    return results;
  }, [searchTriggered, filters]);

  const selectedInvoicesData = useMemo(() => {
    return MOCK_INVOICES.filter(inv => selectedInvoices.includes(inv.id));
  }, [selectedInvoices]);

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  
  const canCreatePayment = useMemo(() => {
    return selectedInvoices.length > 0 && 
           selectedInvoicesData.every(inv => inv.status === 'Validated' && inv.holdStatus !== 'On Hold');
  }, [selectedInvoices, selectedInvoicesData]);

  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredInvoices.slice(start, start + itemsPerPage);
  }, [filteredInvoices, currentPage]);

  const handleSearch = () => {
    if (!filters.businessUnit) {
      setValidationError("Business Unit is mandatory to search.");
      return;
    }
    if (filters.supplierName.length === 0) {
      setValidationError("Supplier Name is mandatory to search.");
      return;
    }
    setValidationError(null);
    setSearchTriggered(true);
  };

  const toggleInvoiceSelection = (id: string) => {
    setSelectedInvoices(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const [massUpdateData, setMassUpdateData] = useState({
    batchName: `BATCH_${new Date().toISOString().slice(0, 10).replace(/-/g, '')}_001`,
    paymentSubmitter: 'Mohan Anish', // Mock user
    invoiceDate: new Date().toISOString().slice(0, 10),
    paymentTerm: '',
    paymentMethod: '',
    reconciliationFlag: '',
    paymentVoucherNumber: ''
  });

  const handleSaveMassUpdate = () => {
    const selectedItems = MOCK_INVOICES.filter(inv => selectedInvoices.includes(inv.id)).map(inv => ({
      ...inv,
      paymentVoucherNumber: massUpdateData.paymentVoucherNumber || inv.paymentVoucherNumber,
      paymentTerm: massUpdateData.paymentTerm || inv.paymentTerm,
      paymentMethod: massUpdateData.paymentMethod || inv.paymentMethod,
      reconciliationFlag: massUpdateData.reconciliationFlag || inv.reconciliationFlag,
      status: 'Needs Re-validation' as const,
      holdStatus: 'On Hold' as const,
      massUpdateStatus: 'Completed' as const,
      paymentStatus: 'Not Ready' as const,
      massUpdates: `Updated: ${[
        massUpdateData.paymentTerm ? 'Term' : '',
        massUpdateData.paymentMethod ? 'Method' : '',
        massUpdateData.reconciliationFlag ? 'Recon' : '',
        massUpdateData.paymentVoucherNumber ? 'PV' : ''
      ].filter(Boolean).join(', ')}`
    }));
    
    const newBatch: Batch = {
      id: Math.random().toString(36).substr(2, 9),
      ...massUpdateData,
      massUpdateStatus: 'Completed',
      holdStatus: 'On Hold',
      paymentStatus: 'Not Ready',
      invoices: selectedItems
    };

    setBatches([newBatch, ...batches]);
    setIsMassUpdateOpen(false);
    setIsConfirmMassUpdateOpen(false);
    setSelectedInvoices([]);
    setViewMode('search');
    setActiveTab('batches');
  };

  const handleReleaseHold = (batchId: string) => {
    setBatchToRelease(batchId);
    setIsConfirmReleaseHoldOpen(true);
  };

  const confirmReleaseHold = () => {
    if (!batchToRelease) return;
    setBatches(prev => prev.map(b => 
      b.id === batchToRelease ? { 
        ...b, 
        holdStatus: 'Released', 
        paymentStatus: 'Ready',
        invoices: b.invoices.map(inv => ({ ...inv, status: 'Validated', holdStatus: 'Released', paymentStatus: 'Ready' }))
      } : b
    ));
    setIsConfirmReleaseHoldOpen(false);
    setBatchToRelease(null);
  };

  const handleCreatePayment = (batch: Batch) => {
    setCurrentBatch(batch);
    setIsConfirmPaymentOpen(true);
  };

  const confirmPayment = () => {
    if (!currentBatch) return;
    
    // Group invoices by supplier site
    const invoicesBySite = currentBatch.invoices.reduce((acc, inv) => {
      if (!acc[inv.supplierSite]) acc[inv.supplierSite] = [];
      acc[inv.supplierSite].push(inv);
      return acc;
    }, {} as Record<string, Invoice[]>);

    const payments = Object.entries(invoicesBySite).map(([site, invs]) => {
      const invoices = invs as Invoice[];
      return {
        supplierName: invoices[0].supplierName,
        supplierNumber: invoices[0].supplierNumber,
        supplierSite: site,
        paymentNumber: `PMT-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: invoices.reduce((sum, i) => sum + i.amount, 0),
        currency: invoices[0].currency
      };
    });
    
    setBatches(prev => prev.map(b => 
      b.id === currentBatch.id 
        ? { 
            ...b, 
            paymentStatus: 'Completed', 
            payments,
            invoices: b.invoices.map(inv => ({ ...inv, paymentStatus: 'Completed' }))
          } 
        : b
    ));
    
    setIsConfirmPaymentOpen(false);
    setCurrentBatch(null);
    
    if (viewMode === 'takeAction') {
      setSelectedInvoices([]);
      setViewMode('search');
      setActiveTab('batches');
    }
  };

  const handleDirectPayment = () => {
    const newBatch: Batch = {
      id: Math.random().toString(36).substr(2, 9),
      batchName: `Direct Payment - ${new Date().toLocaleDateString()}`,
      paymentSubmitter: 'System',
      invoiceDate: new Date().toISOString().split('T')[0],
      paymentTerm: 'Immediate',
      paymentMethod: 'ACH',
      reconciliationFlag: 'Yes',
      massUpdateStatus: 'Completed',
      holdStatus: 'Released',
      paymentStatus: 'Ready',
      invoices: selectedInvoicesData.map(inv => ({ ...inv, status: 'Validated', holdStatus: 'Released', paymentStatus: 'Ready' }))
    };
    
    setBatches([newBatch, ...batches]);
    setCurrentBatch(newBatch);
    setIsConfirmPaymentOpen(true);
  };

  const selectedSummary = useMemo(() => {
    const selectedItems = MOCK_INVOICES.filter(inv => selectedInvoices.includes(inv.id));
    const totalsByCurrency: Record<string, number> = {};
    
    selectedItems.forEach(item => {
      totalsByCurrency[item.currency] = (totalsByCurrency[item.currency] || 0) + item.amount;
    });

    return totalsByCurrency;
  }, [selectedInvoices]);

  return (
    <div className="min-h-screen bg-redwood-sand text-redwood-text-main font-sans selection:bg-redwood-accent selection:text-white">
      {/* Redwood Slate Header */}
      <header className="border-b border-redwood-border py-4 px-6 flex justify-between items-center bg-redwood-dark text-white sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-redwood-accent rounded-lg flex items-center justify-center shadow-md">
            <Layers className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-[17px] font-bold tracking-tight text-white">Supplier AP Invoice Reconciliation</h1>
            <p className="text-[10px] font-semibold text-redwood-sand/75 uppercase tracking-wider">Oracle Redwood Financial Cloud</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-xs font-semibold text-white">Mohan Anish</p>
            <p className="text-[9px] font-bold text-redwood-sand/60 uppercase tracking-widest">Finance Administration</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-redwood-accent/20 border border-redwood-accent/40 flex items-center justify-center">
            <User className="w-4 h-4 text-redwood-accent" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Redwood Sidebar Navigation */}
        <aside className="w-64 border-r border-redwood-border min-h-[calc(100vh-72px)] p-5 hidden lg:block bg-[#F4EFE9]">
          <nav className="flex flex-col gap-1.5">
            <button 
              onClick={() => { setActiveTab('invoices'); setViewMode('search'); }}
              className={`flex items-center gap-3 py-2.5 px-4 font-semibold text-sm transition-all rounded-md border text-left ${activeTab === 'invoices' && viewMode === 'search' ? 'bg-redwood-accent text-white border-redwood-accent shadow-xs' : 'bg-transparent text-redwood-text-muted border-transparent hover:bg-white/50 hover:text-redwood-text-main'}`}
            >
              <FileText size={18} /> Invoices
            </button>
            <button 
              onClick={() => setActiveTab('batches')}
              className={`flex items-center gap-3 py-2.5 px-4 font-semibold text-sm transition-all rounded-md border text-left ${activeTab === 'batches' ? 'bg-redwood-accent text-white border-redwood-accent shadow-xs' : 'bg-transparent text-redwood-text-muted border-transparent hover:bg-white/50 hover:text-redwood-text-main'}`}
            >
              <Layers size={18} /> Processed Batches
            </button>
            
            <div className="mt-8 pt-6 border-t border-redwood-border/50">
              <p className="text-[10px] font-extrabold text-redwood-text-muted uppercase tracking-widest mb-3 px-3">System Actions</p>
              <button className="flex items-center gap-3 py-2 px-3 text-xs font-medium text-redwood-text-muted hover:bg-white/40 hover:text-redwood-text-main rounded-md w-full text-left transition-colors">
                <CreditCard size={15} /> Quick Payments
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'invoices' ? (
              <motion.div 
                key="invoices"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col gap-6"
              >
                {viewMode === 'search' ? (
                  <>
                    {/* Filters Section */}
                    <section className="border border-redwood-border p-6 bg-white rounded-xl shadow-xs">
                      <div className="flex items-center gap-2 mb-5">
                        <Filter size={18} className="text-redwood-accent" />
                        <h2 className="text-sm font-bold uppercase tracking-wider text-redwood-text-main">Search Filters</h2>
                      </div>

                      {validationError && (
                        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-800 text-sm font-semibold rounded-md flex items-center gap-2.5">
                          <AlertCircle size={16} className="text-red-600 shrink-0" />
                          <span>{validationError}</span>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <Select 
                          label="Business Unit" 
                          mandatory 
                          options={BUSINESS_UNITS} 
                          value={filters.businessUnit}
                          onChange={(e: any) => {
                            setFilters({...filters, businessUnit: e.target.value});
                            setValidationError(null);
                          }}
                        />
                        <LOV 
                          label="Supplier Name" 
                          mandatory
                          options={Array.from(new Set(MOCK_INVOICES.map(i => i.supplierName)))} 
                          value={filters.supplierName}
                          onChange={(values: string[]) => {
                            setFilters({...filters, supplierName: values});
                            setValidationError(null);
                          }}
                        />
                        <LOV 
                          label="Invoice Source" 
                          options={SOURCES} 
                          value={filters.invoiceSource}
                          onChange={(values: string[]) => setFilters({...filters, invoiceSource: values})}
                        />
                        <Input 
                          label="Invoice Number" 
                          placeholder="Ex: INV-001..." 
                          value={filters.invoiceNumber}
                          onChange={(e: any) => setFilters({...filters, invoiceNumber: e.target.value})}
                        />
                      </div>

                      <div className="mt-5">
                        <LOV 
                          label="Visible Table Columns" 
                          options={ALL_COLUMNS} 
                          value={visibleColumns} 
                          onChange={(values: string[]) => setVisibleColumns(values)}
                        />
                      </div>

                      <div className="flex justify-between items-center mt-6 pt-5 border-t border-redwood-border/50">
                        <Button variant="outline" onClick={() => {
                          setFilters({
                            businessUnit: 'BU-North',
                            supplierName: ['Acme Corp'],
                            invoiceSource: [],
                            invoiceNumber: ''
                          });
                          setValidationError(null);
                          setSearchTriggered(true);
                        }}>
                          <Layers size={15} /> Auto-Load All Sample Invoices
                        </Button>
                        <div className="flex gap-3">
                          <Button variant="primary" onClick={handleSearch}>
                            <Search size={15} /> Apply Search Filters
                          </Button>
                        </div>
                      </div>
                    </section>

                    {/* Results Section */}
                    <section className="border border-redwood-border bg-white rounded-xl shadow-xs overflow-hidden">
                      <div className="p-4 px-6 border-b border-redwood-border flex justify-between items-center bg-redwood-sand">
                        <div className="flex items-center gap-2.5">
                          <h2 className="text-sm font-bold uppercase tracking-wider text-redwood-text-main">Invoice Search Results</h2>
                          <span className="bg-redwood-accent/10 text-redwood-accent px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            {filteredInvoices.length} Found
                          </span>
                        </div>
                        <div className="flex gap-2.5">
                          <Button 
                            variant="secondary" 
                            className="text-redwood-accent hover:bg-redwood-accent/5"
                            onClick={handleResetSelection}
                          >
                            <RotateCcw size={15} /> Clear Selection
                          </Button>
                          <Button 
                            variant="primary" 
                            disabled={selectedInvoices.length === 0}
                            onClick={() => setViewMode('takeAction')}
                          >
                            <ChevronRight size={15} /> Proceed to Action ({selectedInvoices.length})
                          </Button>
                        </div>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-redwood-border bg-redwood-sand/30">
                              <th className="p-4 w-12 text-center">
                                <div 
                                  onClick={() => {
                                    const allCurrentIds = filteredInvoices.map(i => i.id);
                                    const areAllSelected = allCurrentIds.every(id => selectedInvoices.includes(id));
                                    
                                    if (areAllSelected) {
                                      setSelectedInvoices(prev => prev.filter(id => !allCurrentIds.includes(id)));
                                    } else {
                                      setSelectedInvoices(prev => Array.from(new Set([...prev, ...allCurrentIds])));
                                    }
                                  }}
                                  className={`w-5 h-5 mx-auto border rounded flex items-center justify-center cursor-pointer transition-colors ${filteredInvoices.length > 0 && filteredInvoices.map(i => i.id).every(id => selectedInvoices.includes(id)) ? 'bg-redwood-accent border-redwood-accent text-white' : 'border-redwood-border bg-white hover:border-redwood-accent'}`}
                                >
                                  {filteredInvoices.length > 0 && filteredInvoices.map(i => i.id).every(id => selectedInvoices.includes(id)) ? <CheckSquare size={13} /> : null}
                                </div>
                              </th>
                              {visibleColumns.includes('Invoice Number') && <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Invoice Number</th>}
                              {visibleColumns.includes('Supplier Name') && <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Supplier Name</th>}
                              {visibleColumns.includes('Supplier Number') && <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Supplier Number</th>}
                              {visibleColumns.includes('Supplier Site') && <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Supplier Site</th>}
                              {visibleColumns.includes('Invoice Date') && <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Invoice Date</th>}
                              {visibleColumns.includes('PV Number') && <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">PV Number</th>}
                              {visibleColumns.includes('Amount') && <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Amount</th>}
                              {visibleColumns.includes('Installment Amount') && <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Installment Amount</th>}
                              {visibleColumns.includes('Currency') && <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Currency</th>}
                              {visibleColumns.includes('Status') && <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Status</th>}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-redwood-sand-dark/60">
                            {paginatedInvoices.length > 0 ? (
                              paginatedInvoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-redwood-sand/40 transition-colors text-sm text-redwood-text-main">
                                  <td className="p-4 text-center">
                                    <div 
                                      onClick={() => toggleInvoiceSelection(inv.id)}
                                      className={`w-5 h-5 mx-auto border rounded flex items-center justify-center cursor-pointer transition-colors ${selectedInvoices.includes(inv.id) ? 'bg-redwood-accent border-redwood-accent text-white' : 'border-redwood-border bg-white hover:border-redwood-accent'}`}
                                    >
                                      {selectedInvoices.includes(inv.id) ? <CheckSquare size={13} /> : null}
                                    </div>
                                  </td>
                                  {visibleColumns.includes('Invoice Number') && <td className="p-4 font-semibold text-redwood-accent">{inv.invoiceNumber}</td>}
                                  {visibleColumns.includes('Supplier Name') && <td className="p-4 font-medium">{inv.supplierName}</td>}
                                  {visibleColumns.includes('Supplier Number') && <td className="p-4 text-xs font-mono text-redwood-text-muted">{inv.supplierNumber}</td>}
                                  {visibleColumns.includes('Supplier Site') && <td className="p-4">{inv.supplierSite}</td>}
                                  {visibleColumns.includes('Invoice Date') && <td className="p-4 text-redwood-text-muted">{inv.invoiceDate}</td>}
                                  {visibleColumns.includes('PV Number') && <td className="p-4 font-mono text-xs text-redwood-text-muted">{inv.paymentVoucherNumber || '—'}</td>}
                                  {visibleColumns.includes('Amount') && <td className="p-4 font-bold text-right md:text-left">{inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>}
                                  {visibleColumns.includes('Installment Amount') && <td className="p-4 font-bold text-right md:text-left">{inv.installmentAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>}
                                  {visibleColumns.includes('Currency') && <td className="p-4 font-semibold text-redwood-text-muted">{inv.currency}</td>}
                                  {visibleColumns.includes('Status') && (
                                    <td className="p-4">
                                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                        inv.status === 'Validated' ? 'bg-[#EAF5E9] text-[#1E6B4A]' : 
                                        inv.status === 'Needs Re-validation' ? 'bg-[#FFF2E0] text-[#B05B00]' : 
                                        'bg-[#F2EDEA] text-[#6E645E]'
                                      }`}>
                                        {inv.status}
                                      </span>
                                    </td>
                                  )}
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={visibleColumns.length + 1} className="p-12 text-center text-redwood-text-muted italic">
                                  {searchTriggered ? "No invoices match your search criteria." : "Select Business Unit & Supplier to view financial invoices."}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Controls */}
                      {filteredInvoices.length > 0 && (
                        <div className="p-4 px-6 border-t border-redwood-border flex justify-between items-center bg-redwood-sand">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">
                            Showing {Math.min(filteredInvoices.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(filteredInvoices.length, currentPage * itemsPerPage)} of {filteredInvoices.length} records
                          </div>
                          <div className="flex items-center gap-3">
                            <Button 
                              variant="outline" 
                              className="py-1 px-3 text-[11px]" 
                              disabled={currentPage === 1}
                              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            >
                              Prev
                            </Button>
                            <div className="flex gap-1">
                              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                  key={page}
                                  onClick={() => setCurrentPage(page)}
                                  className={`w-7 h-7 rounded border text-[11px] font-bold transition-all ${currentPage === page ? 'bg-redwood-accent border-redwood-accent text-white shadow-xs' : 'bg-white border-redwood-border text-redwood-text-main hover:bg-redwood-sand'}`}
                                >
                                  {page}
                                </button>
                              ))}
                            </div>
                            <Button 
                              variant="outline" 
                              className="py-1 px-3 text-[11px]" 
                              disabled={currentPage === totalPages}
                              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      )}
                    </section>
                  </>
                ) : (
                  <section className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={() => setViewMode('search')}>
                          <ChevronRight className="rotate-180" size={15} /> Back to Search
                        </Button>
                        <h2 className="text-base font-bold text-redwood-text-main uppercase tracking-wider">Take Action: Selected AP Invoices</h2>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        <Button 
                          variant="outline" 
                          className="text-red-700 border-red-200 hover:bg-red-50"
                          disabled={selectedForRemoval.length === 0}
                          onClick={() => {
                            setSelectedInvoices(prev => prev.filter(id => !selectedForRemoval.includes(id)));
                            setSelectedForRemoval([]);
                          }}
                        >
                          Exclude from Batch ({selectedForRemoval.length})
                        </Button>
                        <Button 
                          variant="primary" 
                          onClick={() => setIsMassUpdateOpen(true)}
                          disabled={selectedForRemoval.length > 0}
                        >
                          <Layers size={15} /> Perform Mass Update ({selectedInvoices.length})
                        </Button>
                        <Button 
                          variant="primary" 
                          className={`bg-emerald-600 hover:bg-emerald-700 border-emerald-600 ${!canCreatePayment ? 'opacity-55 grayscale cursor-not-allowed' : ''}`}
                          onClick={handleDirectPayment}
                          disabled={selectedForRemoval.length > 0 || !canCreatePayment}
                        >
                          <CreditCard size={15} /> Create Payments ({selectedInvoices.length})
                        </Button>
                      </div>
                    </div>

                    <div className="border border-redwood-border bg-white rounded-xl shadow-xs overflow-hidden">
                      <div className="p-4 px-6 border-b border-redwood-border bg-redwood-sand flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-redwood-text-main">Review Selected Records</h3>
                        <div className="flex flex-wrap gap-5">
                          {Object.entries(selectedSummary).map(([currency, total]) => (
                            <div key={currency} className="flex flex-col items-end">
                              <span className="text-[10px] font-bold uppercase text-redwood-text-muted">Total {currency}</span>
                              <span className="text-base font-bold text-redwood-text-main">{new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(total as number)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-redwood-border bg-redwood-sand/30">
                              <th className="p-4 w-12 text-center">
                                <div 
                                  onClick={() => {
                                    if (selectedForRemoval.length === selectedInvoices.length) {
                                      setSelectedForRemoval([]);
                                    } else {
                                      setSelectedForRemoval([...selectedInvoices]);
                                    }
                                  }}
                                  className={`w-5 h-5 mx-auto border rounded flex items-center justify-center cursor-pointer transition-colors ${selectedInvoices.length > 0 && selectedForRemoval.length === selectedInvoices.length ? 'bg-redwood-accent border-redwood-accent text-white' : 'border-redwood-border bg-white hover:border-redwood-accent'}`}
                                >
                                  {selectedInvoices.length > 0 && selectedForRemoval.length === selectedInvoices.length ? <CheckSquare size={13} /> : null}
                                </div>
                              </th>
                              <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Invoice Number</th>
                              <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Supplier Name</th>
                              <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Amount</th>
                              <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Currency</th>
                              <th className="p-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-redwood-sand-dark/60">
                            {selectedInvoicesData.map((inv) => (
                              <tr key={inv.id} className={`transition-colors text-sm ${selectedForRemoval.includes(inv.id) ? 'bg-red-50/50 hover:bg-red-50' : 'hover:bg-redwood-sand/30'}`}>
                                <td className="p-4 text-center">
                                  <div 
                                    onClick={() => {
                                      setSelectedForRemoval(prev => 
                                        prev.includes(inv.id) 
                                          ? prev.filter(id => id !== inv.id) 
                                          : [...prev, inv.id]
                                      );
                                    }}
                                    className={`w-5 h-5 mx-auto border rounded flex items-center justify-center cursor-pointer transition-colors ${selectedForRemoval.includes(inv.id) ? 'bg-redwood-accent border-redwood-accent text-white' : 'border-redwood-border bg-white hover:border-redwood-accent'}`}
                                  >
                                    {selectedForRemoval.includes(inv.id) ? <CheckSquare size={13} /> : null}
                                  </div>
                                </td>
                                <td className="p-4 font-semibold text-redwood-accent">{inv.invoiceNumber}</td>
                                <td className="p-4 font-medium">{inv.supplierName}</td>
                                <td className="p-4 font-bold">{inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                <td className="p-4 text-redwood-text-muted">{inv.currency}</td>
                                <td className="p-4">
                                  <button 
                                    onClick={() => {
                                      setSelectedInvoices(prev => prev.filter(id => id !== inv.id));
                                      setSelectedForRemoval(prev => prev.filter(id => id !== inv.id));
                                    }}
                                    className="text-[#B0342C] font-semibold text-xs hover:underline cursor-pointer"
                                  >
                                    Exclude
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="batches"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col gap-6"
              >
                {!selectedBatchId ? (
                  <>
                    <div className="flex justify-between items-center bg-white p-5 border border-redwood-border rounded-xl shadow-xs">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-redwood-text-main">Processed Batches Registry</h2>
                    </div>

                    {batches.length > 0 ? (
                      <section className="border border-redwood-border bg-white rounded-xl shadow-xs overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-redwood-border bg-redwood-sand">
                                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Batch Name</th>
                                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Update Status</th>
                                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Hold Status</th>
                                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Payment Status</th>
                                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Total Amount</th>
                                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">Count</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-redwood-sand-dark/60">
                              {batches.map((batch) => (
                                <tr 
                                  key={batch.id} 
                                  className="hover:bg-redwood-sand/40 transition-colors cursor-pointer text-sm"
                                  onClick={() => setSelectedBatchId(batch.id)}
                                >
                                  <td className="p-4 font-semibold text-redwood-accent hover:underline">{batch.batchName}</td>
                                  <td className="p-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${batch.massUpdateStatus === 'Completed' ? 'bg-[#EAF5E9] text-[#1E6B4A]' : 'bg-[#FFF2E0] text-[#B05B00]'}`}>
                                      {batch.massUpdateStatus}
                                    </span>
                                  </td>
                                  <td className="p-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${batch.holdStatus === 'Released' ? 'bg-[#EAF5E9] text-[#1E6B4A]' : batch.holdStatus === 'On Hold' ? 'bg-[#E5F3F5] text-[#165D66]' : 'bg-[#F2EDEA] text-[#6E645E]'}`}>
                                      {batch.holdStatus}
                                    </span>
                                  </td>
                                  <td className="p-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${batch.paymentStatus === 'Completed' ? 'bg-[#EAF5E9] text-[#1E6B4A]' : batch.paymentStatus === 'Ready' ? 'bg-[#E3EDFA] text-[#1C5196]' : 'bg-[#F2EDEA] text-[#6E645E]'}`}>
                                      {batch.paymentStatus}
                                    </span>
                                  </td>
                                  <td className="p-4 font-bold">
                                    {batch.invoices.reduce((acc, inv) => acc + inv.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })} {batch.invoices[0]?.currency}
                                  </td>
                                  <td className="p-4 text-redwood-text-muted font-medium">{batch.invoices.length} Invoices</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </section>
                    ) : (
                      <div className="border border-dashed border-redwood-border/60 bg-white p-20 text-center rounded-xl">
                        <Layers size={40} className="mx-auto mb-4 text-[#DED7CE]" />
                        <p className="text-base font-bold text-redwood-text-muted">No Payment Batches Processed Yet</p>
                        <p className="text-xs text-redwood-text-muted mt-1">Submit invoice mass updates to track batches here.</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <Button variant="outline" onClick={() => setSelectedBatchId(null)}>
                        <ChevronRight className="rotate-180" size={15} /> Back to Registry
                      </Button>
                      <h2 className="text-sm font-bold uppercase tracking-wider text-redwood-text-main">Batch Details Suite</h2>
                    </div>

                    {batches.filter(b => b.id === selectedBatchId).map((batch) => (
                      <section key={batch.id} className="flex flex-col gap-6">
                        {/* Batch Header Details Card */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 border border-redwood-border rounded-xl bg-white shadow-xs overflow-hidden divide-x divide-y lg:divide-y-0 divide-redwood-sand-dark/80">
                          <div className="p-4 text-left">
                            <p className="text-[10px] font-bold uppercase text-redwood-text-muted tracking-wider mb-1">Batch Name</p>
                            <p className="text-sm font-bold text-redwood-accent">{batch.batchName}</p>
                          </div>
                          <div className="p-4 text-left">
                            <p className="text-[10px] font-bold uppercase text-redwood-text-muted tracking-wider mb-1">Owner</p>
                            <p className="text-sm font-semibold">{batch.paymentSubmitter}</p>
                          </div>
                          <div className="p-4 text-left">
                            <p className="text-[10px] font-bold uppercase text-redwood-text-muted tracking-wider mb-1">Effective Date</p>
                            <p className="text-sm font-semibold">{batch.invoiceDate}</p>
                          </div>
                          <div className="p-4 text-left">
                            <p className="text-[10px] font-bold uppercase text-redwood-text-muted tracking-wider mb-1">Hold</p>
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${batch.holdStatus === 'Released' ? 'bg-[#EAF5E9] text-[#1E6B4A]' : 'bg-[#FFF2E0] text-[#B05B00]'}`}>
                              {batch.holdStatus}
                            </span>
                          </div>
                          <div className="p-4 text-left">
                            <p className="text-[10px] font-bold uppercase text-redwood-text-muted tracking-wider mb-1">Payment Term</p>
                            <p className="text-sm font-semibold">{batch.paymentTerm || '—'}</p>
                          </div>
                          <div className="p-4 text-left">
                            <p className="text-[10px] font-bold uppercase text-redwood-text-muted tracking-wider mb-1">Method</p>
                            <p className="text-sm font-semibold">{batch.paymentMethod || '—'}</p>
                          </div>
                          <div className="p-4 text-left">
                            <p className="text-[10px] font-bold uppercase text-redwood-text-muted tracking-wider mb-1">PV Number</p>
                            <p className="text-sm font-mono text-xs font-semibold">{batch.paymentVoucherNumber || '—'}</p>
                          </div>
                          <div className="p-4 text-left">
                            <p className="text-[10px] font-bold uppercase text-redwood-text-muted tracking-wider mb-1">Recon</p>
                            <p className="text-sm font-semibold">{batch.reconciliationFlag}</p>
                          </div>
                        </div>

                        {/* Status and Action Panel */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between border border-redwood-border p-5 bg-white rounded-xl shadow-xs gap-4">
                          <div className="flex gap-6">
                            <div className="flex flex-col">
                              <p className="text-[10px] font-bold uppercase text-redwood-text-muted tracking-wider">Update Phase</p>
                              <span className={`flex items-center gap-1 text-xs font-bold ${batch.massUpdateStatus === 'Completed' ? 'text-[#1E6B4A]' : 'text-[#B05B00]'}`}>
                                {batch.massUpdateStatus === 'Completed' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                                {batch.massUpdateStatus}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-[10px] font-bold uppercase text-redwood-text-muted tracking-wider">Payment State</p>
                              <span className={`flex items-center gap-1 text-xs font-bold ${batch.paymentStatus === 'Completed' ? 'text-[#1E6B4A]' : batch.paymentStatus === 'Ready' ? 'text-[#1C5196]' : 'text-redwood-text-muted'}`}>
                                {batch.paymentStatus === 'Completed' ? <CheckCircle2 size={13} /> : batch.paymentStatus === 'Ready' ? <CheckCircle2 size={13} className="text-[#1C5196]" /> : <AlertCircle size={13} />}
                                {batch.paymentStatus}
                              </span>
                            </div>
                            {batch.payments && batch.payments.length > 0 && (
                              <div className="flex flex-col">
                                <p className="text-[10px] font-bold uppercase text-redwood-text-muted tracking-wider">Disbursements</p>
                                <span className="text-xs font-bold text-redwood-text-main">{batch.payments.length} Payments Generated</span>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-3">
                            <Button 
                              variant="outline" 
                              disabled={batch.holdStatus !== 'On Hold'}
                              onClick={() => handleReleaseHold(batch.id)}
                            >
                              Release Hold
                            </Button>
                            <Button 
                              variant="primary" 
                              disabled={batch.massUpdateStatus !== 'Completed' || batch.paymentStatus === 'Completed' || batch.holdStatus !== 'Released'}
                              onClick={() => handleCreatePayment(batch)}
                            >
                              <CreditCard size={15} /> Create Payments
                            </Button>
                          </div>
                        </div>

                        {/* Payments List (If Paid Out) */}
                        {batch.paymentStatus === 'Completed' && batch.payments && (
                          <div className="border border-redwood-border bg-white rounded-xl shadow-xs overflow-hidden">
                            <div className="p-4 px-6 border-b border-redwood-border bg-emerald-50/50">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E6B4A] flex items-center gap-2">
                                <CreditCard size={14} /> Disbursement Payment Advices Created
                              </h3>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="border-b border-redwood-border bg-redwood-sand">
                                    <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Supplier</th>
                                    <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Supplier No.</th>
                                    <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Supplier Site</th>
                                    <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Payment Ref</th>
                                    <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Amount</th>
                                    <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Currency</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-redwood-sand-dark/60">
                                  {batch.payments.map((pmt, idx) => (
                                    <tr key={idx} className="text-sm hover:bg-redwood-sand/20">
                                      <td className="p-4 font-semibold">{pmt.supplierName}</td>
                                      <td className="p-4 text-xs font-mono text-redwood-text-muted">{pmt.supplierNumber}</td>
                                      <td className="p-4">{pmt.supplierSite}</td>
                                      <td className="p-4 font-mono font-semibold text-emerald-700">{pmt.paymentNumber}</td>
                                      <td className="p-4 font-bold">{pmt.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                      <td className="p-4 text-redwood-text-muted font-bold">{pmt.currency}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Associated Invoice List */}
                        <div className="border border-redwood-border bg-white rounded-xl shadow-xs overflow-hidden">
                          <div className="p-4 px-6 border-b border-redwood-border bg-redwood-sand">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-redwood-text-main">Batch Invoice Items</h3>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-redwood-border bg-redwood-sand/30">
                                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Invoice #</th>
                                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Supplier</th>
                                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">PV No.</th>
                                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Term</th>
                                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Method</th>
                                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Recon</th>
                                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Amount</th>
                                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Status</th>
                                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Hold</th>
                                  <th className="p-4 text-[10px] font-bold uppercase tracking-wider text-redwood-text-muted">Payment</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-redwood-sand-dark/60">
                                {batch.invoices.map((inv) => (
                                  <tr key={inv.id} className="text-sm hover:bg-neutral-50">
                                    <td className="p-4 font-bold text-redwood-accent">{inv.invoiceNumber}</td>
                                    <td className="p-4">{inv.supplierName}</td>
                                    <td className="p-4 font-mono text-xs text-redwood-text-muted">{inv.paymentVoucherNumber || '—'}</td>
                                    <td className="p-4 text-xs">{inv.paymentTerm || '—'}</td>
                                    <td className="p-4 text-xs">{inv.paymentMethod || '—'}</td>
                                    <td className="p-4 text-xs font-semibold">{inv.reconciliationFlag}</td>
                                    <td className="p-4 font-bold">{inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {inv.currency}</td>
                                    <td className="p-4">
                                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                        inv.status === 'Validated' ? 'bg-[#EAF5E9] text-[#1E6B4A]' : 'bg-[#FFF2E0] text-[#B05B00]'
                                      }`}>
                                        {inv.status}
                                      </span>
                                    </td>
                                    <td className="p-4">
                                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${inv.holdStatus === 'Released' ? 'bg-[#EAF5E9] text-[#1E6B4A]' : 'bg-[#FFF2E0] text-[#B05B00]'}`}>
                                        {inv.holdStatus || '—'}
                                      </span>
                                    </td>
                                    <td className="p-4">
                                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${inv.paymentStatus === 'Completed' ? 'bg-[#EAF5E9] text-[#1E6B4A]' : inv.paymentStatus === 'Ready' ? 'bg-[#E3EDFA] text-[#1C5196]' : 'bg-[#F2EDEA] text-[#6E645E]'}`}>
                                        {inv.paymentStatus || '—'}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </section>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Mass Update Modal Panel */}
      <Modal 
        isOpen={isMassUpdateOpen} 
        onClose={() => setIsMassUpdateOpen(false)}
        title="Apply Mass Updates"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsMassUpdateOpen(false)}>Cancel Action</Button>
            <Button 
              variant="primary" 
              onClick={() => setIsConfirmMassUpdateOpen(true)}
              disabled={!massUpdateData.batchName || !massUpdateData.reconciliationFlag || !massUpdateData.paymentVoucherNumber}
            >
              Confirm updates
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          <Input 
            label="Payment Batch Name" 
            mandatory
            value={massUpdateData.batchName} 
            onChange={(e: any) => setMassUpdateData({...massUpdateData, batchName: e.target.value})}
          />
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[11px] font-bold uppercase tracking-wider text-redwood-text-muted">
              Payment Submitter
            </label>
            <div className="border border-redwood-border p-2.5 text-sm bg-redwood-sand rounded-md text-redwood-text-muted font-semibold">
              {massUpdateData.paymentSubmitter}
            </div>
          </div>
          <Input 
            label="Invoice/Accounting Date" 
            type="date"
            value={massUpdateData.invoiceDate} 
            onChange={(e: any) => setMassUpdateData({...massUpdateData, invoiceDate: e.target.value})}
          />
          <Select 
            label="Payment Terms" 
            options={PAYMENT_TERMS} 
            value={massUpdateData.paymentTerm}
            onChange={(e: any) => setMassUpdateData({...massUpdateData, paymentTerm: e.target.value})}
          />
          <Select 
            label="Payment Method" 
            options={PAYMENT_METHODS} 
            value={massUpdateData.paymentMethod}
            onChange={(e: any) => setMassUpdateData({...massUpdateData, paymentMethod: e.target.value})}
          />
          <Select 
            label="Reconciliation Action" 
            mandatory
            options={RECONCILIATION_FLAGS} 
            value={massUpdateData.reconciliationFlag}
            onChange={(e: any) => setMassUpdateData({...massUpdateData, reconciliationFlag: e.target.value})}
          />
          <Input 
            label="Payment Voucher (PV) Number" 
            mandatory
            placeholder="Assign unique PV identifier..." 
            value={massUpdateData.paymentVoucherNumber}
            onChange={(e: any) => setMassUpdateData({...massUpdateData, paymentVoucherNumber: e.target.value})}
          />
        </div>
        
        <div className="mt-6 p-5 border border-redwood-border bg-redwood-sand rounded-lg text-left">
          <div className="flex justify-between items-center mb-3 border-b border-redwood-border/50 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-redwood-text-main">Selected Target Summary</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold uppercase text-redwood-text-muted">Target Invoices</span>
              <span className="text-xl font-bold text-redwood-text-main">{selectedInvoices.length}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold uppercase text-redwood-text-muted">Aggregate Volume</span>
              <div className="flex flex-col gap-1">
                {Object.entries(selectedSummary).map(([currency, total]) => (
                  <span key={currency} className="text-sm font-bold text-redwood-accent">
                    {new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(total as number)} {currency}
                  </span>
                ))}
                {Object.keys(selectedSummary).length === 0 && (
                  <span className="text-sm font-bold text-gray-400">0.00</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modals Suite */}
      <Modal
        isOpen={isConfirmReleaseHoldOpen}
        onClose={() => setIsConfirmReleaseHoldOpen(false)}
        title="Validate Hold Release"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsConfirmReleaseHoldOpen(false)}>Back</Button>
            <Button variant="primary" onClick={confirmReleaseHold}>Release Batch hold</Button>
          </>
        }
      >
        <div className="text-center py-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Unlock size={24} className="text-emerald-600" />
          </div>
          <p className="text-base font-bold text-redwood-text-main">Release hold for batch invoices?</p>
          <p className="text-xs text-redwood-text-muted mt-2">All invoices in this batch will be updated to 'Released' and prepared for payment instructions.</p>
        </div>
      </Modal>

      <Modal
        isOpen={isConfirmMassUpdateOpen}
        onClose={() => setIsConfirmMassUpdateOpen(false)}
        title="Assess Bulk Updates"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsConfirmMassUpdateOpen(false)}>Back</Button>
            <Button variant="primary" onClick={handleSaveMassUpdate}>Confirm & Execute</Button>
          </>
        }
      >
        <div className="text-center py-4">
          <div className="w-12 h-12 bg-redwood-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Layers size={24} className="text-redwood-accent" />
          </div>
          <p className="text-base font-bold text-redwood-text-main">Confirm Bulk Transaction</p>
          <p className="text-xs text-redwood-text-muted mt-2">This instruction updates and bundles {selectedInvoices.length} supplier invoices into a newly prepared batch.</p>
        </div>
      </Modal>

      <Modal
        isOpen={isConfirmPaymentOpen}
        onClose={() => setIsConfirmPaymentOpen(false)}
        title="Confirm Payment Authorization"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsConfirmPaymentOpen(false)}>Back</Button>
            <Button variant="primary" onClick={confirmPayment}>Authorize & Create</Button>
          </>
        }
      >
        <div className="text-center py-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <CreditCard size={22} className="text-[#1E6B4A]" />
          </div>
          <p className="text-base font-bold text-redwood-text-main">Create Payment Disbursals?</p>
          <p className="text-xs text-redwood-text-muted mt-2">This triggers authorization routines for {currentBatch?.invoices.length} invoices, issuing formal accounting references.</p>
          
          <div className="mt-5 p-4 border border-redwood-border bg-redwood-sand rounded-lg text-left">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-bold uppercase text-redwood-text-muted">Target Batch name:</span>
              <span className="text-xs font-bold text-redwood-accent">{currentBatch?.batchName}</span>
            </div>
            <div className="flex justify-between border-t border-redwood-border/60 pt-2">
              <span className="text-xs font-bold uppercase text-redwood-text-muted font-mono">Gross Disbursement:</span>
              <span className="text-xs font-bold text-redwood-text-main">
                {currentBatch?.invoices.reduce((acc, inv) => acc + inv.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })} {currentBatch?.invoices[0]?.currency}
              </span>
            </div>
          </div>
        </div>
      </Modal>

      {/* Corporate Redwood Footer */}
      <footer className="border-t border-redwood-border py-6 text-center bg-white">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-redwood-text-muted">
          Oracle Redwood FinTech Infrastructure &copy; 2026 Enterprise Solutions
        </p>
      </footer>
    </div>
  );
}
