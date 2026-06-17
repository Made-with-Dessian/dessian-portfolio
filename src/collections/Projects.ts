import type { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'vehicleType', 'year'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // Core info
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly identifier, e.g. raidframe-dakar',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
    },
    {
      name: 'year',
      type: 'text',
      label: 'Year',
    },

    // Categorization
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      required: true,
      options: [
        { label: 'On Road', value: 'ON ROAD' },
        { label: 'Off Road', value: 'OFF ROAD' },
        { label: 'Mobility', value: 'MOBILITY' },
      ],
    },
    {
      name: 'terrainType',
      type: 'select',
      label: 'Terrain Type',
      options: [
        { label: 'Urban', value: 'URBAN' },
        { label: 'Desert', value: 'DESERT' },
        { label: 'Forest', value: 'FOREST' },
        { label: 'Mountain', value: 'MOUNTAIN' },
        { label: 'Track', value: 'TRACK' },
      ],
    },
    {
      name: 'vehicleType',
      type: 'select',
      label: 'Vehicle Type',
      required: true,
      options: [
        { label: 'SUV', value: 'SUV' },
        { label: 'Sedan', value: 'SEDAN' },
        { label: 'Sports', value: 'SPORTS' },
        { label: 'Wagon', value: 'WAGON' },
        { label: 'Truck', value: 'TRUCK' },
        { label: 'Mobility', value: 'MOBILITY' },
      ],
    },
    {
      name: 'keywords',
      type: 'array',
      label: 'Keywords',
      fields: [
        { name: 'keyword', type: 'text' },
      ],
    },

    // Images
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
    },
    {
      name: 'sideView',
      type: 'upload',
      relationTo: 'media',
      label: 'Side View',
    },
    {
      name: 'frontView',
      type: 'upload',
      relationTo: 'media',
      label: 'Front View',
    },
    {
      name: 'rearView',
      type: 'upload',
      relationTo: 'media',
      label: 'Rear View',
    },
    {
      name: 'userScenario',
      type: 'upload',
      relationTo: 'media',
      label: 'User Scenario Image',
    },
    {
      name: 'referenceImages',
      type: 'array',
      label: 'Reference Images',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'keywords', type: 'array', fields: [{ name: 'keyword', type: 'text' }] },
      ],
    },
    {
      name: 'speedformImages',
      type: 'array',
      label: 'Speedform Images',
      fields: [
        { name: 'stage', type: 'text', label: 'Stage Name (e.g. Reference, Sketch, Speedform, Final)' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'galleryImages',
      type: 'array',
      label: 'Gallery Images',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'caption', type: 'text' },
      ],
    },

    // Persona
    {
      name: 'persona',
      type: 'group',
      label: 'Persona',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'age', type: 'number' },
        { name: 'occupation', type: 'text' },
        {
          name: 'hobbies',
          type: 'array',
          fields: [{ name: 'hobby', type: 'text' }],
        },
        { name: 'story', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },

    // Specifications
    {
      name: 'specifications',
      type: 'group',
      label: 'Specifications',
      fields: [
        { name: 'length', type: 'text' },
        { name: 'width', type: 'text' },
        { name: 'height', type: 'text' },
        { name: 'wheelbase', type: 'text' },
        { name: 'groundClearance', type: 'text' },
        { name: 'powertrain', type: 'text' },
        { name: 'driveType', type: 'text' },
        { name: 'passengers', type: 'text' },
      ],
    },

    // Process / PDF
    {
      name: 'processPdf',
      type: 'upload',
      relationTo: 'media',
      label: 'Design Process PDF',
    },

    // 3D modeling links
    {
      name: 'threeDLinks',
      type: 'array',
      label: '3D Modeling Links',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'relatedWork', type: 'relationship', relationTo: 'three-d-works' },
      ],
    },

    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured on Home Page',
      defaultValue: false,
    },
  ],
};
