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

const initial = {
  penColor: "warmGrey", markingColor: "black", markingLocation: "clip", activeView: "view1",
  uploadedLogo: null, logoScale: 1, logoRotation: 0, logoPosition: { x: .5, y: .5 }, preserveRatio: true, quantity: 500,
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

test("refuse une quantité inférieure à 500", () => {
  assert.match(validateQuoteDraft({ ...initial, quantity: 499 }), /500/);
});

test("valide un formulaire de devis complet", () => {
  const valid = {
    ...initial,
    uploadedLogo: { name: "logo.svg" },
    customerDetails: { company: "UN1Q", firstName: "Jean", lastName: "Dupont", email: "jean@entreprise.fr", phone: "0600000000", deliveryDate: "", comment: "", consent: true },
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
