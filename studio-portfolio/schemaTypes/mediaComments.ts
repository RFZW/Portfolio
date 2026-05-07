import { defineType, defineField } from "sanity"

export default defineType({
  name: "mediaComment",
  title: "Media Comment",
  type: "document",
  fields: [
    defineField({
      name: "projectId",
      title: "Project ID",
      type: "string",
      description: "Must match project.id (e.g. fyp, elec)",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "images",
      title: "Image Descriptions",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    }),

    defineField({
      name: "video",
      title: "Video Description",
      type: "string",
    }),
  ],
})