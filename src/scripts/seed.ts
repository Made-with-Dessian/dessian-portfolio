import { getPayload } from 'payload';
import config from '@payload-config';
import { projects, threeDWorks } from '@/lib/data';

async function seed() {
  const payload = await getPayload({ config });

  console.log('Seeding 3D works...');
  const workIdMap: Record<string, number> = {};
  for (const work of threeDWorks) {
    const created = await payload.create({
      collection: 'three-d-works',
      data: {
        title: work.title,
        slug: work.slug,
        shortDescription: work.shortDescription,
        software: work.software.map((tool) => ({ tool: tool as 'Blender' | 'Alias' | 'Maya' | 'Keyshot' | 'VRED' })),
        featured: true,
      },
    });
    workIdMap[work.slug] = created.id as number;
  }

  console.log('Seeding projects...');
  for (const project of projects) {
    await payload.create({
      collection: 'projects',
      data: {
        title: project.title,
        subtitle: project.subtitle,
        slug: project.slug,
        shortDescription: project.shortDescription,
        year: project.year,
        category: project.category,
        vehicleType: project.vehicleType,
        keywords: project.keywords.map((keyword) => ({ keyword })),
        persona: {
          name: project.persona.name,
          age: project.persona.age,
          occupation: project.persona.occupation,
          hobbies: project.persona.hobbies.map((hobby) => ({ hobby })),
          story: project.persona.story,
        },
        specifications: project.specs,
        referenceImages: project.referenceKeywords.map((keywords) => ({
          keywords: keywords.map((keyword) => ({ keyword })),
        })),
        featured: true,
      },
    });
  }

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
