#!/bin/bash

# Install main dependencies
npm install next react react-dom mongoose bcryptjs nodemailer axios sonner lucide-react \
  class-variance-authority clsx tailwindcss next-themes react-hook-form @hookform/resolvers \
  usehooks-ts @radix-ui/react-label @radix-ui/react-slot @react-email/render zod

# Install types for TypeScript
npm install -D @types/node @types/react @types/bcryptjs @types/nodemailer @types/clsx

# Install NextAuth.js
npm install next-auth

# Install tailwind-merge (used by cn utility)
npm install tailwind-merge

# Optionally, install tw-animate-css if used in your Tailwind config
npm install tw-animate-css

# Initialize Tailwind CSS if not already done
npx tailwindcss init -p
