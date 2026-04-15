import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function assignCoverImages() {
  const payload = await getPayload({ config: configPromise });

  // Get all posts without cover images
  const posts = await payload.find({ collection: 'posts', limit: 100 });

  for (const post of posts.docs) {
    if (!post.coverImage) {
      console.log(`Updating: ${post.title}`);

      // Assign media ID 2 (Amenity icons-1.png) to posts without images
      await payload.update({
        collection: 'posts',
        id: post.id,
        data: {
          coverImage: 2,
        },
      });

      console.log(`  ✓ Assigned cover image`);
    }
  }

  console.log('\n✅ All posts now have cover images!');
}

assignCoverImages().catch(console.error);
