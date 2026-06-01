export interface Invoice {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  supplierNumber: string;
  supplierSite: string;
  amount: number;
  installmentAmount: number;
  currency: string;
  status: 'Pending' | 'Approved' | 'Paid' | 'Rejected' | 'Needs Re-validation' | 'Validated';
  businessUnit: string;
  source: string;
  invoiceDate: string;
  paymentVoucherNumber?: string;
  holdStatus?: 'Not Started' | 'On Hold' | 'Released';
  massUpdateStatus?: 'In Progress' | 'Completed' | 'Error';
  paymentStatus?: 'Not Ready' | 'Ready' | 'In Progress' | 'Completed' | 'Error';
  massUpdates?: string;
  paymentTerm?: string;
  paymentMethod?: string;
  reconciliationFlag?: string;
}

export interface Batch {
  id: string;
  batchName: string;
  paymentSubmitter: string;
  invoiceDate: string;
  paymentTerm: string;
  paymentMethod: string;
  reconciliationFlag: string;
  paymentVoucherNumber?: string;
  massUpdateStatus: 'In Progress' | 'Completed' | 'Error';
  holdStatus: 'Not Started' | 'On Hold' | 'Released';
  paymentStatus: 'Not Ready' | 'Ready' | 'In Progress' | 'Completed' | 'Error';
  payments?: { 
    supplierName: string;
    supplierNumber: string;
    supplierSite: string; 
    paymentNumber: string; 
    amount: number; 
    currency: string 
  }[];
  invoices: Invoice[];
  errorMessage?: string;
}

export const MOCK_INVOICES: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-001', supplierName: 'Acme Corp', supplierNumber: 'SUP-101', supplierSite: 'New York', amount: 1250.00, installmentAmount: 1250.00, currency: 'USD', status: 'Pending', businessUnit: 'BU-North', source: 'Manual', invoiceDate: '2024-03-15', paymentVoucherNumber: 'PV-9001', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '2', invoiceNumber: 'INV-002', supplierName: 'Global Tech', supplierNumber: 'SUP-102', supplierSite: 'London', amount: 3400.50, installmentAmount: 3400.50, currency: 'EUR', status: 'Pending', businessUnit: 'BU-South', source: 'EDI', invoiceDate: '2024-03-16', paymentVoucherNumber: 'PV-9002', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '3', invoiceNumber: 'INV-003', supplierName: 'Acme Corp', supplierNumber: 'SUP-101', supplierSite: 'New York', amount: 800.00, installmentAmount: 400.00, currency: 'USD', status: 'Pending', businessUnit: 'BU-North', source: 'Manual', invoiceDate: '2024-03-17', paymentVoucherNumber: 'PV-9003', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '4', invoiceNumber: 'INV-004', supplierName: 'Starlight Inc', supplierNumber: 'SUP-103', supplierSite: 'Chicago', amount: 560.00, installmentAmount: 560.00, currency: 'GBP', status: 'Pending', businessUnit: 'BU-East', source: 'Portal', invoiceDate: '2024-03-18', paymentVoucherNumber: 'PV-9004', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '5', invoiceNumber: 'INV-005', supplierName: 'Global Tech', supplierNumber: 'SUP-102', supplierSite: 'San Francisco', amount: 12000.00, installmentAmount: 6000.00, currency: 'USD', status: 'Pending', businessUnit: 'BU-North', source: 'EDI', invoiceDate: '2024-03-19', paymentVoucherNumber: 'PV-9005', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '6', invoiceNumber: 'INV-006', supplierName: 'Acme Corp', supplierNumber: 'SUP-101', supplierSite: 'New York', amount: 450.25, installmentAmount: 450.25, currency: 'USD', status: 'Pending', businessUnit: 'BU-South', source: 'Manual', invoiceDate: '2024-03-20', paymentVoucherNumber: 'PV-9006', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '7', invoiceNumber: 'INV-007', supplierName: 'Zenith Solutions', supplierNumber: 'SUP-104', supplierSite: 'Austin', amount: 2300.00, installmentAmount: 2300.00, currency: 'USD', status: 'Pending', businessUnit: 'BU-West', source: 'Email', invoiceDate: '2024-03-21', paymentVoucherNumber: 'PV-9007', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '8', invoiceNumber: 'INV-008', supplierName: 'Starlight Inc', supplierNumber: 'SUP-103', supplierSite: 'Chicago', amount: 150.00, installmentAmount: 75.00, currency: 'GBP', status: 'Pending', businessUnit: 'BU-East', source: 'Portal', invoiceDate: '2024-03-22', paymentVoucherNumber: 'PV-9008', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '9', invoiceNumber: 'INV-009', supplierName: 'Acme Corp', supplierNumber: 'SUP-101', supplierSite: 'San Francisco', amount: 9900.00, installmentAmount: 9900.00, currency: 'USD', status: 'Pending', businessUnit: 'BU-North', source: 'Manual', invoiceDate: '2024-03-23', paymentVoucherNumber: 'PV-9009', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '10', invoiceNumber: 'INV-010', supplierName: 'Global Tech', supplierNumber: 'SUP-102', supplierSite: 'London', amount: 720.00, installmentAmount: 720.00, currency: 'EUR', status: 'Pending', businessUnit: 'BU-South', source: 'EDI', invoiceDate: '2024-03-24', paymentVoucherNumber: 'PV-9010', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '11', invoiceNumber: 'INV-011', supplierName: 'Zenith Solutions', supplierNumber: 'SUP-104', supplierSite: 'Austin', amount: 5400.00, installmentAmount: 2700.00, currency: 'USD', status: 'Pending', businessUnit: 'BU-West', source: 'Email', invoiceDate: '2024-03-25', paymentVoucherNumber: 'PV-9011', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '12', invoiceNumber: 'INV-012', supplierName: 'Acme Corp', supplierNumber: 'SUP-101', supplierSite: 'New York', amount: 320.50, installmentAmount: 320.50, currency: 'USD', status: 'Pending', businessUnit: 'BU-North', source: 'Manual', invoiceDate: '2024-03-26', paymentVoucherNumber: 'PV-9012', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '13', invoiceNumber: 'INV-013', supplierName: 'Starlight Inc', supplierNumber: 'SUP-103', supplierSite: 'Chicago', amount: 4500.00, installmentAmount: 4500.00, currency: 'GBP', status: 'Pending', businessUnit: 'BU-East', source: 'Portal', invoiceDate: '2024-03-27', paymentVoucherNumber: 'PV-9013', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '14', invoiceNumber: 'INV-014', supplierName: 'Global Tech', supplierNumber: 'SUP-102', supplierSite: 'San Francisco', amount: 1100.00, installmentAmount: 550.00, currency: 'USD', status: 'Pending', businessUnit: 'BU-North', source: 'EDI', invoiceDate: '2024-03-28', paymentVoucherNumber: 'PV-9014', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '15', invoiceNumber: 'INV-015', supplierName: 'Zenith Solutions', supplierNumber: 'SUP-104', supplierSite: 'Austin', amount: 890.00, installmentAmount: 890.00, currency: 'USD', status: 'Pending', businessUnit: 'BU-West', source: 'Email', invoiceDate: '2024-03-29', paymentVoucherNumber: 'PV-9015', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '16', invoiceNumber: 'INV-016', supplierName: 'Acme Corp', supplierNumber: 'SUP-101', supplierSite: 'New York', amount: 6700.00, installmentAmount: 6700.00, currency: 'USD', status: 'Pending', businessUnit: 'BU-South', source: 'Manual', invoiceDate: '2024-03-30', paymentVoucherNumber: 'PV-9016', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '17', invoiceNumber: 'INV-017', supplierName: 'Starlight Inc', supplierNumber: 'SUP-103', supplierSite: 'Chicago', amount: 120.00, installmentAmount: 60.00, currency: 'GBP', status: 'Pending', businessUnit: 'BU-East', source: 'Portal', invoiceDate: '2024-03-31', paymentVoucherNumber: 'PV-9017', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '18', invoiceNumber: 'INV-018', supplierName: 'Global Tech', supplierNumber: 'SUP-102', supplierSite: 'London', amount: 340.00, installmentAmount: 340.00, currency: 'EUR', status: 'Pending', businessUnit: 'BU-South', source: 'EDI', invoiceDate: '2024-04-01', paymentVoucherNumber: 'PV-9018', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '19', invoiceNumber: 'INV-019', supplierName: 'Zenith Solutions', supplierNumber: 'SUP-104', supplierSite: 'Austin', amount: 15000.00, installmentAmount: 7500.00, currency: 'USD', status: 'Pending', businessUnit: 'BU-North', source: 'Email', invoiceDate: '2024-04-02', paymentVoucherNumber: 'PV-9019', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
  { id: '20', invoiceNumber: 'INV-020', supplierName: 'Acme Corp', supplierNumber: 'SUP-101', supplierSite: 'San Francisco', amount: 2100.00, installmentAmount: 2100.00, currency: 'USD', status: 'Pending', businessUnit: 'BU-North', source: 'Manual', invoiceDate: '2024-04-03', paymentVoucherNumber: 'PV-9020', holdStatus: 'Not Started', massUpdateStatus: 'Completed', paymentStatus: 'Not Ready', massUpdates: 'None' },
];

export const BUSINESS_UNITS = ['BU-North', 'BU-South', 'BU-East', 'BU-West'];
export const SOURCES = ['Manual', 'EDI', 'Portal', 'Email'];
export const PAYMENT_TERMS = ['Net 30', 'Net 60', 'Due on Receipt', '2% 10 Net 30'];
export const PAYMENT_METHODS = ['ACH', 'Wire', 'Check', 'Credit Card'];
export const RECONCILIATION_FLAGS = ['Yes', 'No', 'Pending Review'];
