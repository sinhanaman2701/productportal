import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "order", "description"],
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
      name: "order",
      type: "number",
      defaultValue: 99,
      admin: {
        description: "Controls the display sequence on the homepage grid (1 is first).",
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
