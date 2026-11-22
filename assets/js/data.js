/* ==========================================================================
   JobNest Demo — Sample Data
   All companies, people and numbers below are FICTIONAL demo data.
   Nothing here comes from the real JobNest database.
   ========================================================================== */

window.JOBNEST_DATA = (function () {
  // Master category list (same as the original homepage)
  const categories = [
    'Software Engineering', 'Information Technology', 'Marketing', 'Web Development',
    'Accounting', 'Human Resources', 'Graphic Design', 'Healthcare',
    'Engineering', 'Telecommunications', 'Retail', 'Tourism & Hospitality',
    'Education', 'Finance', 'Sales', 'Customer Service',
    'Data Science', 'Administration', 'Legal', 'Media & Communications',
    'Manufacturing', 'Transportation', 'Real Estate', 'Construction',
    'Banking', 'Insurance'
  ].sort();

  const jobTypes = ['Full Time', 'Part Time', 'Contract', 'Internship', 'Remote'];

  // closesIn / postedAgo are in days relative to "today", so the demo never looks expired.
  const jobs = [
    {
      id: 1, title: 'Senior PHP Developer', company: 'Lanka TechWorks (Pvt) Ltd',
      category: 'Software Engineering', type: 'Full Time', location: 'Colombo',
      salary: '250,000 - 350,000', experience: '4+ years', vacancies: 2, postedAgo: 2, closesIn: 21,
      description: 'Lanka TechWorks is looking for a Senior PHP Developer to lead development of our SaaS recruitment and HR products. You will design clean, secure back-end services and mentor a small team of developers.',
      responsibilities: ['Build and maintain PHP 8 / MySQL web applications', 'Design REST APIs consumed by web and mobile clients', 'Review code and mentor junior developers', 'Improve performance, security and test coverage'],
      requirements: ['BSc in Computer Science, IT or equivalent', '4+ years of professional PHP experience', 'Strong MySQL and query optimisation skills', 'Experience with Laravel or a similar MVC framework', 'Good knowledge of Git and code review workflows'],
      skills: ['PHP', 'MySQL', 'Laravel', 'REST API', 'Git']
    },
    {
      id: 2, title: 'Front-End Web Developer', company: 'BlueOcean Digital',
      category: 'Web Development', type: 'Full Time', location: 'Colombo',
      salary: '150,000 - 220,000', experience: '2+ years', vacancies: 3, postedAgo: 1, closesIn: 18,
      description: 'Join our product studio to craft fast, accessible and responsive interfaces for clients across Sri Lanka and the region.',
      responsibilities: ['Convert designs into responsive HTML, CSS and JavaScript', 'Build reusable UI components', 'Work with designers and back-end developers', 'Ensure cross-browser and mobile compatibility'],
      requirements: ['2+ years of front-end development experience', 'Strong HTML5, CSS3 and modern JavaScript', 'Experience with React or Vue', 'A portfolio of live projects'],
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Figma']
    },
    {
      id: 3, title: 'Digital Marketing Executive', company: 'Serendib Hotels Group',
      category: 'Marketing', type: 'Full Time', location: 'Galle',
      salary: '90,000 - 130,000', experience: '1-3 years', vacancies: 1, postedAgo: 4, closesIn: 14,
      description: 'Promote our boutique hotels through social media, search and email campaigns that drive direct bookings.',
      responsibilities: ['Plan and run social media and paid ad campaigns', 'Manage SEO and website content', 'Track campaign KPIs and prepare monthly reports', 'Coordinate photo and video shoots'],
      requirements: ['Degree or diploma in Marketing', '1-3 years in digital marketing', 'Hands-on experience with Meta and Google Ads', 'Excellent written English'],
      skills: ['SEO', 'Social Media', 'Google Ads', 'Copywriting']
    },
    {
      id: 4, title: 'Accountant', company: 'Ceylon FinServe PLC',
      category: 'Accounting', type: 'Full Time', location: 'Kandy',
      salary: '120,000 - 160,000', experience: '3+ years', vacancies: 1, postedAgo: 6, closesIn: 10,
      description: 'Manage the full accounting cycle for our Kandy regional office, including monthly closing, reconciliations and statutory reporting.',
      responsibilities: ['Prepare monthly management accounts', 'Handle bank and ledger reconciliations', 'Support internal and external audits', 'Ensure tax and statutory compliance'],
      requirements: ['Part / fully qualified CA, CIMA or ACCA', '3+ years of accounting experience', 'Good knowledge of accounting software', 'Strong attention to detail'],
      skills: ['Financial Reporting', 'Reconciliation', 'Excel', 'Taxation']
    },
    {
      id: 5, title: 'HR Executive', company: 'Island Logistics Ltd',
      category: 'Human Resources', type: 'Full Time', location: 'Negombo',
      salary: '85,000 - 120,000', experience: '2+ years', vacancies: 1, postedAgo: 3, closesIn: 20,
      description: 'Support recruitment, onboarding and employee relations for a fast-growing logistics company.',
      responsibilities: ['Coordinate end-to-end recruitment', 'Run onboarding and induction programmes', 'Maintain HR records and payroll inputs', 'Support employee engagement activities'],
      requirements: ['Degree or professional qualification in HRM', '2+ years in an HR role', 'Knowledge of Sri Lankan labour law', 'Strong communication skills'],
      skills: ['Recruitment', 'Onboarding', 'Payroll', 'Labour Law']
    },
    {
      id: 6, title: 'UI/UX Graphic Designer', company: 'Pixel Studio Colombo',
      category: 'Graphic Design', type: 'Contract', location: 'Remote',
      salary: '100,000 - 150,000', experience: '2+ years', vacancies: 2, postedAgo: 5, closesIn: 12,
      description: 'Design brand identities, marketing creatives and product interfaces for our agency clients. This is a 6-month contract with possible extension.',
      responsibilities: ['Create wireframes, prototypes and UI designs', 'Design social media and print creatives', 'Maintain brand guidelines', 'Present concepts to clients'],
      requirements: ['Strong portfolio of UI and graphic work', 'Expert in Figma and Adobe Creative Suite', '2+ years of agency or in-house experience'],
      skills: ['Figma', 'Photoshop', 'Illustrator', 'Branding']
    },
    {
      id: 7, title: 'Staff Nurse', company: 'NovaCare Hospitals',
      category: 'Healthcare', type: 'Full Time', location: 'Kurunegala',
      salary: '95,000 - 125,000', experience: '1+ years', vacancies: 6, postedAgo: 2, closesIn: 25,
      description: 'Provide compassionate, high-quality patient care in our newly opened medical and surgical wards.',
      responsibilities: ['Deliver patient care according to clinical protocols', 'Administer medication and monitor patients', 'Maintain accurate patient records', 'Work closely with doctors and allied staff'],
      requirements: ['Diploma or BSc in Nursing', 'Valid SLNC registration', 'Willingness to work rotating shifts'],
      skills: ['Patient Care', 'Clinical Procedures', 'Teamwork']
    },
    {
      id: 8, title: 'Network Engineer', company: 'SkyLink Telecom Solutions',
      category: 'Telecommunications', type: 'Full Time', location: 'Colombo',
      salary: '180,000 - 260,000', experience: '3+ years', vacancies: 2, postedAgo: 7, closesIn: 9,
      description: 'Design, deploy and maintain enterprise network infrastructure for corporate clients.',
      responsibilities: ['Configure routers, switches and firewalls', 'Monitor network health and resolve incidents', 'Plan capacity and upgrades', 'Document network designs'],
      requirements: ['BSc in Engineering or IT', 'CCNA required, CCNP preferred', '3+ years in network engineering'],
      skills: ['Cisco', 'Routing & Switching', 'Firewalls', 'Linux']
    },
    {
      id: 9, title: 'Data Analyst', company: 'Insightly Analytics',
      category: 'Data Science', type: 'Remote', location: 'Remote',
      salary: '160,000 - 230,000', experience: '2+ years', vacancies: 1, postedAgo: 1, closesIn: 28,
      description: 'Turn raw business data into dashboards and insights that help our retail and finance clients make better decisions.',
      responsibilities: ['Clean, model and analyse large datasets', 'Build dashboards in Power BI', 'Present findings to stakeholders', 'Automate recurring reports'],
      requirements: ['Degree in Statistics, Mathematics, CS or similar', 'Strong SQL and Excel', 'Experience with Python or R', 'Power BI or Tableau experience'],
      skills: ['SQL', 'Python', 'Power BI', 'Statistics']
    },
    {
      id: 10, title: 'Customer Service Associate', company: 'Island Logistics Ltd',
      category: 'Customer Service', type: 'Part Time', location: 'Colombo',
      salary: '45,000 - 60,000', experience: 'No experience', vacancies: 5, postedAgo: 3, closesIn: 16,
      description: 'Be the friendly voice of our delivery service, helping customers with orders, tracking and queries.',
      responsibilities: ['Handle customer calls, chats and emails', 'Track shipments and resolve delivery issues', 'Log cases accurately in the CRM'],
      requirements: ['G.C.E. A/L qualified', 'Good spoken English and Sinhala / Tamil', 'Basic computer literacy'],
      skills: ['Communication', 'CRM', 'Problem Solving']
    },
    {
      id: 11, title: 'Software Engineering Intern', company: 'Lanka TechWorks (Pvt) Ltd',
      category: 'Software Engineering', type: 'Internship', location: 'Colombo',
      salary: '40,000 - 50,000', experience: 'Undergraduate', vacancies: 4, postedAgo: 2, closesIn: 30,
      description: 'A 6-month paid internship for undergraduates who want hands-on experience building real web products.',
      responsibilities: ['Work on real features with a mentor', 'Write and test code', 'Join daily stand-ups and sprint reviews'],
      requirements: ['Undergraduate in CS, SE or IT', 'Basic knowledge of any programming language', 'Eagerness to learn'],
      skills: ['Java', 'PHP', 'JavaScript', 'SQL']
    },
    {
      id: 12, title: 'Sales Executive', company: 'GreenLeaf Agro Exports',
      category: 'Sales', type: 'Full Time', location: 'Kandy',
      salary: '70,000 + commission', experience: '1+ years', vacancies: 3, postedAgo: 8, closesIn: 11,
      description: 'Grow our distributor network for tea and spice products across the Central Province.',
      responsibilities: ['Visit and develop distributor accounts', 'Achieve monthly sales targets', 'Report market feedback'],
      requirements: ['G.C.E. A/L with 1+ years in sales', 'Valid driving licence', 'Target-driven and self-motivated'],
      skills: ['B2B Sales', 'Negotiation', 'Customer Relations']
    },
    {
      id: 13, title: 'Civil Engineer', company: 'Apex Engineering Lanka',
      category: 'Construction', type: 'Contract', location: 'Jaffna',
      salary: '200,000 - 280,000', experience: '5+ years', vacancies: 1, postedAgo: 4, closesIn: 19,
      description: 'Lead site engineering for a mixed-use commercial building project in Jaffna.',
      responsibilities: ['Supervise site works and subcontractors', 'Ensure quality, safety and schedule', 'Review drawings and BOQs', 'Report progress to the project manager'],
      requirements: ['BSc in Civil Engineering', 'Chartered or working towards IESL membership', '5+ years of site experience'],
      skills: ['AutoCAD', 'Site Supervision', 'BOQ', 'Health & Safety']
    },
    {
      id: 14, title: 'English Teacher', company: 'Kandy Learning Academy',
      category: 'Education', type: 'Part Time', location: 'Kandy',
      salary: '60,000 - 80,000', experience: '2+ years', vacancies: 2, postedAgo: 6, closesIn: 15,
      description: 'Teach English language and literature to secondary students following the local and Edexcel syllabi.',
      responsibilities: ['Plan and deliver engaging lessons', 'Assess students and give feedback', 'Take part in school events'],
      requirements: ['Degree in English or TESOL qualification', '2+ years of teaching experience'],
      skills: ['Teaching', 'Lesson Planning', 'Communication']
    },
    {
      id: 15, title: 'Relationship Manager', company: 'Ceylon FinServe PLC',
      category: 'Banking', type: 'Full Time', location: 'Colombo',
      salary: '180,000 - 240,000', experience: '4+ years', vacancies: 1, postedAgo: 5, closesIn: 13,
      description: 'Manage and grow a portfolio of SME banking customers in the Western Province.',
      responsibilities: ['Acquire and retain SME customers', 'Assess credit proposals', 'Cross-sell banking products'],
      requirements: ['Degree in Business or Finance', 'IBSL qualification preferred', '4+ years in SME banking'],
      skills: ['Credit Analysis', 'Sales', 'Customer Relations']
    },
    {
      id: 16, title: 'Front Office Executive', company: 'Serendib Hotels Group',
      category: 'Tourism & Hospitality', type: 'Full Time', location: 'Negombo',
      salary: '65,000 - 85,000 + service charge', experience: '1+ years', vacancies: 2, postedAgo: 9, closesIn: 8,
      description: 'Welcome international guests and deliver memorable stays at our beachfront property.',
      responsibilities: ['Handle check-in, check-out and reservations', 'Resolve guest requests', 'Coordinate with housekeeping and F&B'],
      requirements: ['Diploma in Hospitality Management', 'Excellent spoken English', 'Hotel PMS experience is an advantage'],
      skills: ['Guest Relations', 'Reservations', 'Communication']
    }
  ];

  // Sample applications shown on the company dashboard (fictional people)
  const applications = [
    { name: 'Nimal Perera', job: 'Senior PHP Developer', score: 88, skills: 92, status: 'Shortlisted' },
    { name: 'Ayesha Fernando', job: 'Front-End Web Developer', score: 81, skills: 85, status: 'Pending' },
    { name: 'Kasun Jayawardena', job: 'Senior PHP Developer', score: 74, skills: 70, status: 'Pending' },
    { name: 'Tharushi Silva', job: 'Software Engineering Intern', score: 69, skills: 72, status: 'Selected' },
    { name: 'Ravindu Bandara', job: 'Front-End Web Developer', score: 58, skills: 55, status: 'Rejected' },
    { name: 'Fathima Rizvi', job: 'Software Engineering Intern', score: 77, skills: 80, status: 'Pending' }
  ];

  // Admin dashboard sample tables (fictional)
  const users = [
    { name: 'Nimal Perera', email: 'nimal.p@example.com', location: 'Colombo', joined: 3, apps: 4, status: 'Active' },
    { name: 'Ayesha Fernando', email: 'ayesha.f@example.com', location: 'Kandy', joined: 5, apps: 2, status: 'Active' },
    { name: 'Kasun Jayawardena', email: 'kasun.j@example.com', location: 'Galle', joined: 9, apps: 6, status: 'Active' },
    { name: 'Tharushi Silva', email: 'tharushi.s@example.com', location: 'Negombo', joined: 12, apps: 1, status: 'Active' },
    { name: 'Ravindu Bandara', email: 'ravindu.b@example.com', location: 'Kurunegala', joined: 20, apps: 3, status: 'Suspended' },
    { name: 'Fathima Rizvi', email: 'fathima.r@example.com', location: 'Jaffna', joined: 26, apps: 5, status: 'Active' }
  ];

  const companies = [
    { name: 'Lanka TechWorks (Pvt) Ltd', industry: 'Software', email: 'hr@lankatechworks.example', jobs: 2, plan: 'Gold', status: 'Approved' },
    { name: 'BlueOcean Digital', industry: 'Web & Design', email: 'careers@blueocean.example', jobs: 1, plan: 'Premium', status: 'Approved' },
    { name: 'Serendib Hotels Group', industry: 'Hospitality', email: 'jobs@serendibhotels.example', jobs: 2, plan: 'Gold', status: 'Approved' },
    { name: 'Ceylon FinServe PLC', industry: 'Finance', email: 'talent@ceylonfinserve.example', jobs: 2, plan: 'Platinum', status: 'Approved' },
    { name: 'NovaCare Hospitals', industry: 'Healthcare', email: 'hr@novacare.example', jobs: 1, plan: 'Premium', status: 'Approved' },
    { name: 'TechNova Ltd', industry: 'IT Services', email: 'hello@technova.example', jobs: 0, plan: '—', status: 'Pending' }
  ];

  const payments = [
    { ref: 'PAY-10482', company: 'TechNova Ltd', plan: 'Premium', amount: 5000, method: 'Bank Slip', daysAgo: 0, status: 'Pending' },
    { ref: 'PAY-10477', company: 'Insightly Analytics', plan: 'Gold', amount: 15000, method: 'PayHere', daysAgo: 1, status: 'Verified' },
    { ref: 'PAY-10469', company: 'Apex Engineering Lanka', plan: 'Premium', amount: 5000, method: 'Bank Slip', daysAgo: 2, status: 'Pending' },
    { ref: 'PAY-10455', company: 'Ceylon FinServe PLC', plan: 'Platinum', amount: 35000, method: 'PayHere', daysAgo: 4, status: 'Verified' },
    { ref: 'PAY-10431', company: 'Serendib Hotels Group', plan: 'Gold', amount: 15000, method: 'PayHere', daysAgo: 8, status: 'Verified' },
    { ref: 'PAY-10419', company: 'Quickfix Repairs', plan: 'Premium', amount: 5000, method: 'Bank Slip', daysAgo: 11, status: 'Rejected' }
  ];

  const stats = { activeJobs: 1250, companies: 340, candidates: 8600, applications: 21400 };

  return { categories, jobTypes, jobs, applications, users, companies, payments, stats };
})();
