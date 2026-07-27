import { ArrowDown, ArrowUpRight, Check, Factory, Fingerprint, MapPin, PenLine, Recycle, Sparkles } from "lucide-react";
import Image from "next/image";
import { AnimatedReveal } from "@/components/animations/AnimatedReveal";
import { Button, Card, Container, SectionHeading } from "@/components/ui";
import { statistics } from "@/data/statistics";
import { process } from "@/data/process";
import { productFeatures } from "@/data/product";
import { faqs } from "@/data/faq";
import { ProductVisual } from "@/components/animations/ProductVisual";
import { HeroColorVisual } from "@/components/animations/HeroColorVisual";
import { workshopPhotos, workshopVideos } from "@/data/workshop";

export function HeroSection() {
  const points = [[Recycle,"Matière issue de textile recyclé"],[Sparkles,"Sans nouveau pétrole pour le corps"],[MapPin,"Conçu en Europe"],[PenLine,"Personnalisable pour vos idées"]] as const;
  return <section className="hero-home relative flex min-h-[100svh] items-center overflow-hidden bg-[#f7f6f3] pb-7 pt-24 text-[#1d1d1f]">
    <div className="hero-visual absolute inset-y-[5%] right-0 w-[92%] bg-[#f7f6f3]">
      <HeroColorVisual/>
    </div>
    <div className="hero-shade absolute inset-0 bg-[linear-gradient(90deg,rgba(247,246,243,.98)_0%,rgba(247,246,243,.94)_34%,rgba(247,246,243,.62)_48%,rgba(247,246,243,0)_66%)]"/>
    <Container className="hero-container relative z-10">
      <AnimatedReveal className="max-w-[680px]">
        <p className="eyebrow !text-[#17486a]">Innovation matière · objet média</p>
        <h1 className="hero-title mt-5 font-[var(--font-display)] text-[clamp(2.7rem,4.25vw,4.8rem)] leading-[1.01] tracking-[-.055em]">Le premier stylo au monde qui écrit une nouvelle histoire au <span className="text-[#17486a]">textile&nbsp;!</span></h1>
        <p className="hero-intro mt-5 max-w-xl text-[clamp(1rem,1.15vw,1.125rem)] leading-relaxed text-[#40464b]">Un textile industriel destiné à être éliminé devient le corps d’un stylo conçu pour communiquer autrement.</p>
      </AnimatedReveal>
      <AnimatedReveal delay={.14} className="hero-details mt-6 max-w-[700px]">
        <div className="grid grid-cols-2 gap-4 border-y border-black/10 py-4 sm:grid-cols-4">
          {points.map(([Icon,label])=><div key={label}><Icon size={24} strokeWidth={1.4}/><p className="mt-3 max-w-[130px] text-[11px] font-semibold uppercase leading-relaxed tracking-wide">{label}</p></div>)}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="#decouvrir">Découvrir UN1QPEN</Button>
          <Button href="/contact?type=sample" variant="ghost">Demander un échantillon</Button>
        </div>
      </AnimatedReveal>
      <a href="#decouvrir" aria-label="Faire défiler" className="hero-scroll absolute bottom-0 right-0 grid size-12 place-items-center rounded-full border border-black/20 bg-white/50 backdrop-blur"><ArrowDown size={18}/></a>
    </Container>
  </section>;
}

export function ManifestoSection() { return <section id="decouvrir" className="section bg-[#f7f6f3]"><Container><AnimatedReveal><p className="eyebrow mb-8">Notre manifeste</p><p className="max-w-6xl font-[var(--font-serif)] text-[clamp(2.7rem,6vw,6.5rem)] leading-[1.02] tracking-[-.04em]">« D’un textile industriel destiné à être éliminé, nous avons choisi d’écrire une autre destinée. »</p><p className="copy ml-auto mt-12 max-w-xl border-l border-[#17486a]/25 pl-6">UN1QPEN transforme une matière issue de déchets textiles industriels en un objet utile, personnalisable et visible au quotidien.</p></AnimatedReveal></Container></section>; }

const pillars = [
  [Recycle, "Textile recyclé", "Le corps utilise une matière issue de textiles industriels recyclés, fortement chargés en polyester."],
  [Sparkles, "Sans nouveau pétrole pour le corps", "Une matière existante remplace le plastique vierge pour cette partie du produit."],
  [Factory, "Fabrication européenne", "La matière est développée en France et le corps du stylo est injecté en Italie."],
  [Fingerprint, "Une histoire tangible", "Un support de communication concret, tactile et immédiatement compréhensible."],
];
export function ValuePillars() { return <section className="section bg-white"><Container><SectionHeading eyebrow="La proposition" title="Plus qu’un stylo recyclé : une histoire à transmettre."/><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{pillars.map(([Icon,title,text],i)=><AnimatedReveal delay={i*.06} key={String(title)}><Card className="h-full"><Icon size={24}/><h3 className="mt-8 text-xl font-semibold">{String(title)}</h3><p className="mt-4 leading-relaxed text-[#555b60]">{String(text)}</p></Card></AnimatedReveal>)}</div></Container></section>; }

export function KeyFigures() { return <section className="section bg-[#e7eef2] text-[#1d1d1f]"><Container><SectionHeading eyebrow="Repères" title="Une innovation déjà concrète." copy="Des chiffres volontairement formulés avec précision, faciles à mettre à jour."/><div className="grid border-l border-[#17486a]/20 sm:grid-cols-2 lg:grid-cols-4">{statistics.map((s,i)=><AnimatedReveal delay={i*.08} key={s.value} className="border-r border-y border-[#17486a]/20 p-7"><strong className="text-4xl text-[#17486a]">{s.value}</strong><p className="mt-5 text-sm leading-relaxed text-[#555b60]">{s.label}</p></AnimatedReveal>)}</div></Container></section>; }

export function MaterialProcess() { return <section className="section"><Container><SectionHeading eyebrow="Transformation" title="Du textile à l’objet, en cinq gestes."/><ol className="grid gap-0 lg:grid-cols-5">{process.map(([n,t,d],i)=><AnimatedReveal delay={i*.08} key={n} className="relative border-l border-[#17486a] p-6 lg:border-l-0 lg:border-t"><span className="text-xs font-bold text-[#17486a]">{n}</span><h3 className="mt-7 text-xl font-semibold">{t}</h3><p className="mt-3 text-sm leading-relaxed text-[#555b60]">{d}</p></AnimatedReveal>)}</ol></Container></section>; }

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
          <p className="eyebrow">En mouvement</p>
          <h3 className="mt-4 max-w-2xl text-[clamp(2rem,4vw,4rem)] leading-[1.05] tracking-[-.045em]">Voir la matière se transformer.</h3>
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

export function EuropeOriginSection() { return <section className="section overflow-hidden bg-[#edf1f3]"><Container className="grid items-center gap-14 lg:grid-cols-2"><div><SectionHeading eyebrow="Circuit européen" title="Un circuit industriel européen volontairement court." copy="La matière est développée en France. Le corps du stylo est injecté en Italie, dans une usine spécialisée dans la fabrication d’instruments d’écriture."/></div><div className="relative min-h-96 rounded-[2rem] bg-[radial-gradient(circle_at_20%_15%,#2b678f,#123b57_68%)] p-8 shadow-[0_30px_80px_rgba(23,72,106,.18)] text-white"><div className="absolute left-[25%] top-[40%]"><span className="block size-4 rounded-full bg-[#9fc4d8] ring-8 ring-[#9fc4d8]/20"/><b className="mt-3 block">Région lyonnaise</b><small>Matière · France</small></div><div className="absolute bottom-[26%] right-[22%]"><span className="block size-4 rounded-full bg-[#9fc4d8] ring-8 ring-[#9fc4d8]/20"/><b className="mt-3 block">Région de Turin</b><small>Injection · Italie</small></div><svg aria-hidden viewBox="0 0 400 300" className="h-full w-full opacity-20"><path fill="none" stroke="white" strokeWidth="2" d="M49 112l48-56 69 7 48-33 74 32 58 65-39 49 15 70-65 18-42-36-64 26-54-47z"/></svg></div></Container></section>; }

export function ProductShowcase() { return <section className="section bg-white"><Container><div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"><ProductVisual className="overflow-hidden rounded-[2rem] border border-black/5 bg-[#eeeeef] shadow-[0_28px_80px_rgba(0,0,0,.10)] md:rounded-[2.5rem]"><Image src="/images/un1qpen-perspective.png" alt="Vue rapprochée en perspective du stylo UN1QPEN et de son clip transparent" width={2098} height={754} sizes="(max-width: 1024px) 100vw, 50vw" className="h-full min-h-[280px] w-full object-cover md:min-h-[420px]"/></ProductVisual><div><SectionHeading eyebrow="Le produit" title="Un objet utile, pensé pour être vu."/><ul className="grid gap-4">{productFeatures.map(f=><li className="flex gap-3" key={f}><Check className="mt-1 shrink-0 text-[#17486a]" size={18}/>{f}</li>)}</ul><p className="copy mt-6 text-sm">Le clip et les éléments techniques ne sont actuellement pas fabriqués dans la matière textile recyclée.</p><div className="mt-8 flex flex-wrap gap-3"><Button href="/documents/fiche-technique-un1qpen.pdf">Télécharger la fiche technique</Button><Button href="/contact?type=sample" variant="ghost">Recevoir un échantillon</Button></div></div></div></Container></section>; }

export function MaterialTouchSection() { return <section className="textile-surface section bg-[linear-gradient(135deg,#eef3f6,#cbdbe4)] text-[#1d1d1f]"><Container><p className="eyebrow">Expérience matière</p><div className="mt-6 grid gap-12 lg:grid-cols-[1.4fr_.6fr]"><h2 className="h2">Une matière qui se remarque aussi au toucher.</h2><p className="text-lg leading-relaxed text-[#53606a]">La matière épouse finement les détails du moule et donne au corps du stylo un aspect doux et soyeux, différent des plastiques classiques.</p></div></Container></section>; }

export function ProductComparison() { const rows=[["Plastique vierge","Matière neuve","Référence classique"],["Plastique recyclé","Plastique revalorisé","Alternative connue"],["UN1QPEN","Origine textile recyclée","Récit matière, toucher et circuit européen"]]; return <section className="section"><Container><SectionHeading eyebrow="La différence" title="Trois approches. Une origine singulière." copy="UN1QPEN complète les solutions existantes par l’origine textile de sa matière et la force de son récit."/><div className="overflow-x-auto"><table className="w-full min-w-[650px] border-collapse text-left"><thead><tr className="border-b border-[#1d1d1f] text-xs uppercase tracking-widest"><th className="py-5">Solution</th><th>Origine du corps</th><th>Point distinctif</th></tr></thead><tbody>{rows.map((r,i)=><tr key={r[0]} className={i===2?"bg-white font-semibold":"border-b border-[#d2d2d7]"}>{r.map(c=><td className="p-5" key={c}>{c}</td>)}</tr>)}</tbody></table></div></Container></section>; }

export function BrandVisionSection() { const cards=[["01","UN1QPEN","Premier modèle"],["02","UN2QPEN","Prochain développement · vision"],["∞","UN1Q Objects","Futurs objets · vision"]]; return <section className="section bg-[#17486a] text-white"><Container><SectionHeading eyebrow="La vision" title="Le premier produit d’une nouvelle génération d’objets." copy="UN1QPEN est la première démonstration d’une ambition plus large : donner une nouvelle fonction à des matières issues de textiles recyclés et les transformer en objets utiles, désirables et personnalisables."/><div className="grid gap-4 md:grid-cols-3">{cards.map(c=><div key={c[1]} className="rounded-3xl border border-white/20 p-8"><span className="text-[#9fc4d8]">{c[0]}</span><h3 className="mt-20 text-2xl">{c[1]}</h3><p className="mt-2 text-sm text-white/50">{c[2]}</p></div>)}</div></Container></section>; }

export function ProfessionalSection() { const args=["Produit différenciant","Discours immédiatement compréhensible","Forte valeur narrative","Fabrication européenne","Personnalisation","Échantillons sur demande"]; return <section className="section bg-white"><Container><SectionHeading eyebrow="B2B" title="Une innovation pensée pour les professionnels de l’objet média."/><div className="grid gap-12 lg:grid-cols-2"><div className="grid gap-3 sm:grid-cols-2">{args.map(a=><Card key={a}><p className="font-semibold">{a}</p></Card>)}</div><div className="self-center"><p className="copy">Un support visible, quotidien et pertinent pour les campagnes RSE, les lancements, les événements et la communication interne.</p><div className="mt-8 flex flex-wrap gap-3"><Button href="/contact?type=sample">Recevoir un échantillon</Button><Button href="/contact?type=partner" variant="ghost">Devenir partenaire</Button></div></div></div></Container></section>; }

export function UseCases() { const items=["Cadeau d’entreprise","Campagne RSE","Salon professionnel","Lancement de produit","Communication interne","Événement","Cadeau client","Kit de bienvenue","Sensibilisation au recyclage textile"]; return <section className="section"><Container><SectionHeading eyebrow="Cas d’usage" title="Une histoire à faire circuler."/><div className="flex flex-wrap gap-3">{items.map(i=><span className="rounded-full border border-[#dcdad4] bg-white px-5 py-3 text-sm" key={i}>{i}</span>)}</div></Container></section>; }

export function QuoteSection() { return <section className="textile-surface section bg-[#123b57] text-center text-white"><Container><p className="eyebrow">UN1Q Manifesto</p><p className="mx-auto mt-8 max-w-5xl font-[var(--font-serif)] text-[clamp(3rem,7vw,7rem)] leading-none">Plus de solutions,<br/><span className="text-[#9fc4d8]">moins de pollution.</span></p><p className="mt-12 text-white/60">Moins de pétrole, plus d’idées.</p></Container></section>; }

export function FAQ() { return <section className="section bg-white"><Container><SectionHeading eyebrow="Questions fréquentes" title="Dire les choses clairement."/><div className="mx-auto max-w-4xl divide-y divide-[#d2d2d7]">{faqs.map(([q,a])=><details className="group py-6" key={q}><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">{q}<ArrowUpRight className="transition group-open:rotate-90"/></summary><p className="copy mt-4 pr-12 text-base">{a}</p></details>)}</div></Container></section>; }
