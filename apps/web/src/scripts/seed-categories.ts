import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function seedCategories() {
  console.log('Seeding categories...');
  const payload = await getPayload({ config: configPromise });

  const categories = [
    { name: 'AI for PMs', slug: 'ai-for-pms', description: 'AI skills, tools, and strategies for product managers', color: 'var(--color-violet-50)', order: 1 },
    { name: 'Interview Prep', slug: 'interview-prep', description: 'RCA, guesstimates, case studies, and PM interview questions', color: 'var(--color-blue-50)', order: 2 },
    { name: 'Product Strategy', slug: 'product-strategy', description: 'Product vision, roadmaps, and strategic thinking', color: 'var(--color-indigo-50)', order: 3 },
    { name: 'Career Growth', slug: 'career-growth', description: 'PM career paths, skills, and leadership advice', color: 'var(--color-emerald-50)', order: 4 },
    { name: 'What\'s New', slug: 'whats-new', description: 'Latest product launches, tools, and industry updates', color: 'var(--color-amber-50)', order: 5 },
    { name: 'Others', slug: 'others', description: 'Miscellaneous topics and perspectives', color: 'var(--color-slate-50)', order: 6 },
  ];

  for (const cat of categories) {
    try {
      await payload.create({
        collection: 'categories',
        data: cat,
      });
      console.log(`  Created category: ${cat.name}`);
    } catch (err) {
      console.log(`  Category already exists: ${cat.name}`);
    }
  }

  console.log('\n✅ Categories seeded successfully!');
  process.exit(0);
}

seedCategories().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
