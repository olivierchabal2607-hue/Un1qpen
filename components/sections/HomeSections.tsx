import { ArrowDown, ArrowUpRight, Check, Diamond, Factory, Fingerprint, Lightbulb, MapPin, Milk, PenLine, Recycle, Shirt, Smile, Sparkles } from "lucide-react";
import Image from "next/image";
import { AnimatedReveal } from "@/components/animations/AnimatedReveal";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import { process } from "@/data/process";
import { productFeatures } from "@/data/product";
import { faqs } from "@/data/faq";
import { ProductVisual } from "@/components/animations/ProductVisual";
import { HeroColorVisual } from "@/components/animations/HeroColorVisual";
import { workshopPhotos, workshopVideos } from "@/data/workshop";

function RtexIcon({ size = 23 }: { size?: number; strokeWidth?: number }) {
  return <span
    aria-hidden="true"
    className="inline-block bg-current"
    style={{
      width: size * (172 / 211),
      height: size + 4,
      WebkitMask: "url('/images/rtex-icon.png') center / contain no-repeat",
      mask: "url('/images/rtex-icon.png') center / contain no-repeat",
      filter: "drop-shadow(.55px 0 currentColor) drop-shadow(-.55px 0 currentColor) drop-shadow(0 .55px currentColor) drop-shadow(0 -.55px currentColor)",
    }}
  />;
}

export function HeroSection() {
  const points = [
    [RtexIcon, "RTEX", "Textile recyclé en France", null],
    [Recycle, "Matière issue du recyclage", "À 95 %", null],
    [Sparkles, "Sans pétrole ajouté", "Pour le corps du stylo", null],
    [MapPin, "Circuit ultra-court", "100 % made in Europe", null],
    [PenLine, "Vos idées", "Personnalisables à l’infini", null],
    [Lightbulb, "L’objet média", "Qui répond à toutes vos exigences RSE !", null],
    [Smile, "Une expérience", "d’écriture XXL", null],
    [Diamond, "Simplement élégant", "Sobre, premium et mémorable.", null],
  ] as const;
  return <section className="hero-home relative flex min-h-[100svh] items-center overflow-hidden bg-[#f7f6f3] pb-7 pt-24 text-[#1d1d1f]">
    <div className="hero-visual absolute inset-y-[5%] right-0 w-[92%] bg-[#f7f6f3]">
      <HeroColorVisual/>
    </div>
    <div className="hero-shade absolute inset-0 bg-[linear-gradient(90deg,rgba(247,246,243,.98)_0%,rgba(247,246,243,.94)_34%,rgba(247,246,243,.62)_48%,rgba(247,246,243,0)_66%)]"/>
    <Container className="hero-container relative z-10">
      <AnimatedReveal className="max-w-[680px]">
        <h1 className="hero-title font-[var(--font-display)] text-[clamp(2.7rem,4.25vw,4.8rem)] leading-[1.01] tracking-[-.055em]">Le premier stylo au monde qui écrit une nouvelle histoire au <span className="text-[#17486a]">textile&nbsp;!</span></h1>
        <p className="hero-intro mt-5 max-w-xl text-[clamp(1rem,1.15vw,1.125rem)] leading-relaxed text-[#40464b]">Un textile industriel destiné à être éliminé devient le corps d’un stylo conçu pour communiquer autrement.</p>
      </AnimatedReveal>
      <AnimatedReveal delay={.14} className="hero-details mt-6 max-w-[700px]">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-y border-black/10 py-4 sm:grid-cols-3">
          {points.map(([Icon,title,detail,note])=><div key={title}><Icon size={23} strokeWidth={1.4}/><p className="mt-2 max-w-[180px] text-[10px] font-semibold uppercase leading-relaxed tracking-wide">{title}<span className="block text-[#555b60]">{detail}</span>{note && <span className="block font-medium normal-case text-[#6e6e73]">{note}</span>}</p></div>)}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="#decouvrir">Découvrir Un1qpen</Button>
          <Button href="/contact?type=sample" variant="ghost">Demander un échantillon</Button>
        </div>
      </AnimatedReveal>
      <a href="#decouvrir" aria-label="Faire défiler" className="hero-scroll absolute bottom-0 right-0 grid size-12 place-items-center rounded-full border border-black/20 bg-white/50 backdrop-blur"><ArrowDown size={18}/></a>
    </Container>
  </section>;
}

export function ManifestoSection() { return <section id="decouvrir" className="section bg-[#f7f6f3]"><Container><AnimatedReveal><p className="max-w-6xl font-[var(--font-serif)] text-[clamp(2.7rem,6vw,6.5rem)] leading-[1.02] tracking-[-.04em]">« D’un textile industriel destiné à être éliminé, nous avons choisi d’écrire <span className="whitespace-nowrap">une autre page. »</span></p><p className="copy ml-auto mt-12 max-w-xl border-l border-[#17486a]/25 pl-6">Un1qpen transforme une matière issue de déchets textiles industriels en un objet visible, personnalisable et utile au quotidien.</p></AnimatedReveal></Container></section>; }

const pillars = [
  [Recycle, "Textile recyclé", "Le corps utilise une matière issue de textiles industriels recyclés, fortement chargés en polyester."],
  [Sparkles, "Sans pétrole ajouté pour le corps", "Une matière existante remplace le plastique vierge pour cette partie du produit."],
  [Factory, "Fabrication européenne", "La matière est transformée en France. Un1qpen est ensuite injecté, assemblé et personnalisé en Italie."],
  [Fingerprint, "Une histoire tangible", "Un support de communication concret, tactile et immédiatement compréhensible."],
];
export function ValuePillars() { return <section className="section bg-white"><Container><SectionHeading eyebrow="La proposition" title="Plus qu’un stylo recyclé : une histoire à transmettre."/><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{pillars.map(([Icon,title,text],i)=><AnimatedReveal delay={i*.06} key={String(title)}><Card className="h-full"><Icon size={24}/><h3 className="mt-8 text-xl font-semibold">{String(title)}</h3><p className="mt-4 leading-relaxed text-[#555b60]">{String(text)}</p></Card></AnimatedReveal>)}</div></Container></section>; }

export function KeyFigures() { return <section className="section bg-[#e7eef2] text-[#1d1d1f]"><Container><AnimatedReveal className="max-w-4xl"><h2 className="h2">Une innovation déjà en marche et adoptée.</h2><div className="mt-8 max-w-3xl space-y-6"><p className="copy">Depuis son lancement, UN1QPEN connaît un démarrage très prometteur.</p><p className="copy">Les premiers mois enregistrent d’excellents résultats et confirment le fort intérêt des entreprises pour un stylo innovant et élégant, fabriqué à partir de textile recyclé en France et injecté en Italie.</p></div></AnimatedReveal></Container></section>; }

export function MaterialProcess() { return <section className="section"><Container><div className="mb-14"><h2 className="h2"><span className="whitespace-nowrap">Du textile à l’objet,</span><span className="block">en 5 étapes.</span></h2></div><ol className="grid gap-0 lg:grid-cols-5">{process.map(([n,t,d],i)=><AnimatedReveal delay={i*.08} key={n} className="relative border-l border-[#17486a] p-6 lg:border-l-0 lg:border-t"><span className="text-xs font-bold text-[#17486a]">{n}</span><h3 className="mt-7 text-xl font-semibold lg:min-h-14">{t}</h3><p className="mt-3 text-sm leading-relaxed text-[#555b60]">{d}</p></AnimatedReveal>)}</ol></Container></section>; }

export function TextilePetStorySection() {
  return <section className="section overflow-hidden bg-[#f7f6f3] text-[#1d1d1f]">
    <Container>
      <AnimatedReveal>
        <h2 className="max-w-5xl font-[var(--font-display)] text-[clamp(2.7rem,6vw,6rem)] leading-[.98] tracking-[-.055em]">
          Une même famille de matière. Deux histoires très différentes.
        </h2>
        <p className="copy mt-8 max-w-3xl text-lg">
          Le polyester utilisé dans les textiles et le PET des bouteilles sont chimiquement très proches. Leur différence vient principalement de leur usage initial et de leur forme.
        </p>
      </AnimatedReveal>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        <AnimatedReveal>
          <article className="h-full rounded-[2rem] border border-[#dcdad4] bg-white p-8 md:p-10">
            <Milk className="text-[#17486a]" size={30} strokeWidth={1.5}/>
            <p className="eyebrow mt-12">Bouteille</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-.035em]">Du PET sous forme rigide</h3>
            <p className="copy mt-5">Transparent et résistant, il bénéficie déjà d’une filière de recyclage largement connue et développée.</p>
          </article>
        </AnimatedReveal>
        <AnimatedReveal delay={.08}>
          <article className="h-full rounded-[2rem] border border-[#17486a]/20 bg-[#e7eef2] p-8 md:p-10">
            <Shirt className="text-[#17486a]" size={30} strokeWidth={1.5}/>
            <p className="eyebrow mt-12">Textile</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-.035em]">Du PET sous forme de fibres</h3>
            <p className="copy mt-5">Filé, tissé ou tricoté, il est plus complexe à valoriser lorsqu’il devient un déchet textile industriel.</p>
          </article>
        </AnimatedReveal>
      </div>

      <AnimatedReveal className="mt-4 rounded-[2rem] bg-[#17486a] px-7 py-12 text-white md:px-12 md:py-16">
        <p className="max-w-5xl font-[var(--font-serif)] text-[clamp(2.4rem,5vw,5.4rem)] leading-[1.02] tracking-[-.035em]">
          « Une bouteille en plastique devient souvent un vêtement. Un1qpen fait l’inverse : un textile devient un objet durable du quotidien. »
        </p>
      </AnimatedReveal>

      <div className="mt-16 grid gap-8 border-t border-[#17486a]/20 pt-10 lg:grid-cols-[.7fr_1.3fr]">
        <div aria-hidden="true"/>
        <AnimatedReveal delay={.08}>
          <h3 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-.035em] md:text-5xl">
            Partir d’un déchet textile, plutôt que d’une bouteille.
          </h3>
          <p className="copy mt-7 max-w-2xl text-lg">
            Nous donnons une seconde vie à des textiles industriels riches en polyester en les transformant en une nouvelle matière destinée à fabriquer le corps de Un1qpen.
          </p>
        </AnimatedReveal>
      </div>
    </Container>
  </section>;
}

export function WorkshopSection() {
  return <section className="section overflow-hidden bg-[#eef2f4]">
    <Container>
      <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
        <SectionHeading eyebrow="Preuve industrielle" title="Dans l’atelier, la matière change d’état." copy="De la fibre au granulé, puis au produit fini : ces images montrent les étapes réelles de la transformation de la matière utilisée pour le corps du stylo."/>
        <AnimatedReveal className="relative min-h-[300px] overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(23,72,106,.12)] md:min-h-[420px]">
          <Image src={workshopPhotos[0].src} alt={workshopPhotos[0].alt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover"/>
          <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] backdrop-blur">{workshopPhotos[0].label}</span>
        </AnimatedReveal>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {workshopPhotos.slice(1).map((photo,i)=><AnimatedReveal key={photo.src} delay={i*.07} className="group">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-white">
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.03]"/>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[.15em] text-[#17486a]">{photo.label}</p>
        </AnimatedReveal>)}
      </div>

      <div className="mt-20 flex items-end justify-between gap-8">
        <div>
          <h3 className="max-w-2xl text-[clamp(2rem,4vw,4rem)] leading-[1.05] tracking-[-.045em]">Voir la matière se transformer.</h3>
        </div>
        <p className="hidden max-w-sm text-sm leading-relaxed text-[#555b60] md:block">Les séquences sont lancées uniquement à votre demande afin de limiter le chargement de la page.</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {workshopVideos.map((video,i)=><AnimatedReveal key={video.src} delay={i*.06}>
          <figure className="overflow-hidden rounded-[1.5rem] bg-[#17486a] text-white shadow-[0_20px_60px_rgba(23,72,106,.12)]">
            <video controls playsInline preload="metadata" poster={video.poster} className="aspect-video w-full bg-black/10 object-cover" aria-label={video.title}>
              <source src={video.src} type="video/mp4"/>
              Votre navigateur ne permet pas de lire cette vidéo.
            </video>
            <figcaption className="px-5 py-4 text-sm font-medium"><span className="mr-3 text-white/45">0{i+1}</span>{video.title}</figcaption>
          </figure>
        </AnimatedReveal>)}
      </div>
    </Container>
  </section>;
}

export function EuropeOriginSection() {
  return <section className="section overflow-hidden bg-[#edf1f3]">
    <Container className="grid items-center gap-10 lg:grid-cols-[.48fr_1.52fr] lg:gap-12">
      <div>
        <SectionHeading eyebrow="Circuit européen" title="Un circuit industriel européen volontairement court." copy="La matière est développée en France. Le corps du stylo est injecté en Italie, dans une usine spécialisée dans la fabrication d’instruments d’écriture."/>
      </div>
      <AnimatedReveal>
        <Image
          src="/images/circuit-industriel-europeen-clean.jpg"
          alt="Présentation du circuit industriel européen de Un1qpen entre Lyon et Turin"
          width={1516}
          height={960}
          sizes="(max-width: 1024px) 100vw, 68vw"
          className="h-auto w-full"
        />
      </AnimatedReveal>
    </Container>
  </section>;
}

export function ProductShowcase() { return <section className="section bg-white"><Container><div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"><ProductVisual className="overflow-hidden rounded-[2rem] border border-black/5 bg-[#eeeeef] shadow-[0_28px_80px_rgba(0,0,0,.10)] md:rounded-[2.5rem]"><Image src="/images/un1qpen-color-warm-grey.png" alt="Vue rapprochée en perspective du stylo Un1qpen Warm Grey et de son clip transparent" width={1774} height={887} sizes="(max-width: 1024px) 100vw, 50vw" className="h-full min-h-[280px] w-full object-cover md:min-h-[420px]"/></ProductVisual><div><SectionHeading eyebrow="Le produit" title="Un objet utile, pensé pour être vu."/><ul className="grid gap-4">{productFeatures.map(f=><li className="flex gap-3" key={f}><Check className="mt-1 shrink-0 text-[#17486a]" size={18}/>{f}</li>)}</ul><p className="copy mt-6 text-sm">Le clip et les éléments techniques ne sont actuellement pas fabriqués dans la matière textile recyclée.</p><div className="mt-8 flex flex-wrap gap-3"><Button href="/documents/fiche-technique-un1qpen.pdf">Télécharger la fiche technique</Button><Button href="/contact?type=sample" variant="ghost">Recevoir un échantillon</Button></div></div></div></Container></section>; }

export function EleganceStatement() { return <section className="overflow-hidden bg-[#f7f6f3] py-24 md:py-36"><Container><AnimatedReveal><p className="text-center font-[var(--font-serif)] text-[clamp(3rem,7vw,7.5rem)] leading-[.95] tracking-[-.045em]">Un1qpen&nbsp;:<br className="sm:hidden"/> <span className="text-[#17486a]">simplement élégant.</span></p></AnimatedReveal></Container></section>; }

export function MaterialTouchSection() { return <section className="textile-surface section bg-[linear-gradient(135deg,#eef3f6,#cbdbe4)] text-[#1d1d1f]"><Container><div className="grid gap-12 lg:grid-cols-[1.4fr_.6fr]"><h2 className="h2">Un toucher soyeux, une matière douce pour un plaisir d’écrire XXL.</h2><div><p className="text-lg leading-relaxed text-[#53606a]">La matière épouse finement les détails du moule et donne au corps du stylo un aspect doux et soyeux, différent des plastiques classiques.</p><p className="mt-5 text-lg leading-relaxed text-[#53606a]">Sans oublier une expérience d’écriture <span className="whitespace-nowrap">«&nbsp;waouh&nbsp;»</span>, grâce à une recharge à pointe Large qui offre une fluidité rare&nbsp;!</p></div></div></Container></section>; }

export function ProductComparison() { return <section className="section"><Container><SectionHeading eyebrow="La différence" title="Trois approches. Une origine singulière. Plus de solutions, moins de pollution !" copy="Un1qpen complète les solutions existantes par l’origine textile de sa matière et la force de son récit."/></Container></section>; }

export function BrandVisionSection() {
  return <section className="section bg-[#17486a] text-white">
    <Container>
      <AnimatedReveal className="max-w-4xl">
        <h2 className="h2">Le premier produit d’une nouvelle génération d’objets.</h2>
        <div className="mt-7 max-w-2xl space-y-7">
          <p className="copy text-white/78">Un1qpen est la première démonstration d’une volonté plus large : donner une nouvelle fonction à des matières issues de textiles recyclés et les transformer en objets utiles, désirables et personnalisables.</p>
          <div className="space-y-7">
            <p className="copy text-white/78">Le projet Un1q’Objects a pour ambition de poursuivre l’innovation avec comme objectif majeur : préserver notre planète !</p>
            <div>
              <p className="copy text-white/78">Des idées sans pétrole ajouté !</p>
              <p className="copy text-white/78">Bientôt de nouveaux projets verront le jour…</p>
              <p className="copy text-white/78">Parce que plus de solutions, c’est moins de pollution : restez connectés !</p>
            </div>
          </div>
        </div>
      </AnimatedReveal>
    </Container>
  </section>;
}

export function ProfessionalSection() { const args=["Produit différenciant","Discours immédiatement compréhensible","Forte valeur narrative","Fabrication européenne","Personnalisation","Échantillons sur demande"]; return <section className="section bg-white"><Container><SectionHeading eyebrow="B2B" title="Une innovation pensée pour les professionnels de l’objet média."/><div className="grid gap-12 lg:grid-cols-2"><div className="grid gap-3 sm:grid-cols-2">{args.map(a=><Card key={a}><p className="font-semibold">{a}</p></Card>)}</div><div className="self-center"><p className="copy">Un support visible, quotidien et pertinent pour les campagnes RSE, les lancements, les événements et la communication interne.</p><div className="mt-8 flex flex-wrap gap-3"><Button href="/contact?type=sample">Recevoir un échantillon</Button><Button href="/contact?type=partner" variant="ghost">Devenir partenaire</Button></div></div></div></Container></section>; }

export function UseCases() { const items=["Cadeau d’entreprise","Campagne RSE","Salon professionnel","Lancement de produit","Communication interne","Événement","Cadeau client","Kit de bienvenue","Sensibilisation au recyclage textile"]; return <section className="section"><Container><SectionHeading eyebrow="Cas d’usage" title="Une histoire à faire circuler."/><div className="flex flex-wrap gap-3">{items.map(i=><span className="rounded-full border border-[#dcdad4] bg-white px-5 py-3 text-sm" key={i}>{i}</span>)}</div></Container></section>; }

export function QuoteSection() { return <section className="textile-surface section bg-[#87a8b9] text-center"><Container><p className="mx-auto max-w-6xl font-[var(--font-serif)] text-[clamp(3rem,7vw,7rem)] leading-[1.02] tracking-[-.04em]"><span className="text-[#0055a4]">Plus de solutions,</span><br/><span className="text-white">moins de pollution…</span><br/><span className="text-[#ef4135]">Des idées, moins de déchets&nbsp;!</span></p></Container></section>; }

export function FAQ() { return <section className="section bg-white"><Container><SectionHeading eyebrow="Questions fréquentes" title="Dire les choses clairement."/><div className="mx-auto max-w-4xl divide-y divide-[#d2d2d7]">{faqs.map(([q,a])=><details className="group py-6" key={q}><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">{q}<ArrowUpRight className="transition group-open:rotate-90"/></summary><p className="copy mt-4 pr-12 text-base">{a}</p></details>)}</div></Container></section>; }
