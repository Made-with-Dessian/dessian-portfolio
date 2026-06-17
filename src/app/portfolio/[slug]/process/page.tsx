import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ProcessPage } from './ProcessPage';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function DesignProcessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProcessPage project={project} />;
}
