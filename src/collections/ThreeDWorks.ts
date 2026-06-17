import type { CollectionConfig } from 'payload';

export const ThreeDWorks: CollectionConfig = {
  slug: 'three-d-works',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Title' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'Slug' },
    { name: 'shortDescription', type: 'textarea', label: 'Short Description' },
    {
      name: 'software',
      type: 'array',
      label: 'Software Used',
      fields: [
        {
          name: 'tool',
          type: 'select',
          options: ['Blender', 'Alias', 'Maya', 'Keyshot', 'VRED'],
        },
      ],
    },
    { name: 'beautyRender', type: 'upload', relationTo: 'media', label: 'Beauty Render' },
    { name: 'clayRender', type: 'upload', relationTo: 'media', label: 'Clay Render' },
    { name: 'wireframeRender', type: 'upload', relationTo: 'media', label: 'Wireframe Render' },
    { name: 'topologyImage', type: 'upload', relationTo: 'media', label: 'Topology Image' },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured on Home Page',
      defaultValue: false,
    },
  ],
};
