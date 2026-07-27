import {
  CONFIGURATOR_STORAGE_KEY,
  initialConfiguratorState,
  type ConfiguratorState,
  type PenColor,
  type PenView,
} from "@/data/configurator";
import {
  ACCEPTED_LOGO_TYPES,
  MAX_LOGO_BYTES,
  isValidQuantity,
  restorePersistedState,
  serializePersistableState,
  validateLogoFile,
} from "./configurator-rules.mjs";

export { ACCEPTED_LOGO_TYPES, MAX_LOGO_BYTES, isValidQuantity };

export function isValidLogo(file: Pick<File, "size" | "type">) {
  return validateLogoFile(file);
}

export function getViewImage(color: PenColor, view: PenView) {
  if (color === "white") return `/images/configurator/white-${view}.png`;
  // Temporary fallback for Warm Grey and black until their twelve 360° frames
  // are supplied. The six final white views are already integrated.
  return `/images/un1qpen-color-${color === "warmGrey" ? "warm-grey" : color}.png`;
}

export function serializeConfiguration(state: ConfiguratorState) {
  return serializePersistableState(state);
}

export function parseStoredConfiguration(value: string | null): ConfiguratorState {
  return restorePersistedState(value, initialConfiguratorState);
}

export function persistConfiguration(state: ConfiguratorState) {
  localStorage.setItem(CONFIGURATOR_STORAGE_KEY, serializeConfiguration(state));
}
