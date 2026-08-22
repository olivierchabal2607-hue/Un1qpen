import type { Metadata } from "next";
import Image from "next/image";
import { Check, Diamond, Factory, Fingerprint, Lightbulb, MapPin, PenLine, Recycle, Smile, Sparkles } from "lucide-react";
import { Button, Card, Container } from "@/components/ui";
import { ProductVisual } from "@/components/animations/ProductVisual";
import { HeroColorVisual } from "@/components/animations/HeroColorVisual";
import { productFeatures } from "@/data/product";

export const metadata: Metadata = {
  title: "Un1qpen — The recycled textile pen",
  description: "A professional pen whose barrel gives recycled industrial textiles a new purpose.",
  alternates: { canonical: "/en", languages: { fr: "/", en: "/en" } },
};

const features = [
  [Recycle, "Recycled material", "Made with 95% recycled textile material"],
  [Sparkles, "No added petroleum", "For the pen barrel"],
  [MapPin, "Short supply chain", "100% made in Europe"],
  [PenLine, "Your ideas", "Endless customisation options"],
  [Lightbulb, "A communication medium", "Designed to support your CSR goals"],
  [Smile, "A smooth", "XXL writing experience"],
  [Diamond, "Simply elegant", "Understated, premium and memorable"],
] as const;

const pillars = [
  [Recycle, "Recycled textile", "The barrel uses a material made from recycled industrial textiles with a high polyester content."],
  [Sparkles, "No petroleum added to the barrel", "An existing material replaces virgin plastic for this part of the product."],
  [Factory, "Made in Europe", "The material is transformed in France. Un1qpen is then moulded, assembled and customised in Italy."],
  [Fingerprint, "A tangible story", "A concrete, tactile communication medium that is immediately easy to understand."],
] as const;

const steps = [
  ["01", "Collect", "Industrial and post-industrial textiles that were destined for disposal are selected."],
  ["02", "Sort", "Textiles with a high polyester content are identified for transformation."],
  ["03", "Transform", "The fibres are processed into a new raw material in the form of pellets."],
  ["04", "Mould", "The Un1qpen barrel is injection-moulded in the Turin region."],
  ["05", "Write", "The material becomes a useful, visible and customisable everyday object."],
] as const;

const useCases = ["Corporate gifts", "CSR campaigns", "Trade shows", "Product launches", "Internal communication", "Events", "Customer gifts", "Welcome kits", "Textile recycling awareness"];

export default function EnglishHome() {
  return <>
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#f7f6f3] pb-12 pt-28 text-[#1d1d1f]">
      <div className="absolute inset-y-[5%] right-0 w-[92%] bg-[#f7f6f3]"><HeroColorVisual/></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,246,243,.98)_0%,rgba(247,246,243,.94)_34%,rgba(247,246,243,.62)_48%,rgba(247,246,243,0)_66%)]"/>
      <Container className="relative z-10">
        <div className="max-w-[680px]">
          <h1 className="font-[var(--font-display)] text-[clamp(2.7rem,4.25vw,4.8rem)] leading-[1.01] tracking-[-.055em]">The world’s first pen to write a new chapter for <span className="text-[#17486a]">textiles.</span></h1>
          <p className="mt-5 max-w-xl text-[clamp(1rem,1.15vw,1.125rem)] leading-relaxed text-[#40464b]">Industrial textile destined for disposal becomes the barrel of a pen designed to communicate differently.</p>
        </div>
        <div className="mt-7 max-w-[700px]">
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-y border-black/10 py-4 sm:grid-cols-3">{features.map(([Icon,title,detail])=><div key={title}><Icon size={23} strokeWidth={1.4}/><p className="mt-2 max-w-[180px] text-[10px] font-semibold uppercase leading-relaxed tracking-wide">{title}<span className="block text-[#555b60]">{detail}</span></p></div>)}</div>
          <div className="mt-5 flex flex-wrap gap-3"><Button href="#story">Discover Un1qpen</Button><Button href="#contact" variant="ghost">Request a sample</Button></div>
        </div>
      </Container>
    </section>

    <section id="story" className="section bg-[#f7f6f3] scroll-mt-24"><Container><p className="max-w-6xl font-[var(--font-serif)] text-[clamp(2.7rem,6vw,6.5rem)] leading-[1.02] tracking-[-.04em]">“We chose to write a new chapter for industrial textile that was destined to disappear.”</p><p className="copy ml-auto mt-12 max-w-xl border-l border-[#17486a]/25 pl-6">Un1qpen turns material made from industrial textile waste into a visible, customisable and useful everyday object.</p></Container></section>

    <section className="section bg-white"><Container><p className="eyebrow">Our proposition</p><h2 className="h2 mt-4 max-w-5xl">More than a recycled pen: a story worth sharing.</h2><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{pillars.map(([Icon,title,text])=><Card className="h-full" key={title}><Icon size={24}/><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-4 leading-relaxed text-[#555b60]">{text}</p></Card>)}</div></Container></section>

    <section id="material" className="section scroll-mt-24"><Container><p className="eyebrow">The material</p><h2 className="h2 mt-4">From textile to object,<span className="block">in five steps.</span></h2><ol className="mt-14 grid lg:grid-cols-5">{steps.map(([number,title,text])=><li className="border-l border-[#17486a] p-6 lg:border-l-0 lg:border-t" key={number}><span className="text-xs font-bold text-[#17486a]">{number}</span><h3 className="mt-7 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-[#555b60]">{text}</p></li>)}</ol></Container></section>

    <section id="product" className="section scroll-mt-24 bg-white"><Container><div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"><ProductVisual className="overflow-hidden rounded-[2rem] border border-black/5 bg-[#eeeeef] shadow-[0_28px_80px_rgba(0,0,0,.10)]"><Image src="/images/un1qpen-color-warm-grey.png" alt="Close-up view of the Warm Grey Un1qpen" width={1774} height={887} className="h-full min-h-[280px] w-full object-cover md:min-h-[420px]"/></ProductVisual><div><p className="eyebrow">The product</p><h2 className="h2 mt-4">A useful object, designed to be seen.</h2><ul className="mt-8 grid gap-4">{productFeatures.map((feature,index)=><li className="flex gap-3" key={feature}><Check className="mt-1 shrink-0 text-[#17486a]" size={18}/>{["A distinctive material with a unique feel","A smooth, comfortable writing experience","A sober design created for brand customisation","A useful everyday communication medium"][index] ?? feature}</li>)}</ul><p className="copy mt-6 text-sm">The clip and technical components are not currently made from the recycled textile material.</p></div></div></Container></section>

    <section className="section bg-[linear-gradient(135deg,#eef3f6,#cbdbe4)]"><Container><div className="grid gap-12 lg:grid-cols-[1.4fr_.6fr]"><h2 className="h2">A silky feel, a soft material for an XXL writing experience.</h2><div><p className="text-lg leading-relaxed text-[#53606a]">The material captures the mould’s finest details and gives the pen barrel a soft, silky appearance unlike conventional plastics.</p><p className="mt-5 text-lg leading-relaxed text-[#53606a]">A large-tip refill also provides a remarkably smooth writing experience.</p></div></div></Container></section>

    <section id="professionals" className="section scroll-mt-24 bg-white"><Container><p className="eyebrow">For professionals</p><h2 className="h2 mt-4 max-w-5xl">An innovation designed for the promotional products market.</h2><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{["Distinctive product","Immediately understandable message","Strong material story","European manufacturing","Customisation","Samples on request"].map(item=><Card key={item}><p className="font-semibold">{item}</p></Card>)}</div><p className="copy mt-10 max-w-3xl">A visible, useful communication medium for CSR campaigns, launches, events and internal communications.</p><div className="mt-10 flex flex-wrap gap-3">{useCases.map(item=><span className="rounded-full border border-[#dcdad4] bg-white px-5 py-3 text-sm" key={item}>{item}</span>)}</div></Container></section>

    <section className="section bg-[#87a8b9] text-center"><Container><p className="mx-auto max-w-6xl font-[var(--font-serif)] text-[clamp(3rem,7vw,7rem)] leading-[1.02] tracking-[-.04em]"><span className="text-[#0055a4]">More solutions,</span><br/><span className="text-white">less pollution…</span><br/><span className="text-[#ef4135]">More ideas, less waste!</span></p></Container></section>

    <section id="contact" className="section scroll-mt-24 bg-[#f7f6f3]"><Container className="text-center"><p className="eyebrow">Let’s talk</p><h2 className="h2 mx-auto mt-4 max-w-4xl">See the material. Feel the difference.</h2><p className="copy mx-auto mt-6 max-w-2xl">Distributor, agency or advertiser: tell us about your project and request a sample.</p><div className="mt-9"><Button href="mailto:contact@un1qpen.fr">Contact the Un1qpen team</Button></div></Container></section>
  </>;
}
