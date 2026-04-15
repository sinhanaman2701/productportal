import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function createTestPost() {
  console.log('Creating test post...');
  const payload = await getPayload({ config: configPromise });

  // Get the first category
  const categories = await payload.find({
    collection: 'categories',
    limit: 1,
  });

  if (categories.docs.length === 0) {
    console.error('No categories found. Please seed categories first.');
    process.exit(1);
  }

  const category = categories.docs[0]?.id;
  if (!category) {
    console.error('Category ID not found.');
    process.exit(1);
  }

  // Get admin user
  const users = await payload.find({
    collection: 'users',
    where: { email: { equals: 'admin@pmcraft.test' } },
  });

  const author = users.docs.length > 0 ? users.docs[0]?.id : undefined;

  // Create test post
  const post = await payload.create({
    collection: 'posts',
    data: {
      title: 'Getting Started with AI for Product Managers',
      slug: 'getting-started-with-ai-for-pms',
      status: 'published',
      author,
      category,
      excerpt: 'Learn the essential AI skills every PM needs in 2026 - from prompt engineering to evaluation frameworks.',
      content: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [
            {
              type: 'heading',
              tag: 'h1',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Getting Started with AI for Product Managers',
                  type: 'text',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Artificial Intelligence is transforming how product managers work. In this guide, we will explore the essential AI skills every PM needs to master in 2026.',
                  type: 'text',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: '1. Prompt Engineering',
                  type: 'text',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Prompt engineering is the art of crafting effective inputs for AI models. A well-structured prompt can help you generate user stories, analyze customer feedback, and create product requirements documents.',
                  type: 'text',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: '2. Evaluation Frameworks',
                  type: 'text',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Understanding how to evaluate AI model outputs is critical. You need to define success metrics, build test datasets, and establish thresholds for acceptable performance.',
                  type: 'text',
                  version: 1,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: '3. Vibe Coding',
                  type: 'text',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Vibe coding lets you build prototypes by describing features in plain English. Tools like Cursor, Replit, and v0 enable rapid prototyping without deep coding knowledge.',
                  type: 'text',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Start practicing these skills today to become an AI-native PM.',
                  type: 'text',
                  version: 1,
                },
              ],
            },
          ],
        },
      },
      publishedAt: new Date().toISOString(),
      views: 120,
      likes: 15,
    },
  });

  console.log('✅ Test post created successfully!');
  console.log(`   Title: ${post.title}`);
  console.log(`   Slug: ${post.slug}`);
  console.log(`   URL: http://localhost:3000/blog/${post.slug}`);
  process.exit(0);
}

createTestPost().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
