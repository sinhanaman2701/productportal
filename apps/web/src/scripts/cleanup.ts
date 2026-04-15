import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function cleanup() {
  console.log('Starting cleanup - deleting all posts, categories, and tags...');
  const payload = await getPayload({ config: configPromise });

  // Delete all posts
  console.log('Deleting posts...');
  const posts = await payload.find({ collection: 'posts', limit: 1000 });
  for (const post of posts.docs) {
    await payload.delete({ collection: 'posts', id: post.id });
    console.log(`  Deleted post: ${post.title}`);
  }
  console.log(`Deleted ${posts.docs.length} posts.`);

  // Delete all categories
  console.log('Deleting categories...');
  const categories = await payload.find({ collection: 'categories', limit: 1000 });
  for (const category of categories.docs) {
    await payload.delete({ collection: 'categories', id: category.id });
    console.log(`  Deleted category: ${category.name}`);
  }
  console.log(`Deleted ${categories.docs.length} categories.`);

  // Delete all tags
  console.log('Deleting tags...');
  const tags = await payload.find({ collection: 'tags', limit: 1000 });
  for (const tag of tags.docs) {
    await payload.delete({ collection: 'tags', id: tag.id });
    console.log(`  Deleted tag: ${tag.name}`);
  }
  console.log(`Deleted ${tags.docs.length} tags.`);

  console.log('\n✅ Cleanup complete! Database is now empty.');
  process.exit(0);
}

cleanup().catch((err) => {
  console.error('Cleanup error:', err);
  process.exit(1);
});
