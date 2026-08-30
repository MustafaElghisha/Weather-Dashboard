export const config = { runtime: "edge" };

export default async function handler(request: Request) {
  const url = new URL(request.url);
  const icon = url.searchParams.get("icon");

  const response = await fetch(
    `https://openweathermap.org/img/wn/${icon}@4x.png`,
    {
      headers: {
        referer: "https://openweathermap.org/",
      },
    },
  );

  const blob = await response.blob();

  return new Response(blob, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
