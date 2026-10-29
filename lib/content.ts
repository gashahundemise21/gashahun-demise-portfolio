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
// Research: Senescence-aware enset classification. Numbers are taken from the manuscript draft
// (Springer LNCS format, September 2026). It is unpublished; the site says so wherever it is cited.

export type ModelResult = {
  name: string;
  folds: [number, number, number, number, number]; // held-out test accuracy (%) per fold-trained model
  mean: number;
  sd: number;
  f1: number; // macro F1 mean (%)
  params: number; // total parameters
};

export const enset = {
  title: 'Senescence-Aware Enset Disease Classification Using Deep Learning Models',
  status: 'Unpublished manuscript',
  role: 'Second and corresponding author, EAII team of six',
  period: '2025 – present',
  question: 'Is that yellow leaf sick, or just old?',
  why: 'Enset feeds about 20 million Ethiopians, and bacterial wilt threatens it. Old leaves also turn yellow, so a sick-or-healthy model raises false alarms.',
  contribution: 'So ageing gets its own class, and we measure exactly how often an old leaf is mistaken for disease.',
  dataset: {
    total: 7545,
    region: 'Gurage Zone, Ethiopia',
    devices: 'Phone cameras, natural light, real farms',
    labelling: 'Labelled from field symptoms with a plant researcher',
    classes: [
      { key: 'healthy', label: 'Healthy', count: 2607, share: 34.55 },
      { key: 'wilt', label: 'Bacterial wilt', count: 2476, share: 32.82 },
      { key: 'aged', label: 'Aged (senescent)', count: 2462, share: 32.63 },
    ],
  },
  protocol: [
    ['Split by plant', 'Photos of one plant never cross the split.'],
    ['Untouched test set', 'Used once, for the final score.'],
    ['Five folds', 'Five models per backbone, reported as mean ± SD.'],
    ['Bayesian search', 'Tuned on training data only.'],
    ['Train-only augmentation', 'Rotations, shifts, zoom, brightness, flips.'],
    ['Same head everywhere', 'A fair comparison across five backbones.'],
  ] as const,
  models: [
    { name: 'MobileNetV3-Small', folds: [94.88, 95.69, 96.29, 95.49, 94.74], mean: 95.42, sd: 0.63, f1: 95.42, params: 695803 },
    { name: 'MobileNetV2', folds: [96.97, 93.84, 94.8, 96.02, 94.67], mean: 95.26, sd: 1.23, f1: 95.27, params: 1385907 },
    { name: 'InceptionV3', folds: [94.88, 92.02, 94.8, 94.85, 92.21], mean: 93.75, sd: 1.5, f1: 93.77, params: 21934371 },
    { name: 'EfficientNet-B0', folds: [89.49, 93.4, 91.24, 93.4, 91.17], mean: 91.74, sd: 1.67, f1: 91.69, params: 4214438 },
    { name: 'ResNet50', folds: [85.51, 85.57, 86.12, 88.14, 85.92], mean: 86.25, sd: 1.08, f1: 86.04, params: 23727491 },
  ] satisfies ModelResult[],
  // Fold 3 of MobileNetV3-Small, held-out test set. Rows: true class; columns: predicted class.
  confusion: {
    labels: ['Healthy', 'Bacterial wilt', 'Aged'],
    matrix: [
      [476, 7, 19],
      [10, 453, 9],
      [3, 7, 500],
    ],
  },
  binary: { mean: 97.08, sd: 0.9 },
  findings: [
    'Smallest model, best score: MobileNetV3-Small hit 95.42 ± 0.63% with 695,803 parameters.',
    'Bigger did not help: ResNet50 is 34× larger and scored 86.25%.',
    'Only 7 of 510 old leaves were flagged as wilt (1.37%).',
    'A two-class model scores 97.08%, but it solves an easier problem.',
  ],
  limits: [
    'One region, two phones. More farms and varieties next.',
    'Proving the Aged class cuts false alarms needs a paired test against the two-class model.',
    'On-device speed and memory are not measured yet.',
  ],
  // Earlier work on the same data, documented in the owner's research resume: an audit that found
  // duplicate images crossing split boundaries and led to the leakage-resistant protocol above.
  audit: {
    title: 'Why so strict?',
    text: 'Early scores looked too good. A leakage audit found duplicate photos on both sides of the split, so I rebuilt the evaluation around plants. Only the rebuilt numbers are shown.',
    methods: ['Exact hashing', 'Perceptual hashing', 'CNN embeddings', 'Cosine similarity', 'Clustering'],
  },
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
