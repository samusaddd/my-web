export const readingFonts = [
  {
    id: "original",
    name: "Inter",
    character: "The original",
    family: "var(--font-inter), Arial, sans-serif",
    size: 1,
  },
  {
    id: "literata",
    name: "Literata",
    character: "The novelist",
    family: "var(--font-literata), Georgia, serif",
    size: 1,
  },
  {
    id: "cormorant",
    name: "Cormorant Garamond",
    character: "The romantic",
    family: "var(--font-cormorant), Georgia, serif",
    size: 1.15,
  },
  {
    id: "bodoni",
    name: "Bodoni Moda",
    character: "The atelier",
    family: "var(--font-bodoni), Georgia, serif",
    size: 1.1,
  },
  {
    id: "fraunces",
    name: "Fraunces",
    character: "The unexpected",
    family: "var(--font-fraunces), Georgia, serif",
    size: 1,
  },
  {
    id: "gothic",
    name: "UnifrakturMaguntia",
    character: "The manuscript",
    family: "var(--font-gothic), Georgia, serif",
    size: 1.2,
  },
  {
    id: "mono",
    name: "Space Mono",
    character: "The typewriter",
    family: "var(--font-mono), monospace",
    size: 0.95,
  },
  {
    id: "clear",
    name: "Atkinson Hyperlegible",
    character: "The clear voice",
    family: "var(--font-clear), Arial, sans-serif",
    size: 1,
  },
] as const;

export type ReadingFontId = (typeof readingFonts)[number]["id"];
