import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { person, thinking, SITE_URL, PORTRAIT_PATH } from "@/lib/profile-data";

export const Route = createFileRoute("/feed.json")({
  server: {
    handlers: {
      GET: async () => {
        const feed = {
          version: "https://jsonfeed.org/version/1.1",
          title: `${person.name} — Writing & talks`,
          home_page_url: `${SITE_URL}/`,
          feed_url: `${SITE_URL}/feed.json`,
          description: person.description,
          icon: `${SITE_URL}${PORTRAIT_PATH}`,
          authors: [
            {
              name: person.name,
              url: `${SITE_URL}/`,
              avatar: `${SITE_URL}${PORTRAIT_PATH}`,
            },
          ],
          language: "en",
          items: thinking.map((t) => ({
            id: t.url,
            url: t.url,
            title: t.title,
            content_text: `${t.kind} — ${t.venue}. ${t.title}.`,
            date_published: new Date(t.dateISO).toISOString(),
            tags: [t.kind, t.venue],
            authors: [{ name: person.name }],
          })),
        };
        return new Response(JSON.stringify(feed, null, 2), {
          headers: {
            "Content-Type": "application/feed+json; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
            "Access-Control-Allow-Origin": "*",
          },
        });
      },
    },
  },
});
