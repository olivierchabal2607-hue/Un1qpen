# UN1QPEN

## Configurateur de personnalisation

Le configurateur est accessible à l’adresse `/configurateur`.

### Images produit

Les dix-huit vues nettoyées sont intégrées dans
`public/images/configurator/` :

- `white-view1.png` à `white-view6.png`
- `warm-grey-view1.png` à `warm-grey-view6.png`
- `black-view1.png` à `black-view6.png`

Les fichiers partagent la même toile et conservent les proportions du stylo.
La correspondance entre couleur, angle et fichier est centralisée dans
`getViewImage()` dans `lib/configurator.ts`. Le détail des vues est documenté
dans `public/images/configurator/README.md`.

### Zones de marquage

Toutes les coordonnées en pourcentage sont centralisées dans
`data/configurator.ts`, objet `printZones`. Chaque couleur et chacune des six
vues expose une zone `clip` et une zone `body`.

### Demandes de devis

La route `app/api/quote/route.ts` valide le formulaire et transmet la
configuration, le logo original et, lorsque le navigateur peut la produire,
une image PNG d’aperçu. L’envoi utilise `lib/quote-mail.ts`.

Variables nécessaires en production :

```env
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxx
EMAIL_FROM=UN1QPEN <site@un1qpen.com>
CONTACT_EMAIL=contact@un1qpen.fr
NEXT_PUBLIC_SITE_URL=https://un1qpen.com
```

Le domaine `un1qpen.com` doit être vérifié dans Resend. Si Resend n’est pas
configuré, les demandes sont journalisées uniquement en développement ; la
production affiche explicitement une erreur.

### Persistance

Les choix du configurateur et les coordonnées saisies sont conservés dans
`localStorage`. Le fichier logo et le consentement ne sont volontairement pas
persistés afin d’éviter de stocker un fichier volumineux ou un consentement
obsolète dans le navigateur.

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
