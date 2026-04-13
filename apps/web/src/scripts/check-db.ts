import { getPayload } from 'payload';
import configPromise from '../payload.config';

async function check() {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: 'posts',
  });
  console.log(`Found ${posts.totalDocs} total posts.`);
  posts.docs.forEach((doc: any) => {
    console.log(`- ${doc.title} | Status: ${doc.status} | Published: ${doc.publishedAt}`);
  });
  process.exit(0);
}
check();
