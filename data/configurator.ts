export const penColors = ["white", "warmGrey", "black"] as const;
export const markingColors = ["white", "warmGrey", "black"] as const;
export const markingLocations = ["clip", "body", "both"] as const;
export const penViews = ["view1", "view2", "view3", "view4", "view5", "view6"] as const;

export type PenColor = (typeof penColors)[number];
export type MarkingColor = (typeof markingColors)[number];
export type MarkingLocation = (typeof markingLocations)[number];
export type PenView = (typeof penViews)[number];
export type LogoPosition = { x: number; y: number };
export type LogoTransform = { scale: number; rotation: number; position: LogoPosition };
export type PrintZone = { x: number; y: number; width: number; height: number; rotate?: number };

export type CustomerDetails = {
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deliveryDate: string;
  comment: string;
  consent: boolean;
};

export type UploadedLogo = {
  file: File;
  name: string;
  type: string;
  previewUrl: string | null;
};

export type ConfiguratorState = {
  penColor: PenColor;
  markingColor: MarkingColor;
  markingLocation: MarkingLocation;
  activeView: PenView;
  uploadedLogo: UploadedLogo | null;
  logoTransforms: Record<"clip" | "body", LogoTransform>;
  editingLocation: "clip" | "body";
  preserveRatio: boolean;
  quantity: number;
  customerDetails: CustomerDetails;
};

export const colorOptions: Record<PenColor, { label: string; swatch: string; image: string; defaultMarking: MarkingColor }> = {
  white: {
    label: "Blanc",
    swatch: "#f5f4f0",
    image: "/images/un1qpen-color-white.png",
    defaultMarking: "warmGrey",
  },
  warmGrey: {
    label: "Warm Grey",
    swatch: "#9b918a",
    image: "/images/un1qpen-color-warm-grey.png",
    defaultMarking: "black",
  },
  black: {
    label: "Noir",
    swatch: "#1d1d1f",
    image: "/images/un1qpen-color-black.png",
    defaultMarking: "white",
  },
};

export const markingColorOptions: Record<MarkingColor, { label: string; value: string }> = {
  white: { label: "Blanc", value: "#ffffff" },
  warmGrey: { label: "Warm Grey", value: "#8f847d" },
  black: { label: "Noir", value: "#111214" },
};

export const viewOptions: Array<{ id: PenView; label: string; transform: string }> = [
  { id: "view1", label: "Clip à gauche", transform: "none" },
  { id: "view2", label: "Trois-quarts gauche", transform: "none" },
  { id: "view3", label: "Face du clip", transform: "none" },
  { id: "view4", label: "Trois-quarts droit", transform: "none" },
  { id: "view5", label: "Clip à droite", transform: "none" },
  { id: "view6", label: "Vue arrière", transform: "none" },
];

// The white source renders have different native canvases. Keeping their real
// aspect ratio makes print-zone coordinates follow the pen instead of the
// surrounding whitespace when the user changes view.
export const viewAspectRatios: Record<PenColor, Record<PenView, number>> = {
  white: {
    view1: 726 / 2167,
    view2: 724 / 2172,
    view3: 728 / 2161,
    view4: 742 / 2120,
    view5: 897 / 1753,
    view6: 732 / 2149,
  },
  warmGrey: {
    view1: 721 / 2180,
    view2: 2 / 3,
    view3: 2 / 3,
    view4: 2 / 3,
    view5: 2 / 3,
    view6: 2 / 3,
  },
  black: {
    view1: 2 / 3,
    view2: 2 / 3,
    view3: 2 / 3,
    view4: 2 / 3,
    view5: 1023 / 1537,
    view6: 2 / 3,
  },
};

const zones = {
  view1: { clip: { x: 39, y: 9, width: 9, height: 40, rotate: -1 }, body: { x: 47, y: 24, width: 11, height: 34 } },
  view2: { clip: { x: 39.5, y: 8.5, width: 12, height: 41, rotate: -.5 }, body: { x: 49, y: 24, width: 10, height: 34 } },
  view3: { clip: { x: 43.5, y: 9, width: 13, height: 41 }, body: { x: 47, y: 25, width: 11, height: 34 } },
  view4: { clip: { x: 48.5, y: 8.5, width: 12, height: 41, rotate: .5 }, body: { x: 42, y: 24, width: 10, height: 34 } },
  view5: { clip: { x: 52, y: 9, width: 9, height: 40, rotate: 1 }, body: { x: 42, y: 24, width: 11, height: 34 } },
  view6: { clip: { x: 50, y: 10, width: 0, height: 0 }, body: { x: 45, y: 24, width: 10, height: 34 } },
} satisfies Record<PenView, { clip: PrintZone; body: PrintZone }>;

// Centralized by color so production-specific adjustments can be made without
// touching preview components. Current geometry is shared by the three colors.
export const printZones: Record<PenColor, Record<PenView, { clip: PrintZone; body: PrintZone }>> = {
  white: zones,
  warmGrey: zones,
  black: zones,
};

export const initialCustomerDetails: CustomerDetails = {
  company: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  deliveryDate: "",
  comment: "",
  consent: false,
};

export const initialConfiguratorState: ConfiguratorState = {
  penColor: "white",
  markingColor: "warmGrey",
  markingLocation: "clip",
  activeView: "view2",
  uploadedLogo: null,
  logoTransforms: {
    clip: { scale: 1, rotation: 0, position: { x: 0.5, y: 0.5 } },
    body: { scale: 1, rotation: 0, position: { x: 0.5, y: 0.5 } },
  },
  editingLocation: "clip",
  preserveRatio: true,
  quantity: 500,
  customerDetails: initialCustomerDetails,
};

export const quickQuantities = [500, 1000, 2500, 5000, 10000];
export const CONFIGURATOR_STORAGE_KEY = "un1qpen-configurator-v1";
