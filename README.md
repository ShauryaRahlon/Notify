# 🚀 Notify

A modern, full-stack web application to track, discover, and get notified about upcoming programming contests from major platforms like Codeforces, CodeChef, and LeetCode. Built with Next.js, MongoDB, and a beautiful, responsive UI.

---

![Notify Banner](public/logo_bg.png)

## ✨ Features

- **Contest Aggregation:** Fetches and displays upcoming contests from multiple platforms.
- **Personalized Reminders:** Set email reminders for contests so you never miss out.
- **Authentication:** Secure sign-up, sign-in, email verification, and password reset.
- **Dashboard:** Manage your reminders, preferences, and contest interests.
- **Responsive UI:** Beautiful, modern design with dark/light themes.
- **PWA Support:** Installable as a Progressive Web App for desktop and mobile.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion
- **Backend:** Next.js API routes, MongoDB (Mongoose)
- **Auth:** NextAuth.js
- **Email:** Nodemailer, React Email
- **Other:** Radix UI, Zod, Axios, Styled Components

---

## 📁 Folder Structure

```
├── emails/           # Email templates (React components)
├── public/           # Static assets (images, icons, manifest)
├── src/
│   ├── app/          # Next.js app directory (routing, pages, API)
│   ├── components/   # UI and feature components
│   ├── context/      # React context providers
│   ├── helpers/      # Utility functions (scrapers, email senders)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Database and API utilities
│   ├── model/        # Mongoose models (User, Contest, Reminder)
│   ├── schemas/      # Zod validation schemas
│   ├── types/        # TypeScript types
│   └── middleware.ts # Middleware (auth, etc.)
├── package.json      # Project metadata and scripts
├── next.config.ts    # Next.js configuration
├── tsconfig.json     # TypeScript configuration
└── README.md         # Project documentation
```

---

## 🚦 Getting Started (Local Setup)

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/contest-tracker.git
cd contest-tracker
```

### 2. **Install Dependencies**

```bash
npm install
# or
yarn install
```

### 3. **Configure Environment Variables**

Create a `.env.local` file in the root directory and add the following:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
EMAIL_SERVER_USER=your_email@example.com
EMAIL_SERVER_PASSWORD=your_email_password
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=465
EMAIL_FROM=Contest Tracker <noreply@contest-tracker.com>
```

> **Note:** You can use services like [MongoDB Atlas](https://www.mongodb.com/atlas) and [Mailtrap](https://mailtrap.io/) for development.

### 4. **Run the Development Server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🧑‍💻 Usage Guide

- **Sign Up:** Create an account and verify your email.
- **Browse Contests:** View upcoming contests from supported platforms.
- **Set Reminders:** Click on a contest to set an email reminder.
- **Dashboard:** Manage your reminders and account settings.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 🙏 Credits

Made with ❤️ by:

- **Shaurya Rahlon**
- **Vansh Arora**
- **Himanshu Singh**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> _"Track. Prepare. Win. Never miss a contest again!"_
