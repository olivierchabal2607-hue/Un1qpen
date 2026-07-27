import type { ConfiguratorState } from "@/data/configurator";
export const MAX_LOGO_BYTES: number;
export const ACCEPTED_LOGO_TYPES: string[];
export function validateLogoFile(file: Pick<File, "size" | "type">): { valid: boolean; error: string };
export function isValidQuantity(quantity: number): boolean;
export function updateConfiguratorState(state: ConfiguratorState, patch: Partial<ConfiguratorState>): ConfiguratorState;
export function serializePersistableState(state: ConfiguratorState): string;
export function restorePersistedState(value: string | null, initialState: ConfiguratorState): ConfiguratorState;
export function validateQuoteDraft(state: ConfiguratorState): string;
