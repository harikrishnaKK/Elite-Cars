export type ViewMode = 
  | 'dashboard' 
  | 'offerings' 
  | 'portfolio' 
  | 'distributions' 
  | 'crm' 
  | 'importer';

export type UserRole = 'investor' | 'sponsor';

export type AssetClass = 'Multifamily' | 'Industrial' | 'Healthcare / Medical' | 'Mixed-Use Retail';

export interface Deal {
  id: string;
  title: string;
  location: string;
  assetClass: AssetClass;
  image: string;
  status: 'Funding' | 'Closing Soon' | 'Fully Funded' | 'Operating';
  targetIrr: number; // e.g. 18.2
  equityMultiple: number; // e.g. 2.1
  prefReturn: number; // e.g. 8.0
  targetHoldYears: number; // e.g. 5
  minInvestment: number; // e.g. 50000
  totalRaise: number; // e.g. 14500000
  amountRaised: number; // e.g. 11300000
  projectedCoC: number; // e.g. 8.5
  description: string;
  businessPlan: string;
  unitsOrSqFt: string;
  underwriting: {
    capRateOnCost: number;
    exitCapRate: number;
    debtLtv: number;
    interestRate: number;
    occupancy: number;
  };
  highlights: string[];
}

export interface InvestmentPosition {
  id: string;
  dealId: string;
  dealTitle: string;
  assetClass: AssetClass;
  image: string;
  location: string;
  investedAmount: number;
  investedDate: string;
  currentValue: number;
  totalDistributed: number;
  unrealizedGain: number;
  irrToDate: number;
  ownershipPercent: number;
  entityName: string;
  lastQuarterYield: number;
  status: 'Performing' | 'Ahead of Plan' | 'Stabilizing';
}

export interface DistributionRecord {
  id: string;
  date: string;
  dealTitle: string;
  amount: number;
  prefAmount: number;
  rocAmount: number;
  period: string;
  payoutMethod: 'ACH Direct Deposit' | 'Wire Transfer';
  status: 'Completed' | 'Processing';
  pdfRef: string;
}

export interface TaxDocument {
  id: string;
  year: number;
  dealTitle: string;
  docType: 'Schedule K-1' | 'Form 1099-DIV' | 'Annual Investor Statement';
  status: 'Ready' | 'In Preparation';
  dateUploaded: string;
  fileSize: string;
}

export interface CrmLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  accreditationStatus: 'Verified 506(c)' | 'Self-Certified 506(b)' | 'Pending Verification';
  entityType: 'LLC' | 'Individual' | 'Revocable Trust' | 'Self-Directed IRA';
  targetDeal: string;
  stage: 'Lead' | 'NDA / PPM Sent' | 'Soft Committed' | 'Funds Wired' | 'Closed';
  committedAmount: number;
  lastContact: string;
}
