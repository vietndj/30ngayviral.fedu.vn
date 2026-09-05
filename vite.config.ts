import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import courseConfig from "./course.config.json";

function courseMetaPlugin(): Plugin {
  return {
    name: "vite-plugin-course-meta",
    transformIndexHtml(html: string) {
      let res = html;

      // 1. Sync Title
      res = res.replace(/<title>.*?<\/title>/, `<title>${courseConfig.seo.title}</title>`);

      // 2. Sync Meta Description
      res = res.replace(
        /<meta name="description" content=".*?" \/>/,
        `<meta name="description" content="${courseConfig.seo.description}" />`
      );

      // 3. Sync Open Graph Meta
      res = res.replace(
        /<meta property="og:title" content=".*?" \/>/,
        `<meta property="og:title" content="${courseConfig.courseName} | 1 Điện Thoại | Fedu.vn" />`
      );
      res = res.replace(
        /<meta property="og:description" content=".*?" \/>/,
        `<meta property="og:description" content="${courseConfig.seo.description}" />`
      );

      // 4. Sync Structured Data JSON-LD Schema
      const schema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": `${courseConfig.courseName} — Fedu.vn`,
        "description": courseConfig.seo.description,
        "provider": {
          "@type": "Organization",
          "name": "Fedu.vn",
          "url": courseConfig.seo.siteUrl,
          "sameAs": [courseConfig.seo.siteUrl]
        },
        "instructor": {
          "@type": "Person",
          "name": courseConfig.instructor.name,
          "jobTitle": courseConfig.instructor.title,
          "alumniOf": courseConfig.instructor.alumni
        },
        "offers": {
          "@type": "Offer",
          "price": courseConfig.priceNumber.toString(),
          "priceCurrency": "VND",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2026-12-31",
          "url": courseConfig.seo.siteUrl + "/"
        },
        "courseMode": "online",
        "inLanguage": "vi",
        "image": courseConfig.seo.ogImage,
        "url": courseConfig.seo.siteUrl + "/",
        "educationalLevel": "Beginner to Advanced",
        "teaches": [
          "Kịch bản viral 3s đầu",
          "Bố cục ánh sáng điện thoại",
          "Dựng phim CapCut Pro",
          "Nhân bản video bằng AI",
          "Video Storytelling ra đơn"
        ],
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "courseWorkload": "P30D"
        }
      };

      res = res.replace(
        /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
        `<script type="application/ld+json">\n    ${JSON.stringify(schema, null, 2).replace(/\n/g, "\n    ")}\n    </script>`
      );

      return res;
    }
  };
}

export default defineConfig({
  plugins: [react(), courseMetaPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: 4001,
    strictPort: false,
    host: "0.0.0.0",
  },
  preview: {
    port: 4001,
    host: "0.0.0.0",
  },
});
