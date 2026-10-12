
const characters = {
  "The Herta": {
    rarity: 5, element: "Ice", path: "Erudition", color: "#a99bd5"
  },
  "Firefly": {
    rarity: 5, element: "Fire", path: "Destruction", color: "#d69d79"
  },
  "Kafka": {
    rarity: 5, element: "Lightning", path: "Nihility", color: "#ad86c5"
  },
  "Acheron": {
    rarity: 5, element: "Lightning", path: "Nihility", color: "#9a85c8"
  },
  "Sunday": {
    rarity: 5, element: "Imaginary", path: "Harmony", color: "#c7b8a0"
  },
  "Robin": {
    rarity: 5, element: "Physical", path: "Harmony", color: "#8fc6c2"
  },
  "Seele": {
    rarity: 5, element: "Quantum", path: "Hunt", color: "#9c8bd6"
  },
  "Silver Wolf": {
    rarity: 5, element: "Quantum", path: "Nihility", color: "#8c9acb"
  },
  "Jing Yuan": {
    rarity: 5, element: "Lightning", path: "Erudition", color: "#d8b879"
  },
  "Blade": {
    rarity: 5, element: "Wind", path: "Destruction", color: "#b7a2a5"
  },
  "Fu Xuan": {
    rarity: 5, element: "Quantum", path: "Preservation", color: "#c69acb"
  },
  "Jingliu": {
    rarity: 5, element: "Ice", path: "Destruction", color: "#9bc9e8"
  },
  "Topaz & Numby": {
    rarity: 5, element: "Fire", path: "Hunt", color: "#d99b78"
  },
  "Argenti": {
    rarity: 5, element: "Physical", path: "Erudition", color: "#c98792"
  },
  "Ruan Mei": {
    rarity: 5, element: "Ice", path: "Harmony", color: "#9fc9d0"
  },
  "Dr. Ratio": {
    rarity: 5, element: "Imaginary", path: "Hunt", color: "#c7b18c"
  },
  "Black Swan": {
    rarity: 5, element: "Wind", path: "Nihility", color: "#a28bc8"
  },
  "Sparkle": {
    rarity: 5, element: "Quantum", path: "Harmony", color: "#e09bbd"
  },
  "Aventurine": {
    rarity: 5, element: "Imaginary", path: "Preservation", color: "#86c7bd"
  },
  "Boothill": {
    rarity: 5, element: "Physical", path: "Hunt", color: "#d5a27f"
  },
  "Jade": {
    rarity: 5, element: "Quantum", path: "Erudition", color: "#82b9a7"
  },
  "Yunli": {
    rarity: 5, element: "Physical", path: "Destruction", color: "#e4a6a0"
  },
  "Feixiao": {
    rarity: 5, element: "Wind", path: "Hunt", color: "#94b9a1"
  },
  "Lingsha": {
    rarity: 5, element: "Fire", path: "Abundance", color: "#d9a18c"
  },
  "Rappa": {
    rarity: 5, element: "Imaginary", path: "Erudition", color: "#c69bdc"
  },
  "Fugue": {
    rarity: 5, element: "Fire", path: "Nihility", color: "#d59c8b"
  },
  "Aglaea": {
    rarity: 5, element: "Lightning", path: "Remembrance", color: "#e0c08c"
  },
  "Tribbie": {
    rarity: 5, element: "Quantum", path: "Harmony", color: "#d7a3d5"
  },
  "Mydei": {
    rarity: 5, element: "Imaginary", path: "Destruction", color: "#c5a0a0"
  },
  "Castorice": {
    rarity: 5, element: "Quantum", path: "Remembrance", color: "#a99bd5"
  },
  "Anaxa": {
    rarity: 5, element: "Wind", path: "Erudition", color: "#91b6a4"
  },
  "Hyacine": {
    rarity: 5, element: "Wind", path: "Abundance", color: "#9bc9e8"
  },
  "Cipher": {
    rarity: 5, element: "Quantum", path: "Nihility", color: "#b89bd5"
  },
  "Phainon": {
    rarity: 5, element: "Physical", path: "Destruction", color: "#d4b18b"
  },
  "Hysilens": {
    rarity: 5, element: "Physical", path: "Nihility", color: "#91b9c7"
  },
  "Cerydra": {
    rarity: 5, element: "Wind", path: "Harmony", color: "#b8a4d9"
  },
  "Evanescia": {
    rarity: 5, element: "Physical", path: "Remembrance", color: "#c9a2dc"
  }
};
let jade = Number(localStorage.getItem("hsrJade") ?? 1600);
let passes = Number(localStorage.getItem("hsrPasses") ?? 10);
let pity = Number(localStorage.getItem("hsrPity") ?? 0);
let fourStarPity = Number(localStorage.getItem("hsrFourStarPity") ?? 0);
let guarantee = localStorage.getItem("hsrGuarantee") === "true";
let collection = JSON.parse(
  localStorage.getItem("hsrCollection") || "{}"
);
let warpHistory = JSON.parse(
  localStorage.getItem("hsrWarpHistory") || "[]"
);
let totalPulls = Number(localStorage.getItem("hsrTotalPulls") || 0);
const historyDisplay = document.getElementById("history");
const collectionDisplay = document.getElementById("collection");
let selectedCharacter = "The Herta";
const characterGrid = document.getElementById("characterGrid");
function populateCharacterSelector() {
  characterGrid.innerHTML = "";

  Object.entries(characters).forEach(([name, character]) => {
    const card = document.createElement("button");

    card.type = "button";
    card.className = "character-option";
    card.dataset.name = name;

    const portrait = document.createElement("div");
    portrait.className = "character-portrait";
    portrait.style.background =
      `linear-gradient(145deg, ${character.color}, #252747)`;
    portrait.textContent = name[0];

    const characterName = document.createElement("div");
    characterName.className = "character-option-name";
    characterName.textContent = name;

    const info = document.createElement("div");
    info.className = "character-option-info";
    info.textContent =
      `${"★".repeat(character.rarity)} · ${character.element}`;

    card.append(portrait, characterName, info);

    card.addEventListener("click", () => {
      selectedCharacter = name;
      updateBanner();
      populateCharacterSelector();
    });

    if (name === selectedCharacter) {
      card.classList.add("selected");
      card.setAttribute("aria-pressed", "true");
    } else {
      card.setAttribute("aria-pressed", "false");
    }

    characterGrid.appendChild(card);
  });
}
const featuredName = document.getElementById("featuredName");
const characterArt = document.getElementById("characterArt");
const jadeDisplay = document.getElementById("jade");
const passesDisplay = document.getElementById("passes");
const results = document.getElementById("results");
const pityDisplay = document.getElementById("pity");
const guaranteeDisplay = document.getElementById("guarantee");
function updateBanner() {
  const name = selectedCharacter;
  const character = characters[name];

  featuredName.textContent = name.toUpperCase();

  characterArt.style.background =
    `linear-gradient(145deg, ${character.color}, #252b50)`;

  characterArt.querySelector(".character-initial").textContent =
    name[0];

  characterArt.querySelector(".art-caption").textContent =
    name.toUpperCase();

  document.querySelector(".rarity").textContent =
    `${"★".repeat(character.rarity)} ${character.element.toUpperCase()} · ${character.path.toUpperCase()}`;
}
function updateResources() {
  jadeDisplay.textContent = jade;
  passesDisplay.textContent = passes;

  localStorage.setItem("hsrJade", jade);
  localStorage.setItem("hsrPasses", passes);
}
function updatePity() {
  document.getElementById("pity").textContent = pity;
  document.getElementById("fourStarPity").textContent = fourStarPity;
  document.getElementById("guarantee").textContent =
    guarantee ? "Yes" : "No";

  localStorage.setItem("hsrPity", pity);
  localStorage.setItem("hsrFourStarPity", fourStarPity);
  localStorage.setItem("hsrGuarantee", guarantee);
}
// Approximate soft-pity odds for this prototype.
// Hard pity guarantees a 5-star on pull 90.
function getFiveStarChance() {
  if (pity >= 90) return 1;

  if (pity >= 74) {
    return Math.min(0.006 + (pity - 73) * 0.06, 1);
  }

  return 0.006;
}
function pullCharacter() {
  const featured = selectedCharacter;

  pity++;
  fourStarPity++;

  // 5-star check comes first.
  if (Math.random() < getFiveStarChance()) {
    pity = 0;
    fourStarPity = 0;

    let wonFeatured;

    if (guarantee) {
      wonFeatured = true;
      guarantee = false;
    } else {
      wonFeatured = Math.random() < 0.5;
      guarantee = !wonFeatured;
    }

    if (wonFeatured) {
      return {
        name: featured,
        rarity: 5,
        color: characters[featured].color
      };
    }

    const standardFiveStars = [
      { name: "Himeko", element: "Fire", color: "#d98b75" },
      { name: "Welt", element: "Imaginary", color: "#b39b70" },
      { name: "Bronya", element: "Wind", color: "#8ab6d9" },
      { name: "Gepard", element: "Ice", color: "#83b8d8" },
      { name: "Clara", element: "Physical", color: "#d8a5b4" },
      { name: "Yanqing", element: "Ice", color: "#8cbbe5" },
      { name: "Bailu", element: "Lightning", color: "#a68cdb" }
    ];

    const character = standardFiveStars[
      Math.floor(Math.random() * standardFiveStars.length)
    ];

    return {
      name: character.name,
      rarity: 5,
      color: character.color
    };
  }

  const fourStarCharacters = [
    { name: "March 7th", color: "#8bc9e8" },
    { name: "Dan Heng", color: "#8ab9a5" },
    { name: "Asta", color: "#d9a0a8" },
    { name: "Herta", color: "#9c91d5" },
    { name: "Serval", color: "#b99ad9" },
    { name: "Natasha", color: "#d6a2a4" },
    { name: "Pela", color: "#8eb4d8" },
    { name: "Sampo", color: "#81b9a1" },
    { name: "Tingyun", color: "#d8b18c" },
    { name: "Qingque", color: "#91b7d6" },
    { name: "Sushang", color: "#d9b77f" },
    { name: "Luka", color: "#d88d87" },
    { name: "Lynx", color: "#8dc5c1" },
    { name: "Guinaifen", color: "#dc987d" },
    { name: "Hanya", color: "#a99bd5" },
    { name: "Xueyi", color: "#b4a0cf" },
    { name: "Gallagher", color: "#bd8c80" },
    { name: "Moze", color: "#8199bd" }
  ];

  // Guarantee a 4-star or higher by the 10th pull.
  const guaranteedFourStar = fourStarPity >= 10;

  if (guaranteedFourStar || Math.random() < 0.06) {
    fourStarPity = 0;

    const character = fourStarCharacters[
      Math.floor(Math.random() * fourStarCharacters.length)
    ];

    return {
      name: character.name,
      rarity: 4,
      color: character.color
    };
  }

  return {
    name: "3-Star Light Cone",
    rarity: 3,
    color: "#7799bd"
  };
}
function addToCollection(item) {
  // Only add 4-star and 5-star pulls to the character collection.
  if (item.rarity < 4) return;

  const name = item.name;

  if (collection[name]) {
    collection[name].copies++;
  } else {
    collection[name] = {
      name: item.name,
      rarity: item.rarity,
      color: item.color,
      copies: 1
    };
  }

  localStorage.setItem("hsrCollection", JSON.stringify(collection));
}

function renderCollection() {
  collectionDisplay.innerHTML = "";

  const searchInput = document.getElementById("collectionSearch");
  const searchTerm = searchInput.value.trim().toLowerCase();

  const collectedCharacters = Object.values(collection);

  if (collectedCharacters.length === 0) {
    collectionDisplay.innerHTML =
      '<p class="empty-collection">No characters collected yet.</p>';
    return;
  }

  collectedCharacters.sort((a, b) => {
    if (a.rarity !== b.rarity) return b.rarity - a.rarity;
    return a.name.localeCompare(b.name);
  });

  const filteredCharacters = collectedCharacters.filter(character =>
    character.name.toLowerCase().includes(searchTerm)
  );

  if (filteredCharacters.length === 0) {
    collectionDisplay.innerHTML =
      '<p class="empty-collection">No matching characters found.</p>';
    return;
  }

  filteredCharacters.forEach(character => {
    const card = document.createElement("div");
    card.className = "collection-card";
    card.style.background =
      `linear-gradient(145deg, ${character.color}, #252b50)`;

    const stars = document.createElement("div");
    stars.className = "stars";
    stars.textContent = "★".repeat(character.rarity);

    const name = document.createElement("div");
    name.className = "character-name";
    name.textContent = character.name;

    const copies = document.createElement("div");
    copies.className = "copies";
    copies.textContent = `Copies: ${character.copies}`;

    card.append(stars, name, copies);
    collectionDisplay.appendChild(card);
  });
}

function addToHistory(item) {
  totalPulls++;

  warpHistory.unshift({
    name: item.name,
    rarity: item.rarity,
    pullNumber: totalPulls,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("hsrWarpHistory", JSON.stringify(warpHistory));
  localStorage.setItem("hsrTotalPulls", totalPulls);

  renderHistory();
}
function renderHistory() {
  historyDisplay.innerHTML = "";

  if (warpHistory.length === 0) {
    historyDisplay.innerHTML =
      '<p class="empty-history">No pulls recorded yet.</p>';
    return;
  }

  warpHistory.forEach(item => {
    const entry = document.createElement("div");
    entry.className = `history-entry rarity-${item.rarity}`;

    const info = document.createElement("div");

    const name = document.createElement("div");
    name.className = "history-name";
    name.textContent = `${"★".repeat(item.rarity)} ${item.name}`;

    const details = document.createElement("div");
    details.className = "history-details";
    details.textContent =
      `Pull #${item.pullNumber} · ${item.date}`;

    info.append(name, details);
    entry.appendChild(info);
    historyDisplay.appendChild(entry);
  });
}

function updatePullStatistics() {
  const fiveStars = warpHistory.filter(
    item => item.rarity === 5
  ).length;

  const fourStars = warpHistory.filter(
    item => item.rarity === 4
  ).length;

  const recordedPulls = warpHistory.length;

  const fiveStarRate = recordedPulls > 0
    ? (fiveStars / recordedPulls) * 100
    : 0;

  const fourStarRate = recordedPulls > 0
    ? (fourStars / recordedPulls) * 100
    : 0;

  document.getElementById("totalPulls").textContent = totalPulls;
  document.getElementById("fiveStarCount").textContent = fiveStars;
  document.getElementById("fourStarCount").textContent = fourStars;

  document.getElementById("fiveStarRate").textContent =
    fiveStarRate.toFixed(2) + "%";

  document.getElementById("fourStarRate").textContent =
    fourStarRate.toFixed(2) + "%";
}


function clearHistory() {
  const confirmed = confirm(
    "Are you sure you want to clear your warp history? This cannot be undone."
  );

  if (!confirmed) return;

  warpHistory = [];
  totalPulls = 0;

  localStorage.removeItem("hsrWarpHistory");
  localStorage.removeItem("hsrTotalPulls");

  renderHistory();
}
function warp(amount) {
  const missingPasses = Math.max(0, amount - passes);
  const jadeNeeded = missingPasses * 160;

  if (jade < jadeNeeded) {
    results.textContent = "Not enough Stellar Jade or Special Passes!";
    return;
  }

  const passesUsed = Math.min(passes, amount);
  passes -= passesUsed;
  jade -= jadeNeeded;

  const pulledItems = [];

  for (let i = 0; i < amount; i++) {
    const item = pullCharacter();

    pulledItems.push(item);
    addToCollection(item);
    addToHistory(item);
    updatePullStatistics();
  }

  results.innerHTML = "";
  results.className = "pull-results-grid";

  pulledItems.forEach(item => {
    const card = document.createElement("div");

    card.className = `pull-card rarity-${item.rarity}`;
    card.style.setProperty("--character-color", item.color);

    const stars = "★".repeat(item.rarity);

    const rarityLabel = item.rarity === 5
      ? "5-STAR"
      : item.rarity === 4
        ? "4-STAR"
        : "3-STAR";

    card.innerHTML = `
      <div class="pull-card-rarity">${rarityLabel}</div>
      <div class="pull-card-stars">${stars}</div>
      <div class="pull-card-name"></div>
    `;

    card.querySelector(".pull-card-name").textContent = item.name;

    results.appendChild(card);
  });

  updateResources();
  updatePity();
}
/* =====================================
   STAGE 15.1: STELLAR ARCADE
   MEMORY MATCH
   ===================================== */

const memoryGrid = document.getElementById("memoryGrid");
const memoryPairsDisplay = document.getElementById("memoryPairs");
const memoryMovesDisplay = document.getElementById("memoryMoves");
const memoryMessage = document.getElementById("memoryMessage");
const claimMemoryRewardButton =
  document.getElementById("claimMemoryReward");
const newMemoryGameButton =
  document.getElementById("newMemoryGame");

const MEMORY_SAVE_KEY = "hsrArcadeMemoryState";
const MEMORY_REWARD = 100;

const memorySymbols = ["🌙", "⭐", "🪐", "🌌", "💎", "🚀"];

function createMemoryDeck() {
  const deck = [...memorySymbols, ...memorySymbols];

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

function createMemoryState() {
  return {
    deck: createMemoryDeck(),
    matched: [],
    revealed: [],
    moves: 0,
    claimed: false
  };
}

function loadMemoryState() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(MEMORY_SAVE_KEY) || "null"
    );

    if (
      saved &&
      Array.isArray(saved.deck) &&
      saved.deck.length === 12 &&
      saved.deck.every(symbol => memorySymbols.includes(symbol)) &&
      Array.isArray(saved.matched) &&
      Array.isArray(saved.revealed) &&
      Number.isSafeInteger(saved.moves) &&
      saved.moves >= 0 &&
      typeof saved.claimed === "boolean"
    ) {
      return saved;
    }
  } catch (error) {
    // Start a fresh game if the saved data is invalid.
  }

  return createMemoryState();
}

let memoryState = loadMemoryState();

function saveMemoryState() {
  localStorage.setItem(
    MEMORY_SAVE_KEY,
    JSON.stringify(memoryState)
  );
}

function renderMemoryGame() {
  memoryGrid.innerHTML = "";

  memoryState.deck.forEach((symbol, index) => {
    const isMatched = memoryState.matched.includes(index);
    const isRevealed = memoryState.revealed.includes(index);

    const card = document.createElement("button");
    card.type = "button";
    card.className = "memory-card";

    if (isMatched) {
      card.classList.add("matched");
    }

    card.textContent = isMatched || isRevealed ? symbol : "✦";
    card.setAttribute(
      "aria-label",
      isMatched || isRevealed ? symbol : "Hidden card"
    );

    card.disabled =
      isMatched || memoryState.matched.length === 12;

    card.addEventListener("click", () => {
      flipMemoryCard(index);
    });

    memoryGrid.appendChild(card);
  });

  memoryPairsDisplay.textContent = memoryState.matched.length / 2;
  memoryMovesDisplay.textContent = memoryState.moves;

  const gameComplete = memoryState.matched.length === 12;

  claimMemoryRewardButton.disabled =
    !gameComplete || memoryState.claimed;

  if (memoryState.claimed) {
    claimMemoryRewardButton.textContent = "Reward Claimed!";
    memoryMessage.textContent =
      "Victory! You earned 100 Stellar Jade.";
  } else if (gameComplete) {
    claimMemoryRewardButton.textContent = "Claim 100 Stellar Jade";
    memoryMessage.textContent =
      "All pairs matched! Claim your reward.";
  } else {
    claimMemoryRewardButton.textContent = "Match all pairs to claim";
    memoryMessage.textContent =
      "Find matching pairs of cosmic symbols!";
  }
}

function flipMemoryCard(index) {
  if (memoryState.claimed) return;
  if (memoryState.matched.length === 12) return;
  if (memoryState.matched.includes(index)) return;
  if (memoryState.revealed.includes(index)) return;

  // Hide a previous mismatched pair when the next card is chosen.
  if (memoryState.revealed.length === 2) {
    memoryState.revealed = [];
  }

  memoryState.revealed.push(index);

  if (memoryState.revealed.length === 2) {
    memoryState.moves++;

    const [first, second] = memoryState.revealed;

    if (memoryState.deck[first] === memoryState.deck[second]) {
      memoryState.matched.push(first, second);
      memoryState.revealed = [];
    }
  }

  saveMemoryState();
  renderMemoryGame();
}

claimMemoryRewardButton.addEventListener("click", () => {
  const gameComplete = memoryState.matched.length === 12;

  if (!gameComplete || memoryState.claimed) return;

  // Mark the reward claimed before saving to prevent duplicate claims.
  memoryState.claimed = true;
  saveMemoryState();

  jade += MEMORY_REWARD;
  updateResources();

  renderMemoryGame();
});

newMemoryGameButton.addEventListener("click", () => {
  const gameComplete = memoryState.matched.length === 12;

  if (
    !memoryState.claimed &&
    memoryState.moves > 0 &&
    !gameComplete
  ) {
    const confirmed = confirm(
      "Start a new game? Your current progress will be lost."
    );

    if (!confirmed) return;
  }

  memoryState = createMemoryState();

  saveMemoryState();
  renderMemoryGame();
});
/* STAGE 15.2: ARCADE WINDOW NAVIGATION */

const arcadeLauncher = document.getElementById("arcadeLauncher");
const memoryGameWindow = document.getElementById("memoryGameWindow");
const mahjongGameWindow = document.getElementById("mahjongGameWindow");

function openArcadeGame(gameWindow) {
  arcadeLauncher.hidden = true;
  memoryGameWindow.hidden = true;
  mahjongGameWindow.hidden = true;

  gameWindow.hidden = false;
}

function closeArcadeGame() {
  memoryGameWindow.hidden = true;
  mahjongGameWindow.hidden = true;
  arcadeLauncher.hidden = false;
}

document.getElementById("openMemoryGame").addEventListener("click", () => {
  openArcadeGame(memoryGameWindow);
});

document.getElementById("openMahjongGame").addEventListener("click", () => {
  openArcadeGame(mahjongGameWindow);
});

document.querySelectorAll("[data-close-arcade]").forEach(button => {
  button.addEventListener("click", closeArcadeGame);
});

/* STAGE 15.2: MAHJONG MINI-GAME */

const mahjongGrid = document.getElementById("mahjongGrid");
const mahjongPairsDisplay = document.getElementById("mahjongPairs");
const mahjongMovesDisplay = document.getElementById("mahjongMoves");
const mahjongMessage = document.getElementById("mahjongMessage");
const claimMahjongRewardButton =
  document.getElementById("claimMahjongReward");
const newMahjongGameButton =
  document.getElementById("newMahjongGame");

const MAHJONG_SAVE_KEY = "hsrArcadeMahjongState";
const MAHJONG_REWARD = 100;

const mahjongSymbols = [
  "🀇", "🀇", "🀙", "🀙",
  "🀄", "🀄", "🀅", "🀅",
  "🀆", "🀆", "🀀", "🀀",
  "🀐", "🀐", "🀑", "🀑"
];

function createMahjongDeck() {
  const deck = [...mahjongSymbols];

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

function createMahjongState() {
  return {
    deck: createMahjongDeck(),
    matched: [],
    selected: [],
    moves: 0,
    claimed: false
  };
}

function loadMahjongState() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(MAHJONG_SAVE_KEY) || "null"
    );

    if (
      saved &&
      Array.isArray(saved.deck) &&
      saved.deck.length === 16 &&
      saved.deck.every(tile => mahjongSymbols.includes(tile)) &&
      Array.isArray(saved.matched) &&
      Array.isArray(saved.selected) &&
      Number.isSafeInteger(saved.moves) &&
      saved.moves >= 0 &&
      typeof saved.claimed === "boolean"
    ) {
      return saved;
    }
  } catch (error) {
    // Start a new game if the saved data is invalid.
  }

  return createMahjongState();
}

let mahjongState = loadMahjongState();

function saveMahjongState() {
  localStorage.setItem(
    MAHJONG_SAVE_KEY,
    JSON.stringify(mahjongState)
  );
}

function renderMahjongGame() {
  mahjongGrid.innerHTML = "";

  mahjongState.deck.forEach((tile, index) => {
    const isMatched = mahjongState.matched.includes(index);
    const isSelected = mahjongState.selected.includes(index);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "mahjong-tile";
    button.textContent = tile;
    button.setAttribute("aria-label", "Mahjong tile " + tile);

    if (isMatched) button.classList.add("matched");
    if (isSelected) button.classList.add("selected");

    button.disabled =
      isMatched || mahjongState.matched.length === 16;

    button.addEventListener("click", () => {
      selectMahjongTile(index);
    });

    mahjongGrid.appendChild(button);
  });

  mahjongPairsDisplay.textContent =
    mahjongState.matched.length / 2;
  mahjongMovesDisplay.textContent = mahjongState.moves;

  const gameComplete = mahjongState.matched.length === 16;

  claimMahjongRewardButton.disabled =
    !gameComplete || mahjongState.claimed;

  if (mahjongState.claimed) {
    claimMahjongRewardButton.textContent = "Reward Claimed!";
    mahjongMessage.textContent =
      "Well played! You earned 100 Stellar Jade.";
  } else if (gameComplete) {
    claimMahjongRewardButton.textContent = "Claim 100 Stellar Jade";
    mahjongMessage.textContent =
      "All pairs matched! Claim your reward.";
  } else {
    claimMahjongRewardButton.textContent = "Match all pairs to claim";
  }
}

function selectMahjongTile(index) {
  if (mahjongState.claimed) return;
  if (mahjongState.matched.length === 16) return;
  if (mahjongState.matched.includes(index)) return;
  if (mahjongState.selected.includes(index)) return;

  if (mahjongState.selected.length === 2) {
    mahjongState.selected = [];
  }

  mahjongState.selected.push(index);

  if (mahjongState.selected.length === 2) {
    mahjongState.moves++;

    const [first, second] = mahjongState.selected;

    if (mahjongState.deck[first] === mahjongState.deck[second]) {
      mahjongState.matched.push(first, second);
      mahjongState.selected = [];
    }
  }

  saveMahjongState();
  renderMahjongGame();
}

claimMahjongRewardButton.addEventListener("click", () => {
  if (mahjongState.matched.length !== 16) return;
  if (mahjongState.claimed) return;

  mahjongState.claimed = true;
  saveMahjongState();

  jade += MAHJONG_REWARD;
  updateResources();

  renderMahjongGame();
});

newMahjongGameButton.addEventListener("click", () => {
  const gameComplete = mahjongState.matched.length === 16;

  if (
    !mahjongState.claimed &&
    mahjongState.moves > 0 &&
    !gameComplete
  ) {
    const confirmed = confirm(
      "Start a new Mahjong game? Your current progress will be lost."
    );

    if (!confirmed) return;
  }

  mahjongState = createMahjongState();
  saveMahjongState();
  renderMahjongGame();
});

saveMahjongState();
renderMahjongGame();


// Initialize the arcade and restore any saved game.
saveMemoryState();
renderMemoryGame();

document.getElementById("singlePull").addEventListener("click", () => warp(1));
document.getElementById("tenPull").addEventListener("click", () => warp(10));
populateCharacterSelector();
updateBanner();
updateResources();
updatePity();
renderCollection();
renderHistory();
updatePullStatistics();
document.getElementById("clearHistory").addEventListener("click", clearHistory);
// STAGE 13.3: RESET PULL STATISTICS
document.getElementById("resetStats").addEventListener("click", () => {
  const confirmed = confirm(
    "Reset your pull statistics and clear your warp history?"
  );

  if (!confirmed) return;

  warpHistory = [];
  totalPulls = 0;

  localStorage.setItem("hsrWarpHistory", JSON.stringify(warpHistory));
  localStorage.setItem("hsrTotalPulls", totalPulls);

  renderHistory();
  updatePullStatistics();
});
/* STAGE 13.4: EXPORT SAVE BACKUP */

document.getElementById("exportSave").addEventListener("click", () => {
  const saveData = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key && key.startsWith("hsr")) {
      saveData[key] = localStorage.getItem(key);
    }
  }

  const backup = new Blob(
    [JSON.stringify(saveData, null, 2)],
    { type: "application/json" }
  );

  const downloadUrl = URL.createObjectURL(backup);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = "hsr-simulator-backup.json";
  link.click();

  URL.revokeObjectURL(downloadUrl);

  document.getElementById("backupMessage").textContent =
    "Save backup exported!";
});

/* STAGE 13.5: IMPORT SAVE BACKUP */

const importSaveButton = document.getElementById("importSave");
const importSaveFile = document.getElementById("importSaveFile");
const importMessage = document.getElementById("importMessage");

importSaveButton.addEventListener("click", () => {
  importSaveFile.click();
});

importSaveFile.addEventListener("change", async () => {
  const file = importSaveFile.files[0];

  if (!file) return;

  try {
    const text = await file.text();
    const saveData = JSON.parse(text);

    if (
      !saveData ||
      typeof saveData !== "object" ||
      Array.isArray(saveData)
    ) {
      throw new Error("Invalid backup format.");
    }

    const entries = Object.entries(saveData);

    if (
      entries.length === 0 ||
      entries.some(([key, value]) =>
        !key.startsWith("hsr") ||
        typeof value !== "string"
      )
    ) {
      throw new Error("This doesn't look like a valid save backup.");
    }

    const confirmed = confirm(
      "Import this backup? Your current saved progress will be overwritten."
    );

    if (!confirmed) return;

    for (const [key, value] of entries) {
      localStorage.setItem(key, value);
    }

    importMessage.textContent = "Backup imported! Reloading...";
    window.location.reload();
  } catch (error) {
    importMessage.textContent =
      "Import failed. Please select a valid simulator backup.";
  } finally {
    importSaveFile.value = "";
  }
});

/* STAGE 14.1: COLLECTION SEARCH */

document.getElementById("collectionSearch").addEventListener("input", () => {
  renderCollection();
});


/* ============================
   DEVELOPER OPTIONS
   ============================ */

// Change this to your chosen password.
// WARNING: This is NOT secure on a public GitHub Pages site.
const DEV_PASSWORD = "developersconsole";

const devLoginToggle = document.getElementById("devLoginToggle");
const devLoginArea = document.getElementById("devLoginArea");
const devLoginMessage = document.getElementById("devLoginMessage");
const devContent = document.getElementById("devContent");
const devPassword = document.getElementById("devPassword");
const devMessage = document.getElementById("devMessage");

// Open and close the login area.
devLoginToggle.addEventListener("click", () => {
  devLoginArea.hidden = !devLoginArea.hidden;
});

// Check the password.
function unlockDeveloperOptions() {
  if (devPassword.value === DEV_PASSWORD) {
    devContent.hidden = false;
    devLoginArea.hidden = true;
    devLoginToggle.hidden = true;
    devLoginMessage.textContent = "";
    devPassword.value = "";
  } else {
    devLoginMessage.textContent = "Incorrect password. Try again.";
    devPassword.value = "";
  }
}

document.getElementById("devLogin").addEventListener("click", () => {
  unlockDeveloperOptions();
});

// Allow Enter to submit the password.
devPassword.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    unlockDeveloperOptions();
  }
});

// Lock the developer options again.
document.getElementById("devLogout").addEventListener("click", () => {
  devContent.hidden = true;
  devLoginArea.hidden = true;
  devLoginToggle.hidden = false;
  devLoginToggle.textContent = "🔒 Developer Login";
  devPassword.value = "";
  devMessage.textContent = "";
});

// Give yourself Special Passes.
document.getElementById("givePasses").addEventListener("click", () => {
  const amount = Number(document.getElementById("devPasses").value);

  if (!Number.isSafeInteger(amount) || amount < 0 || amount > 999999) {
    devMessage.textContent = "Enter a valid amount of passes.";
    return;
  }

  passes += amount;
  updateResources();

  devMessage.textContent = `Added ${amount} Special Passes!`;
});

// Give yourself Stellar Jade.
document.getElementById("giveJade").addEventListener("click", () => {
  const amount = Number(document.getElementById("devJade").value);

  if (!Number.isSafeInteger(amount) || amount < 0 || amount > 9999999) {
    devMessage.textContent = "Enter a valid amount of Stellar Jade.";
    return;
  }

  jade += amount;
  updateResources();

  devMessage.textContent = `Added ${amount} Stellar Jade!`;
});
