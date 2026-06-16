import { ContactSection } from '@/components/sections/ContactSection';

export const metadata = {
  title: 'Contact — Minjae Kim',
  description: 'Get in touch with Minjae Kim, automotive designer.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg pt-24">
      <ContactSection />
    </div>
  );
}
