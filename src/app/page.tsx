import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedSolutions from "@/components/FeaturedSolutions";
import Testimonials from "@/components/Testimonials";
import OrcamentoForm from "@/components/OrcamentoForm";
import AssinarPorEmail from "@/components/AssinarPorEmail";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedSolutions />
      <Testimonials />
      <section className="border-t bg-muted/30 py-10 sm:py-14">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="text-center text-xl font-bold sm:text-2xl">Assine por e-mail</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
            Prefere receber nossa proposta no e-mail? Clique abaixo e preencha o formulário.
          </p>
          <div className="mt-6">
            <AssinarPorEmail />
          </div>
        </div>
      </section>
      <OrcamentoForm />
    </>
  );
}
