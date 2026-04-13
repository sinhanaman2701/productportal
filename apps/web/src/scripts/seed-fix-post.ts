import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function fixPost() {
  const payload = await getPayload({ config: configPromise });

  const categories = await payload.find({ collection: 'categories', limit: 1 });
  const categoryId = categories.docs[0]?.id;

  if (categoryId) {
    const posts = await payload.find({ collection: 'posts', limit: 10 });
    for (const post of posts.docs) {
      await payload.update({
        collection: 'posts',
        id: post.id,
        data: {
          category: categoryId,
        }
      });
    }
    console.log('Post category relations fixed to:', categories.docs[0].name);
  }
  process.exit(0);
}

fixPost().catch(console.error);
