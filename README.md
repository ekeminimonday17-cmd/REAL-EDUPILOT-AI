# Real-Edupilot-AI - Complete School Management System

A modern, AI-powered school management platform built with React, TypeScript, Vite, Tailwind CSS, Supabase, and PostgreSQL.

## Features

✨ **Complete School Management**
- Student Management (CRUD, search, filter, promotion)
- Teacher Management
- Class Management
- Subject Management
- Attendance Tracking
- Results & Grading (Automatic calculations)
- Report Card Generation (PDF download, print)
- Payment Management (Invoices, receipts)
- Announcements
- Parent Portal
- AI Academic Assistant
- Analytics & Reports

🎓 **School Structure Support**
- Nursery (1-3)
- Primary (1-6)
- Junior Secondary (1-3)
- Senior Secondary (1-3)

👥 **Role-Based Access**
- Super Admin
- School Admin
- Teacher
- Parent
- Student

📊 **Advanced Features**
- Automatic Grade Calculation (A-F system)
- Position Ranking
- GPA Calculation
- Attendance Percentage
- Term & Session Management
- Leadership Positions
- Clubs & Societies
- Financial Analytics
- Student Performance Insights

## Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router v6
- Recharts (Analytics)
- React Hook Form
- Zustand (State Management)
- React Hot Toast (Notifications)

**Backend:**
- Supabase
- PostgreSQL
- Row Level Security (RLS)
- Supabase Authentication

## Installation

1. **Clone Repository**
```bash
git clone https://github.com/ekeminimonday17-cmd/REAL-EDUPILOT-AI.git
cd REAL-EDUPILOT-AI
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Environment Variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

4. **Setup Supabase**
- Create a new Supabase project
- Run the SQL schema from `database.sql` in Supabase SQL Editor
- Enable Email/Password authentication

5. **Run Development Server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
REAL-EDUPILOT-AI/
├── src/
│   ├── components/          # Reusable components
│   ├── pages/              # Route pages
│   ├── lib/                # Libraries (Supabase)
│   ├── stores/             # Zustand stores
│   ├── types/              # TypeScript types
│   ├── utils/              # Utilities & helpers
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── database.sql            # PostgreSQL schema
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind config
├── postcss.config.js       # PostCSS config
├── package.json            # Dependencies
├── index.html              # HTML template
└── README.md              # This file
```

## Available Pages

- **Dashboard** - Overview with analytics & charts
- **Students** - Student management
- **Teachers** - Teacher management
- **Classes** - Class management
- **Subjects** - Subject management
- **Attendance** - Daily attendance tracking
- **Results** - Result entry & management
- **Report Cards** - Report card generation
- **Payments** - Payment tracking
- **Analytics** - Advanced analytics & reports
- **Announcements** - School announcements
- **Parent Portal** - Parent access portal
- **AI Assistant** - AI-powered academic insights
- **Settings** - School settings
- **Profile** - User profile management

## Grading System

| Grade | Range | Remark |
|-------|-------|--------|
| A | 70-100 | Excellent |
| B | 60-69 | Very Good |
| C | 50-59 | Good |
| D | 45-49 | Fair |
| E | 40-44 | Pass |
| F | 0-39 | Fail |

## Database Schema

The application uses 20+ PostgreSQL tables with proper relationships:

- schools
- users
- students
- teachers
- classes
- subjects
- teacher_subjects
- teacher_classes
- attendance
- results
- report_cards
- payments
- announcements
- academic_sessions
- terms
- leadership_positions
- clubs
- student_club_memberships
- promotion_records
- financial_transactions
- notifications
- ai_logs

## Authentication

Uses Supabase Auth with email/password. Users are stored in:
- Supabase `auth.users` table
- Custom `users` table with role information

## Security

- Row Level Security (RLS) policies on sensitive tables
- Role-based access control (RBAC)
- Protected routes
- Secure password handling

## API Services

The app includes service functions for:
- Student CRUD
- Teacher CRUD
- Results management
- Payment tracking
- Attendance recording
- Announcements
- And more...

## Utilities

- Grade calculation
- GPA calculation
- Score formatting
- Date formatting
- Currency formatting
- Email validation
- Phone validation
- Position suffix generation

## Build & Deploy

**Build for Production:**
```bash
npm run build
```

**Preview Build:**
```bash
npm run preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For support, email support@edupilot.ai or open an issue on GitHub.

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced AI features
- [ ] SMS notifications
- [ ] Video tutorials
- [ ] Bulk imports
- [ ] API webhooks
- [ ] Third-party integrations

## Credits

Built with ❤️ by the EduPilot Team

---

**Start Your Digital School Transformation Today!** 🚀
