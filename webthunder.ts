// webthunder.ts
// Picks one veteran and one rookie card at random, highlights them,
// and scrolls the veteran into view.

type Role = "veteran" | "rookie";

interface PlayerCard {
  el: HTMLElement;
  role: Role;
  name: string;
}

function getPlayers(): PlayerCard[] {
  const nodes = document.querySelectorAll<HTMLElement>(".player-card");
  return Array.from(nodes).map((el) => ({
    el,
    role: el.dataset.role as Role,
    name: el.dataset.name ?? "Unknown",
  }));
}

function pickRandom(players: PlayerCard[]): PlayerCard {
  return players[Math.floor(Math.random() * players.length)];
}

function clearSelection(players: PlayerCard[]): void {
  players.forEach((p) => p.el.classList.remove("selected"));
}

function scoutMatchup(): void {
  const players = getPlayers();
  const veterans = players.filter((p) => p.role === "veteran");
  const rookies = players.filter((p) => p.role === "rookie");

  if (veterans.length === 0 || rookies.length === 0) return;

  clearSelection(players);

  const veteran = pickRandom(veterans);
  const rookie = pickRandom(rookies);

  veteran.el.classList.add("selected");
  rookie.el.classList.add("selected");

  veteran.el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });

  const result = document.getElementById("matchup-result");
  if (result) {
    result.textContent = `Tonight's pairing: ${veteran.name} (Veteran) & ${rookie.name} (Rookie)`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("scout-btn");
  btn?.addEventListener("click", scoutMatchup);
}); 