import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        aboutUs: "about-us.html",
        colorCollection: "color-collection.html",
        exteriorColors: "exterior-colors.html",
        favoriteColors: "favorite-colors.html",
        findADealer: "find-a-dealer.html",
        insulation: "insulation.html",
        interiorColors: "interior-colors.html",
        paintingServices: "painting-services.html",
      },
    },
  },
});
