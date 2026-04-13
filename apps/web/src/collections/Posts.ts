import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "category", "publishedAt", "featured"],
    preview: (doc) => `http://localhost:3000/blog/${doc.slug}`,
  },
  access: {
    read: ({ req }) => {
      // Public can read published posts; admins/authors can read all
      if (req.user) return true;
      return {
        status: { equals: "published" },
      };
    },
    create: ({ req }) =>
      req.user?.role === "admin" || req.user?.role === "author",
    update: ({ req }) =>
      req.user?.role === "admin" || req.user?.role === "author",
    delete: ({ req }) => req.user?.role === "admin",
  },
  versions: {
    drafts: true,
  },
  fields: [
    // ── Core ──────────────────────────────────────────────
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "URL slug — lowercase, hyphens only",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      admin: {
        description: "2-3 sentence summary shown on cards and for SEO",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },

    // ── Taxonomy ───────────────────────────────────────────
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },

    // ── Publishing ─────────────────────────────────────────
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      required: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Pin to homepage hero / featured section",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
        description: "Leave empty to auto-set on publish",
      },
    },

    // ── SEO ────────────────────────────────────────────────
    {
      name: "seo",
      type: "group",
      label: "SEO",
      fields: [
        {
          name: "title",
          type: "text",
          admin: {
            description: "Overrides post title in <title> tag (60 chars max)",
          },
        },
        {
          name: "description",
          type: "textarea",
          admin: {
            description: "Meta description (150-160 chars for best results)",
          },
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
          admin: {
            description:
              "Open Graph image shown on social shares (1200×630px), defaults to coverImage",
          },
        },
        {
          name: "noIndex",
          type: "checkbox",
          defaultValue: false,
          label: "Exclude from search engines (noindex)",
        },
      ],
    },

    {
      name: "readingTime",
      type: "number",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Estimated reading time in minutes (auto-calculated)",
      },
    },
    // ── Metrics ────────────────────────────────────────────
    {
      name: "views",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Number of unique views (auto-tracked)",
      },
    },
    {
      name: "likes",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Number of manual likes (auto-tracked)",
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-set publishedAt when status flips to published
        if (data.status === "published" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
  timestamps: true,
};
