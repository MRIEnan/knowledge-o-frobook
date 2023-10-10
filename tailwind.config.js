/** @type {import('tailwindcss').Config} */

// const { FontFamilyIcon } = require("@radix-ui/react-icons");

// eslint-disable-next-line no-undef
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      width: {
        btnSizeOne: "calc(100% - 30px)",
        enW80: "calc(50% - 20px)",
        enW40: {
          sm: "calc(80% - 10px)",
          md: "calc(40vw - 10px)",
        },
      },
      height: {
        enH80: "calc(50% - 10px)",
        enH40: {
          sm: "auto",
          md: "calc(80vh - 10px)",
        },
        wishList: "calc(100vh - 110px)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        // sans: ["var(--font-sans)", ...FontFamilyIcon.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        insetEnOne: "0 0px 1px 1px rgba(11, 11, 11, 0.05) inset",
        insetEnTwo:
          "0 0px 10px 2px rgba(11, 11, 11, 0.1),0 0px 2px 0px rgba(11, 11, 11, 0.1) inset",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
      fontWeight: {
        thin: "100",
        hairline: "100",
        extralight: "200",
        lightBold: "300",
        normalBold: "400",
        mediumBold: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      screens: {
        // xl: { min: "1023px" },
        // lg: { min: "767px", max: "1023px" },
        // md: { min: "500px", max: "767px" },
        // sm: { min: "0px", max: "500px" },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate")],
};
