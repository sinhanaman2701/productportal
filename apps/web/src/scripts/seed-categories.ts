import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function seedCategories() {
  console.log('Seeding official categories...');
  const payload = await getPayload({ config: configPromise });

  // Get existing categories
  const existing = await payload.find({ collection: 'categories', limit: 100 });
  
  // Wipe existing
  if (existing.docs.length > 0) {
    for (const cat of existing.docs) {
      await payload.delete({ collection: 'categories', id: cat.id });
    }
  }

  const officialCategories = [
    { name: "UX + Product-Led", slug: "ux", description: "1,000+ reads" },
    { name: "Growth Tools", slug: "growth", description: "Popular" },
    { name: "Improve UX", slug: "improve-ux", description: "15+ Guides" },
    { name: "Blog & Guides", slug: "blog", description: "Coming Soon" },
    { name: "Playbooks", slug: "playbooks", description: "Coming Soon" },
  ];

  for (const cat of officialCategories) {
    await payload.create({
      collection: 'categories',
      data: cat,
    });
  }

  console.log('Categories seeded to exactly 5 tiles!');
  process.exit(0);
}

seedCategories().catch(console.error);
