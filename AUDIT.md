# Source audit — 9 October 2026

Target folder was empty and was not a Git repository. No existing assets, CV, employment documents, or unrelated work were present.

## Sources

- User-supplied identity, positioning, GitHub and LinkedIn links.
- https://gashahundemise.netlify.app/ and published `/assets/index-DKf20mWf.js`: biography, B.Sc. Electrical & Computer Engineering at AASTU, class of 2025, Computer Vision Researcher at EAII, email demisegashahun@gmail.com, and skills. These are self-published profile statements, not independently verified employment or education records. Employment dates were unavailable and omitted.
- https://api.github.com/users/gashahundemise21/repos?per_page=100: public repository inventory.
- SaaSForge README, architecture, repository tree, and `backend/app/api/deps.py`: implemented software stack and organization resolution. No deployment, security, adoption, or performance claim is made. Individual contribution history remains unverified.
- TaskFlow README, package.json, Board.tsx, and repository tree: React/TypeScript Kanban components and test files. No upstream tests or deployment were verified.
- Enset-Disease-Guard-EdgeAI and AutoAnnotate-CV-Dataset-QA trees: README only. Edge-Anomaly and tracker READMEs were also title-only. They cannot substantiate model metrics or completed ML systems.
- LinkedIn could not be read using the web reader; no additional details were inferred.

## Previous portfolio assessment

Strengths: clear identity, published biography, categorized skills, accessible contact information. Improvement opportunities: aggregate project counts and accuracy ranges lack source evidence; profile links differ from the user-provided current links; source-backed case studies need more depth. The new site omits those metrics, uses the user's links, and distinguishes implemented work from proposals.

No CV or verified live project demo was found. No placeholder downloads, forms, fake dashboards, or metrics were added. Model methodology, dataset size, class balance, explainability output, and edge results remain unavailable. Enset's future steps are explicitly proposals.

## Implementation plan

Create a concise editorial design in Next.js; separate content and presentation; add source-backed project notes; integrate privacy-conscious Vercel analytics; validate lint, types, build, routes, mobile navigation and accessibility; attempt authenticated Vercel deployment.

## Owner update — 9 October 2026

The owner supplied `Gashahun Demise.pdf` and explicitly requested a public resume download and contact email gashahundemise21@gmail.com. The PDF was checked as a readable one-page document with no encryption or JavaScript, and visually reviewed. It is published byte-for-byte unchanged. Its statements are owner-provided resume content; publishing it does not independently verify its research metrics. The website contact email now uses the owner's explicit correction.

## Redesign audit — 29 October 2026

Sources used for this version:

- **Resume (primary).** The previously published one-page resume (sha256 `adb81550…`) and its 22 October rewording agree on roles, dates, education and projects. A 15 October two-page version conflicts with them (degree 2016–2021, internship 2020–2021, GPA 3.85, "5+ years"); it was not used.
- **PhD.** Removed from the site at the owner's request (29 October 2026). A "fast-track master's pathway" in that resume still contained a template placeholder and was left out.
- **Enset study.** The manuscript draft in Springer LNCS format (18 September 2026): dataset counts, protocol, per-fold results for five backbones, the fold-3 confusion matrix, the binary comparison and parameter counts. The manuscript is unpublished and the site says so. The resume's "custom model reached 97.5%" is not supported by the manuscript and is not used. The owner is listed in the manuscript as second and corresponding author of six; co-authors are not named on the site.
- **Leakage audit.** Described in the 2 October research resume (hashing, perceptual hashing, embeddings, clustering) and consistent with the manuscript's plant-wise partitioning. It is presented qualitatively; the resume's earlier fold accuracies and test-pool size are not used.
- **Hope Lounge.** Resume, plus the project's own system documentation (March 2026) for the architecture. `Gosa5497/qr_menu` is now private and `hopeloungemenu.com` serves a cPanel default page, so neither is linked. The 50% staffing figure is shown as the owner's own reported figure.
- **SaaSForge / TaskFlow.** Public repositories; listed as "other public code" with modest claims. SaaSForge commits are authored by a generic assistant identity, so no individual engineering claims are made beyond the repository's contents.
- **Not used:** dataset photographs and Grad-CAM images (institutional research data; publication not confirmed), the owner's profile photo, the phone number.
