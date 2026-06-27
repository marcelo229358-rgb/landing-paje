import Image from 'next/image';
import Link from 'next/link';
import { getSiteConfig, type SiteConfig } from '@/lib/config';
import ScrollDownArrow from '@/components/ScrollDownArrow';
import AssinarPorEmail from '@/components/AssinarPorEmail';

async function getHeroFeatures(config: SiteConfig) {
  return [config.feature_1, config.feature_2, config.feature_3, config.feature_4].filter(Boolean);
}

export default async function Hero() {
  const config = await getSiteConfig();
  const beneficios = await getHeroFeatures(config);

  return (
    <section className="px-3 pb-3 pt-1 sm:px-6 sm:pb-10 lg:px-16 lg:pb-16">
      <div className="relative flex min-h-[82svh] flex-col justify-end overflow-hidden rounded-2xl sm:min-h-[calc(100vh-8rem)] sm:justify-center lg:rounded-3xl">
        <Image
          src={config.hero_image}
          alt="Deploy Soluções Digitais"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/40 sm:bg-gradient-to-r sm:from-primary/95 sm:via-primary/80 sm:to-primary/40" />

        <div className="relative z-10 w-full px-4 pb-14 pt-20 sm:ml-8 sm:max-w-4xl sm:pb-0 sm:pt-0 lg:ml-16">
          <div className="mx-auto max-w-2xl text-center sm:mx-0 sm:text-left">
            <div className="mb-5 inline-block rounded-xl bg-white px-4 py-2 shadow-lg sm:mb-8 sm:px-5 sm:py-2.5">
              <Image
                src="/deploy-logo.png"
                alt="Deploy"
                width={200}
                height={64}
                className="mx-auto h-10 w-auto object-contain sm:mx-0 sm:h-14"
                priority
              />
            </div>

            <h1 className="text-2xl font-bold leading-tight tracking-wide text-white sm:text-4xl lg:text-6xl">
              {config.hero_title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-200/90 sm:mt-6 sm:max-w-xl sm:text-lg">
              {config.hero_subtitle}
            </p>

            <div className="mt-6 hidden space-y-3 sm:mt-10 sm:block sm:space-y-4">
              {beneficios.map((item) => (
                <div key={item} className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent sm:h-7 sm:w-7">
                    <svg className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-left text-sm font-medium text-white sm:text-base">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:mt-10">
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/solucoes"
                  className="flex h-12 w-full items-center justify-center rounded-lg bg-accent text-sm font-bold text-white transition-all active:scale-[0.98] sm:inline-flex sm:h-14 sm:w-auto sm:px-10 sm:text-base hover:bg-accent-hover"
                >
                  VER SOLUÇÕES
                </Link>
                <Link
                  href="/contato"
                  className="flex h-12 w-full items-center justify-center rounded-lg border border-white/30 bg-white/10 text-sm font-semibold text-white backdrop-blur-sm transition-all active:scale-[0.98] sm:inline-flex sm:h-14 sm:w-auto sm:px-8 sm:text-base hover:bg-white/20"
                >
                  FALE CONOSCO
                </Link>
              </div>
              <AssinarPorEmail variant="hero" />
            </div>
          </div>
        </div>

        <ScrollDownArrow />
      </div>
    </section>
  );
}
