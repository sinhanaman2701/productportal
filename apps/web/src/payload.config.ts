import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import path from "path";
import { fileURLToPath } from "url";
import { Users } from "./collections/Users.ts";
import { Posts } from "./collections/Posts.ts";
import { Categories } from "./collections/Categories.ts";
import { Tags } from "./collections/Tags.ts";
import { Media } from "./collections/Media.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "— PM Blog Admin",
      favicon: "/favicon.ico",
    },
  },
  collections: [Users, Posts, Categories, Tags, Media],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET ?? "fallback-secret-change-in-production",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL ?? `file:${path.resolve(dirname, "../../database.db")}`,
    },
  }),
  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },
  cors: process.env.NODE_ENV === "production" ? [] : "*",
});
