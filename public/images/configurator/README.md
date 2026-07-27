# Images définitives du configurateur

Les six vues blanches nettoyées sont déjà intégrées :

- `white-view1.png` à `white-view6.png`

Il reste à fournir douze fichiers WebP ou PNG cadrés sur une toile de dimensions
identiques, sans modifier les proportions du stylo :

- `warm-grey-view1.webp` à `warm-grey-view6.webp`
- `black-view1.webp` à `black-view6.webp`

Les six vues attendues sont, dans l’ordre : clip à gauche, clip et marquage,
face du clip, face opposée avec marquage, clip à droite, arrière sans clip.

Une fois les douze fichiers ajoutés, modifier uniquement `getViewImage()` dans
`lib/configurator.ts`. Les vues blanches sont utilisées par la rotation 360°
interactive actuelle.
