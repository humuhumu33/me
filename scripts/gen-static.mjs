import { writeFileSync, mkdirSync } from "node:fs";
import { person, experience, thinking, life, CONTENT_UPDATED_AT, SITE_URL, PORTRAIT_PATH } from "../src/lib/profile-data.ts";

const profile = {
  $schema: "https://schema.org/Person",
  person: {
    name: person.name, givenName: person.givenName, familyName: person.familyName,
    jobTitle: person.jobTitle, description: person.description,
    email: `mailto:${person.email}`, url: `${SITE_URL}/`,
    image: `${SITE_URL}${PORTRAIT_PATH}`,
    sameAs: person.sameAs, knowsAbout: person.knowsAbout, alumniOf: person.alumniOf,
  },
  experience: experience.map(e => ({
    role: e.role, organization: e.org, organizationUrl: e.orgUrl ?? null,
    description: e.note, startYear: e.startYear, endYear: e.endYear, current: e.current,
  })),
  publications: thinking.map(t => ({
    title: t.title, kind: t.kind, venue: t.venue, date: t.dateISO, url: t.url,
  })),
  life: [...life],
  feeds: { json: `${SITE_URL}/feed.json`, sitemap: `${SITE_URL}/sitemap.xml` },
  updatedAt: CONTENT_UPDATED_AT,
};

const feed = {
  version: "https://jsonfeed.org/version/1.1",
  title: `${person.name} — Writing & talks`,
  home_page_url: `${SITE_URL}/`,
  feed_url: `${SITE_URL}/feed.json`,
  description: person.description,
  icon: `${SITE_URL}${PORTRAIT_PATH}`,
  authors: [{ name: person.name, url: `${SITE_URL}/`, avatar: `${SITE_URL}${PORTRAIT_PATH}` }],
  language: "en",
  items: thinking.map(t => ({
    id: t.url, url: t.url, title: t.title,
    content_text: `${t.kind} — ${t.venue}. ${t.title}.`,
    date_published: new Date(t.dateISO).toISOString(),
    tags: [t.kind, t.venue],
    authors: [{ name: person.name }],
  })),
};

mkdirSync("public/api", { recursive: true });
writeFileSync("public/api/profile.json", JSON.stringify(profile, null, 2));
writeFileSync("public/feed.json", JSON.stringify(feed, null, 2));

const entries = [
  { path: "/", priority: "1.0" },
  { path: "/api/profile.json", priority: "0.6" },
  { path: "/feed.json", priority: "0.6" },
];
const urls = entries.map(e =>
  `  <url>\n    <loc>${SITE_URL}${e.path}</loc>\n    <lastmod>${CONTENT_UPDATED_AT}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
).join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
writeFileSync("public/sitemap.xml", xml);
console.log("wrote profile.json, feed.json, sitemap.xml");
