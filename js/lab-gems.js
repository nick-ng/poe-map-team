import assert, { match } from "node:assert";
import { writeFile } from "node:fs/promises";
import { createInterface as readlineCreateInterface } from "node:readline/promises";
import { join } from "path";

const POE_NINJA_URL = "https://poe.ninja";
const SKILL_GEMS = [
  { colour: "white", name: "Detonate Mines" },
  { colour: "white", name: "Portal" },
  { colour: "blue", name: "Arc" },
  { colour: "blue", name: "Armageddon Brand" },
  { colour: "blue", name: "Automation" },
  { colour: "blue", name: "Ball Lightning" },
  { colour: "blue", name: "Bane" },
  { colour: "blue", name: "Blade Blast" },
  { colour: "blue", name: "Blight" },
  { colour: "blue", name: "Bodyswap" },
  { colour: "blue", name: "Brand Recall" },
  { colour: "blue", name: "Cold Snap" },
  { colour: "blue", name: "Contagion" },
  { colour: "blue", name: "Convocation" },
  { colour: "blue", name: "Crackling Lance" },
  { colour: "blue", name: "Despair" },
  { colour: "blue", name: "Discharge" },
  { colour: "blue", name: "Divine Ire" },
  { colour: "blue", name: "Energy Blade" },
  { colour: "blue", name: "Essence Drain" },
  { colour: "blue", name: "Eye of Winter" },
  { colour: "blue", name: "Firestorm" },
  { colour: "blue", name: "Flame Dash" },
  { colour: "blue", name: "Flame Surge" },
  { colour: "blue", name: "Flameblast" },
  { colour: "blue", name: "Forbidden Rite" },
  { colour: "blue", name: "Frost Bomb" },
  { colour: "blue", name: "Frostblink" },
  { colour: "blue", name: "Galvanic Field" },
  { colour: "blue", name: "Glacial Cascade" },
  { colour: "blue", name: "Hexblast" },
  { colour: "blue", name: "Ice Nova" },
  { colour: "blue", name: "Ice Spear" },
  { colour: "blue", name: "Icicle Mine" },
  { colour: "blue", name: "Incinerate" },
  { colour: "blue", name: "Kinetic Blast" },
  { colour: "blue", name: "Kinetic Bolt" },
  { colour: "blue", name: "Lightning Conduit" },
  { colour: "blue", name: "Lightning Spire Trap" },
  { colour: "blue", name: "Lightning Tendrils" },
  { colour: "blue", name: "Lightning Trap" },
  { colour: "blue", name: "Lightning Warp" },
  { colour: "blue", name: "Malevolence" },
  { colour: "blue", name: "Penance Brand" },
  { colour: "blue", name: "Power Siphon" },
  { colour: "blue", name: "Purifying Flame" },
  { colour: "blue", name: "Purity of Lightning" },
  { colour: "blue", name: "Pyroclast Mine" },
  { colour: "blue", name: "Raise Spectre" },
  { colour: "blue", name: "Raise Zombie" },
  { colour: "blue", name: "Righteous Fire" },
  { colour: "blue", name: "Scorching Ray" },
  { colour: "blue", name: "Sigil of Power" },
  { colour: "blue", name: "Soulrend" },
  { colour: "blue", name: "Spark" },
  { colour: "blue", name: "Storm Brand" },
  { colour: "blue", name: "Storm Call" },
  { colour: "blue", name: "Storm Rain" },
  { colour: "blue", name: "Stormbind" },
  { colour: "blue", name: "Summon Carrion Golem" },
  { colour: "blue", name: "Summon Chaos Golem" },
  { colour: "blue", name: "Summon Holy Relic" },
  { colour: "blue", name: "Summon Lightning Golem" },
  { colour: "blue", name: "Summon Raging Spirit" },
  { colour: "blue", name: "Summon Reaper" },
  { colour: "blue", name: "Summon Skeletons" },
  { colour: "blue", name: "Void Sphere" },
  { colour: "blue", name: "Vortex" },
  { colour: "blue", name: "Wintertide Brand" },
  { colour: "blue", name: "Wrath" },
  { colour: "green", name: "Animate Weapon" },
  { colour: "green", name: "Artillery Ballista" },
  { colour: "green", name: "Bear Trap" },
  { colour: "green", name: "Blade Flurry" },
  { colour: "green", name: "Blade Trap" },
  { colour: "green", name: "Bladefall" },
  { colour: "green", name: "Blink Arrow" },
  { colour: "green", name: "Blood Rage" },
  { colour: "green", name: "Burning Arrow" },
  { colour: "green", name: "Caustic Arrow" },
  { colour: "green", name: "Cremation" },
  { colour: "green", name: "Cyclone" },
  { colour: "green", name: "Detonate Dead" },
  { colour: "green", name: "Double Strike" },
  { colour: "green", name: "Dual Strike" },
  { colour: "green", name: "Elemental Hit" },
  { colour: "green", name: "Ethereal Knives" },
  { colour: "green", name: "Explosive Trap" },
  { colour: "green", name: "Fire Trap" },
  { colour: "green", name: "Flicker Strike" },
  { colour: "green", name: "Frenzy" },
  { colour: "green", name: "Frost Blades" },
  { colour: "green", name: "Haste" },
  { colour: "green", name: "Ice Shot" },
  { colour: "green", name: "Ice Trap" },
  { colour: "green", name: "Lacerate" },
  { colour: "green", name: "Lancing Steel" },
  { colour: "green", name: "Lightning Strike" },
  { colour: "green", name: "Mirror Arrow" },
  { colour: "green", name: "Poisonous Concoction" },
  { colour: "green", name: "Precision" },
  { colour: "green", name: "Puncture" },
  { colour: "green", name: "Purity of Ice" },
  { colour: "green", name: "Rain of Arrows" },
  { colour: "green", name: "Scourge Arrow" },
  { colour: "green", name: "Shrapnel Ballista" },
  { colour: "green", name: "Siege Ballista" },
  { colour: "green", name: "Summon Ice Golem" },
  { colour: "green", name: "Tornado" },
  { colour: "green", name: "Toxic Rain" },
  { colour: "green", name: "Viper Strike" },
  { colour: "green", name: "Volatile Dead" },
  { colour: "green", name: "Wild Strike" },
  { colour: "red", name: "Animate Guardian" },
  { colour: "red", name: "Boneshatter" },
  { colour: "red", name: "Corrupting Fever" },
  { colour: "red", name: "Determination" },
  { colour: "red", name: "Earthshatter" },
  { colour: "red", name: "Flesh and Stone" },
  { colour: "red", name: "Ground Slam" },
  { colour: "red", name: "Leap Slam" },
  { colour: "red", name: "Molten Shell" },
  { colour: "red", name: "Molten Strike" },
  { colour: "red", name: "Purity of Fire" },
  { colour: "red", name: "Smite" },
  { colour: "red", name: "Summon Flame Golem" },
  { colour: "red", name: "Summon Stone Golem" },
  { colour: "red", name: "Vitality" },
  { colour: "red", name: "Volcanic Fissure" },
  { colour: "blue", name: "Discipline" },
  { colour: "green", name: "Sniper's Mark" },
  { colour: "green", name: "Grace" },
  { colour: "red", name: "Anger" },
  { colour: "blue", name: "Conductivity" },
  { colour: "green", name: "Lightning Arrow" },
  { colour: "red", name: "Rage Vortex" },
  { colour: "red", name: "Tectonic Slam" },
  { colour: "green", name: "Barrage" },
  { colour: "red", name: "Consecrated Path" },
  { colour: "red", name: "Infernal Blow" },
  { colour: "blue", name: "Purity of Elements" },
  { colour: "blue", name: "Tempest Shield" },
  { colour: "green", name: "Blade Vortex" },
  { colour: "green", name: "Splitting Steel" },
  { colour: "blue", name: "Shock Nova" },
  { colour: "red", name: "Vengeful Cry" },
  { colour: "green", name: "Galvanic Arrow" },
  { colour: "green", name: "Spectral Shield Throw" },
  { colour: "red", name: "Berserk" },
  { colour: "green", name: "Seismic Trap" },
  { colour: "green", name: "Desecrate" },
  { colour: "red", name: "Frozen Legion" },
  { colour: "green", name: "Withering Step" },
  { colour: "red", name: "Dread Banner" },
  { colour: "blue", name: "Flesh Offering" },
  { colour: "red", name: "Immortal Call" },
  { colour: "green", name: "Temporal Chains" },
  { colour: "green", name: "Flamethrower Trap" },
  { colour: "blue", name: "Creeping Frost" },
  { colour: "blue", name: "Bone Offering" },
  { colour: "red", name: "Herald of Ash" },
  { colour: "green", name: "Herald of Ice" },
  { colour: "green", name: "Herald of Agony" },
  { colour: "red", name: "Herald of Purity" },
  { colour: "blue", name: "Herald of Thunder" },
  { colour: "red", name: "Punishment" },
  { colour: "blue", name: "Searing Bond" },
  { colour: "red", name: "Earthquake" },
  { colour: "red", name: "Vulnerability" },
  { colour: "red", name: "Enduring Cry" },
  { colour: "red", name: "Pride" },
  { colour: "blue", name: "Elemental Weakness" },
  { colour: "green", name: "Ambush" },
  { colour: "red", name: "Protective Link" },
  { colour: "blue", name: "Destructive Link" },
  { colour: "red", name: "Flame Link" },
  { colour: "green", name: "Snipe" },
  { colour: "green", name: "Spectral Throw" },
  { colour: "red", name: "Perforate" },
  { colour: "red", name: "Glacial Hammer" },
  { colour: "red", name: "Ice Crash" },
  { colour: "red", name: "Absolution" },
  { colour: "red", name: "Holy Flame Totem" },
  { colour: "red", name: "Shield Crush" },
  { colour: "red", name: "Bladestorm" },
  { colour: "green", name: "Explosive Arrow" },
  { colour: "blue", name: "Enfeeble" },
  { colour: "red", name: "Autoexertion" },
  { colour: "green", name: "Hatred" },
  { colour: "green", name: "Shattering Steel" },
  { colour: "blue", name: "Summon Skitterbots" },
  { colour: "red", name: "Steelskin" },
  { colour: "red", name: "Seismic Cry" },
  { colour: "red", name: "Petrified Blood" },
  { colour: "blue", name: "Wave of Conviction" },
  { colour: "red", name: "Sunder" },
  { colour: "green", name: "Pestilent Strike" },
  { colour: "green", name: "Charged Dash" },
  { colour: "green", name: "Poacher's Mark" },
  { colour: "red", name: "Defiance Banner" },
  { colour: "green", name: "Venom Gyre" },
  { colour: "blue", name: "Soul Link" },
  { colour: "green", name: "Whirling Blades" },
  { colour: "red", name: "Rallying Cry" },
  { colour: "blue", name: "Flammability" },
  { colour: "blue", name: "Manabond" },
  { colour: "blue", name: "Clarity" },
  { colour: "red", name: "Intimidating Cry" },
  { colour: "green", name: "Plague Bearer" },
  { colour: "blue", name: "Winter Orb" },
  { colour: "blue", name: "Zealotry" },
  { colour: "blue", name: "Spirit Offering" },
  { colour: "blue", name: "Storm Burst" },
  { colour: "blue", name: "Assassin's Mark" },
  { colour: "red", name: "Blood and Sand" },
  { colour: "blue", name: "Spellslinger" },
  { colour: "green", name: "Split Arrow" },
  { colour: "green", name: "Ensnaring Arrow" },
  { colour: "red", name: "Static Strike" },
  { colour: "red", name: "War Banner" },
  { colour: "blue", name: "Frost Shield" },
  { colour: "blue", name: "Conversion Trap" },
  { colour: "blue", name: "Voltaxic Burst" },
  { colour: "green", name: "Spectral Helix" },
  { colour: "green", name: "Temporal Rift" },
  { colour: "green", name: "Vampiric Link" },
  { colour: "red", name: "Exsanguinate" },
  { colour: "red", name: "Dominating Blow" },
  { colour: "blue", name: "Fireball" },
  { colour: "green", name: "Unearth" },
  { colour: "red", name: "Cleave" },
  { colour: "red", name: "Battlemage's Cry" },
  { colour: "red", name: "Warlord's Mark" },
  { colour: "blue", name: "Stormblast Mine" },
  { colour: "red", name: "Sweep" },
  { colour: "green", name: "Reave" },
  { colour: "blue", name: "Hydrosphere" },
  { colour: "blue", name: "Frostbite" },
  { colour: "green", name: "Intuitive Link" },
  { colour: "green", name: "Cobra Lash" },
  { colour: "red", name: "Rejuvenation Totem" },
  { colour: "blue", name: "Rolling Magma" },
  { colour: "green", name: "Explosive Concoction" },
  { colour: "red", name: "General's Cry" },
  { colour: "blue", name: "Freezing Pulse" },
  { colour: "blue", name: "Siphoning Trap" },
  { colour: "blue", name: "Flame Wall" },
  { colour: "green", name: "Blast Rain" },
  { colour: "blue", name: "Frost Wall" },
  { colour: "red", name: "Infernal Cry" },
  { colour: "red", name: "Ancestral Cry" },
  { colour: "red", name: "Reap" },
  { colour: "red", name: "Chain Hook" },
  { colour: "blue", name: "Blazing Salvo" },
  { colour: "red", name: "Devouring Totem" },
  { colour: "green", name: "Phase Run" },
  { colour: "green", name: "Smoke Mine" },
  { colour: "blue", name: "Dark Pact" },
  { colour: "red", name: "Shield Charge" },
  { colour: "blue", name: "Frostbolt" },
  { colour: "red", name: "Decoy Totem" },
  { colour: "red", name: "Shockwave Totem" },
  { colour: "blue", name: "Wither" },
  { colour: "blue", name: "Orb of Storms" },
  { colour: "green", name: "Dash" },
  { colour: "red", name: "Vigilant Strike" },
  { colour: "red", name: "Heavy Strike" },
  { colour: "green", name: "Alchemist's Mark" },
  { colour: "red", name: "Crushing Fist" },
  { colour: "green", name: "Glacial Shield Swipe" },
  { colour: "red", name: "Swordstorm" },
  { colour: "red", name: "Eviscerate" },
  { colour: "blue", name: "Divine Retribution" },
];
const COLOUR_EMOJIS = {
  red: "🔴",
  green: "🟢",
  blue: "🔵",
};

const lines = [];
const addLine = (line) => {
  // console.info(line);
  lines.push(line);
};

const saveLines = async () => {
  return writeFile(join("LAB_GEMS.md"), lines.join("\n"));
};

const getLeague = async () => {
  const res = await fetch("https://poe.ninja/api/data/index-state");
  const resJson = await res.json();
  const temp = resJson.economyLeagues.filter((l) => {
    const leagueName = l.name.toLowerCase();
    if (leagueName === "standard") {
      return false;
    }

    if (leagueName.includes("hardcore")) {
      return false;
    }

    return true;
  });

  if (temp.length !== 1) {
    console.warn(`${temp.length} leagues found. Expected 1`);
    temp.forEach((t) => {
      console.info(t.displayName, t.uri);
    });
  }
  if (temp.length < 1) {
    console.warn("Error, no economy league found");
    const rl = readlineCreateInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const leagueName = await rl.question(
      "Go to https://poe.ninja and enter the league's uri. It should be one word with no / characters",
    );

    assert(leagueName, "Couldn't get league name and no league name provided");

    return {
      name: leagueName,
      url: leagueName,
      displayName: leagueName,
    };
  }

  return temp[0];
};

const getGems = async (leagueName) => {
  const url = [
    POE_NINJA_URL,
    "api",
    "data",
    `itemoverview?league=${leagueName}&type=SkillGem`,
  ].join("/");
  const res = await fetch(url);
  const resJson = await res.json();

  return resJson.lines.map((gem) => {
    const temp = gem.name.split(" of ");
    return { ...gem, normalGem: temp[0] };
  });
};

// @todo(nick-ng): create a .md file and save it to the repo.
// @todo(nick-ng): random gem of same colour and same transfigured gem.

const main = async () => {
  addLine("## merclab\n");
  const league = await getLeague();
  const gems = await getGems(league.name);
  const labGems = gems.filter((gem) => {
    const gemName = gem.name.toLowerCase();
    if (
      gem.corrupted ||
      gem.gemLevel >= 20 ||
      gem.gemQuality >= 20 ||
      gemName.includes("support") ||
      gemName.includes("trarthus") ||
      gemName.includes("vaal")
    ) {
      return false;
    }

    return true;
  });

  addLine(
    `[${league.name}](https://poe.ninja/economy/${
      league.url
    }/skill-gems), fetched at ${new Date()}`,
  );
  addLine("");

  const gemInfo = { red: [], green: [], blue: [], white: [] };
  SKILL_GEMS.forEach((g) => {
    const matchingLabGems = labGems.filter((lg) =>
      lg.name.toLowerCase().startsWith(g.name.toLowerCase()),
    );

    let hasUnusual = false;
    for (let i = 0; i < matchingLabGems.length; i++) {
      matchingLabGems[i].processed = true;
      if (
        matchingLabGems[i].name.toLowerCase() !== g.name.toLocaleLowerCase()
      ) {
        matchingLabGems[i].isUnusual = true;
        hasUnusual = true;
        matchingLabGems[i].colour = g.colour;
      }
    }

    if (hasUnusual && Object.keys(gemInfo).includes(g.colour)) {
      gemInfo[g.colour].push(matchingLabGems);
    }
  });

  labGems
    .filter((g) => !g.processed)
    .slice(0, 20)
    .forEach((gn) => {
      console.warn(`{ colour: "", name: "${gn.normalGem}" },`);
    });

  const sameColourPrices = { red: [], green: [], blue: [], white: [] };
  const sameGemPrices = [];
  for (const colour in gemInfo) {
    for (const gemGroup of gemInfo[colour]) {
      const sameGemItem = {
        normal: undefined,
        transfigured: [],
        ev: 0,
      };
      let sameGemTotal = 0;
      for (const gem of gemGroup) {
        if (gem.isUnusual) {
          sameColourPrices[colour].push(gem);
          sameGemItem.transfigured.push(gem);
          sameGemTotal = sameGemTotal + gem.chaosValue;
        } else {
          sameGemItem.normal = gem;
        }
      }

      sameGemItem.ev = sameGemTotal / sameGemItem.transfigured.length;
      sameGemPrices.push(sameGemItem);
    }
    sameColourPrices[colour].sort((a, b) => {
      if (a.divineValue !== b.divineValue) {
        return b.divineValue - a.divineValue;
      }

      return b.chaosValue - a.chaosValue;
    });
  }

  const randomSameColour = [];
  for (const colour in sameColourPrices) {
    let total = 0;
    let totalTop3 = 0;
    for (let i = 0; i < sameColourPrices[colour].length; i++) {
      total = total + sameColourPrices[colour][i].chaosValue;
      if (i < 3) {
        totalTop3 = totalTop3 + sameColourPrices[colour][i].chaosValue;
      }
    }

    const expectedValue = total / sameColourPrices[colour].length;
    const top3Value = totalTop3 / 3;
    const top3Chance = 3 / sameColourPrices[colour].length;
    const top3EV = totalTop3 / sameColourPrices[colour].length;
    if (sameColourPrices[colour].length > 0) {
      randomSameColour.push({
        colour,
        expectedValue,
        top3: sameColourPrices[colour].slice(0, 3),
        top3Value,
        top3Chance,
        top3EV,
      });
    }
  }

  randomSameColour.sort((a, b) => b.expectedValue - a.expectedValue);

  addLine(
    "### Transform a Skill Gem to be a random Transfigured Gem of the same colour\n",
  );
  addLine("Colour | Top 3 | Expected Value");
  addLine(":- | :- | -:");
  randomSameColour.forEach((a) => {
    const gemLinks = a.top3
      .map(
        (g) =>
          `[${g.name} (${g.chaosValue}c)](${[
            POE_NINJA_URL,
            "economy",
            league.url,
            "skill-gems",
            g.detailsId,
          ].join("/")})`,
      )
      .join(", ");
    addLine(
      [
        `${COLOUR_EMOJIS[a.colour]} ${a.colour}`,
        gemLinks,
        `${Math.round(a.expectedValue * 100) / 100}c`,
      ].join(" | "),
    );
  });

  addLine("");

  addLine(
    "### Transform a non-Transfigured Skill Gem to be a random Transfigured version\n",
  );

  addLine("");

  const sameGemLines = sameGemPrices
    .sort((a, b) => {
      return b.ev - a.ev;
    })
    .map((g) => {
      const transfiguredLinks = g.transfigured
        .map(
          (t) =>
            `[${t.name} (${t.chaosValue}c)](${[
              POE_NINJA_URL,
              "economy",
              league.url,
              "skill-gems",
              g.detailsId,
            ].join("/")})`,
        )
        .join(", ");

      return [
        `[${g.normal.name}](${g.normal.name.replaceAll(" ", "_")})`,
        transfiguredLinks,
        `${Math.round(g.ev * 100) / 100}c`,
      ].join(" | ");
    });

  addLine("Normal Gem | Transfigured Gems | EV");
  addLine(" :- | :- | -: ");

  sameGemLines.slice(0, 10).forEach((l) => addLine(l));

  addLine("");

  addLine("<details><summary> All Gems </summary>");
  addLine("Normal Gem | Transfigured Gems | EV");
  addLine(" :- | :- | -: ");
  sameGemLines.forEach((l) => addLine(l));
  addLine("</details>");

  await saveLines();
};

main();
