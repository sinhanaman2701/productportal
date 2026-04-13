import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function seed() {
  console.log('Starting seed process...');
  const payload = await getPayload({ config: configPromise });

  // 1. Create a category
  console.log('Creating category...');
  const category = await payload.create({
    collection: 'categories',
    data: {
      name: 'Strategy',
      slug: 'strategy',
      description: 'Product Strategy & Vision',
    },
  });

  // 2. Create an Author User (if needed, but payload might allow public via Local API with overrideAccess)
  console.log('Creating user...');
  const user = await payload.create({
    collection: 'users',
    data: {
      name: 'Admin',
      email: 'admin@pmcraft.test',
      password: 'password123',
      role: 'admin',
    },
  });

  // 3. Create the dummy post
  console.log('Creating post...');
  const post = await payload.create({
    collection: 'posts',
    data: {
      title: 'The Evolution of the Minimum Viable Product',
      slug: 'the-evolution-of-mvp',
      status: 'published',
      author: user.id,
      category: category.id,
      excerpt: 'Discover why the traditional MVP model is evolving into MMP (Minimum Marketable Product) and how modern product leaders are adapting their launch strategies.',
      views: 1400,
      likes: 215,
      content: {
        root: {
          type: "root",
          format: "",
          indent: 0,
          version: 1,
          children: [
            {
              type: "heading",
              tag: "h2",
              format: "",
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "Moving Beyond the MVP",
                  type: "text",
                  version: 1,
                },
              ],
            },
            {
              type: "paragraph",
              format: "",
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "For years, product managers have lived by Reid Hoffman's famous quote: ",
                  type: "text",
                  version: 1,
                },
                {
                  detail: 0,
                  format: 1, // bold wait, lexical formats are numbers. Let's just do normal text.
                  mode: "normal",
                  style: "",
                  text: "\"If you are not embarrassed by the first version of your product, you've launched too late.\"",
                  type: "text",
                  version: 1,
                },
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: " However, user expectations have drastically shifted in the modern SaaS landscape. The bar for design, stability, and utility is infinitely higher.",
                  type: "text",
                  version: 1,
                },
              ],
            },
            {
              type: "quote",
              format: "",
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "The modern MVP is not a buggy prototype; it is a sharply focused slice of exceptional utility.",
                  type: "text",
                  version: 1,
                },
              ],
            },
            {
              type: "paragraph",
              format: "",
              indent: 0,
              version: 1,
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "Check out this beautifully rendered blockquote above. Notice how our bright mode `prosel-lg` styling cascades seamlessly down the DOM tree.",
                  type: "text",
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

  console.log('Seed complete! Post slug:', post.slug);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
