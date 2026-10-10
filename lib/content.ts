export const profile = {
  "name": "Gashahun Demise",
  "github": "https://github.com/gashahundemise21",
  "linkedin": "https://www.linkedin.com/in/gashahun-demise/",
  "email": "gashahundemise21@gmail.com",
  "resume": "/resume/gashahun-demise-resume.pdf"
};
export const projects = [
  {
    "slug": "enset",
    "name": "Enset disease classification",
    "category": "Computer vision \u00b7 Research",
    "status": "Resume-documented research",
    "summary": "A study of enset leaf disease classification, from dataset preparation and transfer learning to evaluation and edge optimization.",
    "problem": "Leaf images can vary in lighting, growth stage, and visual symptoms. Disease classification requires careful labels and evaluation that distinguishes disease from natural aging.",
    "tech": [
      "Python",
      "TensorFlow / Keras",
      "OpenCV",
      "TensorFlow Lite"
    ],
    "repo": "https://github.com/gashahundemise21/Enset-Disease-Guard-EdgeAI",
    "details": [
      [
        "Data & methodology",
        "The resume documents collecting, labeling, cleaning, and validating leaf images across healthy, bacterial-wilt, and naturally aged classes. The work compares five deep learning models using transfer learning and fine-tuning."
      ],
      [
        "Evaluation approach",
        "Five-fold cross-validation, precision, recall, F1-score, confusion matrices, and Grad-CAM are documented in the resume. These methods examine class-specific behavior and the image regions that influence a prediction."
      ],
      [
        "Deployment decisions",
        "Quantization and TensorFlow Lite are documented for mobile and edge deployment. Device latency, memory use, and field testing are not available in the public repository."
      ],
      [
        "Evidence & outcome",
        "The completed study is documented in my resume. The public repository contains only a title; training artifacts and evaluation outputs are not published there. This case study presents the methodology without numerical performance claims."
      ]
    ],
    "sources": [
      [
        "Resume \u00b7 research methods",
        "/resume/gashahun-demise-resume.pdf"
      ],
      [
        "Public repository status",
        "https://github.com/gashahundemise21/Enset-Disease-Guard-EdgeAI/blob/HEAD/README.md"
      ]
    ],
    "evidence": "Research methods are resume-documented. Public code and reproducible results are not available."
  },
  {
    "slug": "hope-lounge",
    "name": "Hope Lounge QR Menu",
    "category": "Software engineering \u00b7 Collaboration",
    "status": "Delivered project \u00b7 Demo unavailable",
    "summary": "A multilingual QR menu and restaurant workspace developed for Hope Lounge.",
    "problem": "Guests need a mobile menu at the table. Staff need a shared way to manage menu content and the restaurant ordering workflow.",
    "tech": [
      "React",
      "Django REST Framework",
      "Vite",
      "i18next",
      "Cloudinary"
    ],
    "repo": "https://github.com/Gosa5497/qr_menu",
    "live": "https://hopeloungemenu.com/",
    "details": [
      [
        "Role & collaboration",
        "Developed with Gosaye Woyo for Hope Lounge. The resume describes leading development from design through delivery. Original source credit is retained for the Gosa5497 repository."
      ],
      [
        "System & decisions",
        "A React/Vite frontend connects to a Django REST API. Language support covers English, Amharic, and Oromo; staff tools manage menu items, categories, and QR codes."
      ],
      [
        "Engineering review",
        "The maintained local copy includes fixes for allergen matching, tip allocation, and null numeric values. Its frontend and Django test suites passed during the earlier maintenance work. This does not verify the separately hosted application."
      ],
      [
        "Outcome & availability",
        "The project was delivered for Hope Lounge. On October 10, 2026, its domain returned a cPanel hosting error. The external demo link is retained for reference; current availability and operational impact are not claimed."
      ]
    ],
    "sources": [
      [
        "Original collaborative source",
        "https://github.com/Gosa5497/qr_menu"
      ],
      [
        "Project documentation",
        "https://github.com/Gosa5497/qr_menu/blob/main/README.md"
      ]
    ],
    "evidence": "Owner-confirmed collaboration. The external demo currently returns a hosting error."
  },
  {
    "slug": "saasforge",
    "name": "SaaSForge",
    "category": "Software engineering \u00b7 API architecture",
    "status": "Public implementation",
    "summary": "A multi-tenant application foundation with organization-scoped APIs and a separate Next.js frontend.",
    "problem": "A shared B2B application must resolve the right organization for each request and keep organization data separated while supporting common workflows.",
    "tech": [
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "SQLAlchemy",
      "Redis",
      "Docker"
    ],
    "repo": "https://github.com/gashahundemise21/saasforge",
    "details": [
      [
        "Architecture",
        "Next.js handles the interface; FastAPI exposes backend services. Async SQLAlchemy connects to PostgreSQL, Alembic manages schema migrations, and Redis is part of the documented stack."
      ],
      [
        "Tenant boundaries",
        "The architecture uses organization-scoped rows. JWT-based requests resolve organization context through an organization slug; API keys provide programmatic access. Membership and role checks are important boundaries in this design."
      ],
      [
        "Evaluation & engineering",
        "The repository includes API tests, cross-tenant tests, and GitHub Actions workflows. These are inspectable engineering artifacts; the upstream suites were not rerun as part of this redesign."
      ],
      [
        "Outcome & scope",
        "A public implementation and architecture documentation are available. No production deployment, load benchmark, or independent security audit is claimed. This case study describes the publicly documented architecture rather than attributing individual contributions."
      ]
    ],
    "sources": [
      [
        "Architecture",
        "https://github.com/gashahundemise21/saasforge/blob/HEAD/docs/architecture.md"
      ],
      [
        "Authentication dependencies",
        "https://github.com/gashahundemise21/saasforge/blob/HEAD/backend/app/api/deps.py"
      ],
      [
        "API tests",
        "https://github.com/gashahundemise21/saasforge/tree/HEAD/backend/tests/api/v1"
      ]
    ],
    "evidence": "Implementation and architecture verified against public repository documentation."
  },
  {
    "slug": "taskflow",
    "name": "TaskFlow",
    "category": "Software engineering \u00b7 Interface",
    "status": "Public implementation",
    "summary": "A focused Kanban board with task editing, search, status filters, and component tests.",
    "problem": "Everyday task management needs clear states and predictable controls without adding complexity to the board.",
    "tech": [
      "React",
      "TypeScript",
      "Vite",
      "Vitest"
    ],
    "repo": "https://github.com/gashahundemise21/task-board-app",
    "details": [
      [
        "Interface design",
        "The board composes To Do, In Progress, and Done columns. Task cards, editing controls, search/filter tools, and confirmation dialogs define the interaction scope."
      ],
      [
        "Engineering decisions",
        "React components communicate through explicit props and callbacks. TypeScript describes the interface contracts, while Vite provides the frontend build."
      ],
      [
        "Evaluation",
        "Component tests are included for task cards and search/filter controls. Build, lint, typecheck, and Vitest scripts are present; their upstream execution is not asserted here."
      ],
      [
        "Outcome & scope",
        "The implementation is publicly inspectable. A hosted demonstration, multi-user behavior, and usage metrics are not documented."
      ]
    ],
    "sources": [
      [
        "Board component",
        "https://github.com/gashahundemise21/task-board-app/blob/HEAD/src/components/Board.tsx"
      ],
      [
        "Components & tests",
        "https://github.com/gashahundemise21/task-board-app/tree/HEAD/src/components"
      ],
      [
        "Package scripts",
        "https://github.com/gashahundemise21/task-board-app/blob/HEAD/package.json"
      ]
    ],
    "evidence": "Public components and test files support the described interface scope."
  },
  {
    "slug": "internship-hub",
    "name": "Internship Hub",
    "category": "Software engineering \u00b7 Collaboration",
    "status": "Maintained local edition",
    "summary": "A multi-role workspace for placements, daily reports, advisor feedback, and supervisor coordination.",
    "problem": "Students, academic advisors, and industry supervisors need shared visibility into placements and student progress.",
    "tech": [
      "Python",
      "Django",
      "Django Channels",
      "SQLite",
      "MySQL"
    ],
    "repo": "https://github.com/gashahun21/Internship-Management-System",
    "details": [
      [
        "Role & collaboration",
        "Developed with Gosaye Woyo. The resume describes system design and frontend development. The maintained local edition preserves the original repository attribution."
      ],
      [
        "Workflow",
        "Role-specific workspaces support students, advisors, supervisors, department heads, and company administrators. Placement tracking and reports connect the academic and company sides of the internship."
      ],
      [
        "Maintenance decisions",
        "The local edition adds environment-based configuration, a responsive sign-in interface, repaired ASGI setup, and reproducible dependencies. Approval and rejection require POST and company ownership."
      ],
      [
        "Verification & scope",
        "Eight regression tests and Django checks passed in the maintained local edition during earlier work. Its changes are not yet published as a new repository. Legacy role/chat permissions need further review, and the public implementation does not establish the AI features described in the resume."
      ]
    ],
    "sources": [
      [
        "Original implementation",
        "https://github.com/gashahun21/Internship-Management-System"
      ],
      [
        "Application workflow",
        "https://github.com/gashahun21/Internship-Management-System/blob/main/myproject/myapp/views.py"
      ]
    ],
    "evidence": "Original public source and a tested local maintenance edition. AI features are not established by the inspected source."
  }
] as const;
