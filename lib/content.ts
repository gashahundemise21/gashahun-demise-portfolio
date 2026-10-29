// Portfolio content. Every statement here traces to a source listed in AUDIT.md:
// the owner's resume, the Enset manuscript draft, project documentation, or public repositories.
// Presentation lives in app/ and components/; edit this file to update the site.

export type Link = { label: string; href: string };

export const profile = {
  name: 'Gashahun Demise',
  headline: 'Machine Learning Engineer · Computer Vision Researcher',
  location: 'Addis Ababa, Ethiopia',
  email: 'gashahundemise21@gmail.com',
  github: 'https://github.com/gashahundemise21',
  linkedin: 'https://www.linkedin.com/in/gashahun-demise/',
  // Set to a path under public/ (for example '/resume/gashahun-demise-resume.pdf') once an
  // approved, current resume is placed there. While null, the site offers the resume on request.
  resume: null as string | null,
};

export const about = {
  lead: 'Good models start with good data and honest tests.',
  paragraphs: [
    'At the Ethiopian Artificial Intelligence Institute I build vision systems for plant disease and crop and animal growth. I set the labelling rules, check the data and keep every experiment reproducible.',
    'I also build the apps around models: React, Django and FastAPI, shipped to real users.',
  ],
  focus: [
    ['Computer vision', 'Classification, transfer learning, models small enough for phones.'],
    ['Honest evaluation', 'Leak-free splits, k-fold runs, per-class errors.'],
    ['Data quality', 'Labelling rules, annotation QA, duplicate audits.'],
    ['Applied software', 'Web apps that put models and data to work.'],
  ] as const,
};

// ---------------------------------------------------------------------------------------------
// Research. The study is unpublished, so the site shows only its title and a short teaser.
// Do not add results, data details or methods here until the paper is public.

export const enset = {
  title: 'Senescence-Aware Enset Disease Classification Using Deep Learning Models',
  status: 'Unpublished · coming soon',
  period: '2025 – present',
  question: 'Is that yellow leaf sick, or just old?',
  teaser: 'A lightweight model that tells bacterial wilt from natural leaf ageing in enset, a staple crop in Ethiopia.',
};

// ---------------------------------------------------------------------------------------------
// Software projects.

export type CaseSection = { heading: string; body: string[] };

export type Project = {
  slug: string;
  name: string;
  kind: string;
  period?: string;
  role: string;
  summary: string;
  stack: string[];
  diagram: { lanes: string[]; nodes: string[][] };
  sections: CaseSection[]; // Problem → Approach → Architecture → Implementation → Challenges → Results → Lessons
  outcome: string;
  links: Link[];
  evidence: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: 'hope-lounge',
    name: 'Hope Lounge',
    kind: 'Client platform · QR ordering',
    period: 'Dec 2025 – Apr 2026',
    role: 'Team lead and frontend developer, with one collaborator',
    summary: 'Scan, order, pay. A three-language QR menu and café dashboard.',
    stack: ['React', 'Vite', 'Django REST Framework', 'PostgreSQL', 'Keycloak (OIDC)', 'Chapa payments', 'Cloudinary', 'i18next', 'Docker'],
    diagram: {
      lanes: ['Guests & staff', 'React SPA', 'Django REST API', 'Services'],
      nodes: [
        ['QR at table', 'Admin dashboard'],
        ['Menu & cart', 'i18n · EN / AM / OM', 'Order status'],
        ['Menu', 'Orders + audit log', 'Carambole queue', 'Inventory'],
        ['PostgreSQL', 'Keycloak', 'Chapa', 'Cloudinary'],
      ],
    },
    sections: [
      { heading: 'Problem', body: ['Orders were taken by hand. Nobody shared one view of the orders, the kitchen and the bill.'] },
      { heading: 'Approach', body: ['A QR code on every table. One API, so kitchen, floor and admin see the same order.'] },
      { heading: 'Architecture', body: ['React and Vite front end, Django REST back end, PostgreSQL. Keycloak for staff logins, Chapa for payments, Cloudinary for images, Docker to ship.'] },
      { heading: 'Implementation', body: ['Menus in English, Amharic and Afaan Oromo. Every order change is logged. Billiards bookings run in a queue, and stock drives what is available.'] },
      { heading: 'Challenges', body: ['Keeping stock and prices right while guests, kitchen and admins all touch the same order.'] },
      { heading: 'Results', body: ['Delivered to the client. Per the resume, about 50% less manual order-taking (the owner\'s own figure).'] },
      { heading: 'Lessons', body: ['Restaurant software is about state. Get the order lifecycle right first.'] },
    ],
    outcome: 'Delivered. The code is private and the hosted site is offline.',
    links: [],
    evidence: 'Resume and project documentation.',
    featured: true,
  },
  {
    slug: 'internship-hub',
    name: 'Student Internship Monitoring System',
    kind: 'University platform · multi-role',
    period: 'Oct 2024 – Jun 2025',
    role: 'System design lead and frontend developer, with one collaborator',
    summary: 'One place for students, advisors and supervisors to track every internship.',
    stack: ['Python', 'Django', 'Django Channels', 'React', 'SQL databases'],
    diagram: {
      lanes: ['Roles', 'Workflows', 'Django'],
      nodes: [
        ['Student', 'Advisor', 'Supervisor', 'Department head', 'Company admin'],
        ['Placement', 'Daily logs', 'Evaluation', 'Grading'],
        ['Views + permissions', 'Channels (chat)', 'Reports'],
      ],
    },
    sections: [
      { heading: 'Problem', body: ['Progress lived in paper logbooks and email. Advisors and supervisors were working blind.'] },
      { heading: 'Approach', body: ['A workspace per role, all tied to one placement record.'] },
      { heading: 'Architecture', body: ['Django with role-based views, Channels for live chat and a SQL database.'] },
      { heading: 'Implementation', body: ['Placements, daily logs, evaluations and grading. Per the resume, also an FAQ chatbot and a ratings-based matcher.'] },
      { heading: 'Challenges', body: ['Five roles with overlapping permissions. A later pass locked approvals to POST and to the owning company.'] },
      { heading: 'Results', body: ['A working, public prototype. Eight regression tests pass in the maintained copy.'] },
      { heading: 'Lessons', body: ['Multi-role apps break at the permission edges. Test those first.'] },
    ],
    outcome: 'Public code. The AI features are not visible in the public repository.',
    links: [{ label: 'Repository', href: 'https://github.com/gashahun21/Internship-Management-System' }],
    evidence: 'Resume and the public repository.',
    featured: true,
  },
  {
    slug: 'saasforge',
    name: 'SaaSForge',
    kind: 'Reference build · multi-tenant API',
    role: 'Repository owner',
    summary: 'Many companies, one backend, zero data leaks between them.',
    stack: ['FastAPI', 'SQLAlchemy (async)', 'PostgreSQL', 'Redis', 'Next.js', 'Docker', 'GitHub Actions'],
    diagram: {
      lanes: ['Client', 'API', 'Data'],
      nodes: [['Next.js app', 'API key clients'], ['JWT / API key', 'Org resolution', 'Role checks'], ['PostgreSQL (org-scoped rows)', 'Redis']],
    },
    sections: [
      { heading: 'Problem', body: ['Every request must hit the right organisation, and only that one.'] },
      { heading: 'Architecture', body: ['FastAPI on async SQLAlchemy and PostgreSQL. Each request resolves its organisation, then checks membership and role.'] },
      { heading: 'Results', body: ['API tests, cross-tenant tests and CI included. No production use is claimed.'] },
    ],
    outcome: 'Public reference build.',
    links: [
      { label: 'Repository', href: 'https://github.com/gashahundemise21/saasforge' },
      { label: 'Architecture notes', href: 'https://github.com/gashahundemise21/saasforge/blob/HEAD/docs/architecture.md' },
    ],
    evidence: 'Public repository.',
    featured: false,
  },
  {
    slug: 'taskflow',
    name: 'TaskFlow',
    kind: 'Frontend · typed components',
    role: 'Repository owner',
    summary: 'A clean, typed Kanban board with search, filters and tests.',
    stack: ['React', 'TypeScript', 'Vite', 'Vitest'],
    diagram: { lanes: ['Board'], nodes: [['To do', 'In progress', 'Done']] },
    sections: [
      { heading: 'Problem', body: ['Task tracking without the weight of a full project tool.'] },
      { heading: 'Implementation', body: ['Typed React components and Vitest tests for cards, search and filters.'] },
    ],
    outcome: 'Public code. No hosted demo.',
    links: [{ label: 'Repository', href: 'https://github.com/gashahundemise21/task-board-app' }],
    evidence: 'Public repository.',
    featured: false,
  },
];

// ---------------------------------------------------------------------------------------------

export const experience = [
  {
    role: 'Computer Vision Researcher',
    org: 'Ethiopian Artificial Intelligence Institute (EAII)',
    place: 'Addis Ababa',
    period: 'Jul 2025 – Present',
    current: true,
    points: [
      'Build vision systems for plant disease and crop and animal growth.',
      'Run annotation pipelines for classification and segmentation.',
      'Write labelling rules and QA checks that keep data consistent.',
      'Clean, fix and convert datasets across YOLO, COCO and Pascal VOC.',
      'Corresponding author of the senescence-aware enset study.',
    ],
    tools: ['Python', 'TensorFlow / Keras', 'OpenCV', 'YOLO · COCO · VOC'],
  },
  {
    role: 'Data Communication & Security Intern',
    org: 'AASTU ICT and Research Center',
    place: 'Addis Ababa',
    period: '2024 – 2025',
    current: false,
    points: [
      'Monitored and troubleshot the university network and its security.',
      'Documented operations and security procedures.',
    ],
    tools: ['Networking', 'Linux', 'Documentation'],
  },
];

export const education = [
  {
    degree: 'B.Sc., Electrical and Computer Engineering',
    school: 'Addis Ababa Science and Technology University (AASTU)',
    period: 'Jul 2021 – Jun 2025',
    status: 'completed' as const,
    note: 'GPA 3.45 / 4.00',
  },
];

export const certifications = [{ name: 'Deep Learning for Computer Vision', issuer: 'WorldQuant University' }];

export const languages = ['Afaan Oromoo (native)', 'Amharic (native)', 'English (professional)'];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'C / C++', 'SQL', 'JavaScript', 'TypeScript'] },
  { group: 'Machine learning', items: ['TensorFlow', 'Keras', 'scikit-learn', 'Transfer learning', 'Fine-tuning', 'Bayesian tuning', 'Regularisation'] },
  { group: 'Computer vision', items: ['OpenCV', 'Classification', 'Detection', 'Segmentation', 'Grad-CAM', 'TensorFlow Lite', 'Quantization'] },
  { group: 'Data & evaluation', items: ['NumPy', 'Pandas', 'Stratified k-fold', 'Leakage audits', 'Perceptual hashing', 'Annotation QA'] },
  { group: 'Apps & APIs', items: ['React', 'Next.js', 'Django', 'Django REST Framework', 'FastAPI', 'REST APIs'] },
  { group: 'Data & infrastructure', items: ['PostgreSQL', 'MySQL', 'Docker', 'Linux', 'Git / GitHub', 'CI/CD'] },
];
