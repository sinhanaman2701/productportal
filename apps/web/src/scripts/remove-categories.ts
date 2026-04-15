import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function removeCategories() {
  const payload = await getPayload({ config: configPromise });

  const toDelete = ['product-strategy', 'career-growth'];

  for (const slug of toDelete) {
    const category = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } }
    });

    if (category.docs.length > 0) {
      const categoryId = category.docs[0]?.id;
      if (categoryId) {
        await payload.delete({ collection: 'categories', id: categoryId });
        console.log('Deleted:', slug);
      }
    }
  }

  console.log('Done!');
  process.exit(0);
}

removeCategories().catch(console.error);
