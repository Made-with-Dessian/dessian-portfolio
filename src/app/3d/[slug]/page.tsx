import { threeDWorks } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ThreeDDetail } from './ThreeDDetail';

export async function generateStaticParams() {
  return threeDWorks.map((w) => ({ slug: w.slug }));
}

export default function ThreeDDetailPage({ params }: { params: { slug: string } }) {
  const work = threeDWorks.find((w) => w.slug === params.slug);
  if (!work) notFound();
  return <ThreeDDetail work={work} />;
}
