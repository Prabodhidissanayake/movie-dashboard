import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGray: 'var(--color-dark-gray)',
        mediumGray: 'var(--color-medium-gray)',
        lightGray: 'var(--color-light-gray)',
        mutedPink: 'var(--color-muted-pink)',
        brightPink: 'var(--color-bright-pink)',
      },
    },
  },
  plugins: [],
} satisfies Config;
