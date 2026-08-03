export const pricingTiers = Object.freeze({
  1000: Object.freeze({ basePrice: 1.00, extraColorPrice: 0.24 }),
  2500: Object.freeze({ basePrice: 0.96, extraColorPrice: 0.18 }),
  5000: Object.freeze({ basePrice: 0.88, extraColorPrice: 0.13 }),
  10000: Object.freeze({ basePrice: 0.80, extraColorPrice: 0.11 }),
  50000: Object.freeze({ basePrice: 0.36, extraColorPrice: 0.10 }),
});

export const pricingQuantities = Object.freeze([1000, 2500, 5000, 10000, 50000]);
export const markingColorCounts = Object.freeze([1, 2, 3, 4]);

export function isPricedQuantity(quantity) {
  return Object.hasOwn(pricingTiers, quantity);
}

export function calculatePrice(quantity, colorCount) {
  if (!isPricedQuantity(quantity)) throw new Error("Quantité sans tarif configuré.");
  if (!markingColorCounts.includes(colorCount)) throw new Error("Nombre de couleurs invalide.");
  const tier = pricingTiers[quantity];
  const unitPrice = Math.round((tier.basePrice + ((colorCount - 1) * tier.extraColorPrice)) * 100) / 100;
  return {
    quantity,
    colorCount,
    basePrice: tier.basePrice,
    extraColorPrice: tier.extraColorPrice,
    unitPrice,
    totalPrice: unitPrice * quantity,
  };
}
