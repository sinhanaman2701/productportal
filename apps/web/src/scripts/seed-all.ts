import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function seedAll() {
  console.log('🚀 Starting Master Seed Process...');
  const payload = await getPayload({ config: configPromise });

  // 1. Clean existing data
  console.log('🧹 Cleaning existing collections...');
  const collections = ['posts', 'categories', 'users', 'media', 'tags'];
  for (const collection of collections) {
    const existing = await payload.find({ collection: collection as any, limit: 100 });
    for (const doc of existing.docs) {
      await payload.delete({ collection: collection as any, id: doc.id });
    }
  }

  // 2. Create Admin User
  console.log('👤 Creating Admin User...');
  const admin = await payload.create({
    collection: 'users',
    data: {
      name: 'Admin',
      email: 'admin@pmcraft.test',
      password: 'password123',
      role: 'admin',
    },
  });

  // 3. Create Official Categories for Bento Grid (Exactly 5)
  console.log('📂 Creating Official Categories...');
  const categoriesData = [
    { 
      name: "AI PM Toolkit", 
      slug: "ai", 
      description: "Prompting, Automation & Tools",
      order: 1 
    },
    { 
      name: "What's New", 
      slug: "news", 
      description: "Product Teardowns & Industry Shifts",
      order: 2 
    },
    { 
      name: "Interview Prep", 
      slug: "interview", 
      description: "RCAs, Cases & Frameworks",
      order: 3 
    },
    { 
      name: "Case Studies", 
      slug: "product", 
      description: "Strategy & User Psychology",
      order: 4 
    },
    { 
      name: "Other Guides", 
      slug: "career", 
      description: "General Management & Career",
      order: 5 
    },
  ];

  const categories: any[] = [];
  for (const cat of categoriesData) {
    const created = await payload.create({
      collection: 'categories',
      data: cat,
    });
    categories.push(created);
  }

  // 4. Create Featured Dummy Post
  console.log('📝 Creating Featured Post...');
  await payload.create({
    collection: 'posts',
    data: {
      title: 'The Evolution of the Minimum Viable Product',
      slug: 'the-evolution-of-mvp',
      status: 'published',
      featured: true,
      author: admin.id,
      category: categories[0].id,
      excerpt: 'Discover why the traditional MVP model is evolving into MMP (Minimum Marketable Product) and how modern product leaders are adapting their launch strategies.',
      views: 1400,
      likes: 215,
      content: {
        root: {
          type: "root" as const,
          direction: "ltr" as const,
          format: "" as const,
          indent: 0,
          version: 1,
          children: [
            {
              type: "heading",
              tag: "h2",
              version: 1,
              direction: "ltr" as const,
              format: "" as const,
              indent: 0,
              children: [{ type: "text", text: "Moving Beyond the MVP", version: 1 }],
            },
            {
              type: "paragraph",
              version: 1,
              direction: "ltr" as const,
              format: "" as const,
              indent: 0,
              children: [{ type: "text", text: "User expectations have drastically shifted. The modern MVP is not a buggy prototype; it is a sharply focused slice of exceptional utility.", version: 1 }],
            },
          ],
        },
      },
      publishedAt: new Date().toISOString(),
    },
  });

  console.log('✅ All set! System seeded with Bento Grid ready state.');
  process.exit(0);
}

seedAll().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
