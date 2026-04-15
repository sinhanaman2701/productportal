import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function checkPosts() {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({ collection: 'posts', limit: 100 });
  console.log('Total posts:', posts.totalDocs);
  posts.docs.forEach((p) => {
    console.log('- Title:', p.title);
    console.log('  Slug:', p.slug);
    console.log('  Status:', p.status);
    console.log('  Category:', typeof p.category === 'object' ? p.category?.name : p.category);
    console.log('  Cover Image:', typeof p.coverImage === 'object' ? p.coverImage?.id : p.coverImage);
    console.log('  URL: http://localhost:3000/blog/' + p.slug);
    console.log('');
  });
}

checkPosts().catch(console.error);
