import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "description"],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-safe identifier (e.g. ai-for-pms)",
      },
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "color",
      type: "text",
      admin: {
        description: "Optional hex colour for the category badge",
      },
    },
  ],
  timestamps: true,
};
