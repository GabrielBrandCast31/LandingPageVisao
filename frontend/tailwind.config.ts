import type { Config } from "tailwindcss";

const visionPurple = {
  100: "var(--vision-purple-100)",
  200: "var(--vision-purple-200)",
  300: "var(--vision-purple-300)",
  400: "var(--vision-purple-400)",
  500: "var(--vision-purple-500)",
  600: "var(--vision-purple-600)",
  700: "var(--vision-purple-700)",
  800: "var(--vision-purple-800)",
  900: "var(--vision-purple-900)",
};

const visionBlue = {
  100: "var(--vision-blue-100)",
  200: "var(--vision-blue-200)",
  300: "var(--vision-blue-300)",
  400: "var(--vision-blue-400)",
  500: "var(--vision-blue-500)",
  600: "var(--vision-blue-600)",
  700: "var(--vision-blue-700)",
  800: "var(--vision-blue-800)",
  900: "var(--vision-blue-900)",
};

const visionGreen = {
  100: "var(--vision-green-100)",
  200: "var(--vision-green-200)",
  300: "var(--vision-green-300)",
  400: "var(--vision-green-400)",
  500: "var(--vision-green-500)",
  600: "var(--vision-green-600)",
  700: "var(--vision-green-700)",
  800: "var(--vision-green-800)",
  900: "var(--vision-green-900)",
};

const visionYellow = {
  100: "var(--vision-yellow-100)",
  200: "var(--vision-yellow-200)",
  300: "var(--vision-yellow-300)",
  400: "var(--vision-yellow-400)",
  500: "var(--vision-yellow-500)",
  600: "var(--vision-yellow-600)",
  700: "var(--vision-yellow-700)",
  800: "var(--vision-yellow-800)",
  900: "var(--vision-yellow-900)",
};

const visionDark = {
  100: "var(--vision-dark-100)",
  200: "var(--vision-dark-200)",
  300: "var(--vision-dark-300)",
  400: "var(--vision-dark-400)",
  500: "var(--vision-dark-500)",
  600: "var(--vision-dark-600)",
  700: "var(--vision-dark-700)",
  800: "var(--vision-dark-800)",
  900: "var(--vision-dark-900)",
};

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Full scales
        purple: visionPurple,
        blue: visionBlue,
        green: visionGreen,
        yellow: visionYellow,
        dark: visionDark,

        // Semantic brand
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
          ...visionPurple,
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          light: "var(--secondary-light)",
          dark: "var(--secondary-dark)",
          ...visionBlue,
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
          dark: "var(--accent-dark)",
          ...visionYellow,
        },
        support: {
          DEFAULT: "var(--support)",
          light: "var(--support-light)",
          dark: "var(--support-dark)",
          ...visionGreen,
        },

        // Surfaces
        canvas: "var(--background)",
        soft: "var(--background-soft)",
        card: {
          DEFAULT: "var(--background-card)",
          hover: "var(--background-card-hover)",
        },
        paper: "var(--background-light)",
        section: "var(--background-section)",

        // Text helpers
        fg: "var(--text-default)",
        mute: "var(--text-muted)",
        dim: "var(--text-soft)",
        ink: "var(--text-dark)",

        // Borders
        edge: {
          DEFAULT: "var(--border-default)",
          light: "var(--border-light)",
          strong: "var(--border-strong)",
        },

        // Feedback
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        human: ["var(--font-nunito)", "system-ui", "sans-serif"],
        slogan: ["var(--font-slogan)", "cursive"],
        logo: [
          "var(--font-anton)",
          "Oswald",
          "Impact",
          "Arial Black",
          "sans-serif",
        ],
      },
      borderRadius: {
        pill: "9999px",
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-card": "var(--gradient-card)",
        "gradient-cta": "var(--gradient-cta)",
        "gradient-orbital": "var(--gradient-orbital)",
      },
      boxShadow: {
        "vision-soft": "var(--shadow-soft)",
        "vision-card": "var(--shadow-card)",
        "glow-purple": "var(--shadow-glow-purple)",
        "glow-yellow": "var(--shadow-glow-yellow)",
      },
    },
  },
  plugins: [],
};

export default config;
