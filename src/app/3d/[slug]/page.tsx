import { threeDWorks } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ThreeDDetail } from './ThreeDDetail';

export async function generateStaticParams() {
  return threeDWorks.map((w) => ({ slug: w.slug }));
}

export default async function ThreeDDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = threeDWorks.find((w) => w.slug === slug);
  if (!work) notFound();
  return <ThreeDDetail work={work} />;
}
