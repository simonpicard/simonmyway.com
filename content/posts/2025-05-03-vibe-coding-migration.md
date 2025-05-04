# Vibe coding the migration of this blog from Express to Next.js

If you've been following my articles, you'll know that I created this website three years ago as a way to learn JavaScript programming.
Back then, I followed an Express.js tutorial and applied it to build this website.
While functional, Express.js is relatively outdated compared to modern frameworks that make developers' lives easier.
I experienced this firsthand when I built [Urbanex](https://www.urbanex.be) using Next.js and React, the development experience was much more pleasant.
Next.js's built-in routing, server-side rendering, and component-based architecture made development smoother and more intuitive.
Additionally, Next.js offers better navigation and performance out of the box, without requiring extra configuration or third-party libraries.
However, the main reason I decided to migrate this blog to Next.js was to host it for free on Vercel, compared to the $7/month I was paying on Heroku for the Express version.

## LLM-assisted coding: a game changer

When I initially created this website, we were in the GPT-3 era, and LLM-assisted coding wasn't mainstream, at least not for me and my peers.
Today, it's a different story, I use LLMs daily through Cursor for coding, and it's transformed how I approach development tasks.
My first step in migrating the website was to open the prompt dialog and type:

```
I want you to convert this whole project into next js + tailwind
```

With its latest update, Cursor now offers an 'agentic' way of interacting with the LLM, automatically analyzing the codebase and adding relevant project files to its context.
This is a significant improvement over manually copy-pasting code, making LLM-assisted coding (or vibe coding?) much less cumbersome.
The LLM created a Next.js project with basic routes and a boilerplate Tailwind integration.
Here's its first implementation of the blog page, which serves as the home page of this website:

```js
import React from "react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="space-y-4">
        {/* Blog posts will be listed here */}
        <p className="text-gray-600">Coming soon...</p>
      </div>
    </main>
  );
}
```

Thus, I had to follow up with:

```
now find a way to include all my blog posts, they are MD, display them, also each blog post as a title that should be listed on the index
```

The LLM suggested installing `npm install gray-matter react-markdown` and wrote helper functions to parse my blog posts written in static markdown files.

While coding, Cursor's agent would often fix errors automatically thanks to its linter integration.
The agent proactively fetches and addresses issues, which is much more pleasant than manually running the code, encountering errors, and having to copy-paste them for debugging.

As I ran the website locally, I enjoyed a live preview of the results as the agent coded.
This was particularly satisfying since I typically work in data/analytics/cloud engineering rather than frontend development, where I don't get such immediate feedback.
With web development, the LLM's impact is very tangible.

## The limitations and lessons learned

While I'm more efficient at coding with LLM assistance, I'm grateful that I can understand what it's doing to perform quality checks.
For instance, I encountered a styling issue and noticed that the LLM had used an outdated version of Tailwind.
I manually updated it to use the latest version.
Since Tailwind 4.0 was only released earlier this year, with just four months of existence, LLMs don't have many examples of its implementation in their training dataset.

Additionally, the LLM would often fix and code things with local view only.
As an engineer, I could sense when it was going down a rabbit hole, focusing on symptom-fixing or avoiding necessary abstraction/modularity.
For example, I used this prompt:

```
analyse the page and see how they all have some kind of title in a first div with some styling (lighter bg) then a main content.
shoud this be refactored so that this styling is defined once? using a comopnent or so?
```

Leveraging my experience with Next.js, I could guide the LLM in the right direction, and its output was satisfactory.
While LLMs are powerful tools, they work best when paired with human expertise and intuition.

My experience with LLM-assisted coding extends beyond this migration, and I can confidently say that it's not equally effective with all technologies.
For example, it struggled significantly with Dockerfile creation, making numerous errors.
This highlights an important point: LLMs excel at tasks with clear patterns and abundant examples in their training data, but they can struggle with more complex or niche technical challenges.

## So, can anyone vibe code their next startup?

If it's a simple Next.js web app, maybe.
But here's what I've learned from this experience:

1.  **Know your tools**: Understanding the underlying technology is crucial.
    LLMs can help you code faster, but they can't replace fundamental knowledge.
2.  **Quality control**: Always review and understand the code generated by LLMs.
    They can make mistakes or suggest suboptimal solutions.
3.  **Iterative development**: Use LLMs as part of an iterative process.
    Start with a basic implementation, then refine and improve it.
4.  **Domain expertise**: The more you know about a technology, the better you can guide the LLM and evaluate its suggestions.

This aligns with my overall impression of LLMs' usefulness: it can do what I already know how to do, and makes me faster and more efficiently with LLMs.
If there's a mistake, I can fix it because I understand the underlying concepts.
I don't trust LLMs blindly to the point where I'd be comfortable with results I don't understand due to a lack of skills.
Maybe one day, but for now, my programming knowledge is what makes LLMs truly valuable to me.

Overall, I'm feeling lucky to have both learned and practiced programming before the era of LLMs.
This traditional path provided me with a deep understanding of programming concepts, debugging techniques, and system architecture that I rely on daily.
Years of hands-on experience have given me the intuition to spot potential issues and the ability to think through complex problems from first principles.
This foundation allows me to critically evaluate LLM-generated code, identify potential issues, and understand the "why" behind certain implementations.
Simultaneously, I'm fortunate to be working during this technological transition, where I can leverage LLMs to accelerate my workflow while still applying my expertise.
This combination of traditional programming knowledge and modern AI tools makes me more effective in my work.

I also see great value in improving LLM-assisted UX, as Cursor is doing.
I can't wait for a good email client with an integrated LLM agent, that would handle meeting planning or draft basic answers for chores related emails!
