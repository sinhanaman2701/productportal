import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function checkData() {
  const payload = await getPayload({ config: configPromise });

  console.log('=== CATEGORIES ===');
  const categories = await payload.find({ collection: 'categories', limit: 100 });
  console.log('Total:', categories.totalDocs);
  categories.docs.forEach(c => console.log(`- ${c.name} (${c.slug})`));

  console.log('\n=== POSTS ===');
  const posts = await payload.find({ collection: 'posts', limit: 100 });
  console.log('Total:', posts.totalDocs);
  posts.docs.forEach(p => {
    console.log(`- ${p.title}`);
    console.log(`  Slug: ${p.slug}`);
    console.log(`  Status: ${p.status}`);
    console.log(`  Category: ${typeof p.category === 'object' ? (p.category as any).name : p.category}`);
    console.log(`  Cover Image: ${typeof p.coverImage === 'object' ? (p.coverImage as any).filename : p.coverImage}`);
  });

  console.log('\n=== MEDIA ===');
  const media = await payload.find({ collection: 'media', limit: 100 });
  console.log('Total:', media.totalDocs);
  media.docs.forEach(m => console.log(`- ${m.filename} (${m.alt})`));
}

checkData().catch(console.error);
