export type PricingQuantity = 1000 | 2500 | 5000 | 10000 | 50000;
export type MarkingColorCount = 1 | 2 | 3 | 4;
export type PriceCalculation = {
  quantity: PricingQuantity;
  colorCount: MarkingColorCount;
  basePrice: number;
  extraColorPrice: number;
  unitPrice: number;
  totalPrice: number;
};

export const pricingTiers: Readonly<Record<PricingQuantity, Readonly<{ basePrice: number; extraColorPrice: number }>>>;
export const pricingQuantities: readonly PricingQuantity[];
export const markingColorCounts: readonly MarkingColorCount[];
export function isPricedQuantity(quantity: number): quantity is PricingQuantity;
export function calculatePrice(quantity: PricingQuantity, colorCount: MarkingColorCount): PriceCalculation;
