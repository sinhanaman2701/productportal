import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function checkMedia() {
  const payload = await getPayload({ config: configPromise });

  console.log('=== MEDIA ===');
  const media = await payload.find({ collection: 'media', limit: 100 });
  console.log('Total:', media.totalDocs);
  media.docs.forEach(m => {
    console.log(`- ID: ${m.id}`);
    console.log(`  Filename: ${m.filename}`);
    console.log(`  Alt: ${m.alt}`);
    console.log(`  URL: http://localhost:3000/media/${m.filename}`);
    console.log('');
  });

  console.log('=== POSTS (with coverImage details) ===');
  const posts = await payload.find({ collection: 'posts', limit: 100 });
  posts.docs.forEach(p => {
    console.log(`- ${p.title}`);
    console.log(`  Cover Image ID: ${typeof p.coverImage === 'object' ? (p.coverImage as any).id : p.coverImage}`);
    console.log(`  Cover Image Data: ${JSON.stringify(p.coverImage)}`);
  });
}

checkMedia().catch(console.error);
