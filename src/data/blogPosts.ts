import { BlogPost } from '../types/portfolio';

export const blogPosts: BlogPost[] = [
  {
    id: '3',
    title: "Building Spec Match in 24 Hours: APPCON 2026 AI Matsuri Hackathon",
    excerpt: "Surviving on 4 hours of sleep, rapid prototyping with Team-10 (Code Titans), tackling the 'Intelligent Internal Device Asset Optimization' challenge, and deploying Spec Match to Wasmer.",
    content: `Participating in the APPCON 2026: AI Matsuri Hackathon was one of the most intense and rewarding engineering sprints I've experienced. With only 24 hours on the clock, our team — Team-10 (Code Titans) — pushed ourselves to build, refine, and deploy a complete AI product from scratch. We wrapped up the competition landing in 9th place out of 11 competing teams.

The Assigned Sub-Theme:
- Challenge: Intelligent Internal Device Asset Optimization
- Status: Assigned (Sep 23, 2026, 10:00 AM)
- Mission: Build an intelligent AI-driven solution to streamline internal device asset allocations, hardware specification verifications, and enterprise workload matching.

Sleep was a luxury we couldn't afford. Operating on just 4 hours of sleep and pure adrenaline, our team locked in to solve this challenge: how organizations can automatically evaluate, match, and optimize internal device specs against employee workload requirements without tedious manual auditing.

What is Spec Match?
Spec Match is an intelligent platform designed to automate the semantic parsing, comparison, and verification of complex device hardware specifications against internal software and operational requirements. Instead of manual spreadsheets, our AI engine delivers instant compatibility checks, hardware bottleneck analysis, and optimal asset allocation recommendations.

AI Integration & Technical Stack:
- Full-Stack Architecture: Laravel monolith powered by Inertia.js with React and Tailwind CSS for seamless full-stack state management.
- Google Gemini Integration: Leveraged Gemini AI prompt pipelines for intelligent semantic reasoning, workload matching, and compatibility scoring without model hallucination.
- External Hardware Telemetry: Ingested real-time device hardware specifications via the TechSpecs API.
- Automated Audit Reports: Generated downloadable, styled multi-page PDF audit reports on the fly using laravel-dompdf.
- Database & Deployment: Backed by MySQL / SQLite database layers and deployed serverless to Wasmer.

The Hackathon Sprint:
- Hour 0-4: Deconstructing the 'Intelligent Internal Device Asset Optimization' sub-theme, Laravel and Inertia.js scaffolding, database modeling (MySQL/SQLite), and TechSpecs API integration.
- Hour 4-14: Gemini AI prompt engineering pipeline, hardware compatibility scoring algorithm, and Inertia.js + React frontend components.
- Hour 14-20: Automated PDF report generation with laravel-dompdf, error handling, edge-case testing, and UI polish under heavy sleep deprivation.
- Hour 20-24: Final end-to-end testing, seed data verification, and deploying the live instance to Wasmer.

The Outcome & 9th Place Finish:
Finishing in 9th place out of 11 teams was both a humbling and eye-opening experience. While we successfully shipped a fully functional, live-deployed app on Wasmer before the final buzzer, the competition showed us that technical delivery is only half the battle — pitching effectively, demonstrating clear product-market alignment, and highlighting measurable business impact to the judges are just as crucial.

Key Engineering Takeaways:
1. AI-Driven Velocity: Using modern AI developer tools enabled us to build in hours what would traditionally take weeks of manual boilerplate coding.
2. Graceful Failures: Under extreme time constraints, bulletproof error handling on model endpoints is essential to prevent system crashes during live demo evaluation.
3. Rapid Deployment on Wasmer: Deploying our Laravel + Inertia stack to Wasmer allowed us to achieve instantaneous serverless hosting without complex infrastructure overhead.
4. Beyond Just Code: Hackathons are won on product clarity, business relevance, and storytelling just as much as raw technical implementation.

You can check out the live deployment of our project here: https://appcon2026-codetitans-specmatch.wasmer.app/login`,
    date: "September 2026",
    readTime: "6 min read",
    category: "AI Engineering"
  },
  {
    id: '2',
    title: "Optimizing MySQL for LibSys",
    excerpt: "How I handled high-volume data encoding and retrieval in my school project. Dealing with thousands of records efficiently.",
    content: `Building LibSys taught me that database performance is just as critical as the backend logic itself. When dealing with a library system that handles hundreds of students and thousands of book records, simple queries aren't enough.

In this post, I'll dive into how I used MySQL indexes to speed up search results and how I structured the borrowing workflow to prevent data race conditions.

Key takeaways:
- Using composite indexes for search filters.
- Implementing the Repository pattern to isolate data logic.
- Handling relational integrity with foreign keys.`,
    date: "March 28, 2026",
    readTime: "8 min read",
    category: "Database"
  },
  {
    id: '1',
    title: "First Coding Experience: Java",
    excerpt: "My journey of discovering coding languages started with Java. Here's how I got into programming and what I learned from my first projects.",
    content: `As a beginner, Java was my first programming language. I remember the excitement of writing my first "Hello World" program and seeing it run successfully. Java's object-oriented nature helped me grasp fundamental programming concepts early on.

nervously, I tackled my first project: a simple console-based calculator. It was a mess of if-else statements, but it worked! From that experience, I learned the importance of code organization and readability.

What I took away from my early Java days:
- The value of learning programming fundamentals before jumping into frameworks.
- How to debug and troubleshoot code effectively.
- The importance of writing clean, maintainable code from the start.`,
    date: "September 2020",
    readTime: "5 min read",
    category: "Backend"
  }
];
