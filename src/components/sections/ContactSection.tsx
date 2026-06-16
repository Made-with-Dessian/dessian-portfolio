'use client';

import { motion } from 'framer-motion';
import { Mail, ExternalLink, Link2 } from 'lucide-react';

const contacts = [
  { label: 'EMAIL', href: 'mailto:minjae@example.com', icon: Mail, value: 'minjae@example.com' },
  { label: 'INSTAGRAM', href: 'https://instagram.com', icon: Link2, value: '@minjaekim.design' },
  { label: 'BEHANCE', href: 'https://behance.net', icon: ExternalLink, value: 'behance.net/minjaekim' },
  { label: 'ARTSTATION', href: 'https://artstation.com', icon: ExternalLink, value: 'artstation.com/minjaekim' },
];

export function ContactSection() {
  return (
    <section className="py-40 px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-[10px] tracking-[0.3em] text-muted font-semibold">06 — CONTACT</span>
          <span className="flex-1 h-px bg-bg-secondary" />
        </motion.div>

        <div className="mb-24">
          <div className="overflow-hidden mb-3">
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,8vw,8rem)] font-black tracking-[-0.02em] leading-[0.85] text-text-primary"
            >
              Let&apos;s Create
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,8vw,8rem)] font-black tracking-[-0.02em] leading-[0.85] text-accent"
            >
              Something New.
            </motion.h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              data-cursor={contact.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group border border-bg-secondary p-8 hover:border-accent hover:bg-accent/5 transition-all duration-400"
            >
              <contact.icon size={16} className="text-muted group-hover:text-accent mb-6 transition-colors duration-300" />
              <div className="text-[9px] tracking-[0.3em] font-semibold text-muted mb-2">{contact.label}</div>
              <div className="text-sm font-light text-text-primary group-hover:text-accent transition-colors duration-300 truncate">
                {contact.value}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
