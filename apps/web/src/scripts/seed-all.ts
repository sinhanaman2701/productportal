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

  // 3. Create Official Categories for Bento Grid (Exactly 4)
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
      name: "Others",
      slug: "career",
      description: "General Management & Career",
      order: 4
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

  console.log('✅ All set! System seeded with Bento Grid ready state.');
  process.exit(0);
}

seedAll().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
