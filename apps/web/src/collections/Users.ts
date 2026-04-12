import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role", "createdAt"],
  },
  access: {
    read: ({ req }) => req.user?.role === "admin",
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
      name: "role",
      type: "select",
      defaultValue: "reader",
      required: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Author", value: "author" },
        { label: "Reader", value: "reader" },
      ],
      access: {
        update: ({ req }) => req.user?.role === "admin",
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "bio",
      type: "textarea",
    },
  ],
  timestamps: true,
};
