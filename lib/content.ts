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
  roles: ['Machine Learning Engineer', 'Computer Vision Engineer', 'AI Engineer', 'Software Engineer'],
};

export const about = {
  lead: 'I work on the part of machine learning that decides whether a result can be trusted: how the data was collected and labelled, how it was split, and what the errors actually look like.',
  paragraphs: [
    'At the Ethiopian Artificial Intelligence Institute I research computer vision systems for plant disease classification and crop and animal growth monitoring. Most of that work happens before training starts: defining class taxonomies, writing labelling guidelines and edge-case rules, running annotation QA, and converting datasets between YOLO, COCO and Pascal VOC so that experiments can be reproduced.',
    'My main study so far is a senescence-aware classifier for enset, a staple crop in Ethiopia. Naturally ageing leaves yellow in ways that resemble bacterial wilt, so I modelled ageing as its own class and measured how often it is mistaken for disease, rather than reporting accuracy alone.',
    'I trained as an electrical and computer engineer and I build software as well: React and Django applications for a restaurant and for university internships. I like problems where a model has to fit inside a real workflow, with real users and constraints.',
  ],
  focus: [
    ['Computer vision', 'Image classification, transfer learning, lightweight models for mobile and edge hardware.'],
    ['Evaluation rigour', 'Leakage-resistant splits, k-fold protocols, per-class error analysis, honest baselines.'],
    ['Dataset engineering', 'Taxonomies, labelling guidelines, annotation QA, duplicate and leakage audits.'],
    ['Applied software', 'React, Django and FastAPI applications that put models and data to work.'],
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
  status: 'Unpublished manuscript · in preparation',
  role: 'Second and corresponding author, six-author team at the Ethiopian Artificial Intelligence Institute',
  period: '2025 – present',
  question:
    'Can a lightweight classifier tell bacterial wilt apart from the natural yellowing of ageing enset leaves, instead of treating every discoloured leaf as diseased?',
  why: 'Enset (Ensete ventricosum) is a staple food for roughly 20 million Ethiopians, and bacterial wilt is one of the main threats to it. Earlier image classifiers framed the task as healthy versus diseased. Senescent leaves also discolour, so a binary model has nowhere to put them except one of those two classes.',
  contribution:
    'The contribution is not a third label for its own sake. Natural senescence is treated as a confounding condition: it gets its own class, and the evaluation measures directly how often an aged leaf triggers a false bacterial-wilt alert.',
  dataset: {
    total: 7545,
    region: 'Gurage Zone, Ethiopia',
    devices: 'Two consumer mobile devices, natural light, uncontrolled backgrounds',
    labelling: 'Visual assessment of field symptoms with guidance from a plant researcher',
    classes: [
      { key: 'healthy', label: 'Healthy', count: 2607, share: 34.55 },
      { key: 'wilt', label: 'Bacterial wilt', count: 2476, share: 32.82 },
      { key: 'aged', label: 'Aged (senescent)', count: 2462, share: 32.63 },
    ],
  },
  protocol: [
    ['Plant-wise partitioning', 'Every image of the same plant goes to the same partition, so repeated views of one specimen cannot sit on both sides of the split.'],
    ['Held-out test set', 'Used only for final evaluation. Never for fitting, early stopping or hyperparameter search.'],
    ['Five-fold training', 'Stratified folds within the development data. Each fold-trained model is scored on the same held-out test set, and results are reported as mean ± SD.'],
    ['Bayesian search', 'Learning rate, dense units, dropout, L2 strength and MobileNet width, searched on training and validation data only.'],
    ['Augmentation in training only', 'Rotation ±40°, shifts ±30%, shear, zoom and brightness 0.7–1.3, and flips, applied on the fly to training batches only.'],
    ['Same head for every backbone', 'Global average pooling, dense + L2, batch norm, ReLU, dropout, softmax. SGD with Nesterov momentum, at 320 × 320 input.'],
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
    'MobileNetV3-Small had the highest mean test accuracy (95.42 ± 0.63%) and the smallest spread across folds. It is also the smallest model tested, at 695,803 parameters.',
    'Larger backbones did not help under the same protocol. ResNet50, with 34× more parameters, averaged 86.25%.',
    'In the best MobileNetV3-Small fold, 7 of 510 aged leaves were classified as bacterial wilt, an aged-to-wilt false-alert rate of 1.37%.',
    'A binary variant (Healthy + Aged merged) scored 97.08 ± 0.90%, but it solves an easier problem. The two accuracies are not a ranking of diagnostic quality.',
  ],
  limits: [
    'Data comes from a single region and two capture devices. Wider collection across locations, varieties and severity stages is still needed.',
    'Showing that the Aged class causally reduces false alerts requires a paired image-level comparison against the binary model. The manuscript states this rather than claiming it.',
    'On-device latency and memory have not been measured yet. The resume documents TensorFlow Lite quantization as preparation for mobile use.',
  ],
  // Earlier work on the same data, documented in the owner's research resume: an audit that found
  // duplicate images crossing split boundaries and led to the leakage-resistant protocol above.
  audit: {
    title: 'Why the protocol is strict',
    text: 'An earlier experimental series produced evaluation scores that were higher than expected. I built a leakage audit to find out why. It combined exact hashing, perceptual hashing, deep image embeddings with cosine similarity, and clustering, and it found exact and near-duplicate images on both sides of the split. The evaluation was rebuilt around plant-level separation, and only results from the rebuilt protocol are reported here.',
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
    role: 'Team lead and frontend developer, built with a collaborator',
    summary:
      'A QR-based ordering and café-management platform: table-side menu in three languages, order tracking, payments, billiards sessions and a staff dashboard.',
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
      { heading: 'Problem', body: ['Orders at Hope Lounge were taken by hand at each table. Guests could not browse the menu in their own language, and staff had no shared view of what was ordered, what was in the kitchen and what had been paid.'] },
      { heading: 'Approach', body: ['Put a QR code on every table that opens a mobile menu with no app install. Every order goes through one API so the kitchen, the floor and the admin see the same state.'] },
      { heading: 'Architecture', body: ['A React and Vite single-page app talks to a Django REST Framework backend split into core, menu and order apps. PostgreSQL stores the data, Cloudinary serves media, Keycloak handles staff sign-in through OIDC with role-based access, and Chapa processes local payment methods. The stack ships with Docker Compose.'] },
      { heading: 'Implementation', body: ['Category and item names are stored in English, Amharic and Afaan Oromo, and i18next switches the interface language. Each order records a status log of who changed it and when, for auditing. A dedicated queue service handles carambole billiards bookings in package and quick-play modes, and item availability follows stock levels.'] },
      { heading: 'Challenges', body: ['Keeping prices, stock and availability consistent while guests, kitchen staff and admins all act on the same orders. Supporting three languages without duplicating the menu for each one. Reconciling orders with payments that complete outside the app.'] },
      { heading: 'Results', body: ['The platform was delivered to Hope Lounge and digitised its table-ordering workflow. The resume reports that this reduced manual order-taking staffing needs by about 50%. That is the owner\'s figure; this site has not measured it independently.'] },
      { heading: 'Lessons', body: ['Hospitality software is mostly about state. Getting the order lifecycle and its audit trail right mattered more than any individual screen.'] },
    ],
    outcome: 'Delivered to the client. The source repository is private and the hosted site is offline, so neither is linked.',
    links: [],
    evidence: 'Resume and the project\'s own system documentation (March 2026). Repository is private.',
    featured: true,
  },
  {
    slug: 'internship-hub',
    name: 'Student Internship Monitoring System',
    kind: 'University platform · multi-role workflow',
    period: 'Oct 2024 – Jun 2025',
    role: 'System design lead and frontend developer, built with a collaborator',
    summary:
      'A multi-role workspace where students, advisors, industry supervisors and department heads track placements, daily logs, evaluations and grading in one place.',
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
      { heading: 'Problem', body: ['Internship progress was spread across paper logbooks, email and separate company reports, so advisors and supervisors had no shared picture of each student.'] },
      { heading: 'Approach', body: ['One system with a separate workspace for each role, connected by the placement record that links the student, the company and the academic side.'] },
      { heading: 'Architecture', body: ['A Django application with role-specific views and permission checks, Django Channels for real-time messaging, and relational storage for placements, logs and evaluations.'] },
      { heading: 'Implementation', body: ['Placement tracking, daily activity logs, supervisor evaluation and grading reports. Per the resume, the team also built a chatbot for frequently asked questions and a ratings-based recommendation component for student–company matching.'] },
      { heading: 'Challenges', body: ['Five roles with overlapping but different permissions. A later maintenance pass made approval and rejection POST-only and restricted them to the owning company. It added environment-based configuration and repaired the ASGI setup.'] },
      { heading: 'Results', body: ['A working multi-role prototype with a public repository. In the maintained local edition, eight regression tests and Django\'s system checks passed. That edition is not yet published.'] },
      { heading: 'Lessons', body: ['Multi-role systems fail at the permission boundaries. They need tests on exactly those boundaries, not just on the happy path.'] },
    ],
    outcome: 'Public implementation. The AI features described in the resume could not be confirmed in the public source.',
    links: [{ label: 'Repository', href: 'https://github.com/gashahun21/Internship-Management-System' }],
    evidence: 'Resume and the public repository.',
    featured: true,
  },
  {
    slug: 'saasforge',
    name: 'SaaSForge',
    kind: 'Reference implementation · multi-tenant API',
    role: 'Repository owner',
    summary: 'A multi-tenant B2B foundation with organisation-scoped data, JWT and API-key authentication, role checks and cross-tenant tests.',
    stack: ['FastAPI', 'SQLAlchemy (async)', 'PostgreSQL', 'Redis', 'Next.js', 'Docker', 'GitHub Actions'],
    diagram: {
      lanes: ['Client', 'API', 'Data'],
      nodes: [['Next.js app', 'API key clients'], ['JWT / API key', 'Org resolution', 'Role checks'], ['PostgreSQL (org-scoped rows)', 'Redis']],
    },
    sections: [
      { heading: 'Problem', body: ['A shared B2B backend has to resolve which organisation each request belongs to and never return another organisation\'s rows.'] },
      { heading: 'Architecture', body: ['FastAPI services over async SQLAlchemy and PostgreSQL, with Alembic migrations and Redis in the stack. Each request resolves its organisation from an organisation slug (with JWT) or from an API key, then membership and role checks run.'] },
      { heading: 'Results', body: ['The repository includes API tests, cross-tenant isolation tests and CI workflows. No production deployment, load test or security audit is claimed.'] },
    ],
    outcome: 'Public reference implementation.',
    links: [
      { label: 'Repository', href: 'https://github.com/gashahundemise21/saasforge' },
      { label: 'Architecture notes', href: 'https://github.com/gashahundemise21/saasforge/blob/HEAD/docs/architecture.md' },
    ],
    evidence: 'Public repository and its architecture documentation.',
    featured: false,
  },
  {
    slug: 'taskflow',
    name: 'TaskFlow',
    kind: 'Frontend · typed components',
    role: 'Repository owner',
    summary: 'A Kanban board in React and TypeScript with task editing, search, status filters, confirmation dialogs and Vitest component tests.',
    stack: ['React', 'TypeScript', 'Vite', 'Vitest'],
    diagram: { lanes: ['Board'], nodes: [['To do', 'In progress', 'Done']] },
    sections: [
      { heading: 'Problem', body: ['Everyday task tracking needs clear states and predictable controls without the weight of a full project tool.'] },
      { heading: 'Implementation', body: ['Column, card, editor and filter components communicate through typed props and callbacks. Component tests cover task cards and the search and filter controls.'] },
    ],
    outcome: 'Public implementation. No hosted demo.',
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
      'Research and develop computer vision systems for plant disease classification and for crop and animal growth monitoring.',
      'Build and manage image annotation pipelines for classification and segmentation.',
      'Define class taxonomies, labelling guidelines, edge-case rules and QA procedures to keep annotation consistent.',
      'Preprocess datasets, correct labels and convert between YOLO, COCO and Pascal VOC so that model development and evaluation are reproducible.',
      'Co-author and corresponding author of the senescence-aware enset classification study.',
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
      'Supported university-wide data communication and network-security operations through infrastructure monitoring and troubleshooting.',
      'Documented operational and security procedures and helped diagnose connectivity and system issues.',
    ],
    tools: ['Networking', 'Linux', 'Documentation'],
  },
];

export const education = [
  {
    degree: 'PhD, AI Engineering',
    school: 'Addis Ababa University',
    period: 'In progress',
    status: 'ongoing' as const,
    note: 'Research interests: computer vision, machine learning and robust AI evaluation.',
  },
  {
    degree: 'B.Sc., Electrical and Computer Engineering',
    school: 'Addis Ababa Science and Technology University (AASTU)',
    period: 'Jul 2021 – Jun 2025',
    status: 'completed' as const,
    note: 'GPA 3.45 / 4.00',
  },
];

export const certifications = [{ name: 'Deep Learning for Computer Vision', issuer: 'WorldQuant University' }];

export const languages = ['Afaan Oromoo (native)', 'Amharic (native)', 'English (professional working)'];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'C / C++', 'SQL', 'JavaScript', 'TypeScript'] },
  { group: 'Machine learning', items: ['TensorFlow', 'Keras', 'scikit-learn', 'Transfer learning', 'Fine-tuning', 'Bayesian hyperparameter search', 'Regularisation'] },
  { group: 'Computer vision', items: ['OpenCV', 'Image classification', 'Object detection', 'Segmentation', 'Grad-CAM', 'TensorFlow Lite', 'Quantization'] },
  { group: 'Data & evaluation', items: ['NumPy', 'Pandas', 'Stratified k-fold', 'Leakage audits', 'Perceptual hashing', 'Confusion analysis', 'Annotation QA'] },
  { group: 'Applications & APIs', items: ['React', 'Next.js', 'Django', 'Django REST Framework', 'FastAPI', 'REST APIs'] },
  { group: 'Data stores & infrastructure', items: ['PostgreSQL', 'MySQL', 'Docker', 'Linux', 'Git / GitHub', 'CI/CD'] },
];
