import test from "node:test";
import assert from "node:assert/strict";
import {
  MAX_LOGO_BYTES,
  restorePersistedState,
  serializePersistableState,
  updateConfiguratorState,
  validateLogoFile,
  validateQuoteDraft,
} from "../lib/configurator-rules.mjs";
import { calculatePrice, markingColorCounts, pricingQuantities } from "../lib/pricing.mjs";

const initial = {
  penColor: "warmGrey", markingColor: "black", markingLocation: "clip", markingColorCount: 1, activeView: "view1",
  uploadedLogo: null,
  logoTransforms: {
    clip: { scale: 1, rotation: 0, position: { x: .5, y: .5 } },
    body: { scale: 1, rotation: 0, position: { x: .5, y: .5 } },
  },
  editingLocation: "clip", preserveRatio: true, quantity: 1000,
  customerDetails: { company: "", firstName: "", lastName: "", email: "", phone: "", deliveryDate: "", comment: "", consent: false },
};

test("change la couleur sans modifier le reste de la configuration", () => {
  const next = updateConfiguratorState(initial, { penColor: "black", markingColor: "white" });
  assert.equal(next.penColor, "black");
  assert.equal(next.markingColor, "white");
  assert.equal(next.activeView, "view1");
});

test("change la vue active", () => {
  assert.equal(updateConfiguratorState(initial, { activeView: "view6" }).activeView, "view6");
});

test("accepte un logo PNG valide", () => {
  assert.equal(validateLogoFile({ type: "image/png", size: 1024 }).valid, true);
});

test("refuse un logo supérieur à 10 Mo", () => {
  const result = validateLogoFile({ type: "image/png", size: MAX_LOGO_BYTES + 1 });
  assert.equal(result.valid, false);
  assert.match(result.error, /10 Mo/);
});

test("refuse une quantité qui ne correspond à aucun palier", () => {
  assert.match(validateQuoteDraft({ ...initial, quantity: 999 }), /quantité proposée/);
});

test("calcule les exemples tarifaires annoncés", () => {
  assert.deepEqual([calculatePrice(1000, 1).unitPrice, calculatePrice(1000, 2).unitPrice, calculatePrice(1000, 3).unitPrice], [1, 1.24, 1.48]);
  assert.equal(calculatePrice(5000, 3).unitPrice, 1.14);
  assert.equal(calculatePrice(10000, 4).unitPrice, 1.13);
  assert.equal(calculatePrice(50000, 2).unitPrice, .46);
});

test("calcule toutes les combinaisons de quantité et de couleurs", () => {
  for (const quantity of pricingQuantities) {
    for (const colorCount of markingColorCounts) {
      const result = calculatePrice(quantity, colorCount);
      assert.equal(result.totalPrice, result.unitPrice * quantity);
      assert.ok(result.unitPrice >= result.basePrice);
    }
  }
});

test("valide un formulaire de devis complet", () => {
  const valid = {
    ...initial,
    uploadedLogo: { name: "logo.svg" },
    customerDetails: { company: "Un1q", firstName: "Jean", lastName: "Dupont", email: "jean@entreprise.fr", phone: "0600000000", deliveryDate: "", comment: "", consent: true },
  };
  assert.equal(validateQuoteDraft(valid), "");
});

test("persiste la configuration sans le fichier et restaure les paramètres", () => {
  const state = { ...initial, penColor: "white", activeView: "view5", uploadedLogo: { name: "logo.svg" } };
  const serialized = serializePersistableState(state);
  assert.equal(serialized.includes("uploadedLogo"), false);
  const restored = restorePersistedState(serialized, initial);
  assert.equal(restored.penColor, "white");
  assert.equal(restored.activeView, "view5");
  assert.equal(restored.uploadedLogo, null);
});

test("remplace une ancienne quantité non tarifée lors de la restauration", () => {
  const restored = restorePersistedState(JSON.stringify({ ...initial, quantity: 500, markingLocation: "both" }), initial);
  assert.equal(restored.quantity, 1000);
  assert.equal(restored.markingLocation, "clip");
});
