import { defineType, defineField } from "sanity"

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    // 🔹 Basic Info
    defineField({
      name: "name",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "id",
      title: "ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: ["Game", "Web App"],
      },
    }),

    defineField({
      name: "team",
      title: "Team",
      type: "string",
      options: {
        list: ["Solo", "Group"],
      },
    }),

    defineField({
      name: "noimages",
      title: "Number of Images",
      type: "number",
    }),

    defineField({
      name: "video",
      title: "Has Video",
      type: "boolean",
    }),

    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
    }),

    // 🔹 Tools (unchanged)
    defineField({
      name: "tools",
      title: "Tools Used",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "category",
              title: "Category",
              type: "string",
            },
            {
              name: "items",
              title: "Items",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    }),

    // 🔹 Lists
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "contributions",
      title: "Contributions",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "challenges",
      title: "Challenges",
      type: "text",
    }),

    defineField({
      name: "links",
      title: "Links",
      type: "object",
      fields: [
        { name: "repo", type: "url", title: "Repository" },
        { name: "live", type: "url", title: "Live Site" },
      ],
    }),

    // 🔥 NEW: Cloudinary Images
    defineField({
      name: "media",
      title: "Media",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "type",
              title: "Media Type",
              type: "string",
              options: {
                list: ["image", "video"],
              },
            },
            {
              name: "url",
              title: "Cloudinary URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    }),

    // 🔹 Ordering
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
})