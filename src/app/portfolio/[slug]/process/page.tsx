import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ProcessPage } from './ProcessPage';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function DesignProcessPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();
  return <ProcessPage project={project} />;
}
