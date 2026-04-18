import { BlogPost } from '../types/portfolio';

export const blogPosts: BlogPost[] = [
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
].reverse(); // Keeping the array ordered by ID/Date, but reversing for "Newest First" display
