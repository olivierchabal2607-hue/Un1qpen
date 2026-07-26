# UN1QPEN

Site vitrine B2B premium pour présenter l’innovation matière UN1QPEN.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`. Validation de production :

```bash
npm run lint
npm run build
```

## Architecture

- `app/` : routes, SEO, API contact et pages éditoriales ;
- `components/layout` : header, menu mobile et footer ;
- `components/sections` : sections réutilisables ;
- `components/forms` : formulaire et états d’interface ;
- `components/ui` : primitives d’interface ;
- `data/` : contenus, chiffres, FAQ, produit et navigation ;
- `lib/` : validation Zod, SEO et abstraction e-mail ;
- `public/images` : placeholders visuels locaux ;
- `public/documents` : fiche technique temporaire.

## Personnalisation

- Coordonnées, domaine et réseaux : `data/site.ts` et `.env.example`
- Navigation : `data/navigation.ts`
- Chiffres : `data/statistics.ts`
- Produit et couleurs : `data/product.ts`
- FAQ : `data/faq.ts`
- Processus : `data/process.ts`
- Palette : variables au début de `app/globals.css`
- Images : voir `README-ASSETS.md`
- Mentions légales : `app/mentions-legales/page.tsx`
- Confidentialité : `app/politique-confidentialite/page.tsx`

## E-mail

La route `app/api/contact/route.ts` valide les données avec Zod et appelle `lib/mail.ts`. Aucun e-mail n’est envoyé par défaut. Pour brancher Resend, Brevo ou SendGrid, implémenter le fournisseur dans `sendContactRequest`, ajouter sa clé dans `.env.local` puis mettre à jour la politique de confidentialité.

## Précautions éditoriales

Les formulations distinguent le corps du stylo des autres composants. Les futures références sont présentées comme une vision. Aucun brevet, label, certification, bilan carbone ou fabrication intégralement française n’est revendiqué.
