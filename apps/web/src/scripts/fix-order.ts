import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function fixOrder() {
  const payload = await getPayload({ config: configPromise });

  const categories = await payload.find({ collection: 'categories', limit: 100 });
  
  for (const cat of categories.docs) {
    let order = 99;
    const name = cat.name.toLowerCase();
    
    if (name.includes("toolkit")) order = 1;
    else if (name.includes("new")) order = 2;
    else if (name.includes("interview")) order = 3;
    else order = 4; // defaults

    await payload.update({
      collection: 'categories',
      id: cat.id,
      data: { order }
    });
  }
  console.log('Categories re-ordered!');
  process.exit(0);
}

fixOrder().catch(console.error);
