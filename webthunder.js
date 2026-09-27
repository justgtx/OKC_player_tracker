"use strict";
// webthunder.ts
// Picks one veteran and one rookie card at random, highlights them,
// and scrolls the veteran into view.
function getPlayers() {
    const nodes = document.querySelectorAll(".player-card");
    return Array.from(nodes).map((el) => {
        var _a;
        return ({
            el,
            role: el.dataset.role,
            name: (_a = el.dataset.name) !== null && _a !== void 0 ? _a : "Unknown",
        });
    });
}
function pickRandom(players) {
    return players[Math.floor(Math.random() * players.length)];
}
function clearSelection(players) {
    players.forEach((p) => p.el.classList.remove("selected"));
}
function scoutMatchup() {
    const players = getPlayers();
    const veterans = players.filter((p) => p.role === "veteran");
    const rookies = players.filter((p) => p.role === "rookie");
    if (veterans.length === 0 || rookies.length === 0)
        return;
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
    btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", scoutMatchup);
});