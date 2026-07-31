import { PenConfigurator } from "@/components/configurator/PenConfigurator";
import { Container } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Configurez votre Un1qpen",
  "Choisissez le coloris, importez votre logo et préparez votre demande de devis personnalisée.",
  "/configurateur",
);

export default function ConfiguratorPage() {
  return <>
    <section className="pb-12 pt-32 md:pb-16 md:pt-40">
      <Container>
        <h1 className="max-w-5xl font-[var(--font-display)] text-[clamp(2.8rem,7vw,6.5rem)] leading-[.95] tracking-[-.055em]">Configurez votre Un1qpen</h1>
        <p className="copy mt-7 max-w-2xl">Choisissez votre coloris, positionnez votre logo et transmettez une configuration complète à notre équipe.</p>
      </Container>
    </section>
    <PenConfigurator/>
  </>;
}
