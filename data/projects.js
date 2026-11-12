/*
  PROJECTS LIST — every card on the Gallery page comes from this list.

  To add a project: copy one block, paste it, change the text. Save. The site updates.

  Fields
    category   'pbi' | 'n8n' | 'erp' | 'training' | 'finance'
    title      card title
    industry   must match one of INDUSTRIES below (used by the filters)
    fn         must match one of FUNCTIONS below (used by the filters)
    desc       one or two sentences
    meta       small grey text, e.g. '5 pages' or '19 nodes'
    images     optional: list of screenshots in the /images folder, e.g. ['images/rig-cost-1.png','images/rig-cost-2.png']
               (if empty, a drawn preview is shown instead)
    download   optional: a file in /downloads (e.g. 'downloads/rig-cost.pbix') or a OneDrive / Google Drive link
    link       optional: page the "View" button opens (e.g. a Power BI "Publish to web" link)
*/

window.SITE = {
  // Tabs whose content is not ready yet. Remove a word from this list to switch that tab on.
  comingSoon: ['training', 'finance'],

  FUNCTIONS: ['FP&A', 'Accounting & Close', 'Procurement', 'Operations', 'Tax & Compliance', 'Treasury', 'HR & Payroll', 'Valuation', 'ERP & Process'],
  INDUSTRIES: ['Oil & Gas', 'Petrochemicals', 'Construction', 'Manufacturing', 'Logistics', 'Entertainment', 'Healthcare', 'All industries'],

  PROJECTS: [
    /* ---------- Power BI ---------- */
    { category: 'pbi', title: 'Rig Cost & Day-Rate Dashboard', industry: 'Oil & Gas', fn: 'FP&A', meta: '5 pages',
      desc: 'Cost per rig per day by component, budget vs actual and variance drivers.',
      images: [], download: '', link: '',
      mock: { short: 'Rig Operations', kpis: [['COST/DAY','48.5k'],['UTIL.','92%'],['RIGS','15'],['VAR.','-4.1%']], bars: [45,60,52,70,64,78,58,72,66,84], donut: 68 } },
    { category: 'pbi', title: 'IKTVA Local Content Tracker', industry: 'Oil & Gas', fn: 'Tax & Compliance', meta: '3 pages',
      desc: 'Spend, workforce and training inputs rolled into a live IKTVA score against target.',
      images: [], download: '', link: '',
      mock: { short: 'IKTVA Score', kpis: [['SCORE','41.8'],['TARGET','45.0'],['LOCAL','63%'],['SAUDI','38%']], bars: [30,36,40,44,48,52,55,58,61,64], donut: 42 } },
    { category: 'pbi', title: 'VAT & ZATCA Reconciliation', industry: 'All industries', fn: 'Tax & Compliance', meta: '4 pages',
      desc: 'Input and output VAT reconciled to the GL, with exceptions flagged before filing.',
      images: [], download: '', link: '',
      mock: { short: 'VAT Return', kpis: [['OUTPUT','2.4m'],['INPUT','1.9m'],['NET','0.5m'],['EXCEP.','7']], bars: [70,52,64,45,58,49,61,40,55,48], donut: 86 } },
    { category: 'pbi', title: 'Workforce Cost & GOSI', industry: 'Construction', fn: 'HR & Payroll', meta: '3 pages',
      desc: 'Headcount, payroll and GOSI cost by project, nationality mix and Saudisation band.',
      images: [], download: '', link: '',
      mock: { short: 'Workforce', kpis: [['HEADCT','1,240'],['PAYROLL','9.8m'],['GOSI','1.1m'],['SAUDI%','31%']], bars: [55,57,54,60,63,61,66,69,67,72], donut: 31 } },

    /* ---------- n8n automations ---------- */
    { category: 'n8n', title: 'Purchase Request to Vendor RFQ', industry: 'All industries', fn: 'Procurement', meta: '19 nodes',
      desc: 'Requests from a form or email are classified by AI, budget-checked and matched to approved vendors, and RFQs go out automatically.',
      nodes: ['Form', 'AI', 'Budget', 'RFQ'], images: [], link: '' },
    { category: 'n8n', title: 'Inventory: RFP to 3-Way Match', industry: 'Oil & Gas', fn: 'Procurement', meta: '23 nodes',
      desc: 'Low stock triggers an RFP, AI picks the vendor, the PO is raised, and goods receipt and invoice are matched before payment.',
      nodes: ['Stock', 'RFP', 'PO', 'Match'], images: [], link: '' },
    { category: 'n8n', title: 'Hiring: Request to Shortlist', industry: 'All industries', fn: 'HR & Payroll', meta: '22 nodes',
      desc: 'Checks the talent pool first, then AI writes and posts the job, screens every CV and books interviews for the shortlist.',
      nodes: ['Request', 'Post', 'Screen', 'Book'], images: [], link: '' },
    { category: 'n8n', title: 'Operations: Order to Production Plan', industry: 'Manufacturing', fn: 'Operations', meta: '19 nodes',
      desc: 'Customer orders are exploded into BOMs and checked for material, labor and capacity, then AI builds the production schedule.',
      nodes: ['Order', 'BOM', 'Capacity', 'Plan'], images: [], link: '' },

    /* ---------- ERP workflow maps (open the ERP Workflows page) ---------- */
    { category: 'erp', erp: 'drilling', title: 'ERP Workflow Map: Oil & Gas Drilling', industry: 'Oil & Gas', fn: 'ERP & Process',
      desc: 'Rig operations, day-rate billing, crew rotations and IKTVA, task by task, with what is in the ERP and what can be automated.' },
    { category: 'erp', erp: 'petrochem', title: 'ERP Workflow Map: Petrochemicals & Refining', industry: 'Petrochemicals', fn: 'ERP & Process',
      desc: 'Shift operations, yield accounting, turnarounds, LIMS and product sales mapped from ERP to manual steps.' },
    { category: 'erp', erp: 'ofs', title: 'ERP Workflow Map: Oilfield Services & EPC', industry: 'Oil & Gas', fn: 'ERP & Process',
      desc: 'EPC projects, field tickets, tool tracking and milestone billing, with owners and automation ideas.' },
    { category: 'erp', erp: 'manufacturing', title: 'ERP Workflow Map: Manufacturing', industry: 'Manufacturing', fn: 'ERP & Process',
      desc: 'Order to delivery, MRP, shop floor, OEE, quality and costing, step by step.' },
    { category: 'erp', erp: 'logistics', title: 'ERP Workflow Map: Logistics & Transportation', industry: 'Logistics', fn: 'ERP & Process',
      desc: 'Bookings, dispatch, fleet, 3PL warehousing, FASAH customs and freight billing.' },
    { category: 'erp', erp: 'entertainment', title: 'ERP Workflow Map: Entertainment', industry: 'Entertainment', fn: 'ERP & Process',
      desc: 'Events, GEA licences, ticketing reconciliation, venues, sponsorship and crowd safety.' },
    { category: 'erp', erp: 'healthcare', title: 'ERP Workflow Map: Healthcare', industry: 'Healthcare', fn: 'ERP & Process',
      desc: 'Patient access, NPHIES claims, coding, pharmacy and credentialing for a private hospital.' },
    { category: 'erp', erp: 'construction', title: 'ERP Workflow Map: Construction', industry: 'Construction', fn: 'ERP & Process',
      desc: 'Tendering, contracts, site operations, procurement and project finance for an EPC contractor.' },

    /* ---------- Training (hidden while 'training' is in comingSoon) ---------- */
    { category: 'training', title: 'Power BI for Finance Teams', industry: 'All industries', fn: 'FP&A', meta: '[DURATION]',
      desc: 'From Excel exports to a working management dashboard, built on your own chart of accounts.' },
    { category: 'training', title: 'DAX for FP&A', industry: 'All industries', fn: 'FP&A', meta: '[DURATION]',
      desc: 'Time intelligence, rolling forecasts and variance measures that finance teams trust.' },

    /* ---------- Finance samples (hidden while 'finance' is in comingSoon) ---------- */
    { category: 'finance', title: 'Annual Budget Model', industry: 'All industries', fn: 'FP&A', meta: '6 sheets',
      desc: 'Driver-based revenue and opex budget with department roll-ups and monthly phasing.' }
  ]
};
