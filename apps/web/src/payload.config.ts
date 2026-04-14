import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
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
  onInit: async (payload) => {
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const existingUsers = await payload.find({
        collection: "users",
        limit: 1,
      });

      if (existingUsers.totalDocs === 0) {
        await payload.create({
          collection: "users",
          data: {
            name: "Super Admin",
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: "admin",
          },
        });
        payload.logger.info(`Initial admin user created successfully with email: ${process.env.ADMIN_EMAIL}`);
      }
    }
  },
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
  db: (() => {
    const databaseUrl = process.env.DATABASE_URL || "";
    if (databaseUrl.startsWith("postgres") || databaseUrl.startsWith("postgresql")) {
      return postgresAdapter({
        pool: {
          connectionString: databaseUrl,
        },
      });
    }
    return sqliteAdapter({
      client: {
        url: databaseUrl || `file:${path.join(process.cwd(), "database.db")}`,
      },
    });
  })(),
  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },
  cors: process.env.NODE_ENV === "production" ? [] : "*",
});
