import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import {
  person,
  experience,
  thinking,
  life,
  CONTENT_UPDATED_AT,
  SITE_URL,
  PORTRAIT_PATH,
} from "@/lib/profile-data";

export const Route = createFileRoute("/api/profile")({
  server: {
    handlers: {
      GET: async () => {
        const body = {
          $schema: "https://schema.org/Person",
          person: {
            name: person.name,
            givenName: person.givenName,
            familyName: person.familyName,
            jobTitle: person.jobTitle,
            description: person.description,
            url: `${SITE_URL}/`,
            image: `${SITE_URL}${PORTRAIT_PATH}`,
            sameAs: person.sameAs,
            knowsAbout: person.knowsAbout,
            alumniOf: person.alumniOf,
          },
          experience: experience.map((e) => ({
            role: e.role,
            organization: e.org,
            organizationUrl: e.orgUrl ?? null,
            description: e.note,
            startYear: e.startYear,
            endYear: e.endYear,
            current: e.current,
          })),
          publications: thinking.map((t) => ({
            title: t.title,
            kind: t.kind,
            venue: t.venue,
            date: t.dateISO,
            url: t.url,
          })),
          life: [...life],
          feeds: {
            json: `${SITE_URL}/feed.json`,
            sitemap: `${SITE_URL}/sitemap.xml`,
          },
          updatedAt: CONTENT_UPDATED_AT,
        };
        return new Response(JSON.stringify(body, null, 2), {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
            "Access-Control-Allow-Origin": "*",
          },
        });
      },
    },
  },
});
