import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function fixSlug() {
  const payload = await getPayload({ config: configPromise });

  // Find the post with bad slug
  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: 'Commercial vs Internal Products' }
    }
  });

  if (posts.docs.length === 0) {
    console.log('No posts found with bad slug');
    return;
  }

  const post = posts.docs[0];
  if (!post) {
    console.log('Post not found');
    return;
  }
  console.log('Found post:', post.title);
  console.log('Old slug:', post.slug);

  // Update with proper slug
  const updated = await payload.update({
    collection: 'posts',
    id: post.id,
    data: {
      slug: 'commercial-vs-internal-products'
    }
  });

  console.log('New slug:', updated.slug);
  console.log('URL: http://localhost:3000/blog/commercial-vs-internal-products');
}

fixSlug().catch(console.error);
