(async function () {
  const container = document.getElementById("travel-photos");
  const rssUrl = "https://500px.com/trambakbanerjee/rss";
  const proxy = "https://api.allorigins.win/get?url=";

  try {
    const res = await fetch(proxy + encodeURIComponent(rssUrl));
    const data = await res.json();

    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "text/xml");
    const items = Array.from(xml.querySelectorAll("item"));

    // Extract image URLs
    const images = items
      .map(item => {
        const content = item.querySelector("media\\:content");
        if (media?.getAttribute("url")) return media.getAttribute("url");

        const enc = item.querySelector("enclosure");
        if (enc?.getAttribute("url")) return enc.getAttribute("url");

        return null;
  })
  .filter(Boolean);

    // Randomly sample 4 images
    const shuffled = images.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);

    container.innerHTML = selected
      .map(src => `
        <img src="${src}" alt="Travel photo" />
      `)
      .join("");

  } catch (err) {
    container.innerHTML = "<p>Unable to load photos.</p>";
    console.error(err);
  }
})();
