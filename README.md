#  CCTV Security Dashboard – Next.js + Supabase + Prisma

A modern web application to manage and monitor CCTV security events such as unauthorized access, gun threats, theft, vandalism, and face recognition logs.

---

## 📦 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) with App Router and React 18
- **Backend/API**: API Routes in Next.js
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL) for data storage and auth
- **ORM**: [Prisma](https://www.prisma.io/) to interact with Supabase's PostgreSQL database
- **Styling**: Tailwind CSS
- **Icons**: Heroicons & Custom SVG
- **Deployment**: Vercel / Supabase Hosting

---

##  Deployment Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cctv-security-dashboard.git
cd cctv-security-dashboard

npm install
# or
yarn install

npx prisma generate
npx prisma migrate deploy

npx prisma migrate dev --name init

/app             → Next.js App Router pages and components
/prisma          → Prisma schema and migrations
/components      → Reusable UI components
/lib             → Supabase & Prisma utilities
/public          → Static assets
.env.local       → Environment config (keep secret)

If I Had More Time...

✅ Fix remaining API issues:

GET /api/incidents?resolved=false — ensure newest-first JSON is returned.

PATCH /api/incidents/:id/resolve — correctly toggle resolved and return the updated row.


✅ Enhance UI/UX with shadcn/ui:

Replace default components with modern, accessible UI using the shadcn/ui library.

Improve layout consistency, animations, and design responsiveness.

✅ Improve desktop experience:

When an incident is selected, show a mini strip of two additional camera thumbnails.

Clicking a thumbnail plays that camera's footage in sync with the selected incident.

Display relevant incident lists under the selected camera view.

This feature will be optimized for desktop browsers but adapted for tablets and small devices too.

✅ Enhance Admin Dashboard:

Add analytics with charts for threat type trends, camera activity, and resolution time using tools like Chart.js or Recharts.

✅ Add full video integration:

Live streaming support.

Playback from storage (Supabase Storage or integrated S3).

✅ Implement advanced RBAC (Role-Based Access Control):

Granular permission levels: Viewer, Operator, Analyst, and Admin.

✅ Add notifications system:

Trigger email/SMS alerts on critical incidents using providers like Twilio or SendGrid.

✅ Progressive Web App (PWA) & Mobile Optimization:

Ensure mobile-first design.

Add PWA features: offline support, installable app shell, and push notifications.

✅ Write tests for stability:

Unit and integration tests using Jest or Playwright for frontend and backend reliability.

✅ Add timestamp display:

Show real-time timestamps under the Incident Player and each item in the Incident List for context.
