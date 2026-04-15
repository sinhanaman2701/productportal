import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function seedPosts() {
  console.log('🚀 Seeding 10 sample blog posts...');
  const payload = await getPayload({ config: configPromise });

  // Clean existing posts first
  console.log('🧹 Cleaning existing posts...');
  const existingPosts = await payload.find({ collection: 'posts', limit: 100 });
  for (const doc of existingPosts.docs) {
    await payload.delete({ collection: 'posts', id: doc.id });
  }

  // Get the admin user and categories
  const users = await payload.find({ collection: 'users', limit: 1 });
  const categories = await payload.find({ collection: 'categories', limit: 10 });

  if (users.docs.length === 0) {
    console.error('❌ No users found. Run seed-all.ts first.');
    process.exit(1);
  }

  const admin = users.docs[0];
  if (!admin) {
    console.error('❌ No admin user found. Run seed-all.ts first.');
    process.exit(1);
  }
  const categoryMap = Object.fromEntries(categories.docs.map(c => [c.slug, c.id]));

  console.log('📝 Creating 10 sample posts...');

  const postsData = [
    {
      title: "How to Ace PM Guesstimate Questions: A Complete Framework",
      slug: "how-to-ace-pm-guesstimate-questions",
      excerpt: "Master the art of estimation questions with this proven 5-step framework used by top PM candidates at FAANG companies.",
      category: categoryMap['interview'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "AI Product Manager Skills You Need in 2026",
      slug: "ai-product-manager-skills-2026",
      excerpt: "The essential AI skills every PM needs: from prompt engineering to evaluation frameworks, RAG architecture, and LLMOps basics.",
      category: categoryMap['ai'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "Root Cause Analysis: The PM's Secret Weapon",
      slug: "root-cause-analysis-pm-secret-weapon",
      excerpt: "Learn how to conduct effective RCAs that drive real product improvements and prevent issues from recurring.",
      category: categoryMap['interview'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "Vibe Coding for Product Managers: A Practical Guide",
      slug: "vibe-coding-for-product-managers",
      excerpt: "How PMs can leverage AI coding tools like Cursor and Claude Code to build prototypes and validate ideas faster.",
      category: categoryMap['ai'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "From Engineer to PM: My Transition Story",
      slug: "from-engineer-to-pm-transition",
      excerpt: "Lessons learned from making the switch from software engineering to product management at a Series B startup.",
      category: categoryMap['career'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "Product Teardown: How Notion Onboards New Users",
      slug: "notion-onboarding-teardown",
      excerpt: "A deep dive into Notion's onboarding flow, template gallery, and what makes their activation so effective.",
      category: categoryMap['news'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "The Complete Guide to Product-Led Growth",
      slug: "complete-guide-product-led-growth",
      excerpt: "How companies like Slack, Figma, and Linear use PLG to drive viral adoption and reduce CAC.",
      category: categoryMap['news'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "Building AI Features That Users Actually Trust",
      slug: "building-ai-features-users-trust",
      excerpt: "Design patterns for AI products: handling uncertainty, showing confidence scores, and graceful degradation.",
      category: categoryMap['ai'],
      status: 'published' as const,
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: "PM Interview Prep: 50 Questions I Got Asked in 2026",
      slug: "pm-interview-prep-50-questions-2026",
      excerpt: "Real PM interview questions from Meta, Google, Stripe, and early-stage startups — with sample answers.",
      category: categoryMap['interview'],
      status: 'published' as const,
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Why I Quit My FAANG PM Job for a Startup",
      slug: "why-i-quit-faang-pm-job-for-startup",
      excerpt: "The tradeoffs between Big Tech comfort and startup chaos — and why I don't regret the switch.",
      category: categoryMap['career'],
      status: 'published' as const,
      publishedAt: new Date().toISOString(),
    },
  ];

  for (const postData of postsData) {
    const post = await payload.create({
      collection: 'posts',
      data: {
        ...postData,
        author: admin.id,
        content: {
          root: {
            type: 'root',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: postData.excerpt + '\n\nThis is a sample post for demonstration purposes. The full article content would go here in a real scenario.',
                  }
                ],
              }
            ],
          }
        },
      },
    });
    console.log(`  ✓ Created: ${postData.title}`);
  }

  console.log('✅ 10 posts seeded successfully!');
  process.exit(0);
}

seedPosts().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
