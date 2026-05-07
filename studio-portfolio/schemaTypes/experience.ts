import { defineType, defineField } from "sanity"

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      description: "e.g. 2025 – Present",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    // 🔥 important for ordering timeline
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower number appears first",
    }),
  ],
})