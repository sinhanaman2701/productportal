import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function seedDummyPosts() {
  console.log('📝 Starting dummy post seeding...');
  const payload = await getPayload({ config: configPromise });

  // Get existing categories
  const categories = await payload.find({ collection: 'categories', limit: 100 });
  console.log(`Found ${categories.docs.length} categories`);

  if (categories.docs.length === 0) {
    console.log('No categories found. Run seed-all.ts first.');
    process.exit(1);
  }

  // Get or create admin user
  const existingUsers = await payload.find({ collection: 'users', limit: 1 });
  let userId = existingUsers.docs[0]?.id;

  if (!userId) {
    console.log('Creating admin user...');
    const user = await payload.create({
      collection: 'users',
      data: {
        name: 'Admin',
        email: 'admin@pmcraft.test',
        password: 'password123',
        role: 'admin',
      },
    });
    userId = user.id;
  }

  // Dummy posts data
  const dummyPosts = [
    {
      title: 'Mastering AI Prompt Engineering for Product Managers',
      slug: 'mastering-ai-prompt-engineering',
      categorySlug: 'ai',
      excerpt: 'Learn the art and science of crafting effective prompts for AI tools that supercharge your PM workflow.',
      views: 2450,
      likes: 342,
    },
    {
      title: 'Top 10 AI Tools Every PM Should Know in 2026',
      slug: 'top-10-ai-tools-for-pm-2026',
      categorySlug: 'ai',
      excerpt: 'A curated list of AI-powered tools that will transform how you build products.',
      views: 3200,
      likes: 489,
    },
    {
      title: 'Product Teardown: How Notion Built Their AI Features',
      slug: 'product-teardown-notion-ai',
      categorySlug: 'news',
      excerpt: "Deep dive into Notion's AI strategy and what we can learn from their approach.",
      views: 1890,
      likes: 267,
    },
    {
      title: 'The State of AI in Product Management - 2026 Report',
      slug: 'state-of-ai-pm-2026',
      categorySlug: 'news',
      excerpt: 'Key trends and insights from surveying 500+ product leaders.',
      views: 4100,
      likes: 621,
    },
    {
      title: 'How to Ace the Product Design Interview',
      slug: 'ace-product-design-interview',
      categorySlug: 'interview',
      excerpt: 'A complete framework for tackling product design questions with confidence.',
      views: 5600,
      likes: 892,
    },
    {
      title: 'The Ultimate Guide to Product Sense Questions',
      slug: 'ultimate-guide-product-sense',
      categorySlug: 'interview',
      excerpt: 'Master the most common interview question type with this comprehensive guide.',
      views: 4800,
      likes: 734,
    },
    {
      title: 'Career Growth: From APM to VP of Product',
      slug: 'career-growth-apm-to-vp',
      categorySlug: 'career',
      excerpt: 'Lessons learned from a 15-year journey through product leadership.',
      views: 3100,
      likes: 512,
    },
    {
      title: 'Building a Personal Brand as a Product Manager',
      slug: 'building-personal-brand-pm',
      categorySlug: 'career',
      excerpt: 'Why every PM should invest in their personal brand and how to get started.',
      views: 2200,
      likes: 378,
    },
  ];

  // Create posts
  for (const postData of dummyPosts) {
    const category = categories.docs.find((c) => c.slug === postData.categorySlug);
    if (!category) {
      console.log(`Skipping "${postData.title}" - category "${postData.categorySlug}" not found`);
      continue;
    }

    try {
      await payload.create({
        collection: 'posts',
        data: {
          title: postData.title,
          slug: postData.slug,
          status: 'published',
          author: userId,
          category: category.id,
          excerpt: postData.excerpt,
          views: postData.views,
          likes: postData.likes,
          content: {
            root: {
              type: 'root',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'heading',
                  tag: 'h2',
                  version: 1,
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  children: [
                    {
                      type: 'text',
                      text: 'Introduction',
                      version: 1,
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  version: 1,
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  children: [
                    {
                      type: 'text',
                      text: `This is a comprehensive guide about ${postData.title}. In this article, we will explore key insights and actionable takeaways for product managers.`,
                      version: 1,
                    },
                  ],
                },
                {
                  type: 'heading',
                  tag: 'h2',
                  version: 1,
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  children: [
                    {
                      type: 'text',
                      text: 'Key Takeaways',
                      version: 1,
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  version: 1,
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  children: [
                    {
                      type: 'text',
                      text: 'Here are the main points to remember from this article. Apply these principles in your daily work to become a more effective product manager.',
                      version: 1,
                    },
                  ],
                },
              ],
            },
          },
          publishedAt: new Date().toISOString(),
        },
      });
      console.log(`✓ Created: ${postData.title}`);
    } catch (err) {
      console.error(`Failed to create "${postData.title}":`, err);
    }
  }

  console.log('✅ Dummy posts seeding complete!');
  process.exit(0);
}

seedDummyPosts().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
