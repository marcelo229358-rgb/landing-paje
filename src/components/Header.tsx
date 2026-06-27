'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { mockSiteConfig } from '@/lib/mock-data';

const links = [
  { href: '/', label: 'Início' },
  { href: '/solucoes', label: 'Soluções' },
  { href: '/sobre', label: 'Sobre Nós' },
  { href: '/contato', label: 'Contato' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsapp = mockSiteConfig.whatsapp;

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:h-16 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <div className="rounded-lg bg-white px-2.5 py-1 sm:px-3 sm:py-1.5">
            <Image
              src="/deploy-logo.png"
              alt="Deploy Soluções Digitais"
              width={160}
              height={44}
              className="h-7 w-auto object-contain sm:h-9"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                pathname === link.href ? 'text-accent' : 'text-zinc-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-10 items-center gap-2 rounded bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover lg:inline-flex"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-white lg:hidden"
          aria-label="Abrir menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-primary lg:hidden">
          <nav className="flex flex-col px-4 py-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-sm font-medium transition-colors hover:text-accent ${
                  pathname === link.href ? 'text-accent' : 'text-zinc-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex h-10 items-center justify-center gap-2 rounded bg-accent text-sm font-semibold text-white"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
