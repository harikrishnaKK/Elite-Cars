import { Deal, InvestmentPosition, DistributionRecord, TaxDocument, CrmLead } from '../types';

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'oakwood-residences',
    title: 'The Oakwood Residences',
    location: 'Austin, TX',
    assetClass: 'Multifamily',
    image: '/src/assets/images/deal_multifamily_lux_1794457823484.jpg',
    status: 'Funding',
    targetIrr: 18.2,
    equityMultiple: 2.1,
    prefReturn: 8.0,
    targetHoldYears: 5,
    minInvestment: 50000,
    totalRaise: 14500000,
    amountRaised: 11310000,
    projectedCoC: 8.5,
    description: 'Acquisition and value-add repositioning of a 280-unit institutional Class A garden-style multifamily community located in the high-growth North Austin tech corridor.',
    businessPlan: 'Executing $4.2M interior and amenity modernization program, implementing tech-enabled smart home packages, and bringing in-place rents to prevailing submarket comps.',
    unitsOrSqFt: '280 Units (96.2% Occupancy)',
    underwriting: {
      capRateOnCost: 6.8,
      exitCapRate: 5.75,
      debtLtv: 58.0,
      interestRate: 5.25,
      occupancy: 96.2,
    },
    highlights: [
      'Submarket 5-year annualized rent growth of 7.4%',
      'Fixed-rate agency financing secured at 5.25% for 7 years',
      '8.0% cumulative preferred return distributed quarterly',
      'Direct sponsor co-investment of $1,500,000 (10.3%)'
    ]
  },
  {
    id: 'apex-pacific-logistics',
    title: 'Apex Pacific Logistics Center',
    location: 'Ontario / Inland Empire, CA',
    assetClass: 'Industrial',
    image: '/src/assets/images/deal_industrial_logistics_1794457824784.jpg',
    status: 'Closing Soon',
    targetIrr: 16.4,
    equityMultiple: 1.85,
    prefReturn: 7.5,
    targetHoldYears: 4,
    minInvestment: 50000,
    totalRaise: 22000000,
    amountRaised: 20240000,
    projectedCoC: 7.9,
    description: 'Premier 420,000 sq ft modern cross-dock logistics facility with 36ft clear heights, 72 dock doors, and direct arterial freeway access to the Ports of LA and Long Beach.',
    businessPlan: '100% triple-net (NNN) master leased to an investment-grade Fortune 500 e-commerce supply chain tenant with 3.5% contractual annual rent escalations.',
    unitsOrSqFt: '420,000 SF Cross-Dock',
    underwriting: {
      capRateOnCost: 7.1,
      exitCapRate: 5.5,
      debtLtv: 55.0,
      interestRate: 5.4,
      occupancy: 100.0,
    },
    highlights: [
      '10-year firm initial lease term with corporate parent guarantee',
      'Inland Empire industrial vacancy remains under 3.8%',
      'Quarterly cash distributions starting 45 days post-closing',
      'Full depreciation tax shelter benefits (cost segregation completed)'
    ]
  },
  {
    id: 'summit-medical-pavilion',
    title: 'Summit Healthcare Pavilion',
    location: 'Denver / Cherry Creek, CO',
    assetClass: 'Healthcare / Medical',
    image: '/src/assets/images/deal_medical_office_1794457824463.jpg',
    status: 'Funding',
    targetIrr: 15.8,
    equityMultiple: 1.75,
    prefReturn: 8.5,
    targetHoldYears: 5,
    minInvestment: 25000,
    totalRaise: 12800000,
    amountRaised: 8192000,
    projectedCoC: 8.8,
    description: 'Class A 115,000 sq ft specialized medical office building anchored by a regional health system, outpatient surgical suites, and specialized diagnostic imaging centers.',
    businessPlan: 'Recapitalize stabilized medical park, renew maturing anchor tenant leases at 14% rent spreads, and build out 8,500 sq ft pediatric dental wing.',
    unitsOrSqFt: '115,000 SF Medical Pavilion',
    underwriting: {
      capRateOnCost: 7.4,
      exitCapRate: 6.1,
      debtLtv: 52.0,
      interestRate: 5.6,
      occupancy: 94.5,
    },
    highlights: [
      'Recession-resilient medical tenancy with average 8.2-year remaining WALT',
      'High tenant capital investment ($185/sq ft tenant TI buildouts)',
      'High cash-on-cash yield profile with 8.5% preferred distribution',
      'Low sponsor leverage strategy (52% LTV conservatism)'
    ]
  },
  {
    id: 'metropolitan-quarter',
    title: 'Metropolitan Quarter',
    location: 'Nashville, TN',
    assetClass: 'Mixed-Use Retail',
    image: '/src/assets/images/deal_mixed_use_development_1794457824666.jpg',
    status: 'Funding',
    targetIrr: 19.1,
    equityMultiple: 2.25,
    prefReturn: 8.0,
    targetHoldYears: 6,
    minInvestment: 100000,
    totalRaise: 18500000,
    amountRaised: 7585000,
    projectedCoC: 9.0,
    description: 'Master-planned urban infill destination featuring 42,000 sq ft curated street-level chef dining and boutique retail topped by 190 luxury residential units.',
    businessPlan: 'Complete streetscape revitalization, lease final retail spaces to Michelin-recognized culinary concepts, and monetize premium penthouse suites.',
    unitsOrSqFt: '190 Units + 42,000 SF Retail',
    underwriting: {
      capRateOnCost: 7.6,
      exitCapRate: 5.8,
      debtLtv: 60.0,
      interestRate: 5.5,
      occupancy: 92.8,
    },
    highlights: [
      'Prime pedestrian walking score (94/100) in Nashville core',
      'Dual-stream income from luxury apartments & triple-net commercial leases',
      'Opportunity Zone adjacent with substantial capital gains deferral options',
      'Targeted 2.25x equity multiple over 6-year holding period'
    ]
  }
];

export const INITIAL_POSITIONS: InvestmentPosition[] = [
  {
    id: 'pos-1',
    dealId: 'oakwood-residences',
    dealTitle: 'The Oakwood Residences',
    assetClass: 'Multifamily',
    image: '/src/assets/images/deal_multifamily_lux_1794457823484.jpg',
    location: 'Austin, TX',
    investedAmount: 150000,
    investedDate: 'Mar 15, 2024',
    currentValue: 182400,
    totalDistributed: 24000,
    unrealizedGain: 32400,
    irrToDate: 17.6,
    ownershipPercent: 1.03,
    entityName: 'Apex Capital Holdings LLC',
    lastQuarterYield: 8.2,
    status: 'Ahead of Plan'
  },
  {
    id: 'pos-2',
    dealId: 'apex-pacific-logistics',
    dealTitle: 'Apex Pacific Logistics Center',
    assetClass: 'Industrial',
    image: '/src/assets/images/deal_industrial_logistics_1794457824784.jpg',
    location: 'Inland Empire, CA',
    investedAmount: 200000,
    investedDate: 'Aug 10, 2024',
    currentValue: 228000,
    totalDistributed: 30000,
    unrealizedGain: 28000,
    irrToDate: 16.2,
    ownershipPercent: 0.91,
    entityName: 'Harikrishna Family Revocable Trust',
    lastQuarterYield: 7.8,
    status: 'Performing'
  },
  {
    id: 'pos-3',
    dealId: 'summit-medical-pavilion',
    dealTitle: 'Summit Healthcare Pavilion',
    assetClass: 'Healthcare / Medical',
    image: '/src/assets/images/deal_medical_office_1794457824463.jpg',
    location: 'Denver, CO',
    investedAmount: 100000,
    investedDate: 'Jan 20, 2025',
    currentValue: 106500,
    totalDistributed: 8500,
    unrealizedGain: 6500,
    irrToDate: 15.4,
    ownershipPercent: 0.78,
    entityName: 'Harikrishna Self-Directed IRA',
    lastQuarterYield: 8.5,
    status: 'Performing'
  }
];

export const INITIAL_DISTRIBUTIONS: DistributionRecord[] = [
  {
    id: 'dist-01',
    date: 'Oct 15, 2025',
    dealTitle: 'The Oakwood Residences',
    amount: 3000,
    prefAmount: 3000,
    rocAmount: 0,
    period: 'Q3 2025 Operating Cash Flow',
    payoutMethod: 'ACH Direct Deposit',
    status: 'Completed',
    pdfRef: 'DIST-2025-Q3-01'
  },
  {
    id: 'dist-02',
    date: 'Jul 15, 2025',
    dealTitle: 'Apex Pacific Logistics Center',
    amount: 3750,
    prefAmount: 3750,
    rocAmount: 0,
    period: 'Q2 2025 NNN Rent Distribution',
    payoutMethod: 'ACH Direct Deposit',
    status: 'Completed',
    pdfRef: 'DIST-2025-Q2-02'
  },
  {
    id: 'dist-03',
    date: 'Jul 15, 2025',
    dealTitle: 'The Oakwood Residences',
    amount: 3000,
    prefAmount: 3000,
    rocAmount: 0,
    period: 'Q2 2025 Operating Cash Flow',
    payoutMethod: 'ACH Direct Deposit',
    status: 'Completed',
    pdfRef: 'DIST-2025-Q2-01'
  },
  {
    id: 'dist-04',
    date: 'Apr 15, 2025',
    dealTitle: 'Summit Healthcare Pavilion',
    amount: 2125,
    prefAmount: 2125,
    rocAmount: 0,
    period: 'Q1 2025 Preferred Dividend',
    payoutMethod: 'ACH Direct Deposit',
    status: 'Completed',
    pdfRef: 'DIST-2025-Q1-03'
  },
  {
    id: 'dist-05',
    date: 'Jan 15, 2025',
    dealTitle: 'The Oakwood Residences',
    amount: 3000,
    prefAmount: 3000,
    rocAmount: 0,
    period: 'Q4 2024 Operating Cash Flow',
    payoutMethod: 'ACH Direct Deposit',
    status: 'Completed',
    pdfRef: 'DIST-2024-Q4-01'
  }
];

export const INITIAL_TAX_DOCUMENTS: TaxDocument[] = [
  {
    id: 'tax-1',
    year: 2025,
    dealTitle: 'The Oakwood Residences, LLC',
    docType: 'Schedule K-1',
    status: 'Ready',
    dateUploaded: 'Feb 28, 2026',
    fileSize: '1.4 MB'
  },
  {
    id: 'tax-2',
    year: 2025,
    dealTitle: 'Apex Pacific Logistics GP, LP',
    docType: 'Schedule K-1',
    status: 'Ready',
    dateUploaded: 'Mar 04, 2026',
    fileSize: '1.8 MB'
  },
  {
    id: 'tax-3',
    year: 2025,
    dealTitle: 'Summit Medical Real Estate Trust',
    docType: 'Schedule K-1',
    status: 'Ready',
    dateUploaded: 'Mar 12, 2026',
    fileSize: '1.1 MB'
  },
  {
    id: 'tax-4',
    year: 2024,
    dealTitle: 'The Oakwood Residences, LLC',
    docType: 'Schedule K-1',
    status: 'Ready',
    dateUploaded: 'Mar 01, 2025',
    fileSize: '1.3 MB'
  }
];

export const INITIAL_CRM_LEADS: CrmLead[] = [
  {
    id: 'lead-1',
    name: 'Marcus Vance',
    email: 'marcus.vance@vanceholdings.com',
    phone: '+1 (415) 882-9011',
    accreditationStatus: 'Verified 506(c)',
    entityType: 'LLC',
    targetDeal: 'The Oakwood Residences',
    stage: 'Funds Wired',
    committedAmount: 250000,
    lastContact: 'Yesterday'
  },
  {
    id: 'lead-2',
    name: 'Elena Rostova',
    email: 'elena@rostovacapital.org',
    phone: '+1 (212) 554-1903',
    accreditationStatus: 'Verified 506(c)',
    entityType: 'Revocable Trust',
    targetDeal: 'Apex Pacific Logistics Center',
    stage: 'Soft Committed',
    committedAmount: 150000,
    lastContact: '3 days ago'
  },
  {
    id: 'lead-3',
    name: 'Dr. Arthur Sterling',
    email: 'sterling.md@cherrycreekhealth.com',
    phone: '+1 (303) 991-4412',
    accreditationStatus: 'Verified 506(c)',
    entityType: 'Self-Directed IRA',
    targetDeal: 'Summit Healthcare Pavilion',
    stage: 'Closed',
    committedAmount: 100000,
    lastContact: '1 week ago'
  },
  {
    id: 'lead-4',
    name: 'Samantha Wei',
    email: 'samantha.wei@horizonventures.co',
    phone: '+1 (512) 330-8910',
    accreditationStatus: 'Self-Certified 506(b)',
    entityType: 'Individual',
    targetDeal: 'Metropolitan Quarter',
    stage: 'NDA / PPM Sent',
    committedAmount: 100000,
    lastContact: '4 hours ago'
  },
  {
    id: 'lead-5',
    name: 'David Richardson',
    email: 'david.r@richardsonfamilyoffices.com',
    phone: '+1 (615) 774-2900',
    accreditationStatus: 'Pending Verification',
    entityType: 'LLC',
    targetDeal: 'Metropolitan Quarter',
    stage: 'Lead',
    committedAmount: 500000,
    lastContact: 'Today'
  }
];
