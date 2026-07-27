export const MAX_LOGO_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_LOGO_TYPES = ["image/png", "image/jpeg", "image/svg+xml", "application/pdf"];

export function validateLogoFile(file) {
  if (file.size > MAX_LOGO_BYTES) return { valid: false, error: "Le fichier dépasse la limite de 10 Mo." };
  if (!ACCEPTED_LOGO_TYPES.includes(file.type)) return { valid: false, error: "Format non accepté. Utilisez PNG, JPG, SVG ou PDF." };
  return { valid: true, error: "" };
}

export function isValidQuantity(quantity) {
  return Number.isFinite(quantity) && quantity >= 500;
}

export function updateConfiguratorState(state, patch) {
  return { ...state, ...patch };
}

export function serializePersistableState(state) {
  const persistable = { ...state };
  delete persistable.uploadedLogo;
  return JSON.stringify(persistable);
}

export function restorePersistedState(value, initialState) {
  if (!value) return initialState;
  try {
    const parsed = JSON.parse(value);
    return {
      ...initialState,
      ...parsed,
      uploadedLogo: null,
      logoPosition: { ...initialState.logoPosition, ...parsed.logoPosition },
      customerDetails: { ...initialState.customerDetails, ...parsed.customerDetails, consent: false },
    };
  } catch {
    return initialState;
  }
}

export function validateQuoteDraft(state) {
  if (!isValidQuantity(state.quantity)) return "La quantité minimale est de 500 pièces.";
  if (!state.uploadedLogo) return "Importez votre logo avant de demander un devis.";
  const customer = state.customerDetails;
  if (!customer.company || !customer.firstName || !customer.lastName || !customer.email || !customer.phone) return "Complétez les coordonnées obligatoires.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) return "Adresse e-mail professionnelle invalide.";
  if (!customer.consent) return "Votre consentement est nécessaire pour traiter la demande.";
  return "";
}
