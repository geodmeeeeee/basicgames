const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("searchInput");

let games = [];

function formatName(folder) {
  const cleaned = String(folder || "").trim();
  if (!cleaned) return "";

  return cleaned
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseGameList(rawText) {
  const text = String(rawText || "").trim();
  if (!text) return [];

  if (text.startsWith("[")) {
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) return parsed.map((item) => String(item).trim()).filter(Boolean);
    } catch (error) {
      // Fall through to newline parsing below.
    }
  }

  return text
    .split(/\n|,/)
    .map((item) => String(item).trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
}

function renderGames(items) {
  gameList.innerHTML = "";

  items.forEach((folder) => {
    const item = document.createElement("li");
    item.className = "game-item";

    const link = document.createElement("a");
    link.href = `./games/${folder}/index.html`;
    link.textContent = formatName(folder);

    item.appendChild(link);
    gameList.appendChild(item);
  });
}

searchInput.addEventListener("input", (event) => {
  const term = event.target.value.trim().toLowerCase();
  const filtered = games.filter((folder) =>
    formatName(folder).toLowerCase().includes(term)
  );
  renderGames(filtered);
});

Promise.all([
  fetch("./games/index.txt").then((response) => response.text()).catch(() => ""),
  fetch("./games/index.json").then((response) => response.text()).catch(() => "")
])
  .then(([txt, json]) => {
    const list = parseGameList(txt || json || "");
    games = list;
    renderGames(games);
  })
  .catch(() => {
    gameList.innerHTML = "<li class='game-item'><a href='#'>No games yet</a></li>";
  });
