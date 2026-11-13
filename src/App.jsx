import { useEffect, useMemo, useRef, useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";

const files = import.meta.glob("./assets/**/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});
const asset = (fragment) => {
  const entry = Object.entries(files).find(([path]) =>
    path.toLowerCase().endsWith(fragment.toLowerCase()),
  );
  return entry?.[1] || "";
};

const openingIntro =
  asset("/opening/intro-bg.jpg") || asset("/home/2009/intro-bg.jpg");

const eraContent = {
  2009: {
    label: "THE MODERN ERA",
    title: "MYSTIC FALLS",
    subtitle: "A town built on secrets. A brotherhood tested by time.",
    entry: openingIntro,
    opening: asset("/home/2009/mystic-falls.jpg"),
    brothers: asset("/home/2009/salvatore-brothers.jpg"),
    brothersTitle: "THE SALVATORE BROTHERS",
    damonBio:
      "Damon Salvatore is the elder Salvatore brother. Turned into a vampire in 1864, he returns to Mystic Falls in 2009 with a sharp wit, a guarded heart and a complicated history with his brother Stefan. His choices often blur the line between selfishness and fierce loyalty.",
    stefanBio:
      "Stefan Salvatore is the younger brother, known for his compassion and struggle to control his vampire nature. In 2009, his return to Mystic Falls reconnects him with Elena Gilbert and brings the brothers’ long, turbulent history back into the present.",
    palette: "modern",
  },
  1864: {
    label: "THE FOUNDERS’ ERA",
    title: "MYSTIC FALLS, 1864",
    subtitle:
      "Before the legends. Before the lies. The past was already hungry.",
    entry: openingIntro,
    opening: asset("/home/1864/mystic-falls-1864.jpg"),
    brothers: asset("/home/1864/salvatore-brothers-1864.jpg"),
    brothersTitle: "THE SALVATORE BROTHERS — 1864",
    damonBio:
      "In 1864, Damon is the elder son of Giuseppe Salvatore. His relationship with Katherine Pierce and his growing conflict with his father place him at the centre of the events that change the brothers’ lives forever.",
    stefanBio:
      "In 1864, Stefan is the younger Salvatore son, living under his father Giuseppe’s authority. His bond with Damon is tested as Katherine’s arrival and the town’s anti-vampire activities set the Founders’ Era in motion.",
    palette: "historical",
  },
};

const navItems = [
  ["Home", "/"],
  ["Characters", "/characters"],
  ["Families", "/families"],
  ["Mythology", "/mythology"],
  ["Locations", "/locations"],
  ["Museum", "/museum"],
  ["Seasons", "/seasons"],
  ["Gallery", "/gallery"],
];

const characters = {
  2009: [
    [
      "Damon Salvatore",
      "The elder Salvatore brother: witty, impulsive and fiercely protective beneath his dangerous reputation.",
      "/characters/2009/damon-salvatore.jpg",
      "September 1844",
      "Mystic Falls, Virginia",
      "Ian Somerhalder",
      "Vampire; older Salvatore brother",
    ],
    [
      "Stefan Salvatore",
      "The younger Salvatore brother, compassionate and thoughtful, forever struggling with his vampire instincts.",
      "/characters/2009/stefan-salvatore.jpg",
      "November 1, 1846",
      "Mystic Falls, Virginia",
      "Paul Wesley",
      "Vampire; younger Salvatore brother",
    ],
    [
      "Elena Gilbert",
      "A Gilbert descendant whose resemblance to Katherine draws her into the Salvatore brothers’ lives and Mystic Falls’ supernatural history.",
      "/characters/2009/elena-gilbert.jpg",
      "June 22, 1992",
      "Mystic Falls, Virginia",
      "Nina Dobrev",
      "Human; later becomes a vampire and returns to human life",
    ],
    [
      "Bonnie Bennett",
      "A gifted witch from the Bennett bloodline whose courage and magic repeatedly protect her friends.",
      "/characters/2009/bonnie-bennett.jpg",
      "February 1993",
      "Mystic Falls, Virginia",
      "Kat Graham",
      "Witch; Bennett bloodline",
    ],
    [
      "Caroline Forbes",
      "A determined, loyal friend who grows into a confident vampire and one of Mystic Falls’ strongest protectors.",
      "/characters/2009/caroline-forbes.jpg",
      "October 10, 1992",
      "Mystic Falls, Virginia",
      "Candice King",
      "Human; later vampire",
    ],
    [
      "Alaric Saltzman",
      "A history teacher who arrives in Mystic Falls and becomes a trusted ally, guardian and supernatural investigator.",
      "/characters/2009/alaric-saltzman.jpg",
      1976,
      "Unspecified; later settles in Mystic Falls",
      "Matthew Davis",
      "Human; vampire hunter; later enhanced Original vampire",
    ],
    [
      "Anna",
      "A vampire who returns to Mystic Falls seeking her mother Pearl and answers about the tomb vampires.",
      "/characters/2009/anna.jpg",
      "Born before 1864; exact date unknown",
      "Unknown; connected to the tomb vampires",
      "Malese Jow",
      "Vampire",
    ],
    [
      "Carol Lockwood",
      "Tyler’s mother and a prominent member of the town’s founding-family leadership.",
      "/characters/2009/carol-lockwood.jpg",
      "Exact date not stated",
      "Mystic Falls, Virginia",
      "Susan Walters",
      "Human; Lockwood family",
    ],
    [
      "Elijah Mikaelson",
      "An Original vampire known for his composure, formal code of honour and complicated devotion to his family.",
      "/characters/2009/elijah-mikaelson.jpg",
      "10th century; exact date unknown",
      "Eastern Europe",
      "Daniel Gillies",
      "Original vampire",
    ],
    [
      "Elizabeth Forbes",
      "Caroline’s mother and the sheriff of Mystic Falls, committed to protecting the town.",
      "/characters/2009/elizabeth-forbes.jpg",
      "Exact date not stated",
      "Mystic Falls, Virginia",
      "Marguerite MacIntyre",
      "Human; sheriff",
    ],
    [
      "Enzo St. John",
      "A witty and resourceful vampire whose past connects him to Damon and the Augustine experiments.",
      "/characters/2009/enzo-st-jhon.jpg",
      "Born in the early 20th century; exact date not stated",
      "England",
      "Michael Malarkey",
      "Vampire",
    ],
    [
      "Finn Mikaelson",
      "One of the Original siblings, awakened after centuries of being daggered and deeply conflicted about vampirism.",
      "/characters/2009/finn-mikaelson.jpg",
      "10th century; exact date unknown",
      "Eastern Europe",
      "Caspar Zafer",
      "Original vampire",
    ],
    [
      "Hayley Marshall",
      "A werewolf who searches for her family history and becomes central to the Mikaelson family story.",
      "/characters/2009/hayely-marshall.jpg",
      "Exact date not stated",
      "United States; raised in the foster system",
      "Phoebe Tonkin",
      "Werewolf; later hybrid",
    ],
    [
      "Jenna Sommers",
      "Elena and Jeremy’s caring aunt and guardian, drawn into the supernatural world surrounding her family.",
      "/characters/2009/jenna.jpg",
      "Exact date not stated",
      "Mystic Falls, Virginia",
      "Sara Canning",
      "Human; later turned into a vampire",
    ],
    [
      "Jeremy Gilbert",
      "Elena’s younger brother, whose grief and curiosity lead him into the world of vampires and vampire hunters.",
      "/characters/2009/jeremy-gilbert.jpg",
      "October 13, 1994",
      "Mystic Falls, Virginia",
      "Steven R. McQueen",
      "Human; vampire hunter",
    ],
    [
      "John Gilbert",
      "Elena’s biological father and a member of the Gilbert family, determined to protect his daughter by his own methods.",
      "/characters/2009/john-gilbert.jpg",
      "Exact date not stated",
      "Mystic Falls, Virginia",
      "David Anders",
      "Human; Gilbert family",
    ],
    [
      "Kai Parker",
      "A dangerous siphoner from the Gemini Coven whose ambition and cruelty make him a formidable enemy.",
      "/characters/2009/kai-parker.jpg",
      "Exact date not stated",
      "Portland, Oregon",
      "Chris Wood",
      "Siphoner; later heretic",
    ],
    [
      "Katherine Pierce",
      "A survivor who has spent centuries evading danger; her history with the Salvatore brothers reaches back to 1864.",
      "/characters/2009/katherine-pierce.jpg",
      "June 5, 1473",
      "Bulgaria",
      "Nina Dobrev",
      "Human Petrova doppelgänger; later vampire",
    ],
    [
      "Klaus Mikaelson",
      "The Original hybrid, feared for his power and ambition but shaped by a complicated desire for family and belonging.",
      "/characters/2009/klaus-mikaelson.jpg",
      "10th century; exact date unknown",
      "Eastern Europe",
      "Joseph Morgan",
      "Original vampire-werewolf hybrid",
    ],
    [
      "Kol Mikaelson",
      "An unpredictable Original vampire whose impulsive nature often puts him at odds with his siblings.",
      "/characters/2009/kol-mikaelson.jpg",
      "10th century; exact date unknown",
      "Eastern Europe",
      "Nathaniel Buzolic",
      "Original vampire",
    ],
    [
      "Lexi Branson",
      "Stefan’s longtime friend and mentor, known for her warmth, humour and loyalty.",
      "/characters/2009/lexi.jpg",
      "Exact date not stated; turned in the 19th century",
      "Unknown",
      "Arielle Kebbel",
      "Vampire",
    ],
    [
      "Mason Lockwood",
      "Tyler’s uncle, whose return reveals the Lockwood family’s werewolf inheritance.",
      "/characters/2009/mason-lockwood.jpg",
      "Exact date not stated",
      "Mystic Falls, Virginia",
      "Taylor Kinney",
      "Werewolf",
    ],
    [
      "Matt Donovan",
      "Elena’s childhood friend and a grounded presence in a town increasingly filled with supernatural danger.",
      "/characters/2009/matt-donovan.jpg",
      "February 26, 1993",
      "Mystic Falls, Virginia",
      "Zach Roerig",
      "Human",
    ],
    [
      "Rebekah Mikaelson",
      "An Original vampire who longs for love, friendship and the ordinary life repeatedly denied to her.",
      "/characters/2009/rebekah-mikaelson.jpg",
      "10th century; exact date unknown",
      "Eastern Europe",
      "Claire Holt",
      "Original vampire",
    ],
    [
      "Rose-Marie",
      "A centuries-old vampire who becomes an uneasy ally and offers insight into the wider vampire world.",
      "/characters/2009/rose-marie.jpg",
      "Exact date not stated",
      "England",
      "Lauren Cohan",
      "Vampire",
    ],
    [
      "Sheila Bennett",
      "Bonnie’s grandmother, a wise witch who guides her granddaughter through the Bennett family legacy.",
      "/characters/2009/sheila-bennett.jpg",
      "Exact date not stated",
      "Mystic Falls area, Virginia",
      "Jasmine Guy",
      "Witch; Bennett bloodline",
    ],
    [
      "Tyler Lockwood",
      "A member of a founding family who discovers the werewolf curse carried by the Lockwoods.",
      "/characters/2009/tyler-lockwood.jpg",
      "February 10, 1992",
      "Mystic Falls, Virginia",
      "Michael Trevino",
      "Human; werewolf; later hybrid",
    ],
    [
      "Vicki Donovan",
      "Matt’s older sister, whose troubled life takes a tragic turn after she becomes involved with the supernatural.",
      "/characters/2009/vicki-donovan.jpg",
      "Exact date not stated",
      "Mystic Falls, Virginia",
      "Kayla Ewell",
      "Human; later vampire",
    ],
    [
      "Isobel Flemming",
      "Isobel Flemming is Elena Gilbert’s biological mother. Her choices draw her into the supernatural world of Mystic Falls, and her connection to Alaric Saltzman becomes an important part of her story.",
      "/characters/2009/isobel-flemming.jpg",
      "Exact date not stated",
      "Mystic Falls, Virginia",
      "Mia Kirshner",
      "Human; later becomes a vampire",
    ],
  ],
  1864: [
    [
      "Damon Salvatore",
      "The elder Salvatore son in the Founders’ Era, whose relationship with Katherine and conflict with Giuseppe shape this period.",
      "/characters/1864/damon-salvatore-1864.jpg",
      "September 1844",
      "Mystic Falls, Virginia",
      "Ian Somerhalder",
      "Human in 1864; becomes a vampire in 1864",
    ],
    [
      "Stefan Salvatore",
      "The younger Salvatore son, living under Giuseppe’s authority as the town’s anti-vampire campaign escalates.",
      "/characters/1864/stefan-salvatore-1864.jpg",
      "November 1, 1846",
      "Mystic Falls, Virginia",
      "Paul Wesley",
      "Human in 1864; becomes a vampire in 1864",
    ],
    [
      "Katherine Pierce",
      "A vampire living under the identity of a Petrova doppelgänger, whose arrival changes the brothers’ lives.",
      asset("/characters/1864/katherine-petrova.jpeg")
        ? "/characters/1864/katherine-petrova.jpeg"
        : "/characters/1864/katherine-petrova.jpg",
      "June 5, 1473",
      "Bulgaria",
      "Nina Dobrev",
      "Vampire; Petrova doppelgänger",
    ],
    [
      "Lillian Salvatore",
      "The Salvatore brothers’ mother, whose memory and family history form part of the Salvatore story.",
      asset("/characters/1864/lilian-salvatore.jpeg")
        ? "/characters/1864/lilian-salvatore.jpeg"
        : "/families/salvatore/lilian-salvatore.jpg",
      "Exact date not stated",
      "Mystic Falls, Virginia",
      "Unknown",
      "Human; Salvatore family",
    ],
    [
      "Giuseppe Salvatore",
      "The strict Salvatore patriarch, whose beliefs and actions shape the brothers’ childhood and the events of 1864.",
      "/characters/1864/giuseppe-salvatore.jpg",
      "Exact date not stated",
      "Mystic Falls, Virginia",
      "James Remar",
      "Human; Salvatore family patriarch",
    ],
    [
      "Emily Bennett",
      "A Bennett witch and Katherine’s handmaiden, whose magic becomes important during the tomb-vampire plot.",
      "/characters/1864/emily-bennett.jpg",
      "Exact date not stated",
      "Mystic Falls area, Virginia",
      "Bianca Lawson",
      "Witch; Bennett bloodline",
    ],
    [
      "Pearl",
      "A vampire and close friend of Katherine whose fate becomes tied to the tomb and the town’s founding families.",
      "/characters/1864/pearl.jpg",
      "Exact date not stated; turned before 1864",
      "Unknown",
      "Kelly Hu",
      "Vampire",
    ],
    [
      "Jonathan Gilbert",
      "A Gilbert family member and inventor whose journal records details of the town’s supernatural history.",
      "/characters/1864/jonathan-gilbert.jpg",
      "Exact date not stated",
      "Mystic Falls, Virginia",
      "David Anders",
      "Human; Gilbert family",
    ],
  ],
};

const museumItems = [
  [
    "Daylight Rings",
    "/museum/daylight-rings.jpg",
    "Witch-enchanted rings that protect vampires from sunlight. Stefan and Damon both rely on daylight jewellery.",
  ],
  [
    "Damon’s Car",
    "/museum/damon-car.jpg",
    "Damon’s iconic black car, a familiar part of his modern Mystic Falls presence.",
  ],
  [
    "Stefan’s Car",
    "/museum/stefan-car.jpg",
    "Stefan’s vehicle, part of the brothers’ modern life in Mystic Falls.",
  ],
  [
    "The Ascendant",
    "/museum/ascendenant.jpg",
    "A mysterious celestial device used with a Bennett witch’s magic to access a prison world.",
  ],
  [
    "Crystal Pendant",
    "/museum/crystal-pendant.jpg",
    "A pendant associated with Bonnie Bennett and the Bennett witch lineage.",
  ],
  [
    "Five Hunters Symbol",
    "/museum/five-hunters-symbol.jpg",
    "A mark connected to the Five, an ancient group of vampire hunters.",
  ],
  [
    "Gilbert Device",
    "/museum/gilbert-device.jpg",
    "A device created by the Gilbert family and used during the Founders’ Council’s campaign against vampires.",
  ],
  [
    "Jonathan Gilbert’s Journal",
    "/museum/johnthan-gilbert-journal.jpg",
    "A record of the Gilbert family’s knowledge of vampires and Mystic Falls’ hidden past.",
  ],
  [
    "Moonstone",
    "/museum/moonstone.jpg",
    "An ancient object central to the curse storyline involving Klaus and the werewolves.",
  ],
  [
    "The Original Dagger",
    "/museum/original-dagger.jpg",
    "A silver dagger used with white oak ash to neutralise an Original vampire, with an important exception.",
  ],
  [
    "Phoenix Sword",
    "/museum/phoenix-sword.png",
    "A supernatural weapon associated with the Armory and the hunt for vampires.",
  ],
  [
    "The Cure",
    "/museum/the-cure.jpg",
    "A rare remedy that can return a vampire to human life; its history drives several major storylines.",
  ],
  [
    "White Oak Stake",
    "/museum/white-oak-stake.jpg",
    "A weapon made from the tree connected to the Original vampires’ immortality and vulnerability.",
  ],
  [
    "Witch Grimoire",
    "/museum/witch-grimoire.jpg",
    "A book of spells and magical knowledge passed through witch lineages.",
  ],
];

const collections = {
  families: {
    title: "BLOODLINES & LEGACIES",
    intro:
      "The names that shaped Mystic Falls—and the histories that refuse to stay buried.",
    items: [
      [
        "The Salvatore Family",
        "/families/salvatore/salvatore-family.jpg",
        "A family legacy shaped by two brothers, a demanding father and generations of secrets.",
      ],
      [
        "The Gilbert Family",
        "/families/gilbert/gilbert-family.jpg",
        "A founding family whose history is bound to Mystic Falls and its supernatural secrets.",
      ],
      [
        "The Bennett Bloodline",
        "/families/bennet/bennett-family.jpg",
        "A powerful witch lineage whose influence reaches across generations.",
      ],
      [
        "The Mikaelson Family",
        "/families/mikaelson/mikaelson-family.jpg",
        "The Original family: powerful, divided and bound by an enduring promise.",
      ],
      [
        "The Petrova Line",
        "/families/petrova/petrova-family.jpg",
        "A bloodline at the centre of the doppelgänger story.",
      ],
      [
        "The Lockwood Family",
        "/families/lockwood/lockwood-family.jpg",
        "A founding family carrying a hidden supernatural inheritance.",
      ],
    ],
  },
  locations: {
    title: "PLACES THAT REMEMBER",
    intro:
      "Walk through the streets, homes and landmarks where every secret leaves a trace.",
    items: [
      [
        "Clock Tower",
        "/locations/2009/clock-tower.jpg",
        "The clock tower rises above the town centre, marking the passage of time in a place where old histories keep returning.",
      ],
      [
        "Fell’s Church",
        "/locations/2009/fell-church.jpg",
        "A historic church tied to Mystic Falls’ founding families and the town’s long record of secret gatherings.",
      ],
      [
        "Gilbert House",
        "/locations/2009/gilbert-house.jpg",
        "The Gilbert family home is a familiar refuge for Elena and Jeremy, holding memories of the family members they have lost.",
      ],
      [
        "Lockwood Mansion",
        "/locations/2009/lockwood-mansion.jpg",
        "The Lockwood estate reflects the influence and wealth of one of Mystic Falls’ founding families.",
      ],
      [
        "Mikaelson Mansion",
        "/locations/2009/mikaelson-mansion.jpg",
        "A grand residence associated with the Original family and the power they bring into Mystic Falls.",
      ],
      [
        "Mystic Falls Cemetery",
        "/locations/2009/mystic-falls-cemetery.jpg",
        "The cemetery is a recurring place of remembrance, where the town’s past is never far from the present.",
      ],
      [
        "Mystic Grill",
        "/locations/2009/mystic-grill.jpg",
        "A busy local meeting place where friends gather and important conversations often unfold.",
      ],
      [
        "Salvatore House Interior",
        "/locations/2009/salvatore-house-interior.jpg",
        "The interior of the Salvatore home carries the brothers’ shared history through its rooms and familiar surroundings.",
      ],
      [
        "Salvatore Mansion",
        "/locations/2009/salvatore-mansion.jpg",
        "The Salvatore residence stands apart from the town, serving as the brothers’ home and a reminder of their family legacy.",
      ],
      [
        "The Tomb",
        "/locations/2009/tomb.jpg",
        "The tomb is a sealed chamber linked to the vampires trapped beneath Mystic Falls and the town’s concealed history.",
      ],
    ],
    historical: [
      [
        "Mystic Falls, 1864",
        "/locations/1864/mystic-falls-1864.jpg",
        "The town during the Founders’ Era.",
      ],
      [
        "Salvatore Mansion, 1864",
        "/locations/1864/salvatore-mansion-1864.jpg",
        "The Salvatore family home before the brothers’ lives changed forever.",
      ],
      [
        "Lockwood Mansion, 1864",
        "/locations/1864/lockwood-mansion-1864.jpg",
        "A grand setting for the town’s influential founding families.",
      ],
      [
        "Founders’ Ball",
        "/locations/1864/founders-ball-1864.jpg",
        "An elegant gathering during a dangerous chapter in Mystic Falls history.",
      ],
      [
        "Mystic Falls Streets",
        "/locations/1864/mystic-falls-streets-1864.jpg",
        "The old streets of the town, captured in the Founders’ Era.",
      ],
    ],
  },
  mythology: {
    title: "THE SUPERNATURAL WORLD",
    intro:
      "Discover the creatures, bloodlines and ancient forces hidden beneath the town’s surface.",
    items: [
      [
        "Damon — Vampire",
        "/mythology/vampires/damon-vampire.jpg",
        "Damon is a vampire whose speed, strength and heightened senses come with the need to manage bloodlust and emotion.",
      ],
      [
        "Original Vampires",
        "/mythology/vampires/original-vampires (1).jpg",
        "The Mikaelsons are the first vampires, created by Esther; their family history shaped centuries of supernatural conflict.",
      ],
      [
        "Stefan — Vampire",
        "/mythology/vampires/stefan-vampire.jpg",
        "Stefan’s vampire nature gives him extraordinary abilities, while his struggle with blood addiction remains central to his story.",
      ],
      [
        "Bonnie — Bennett Magic",
        "/mythology/witches/bonnie-magic.jpg",
        "Bonnie’s magic grows from the Bennett witch bloodline and becomes vital to protecting Mystic Falls.",
      ],
      [
        "Witchcraft",
        "/mythology/witches/witch-magic.jpg",
        "Witches draw on different forms of magic, often guided by nature, ancestry, knowledge and personal discipline.",
      ],
      [
        "Witch Rituals",
        "/mythology/witches/witch-rituals.jpg",
        "Rituals combine spells, symbols and magical objects to focus power toward a specific supernatural purpose.",
      ],
      [
        "Mason — Werewolf",
        "/mythology/werewolves/mason-werewolf.jpg",
        "Mason Lockwood carries the werewolf gene, which activates after a human causes a death.",
      ],
      [
        "Tyler — Werewolf",
        "/mythology/werewolves/tyler-werewolf.jpg",
        "Tyler discovers the Lockwood family curse and learns to live with the physical and emotional demands of being a werewolf.",
      ],
      [
        "Klaus — Hybrid",
        "/mythology/hybrids/klaus-hybrid.jpg",
        "Klaus is the first successful vampire-werewolf hybrid, combining the abilities of both supernatural species.",
      ],
      [
        "Klaus — Hybrid Transformation",
        "/mythology/hybrids/klaus-hybrid-transformation.jpg",
        "This transformation reflects Klaus’s rare hybrid nature and the difficult balance between his vampire and werewolf sides.",
      ],
      [
        "Elena and Katherine — Doppelgängers",
        "/mythology/dopplegangers/elena-kathrine-dopplegangers.jpg",
        "Elena and Katherine are Petrova doppelgängers: supernatural doubles connected by an ancient repeating pattern.",
      ],
      [
        "Silas",
        "/mythology/dopplegangers/silas.jpg",
        "Silas is an ancient immortal whose existence is tied to the doppelgänger phenomenon and the history of the cure.",
      ],
      [
        "Heretics",
        "/mythology/heretics/heretics.jpg",
        "Heretics are siphoner witches turned into vampires; they retain the ability to siphon magic while possessing vampire abilities.",
      ],
      [
        "Liv and Luke Parker — Siphoners",
        "/mythology/siphons/liv-luke-parker.jpg",
        "Liv and Luke belong to the Gemini Coven and are siphoners, witches who absorb magic from external sources.",
      ],
      [
        "Seline — Siren",
        "/mythology/sirens/seline-siren.jpg",
        "Seline is one of the sirens serving Cade, using supernatural influence and manipulation to draw people into his reach.",
      ],
      [
        "Sybil — Siren",
        "/mythology/sirens/sybil-siren.jpg",
        "Sybil is an ancient siren with powerful psychic abilities and a central role in the later supernatural mythology.",
      ],
      [
        "The Travelers",
        "/mythology/travelers/travelers.png",
        "The Travelers are an ancient nomadic community of witches whose spellwork and history bring them into conflict with the Gemini Coven.",
      ],
    ],
  },
  museum: {
    title: "THE MYSTIC FALLS ARCHIVE",
    intro:
      "Artifacts, journals and objects with histories of their own. Select an artifact to open its archive record.",
    items: museumItems,
  },
  seasons: {
    title: "EIGHT CHAPTERS. ONE LEGACY.",
    intro:
      "Revisit the eight seasons of The Vampire Diaries, each one a new chapter in Mystic Falls.",
    items: [
      [
        "Season 01",
        "/seasons/season-01.jpg",
        "Elena Gilbert meets Stefan Salvatore, and the return of Damon exposes the vampire history hidden beneath Mystic Falls.",
      ],
      [
        "Season 02",
        "/seasons/season-02.jpg",
        "Katherine returns, the werewolf curse emerges, and the search for the moonstone draws new supernatural forces into town.",
      ],
      [
        "Season 03",
        "/seasons/season-03.jpg",
        "The Original family enters the story as Stefan’s past catches up with him and Klaus pursues his hybrid ambitions.",
      ],
      [
        "Season 04",
        "/seasons/season-04.jpg",
        "Elena faces the transition to vampirism while the cure and the Five hunters reshape the supernatural balance.",
      ],
      [
        "Season 05",
        "/seasons/season-05.jpg",
        "The search for a way back from the Other Side brings new dangers, doppelgänger mysteries and the Travelers.",
      ],
      [
        "Season 06",
        "/seasons/season-06.jpg",
        "Life after loss leads the characters toward the Gemini Coven, prison worlds and the arrival of Kai Parker.",
      ],
      [
        "Season 07",
        "/seasons/season-07.jpg",
        "With Elena absent, the Heretics and the return of old enemies challenge the Salvatore brothers and their friends.",
      ],
      [
        "Season 08",
        "/seasons/season-08.jpg",
        "The final chapter brings the sirens, Cade and the brothers’ defining choices to the end of the Mystic Falls story.",
      ],
    ],
  },
  gallery: {
    title: "MOMENTS IN TIME",
    intro:
      "Fragments of two eras: brotherhood, memories and the town that connects them.",
    items: [],
  },
};

const galleryDescriptions = {
  "2009/brotherhood/image-01.jpg":
    "Damon and Stefan stand side by side in the modern era, their guarded expressions reflecting a bond shaped by years of rivalry and loyalty.",
  "2009/brotherhood/image-02.jpg":
    "The brothers share a quieter moment away from Mystic Falls, showing the history and understanding that remain beneath their disagreements.",
  "2009/brotherhood/image-03.jpg":
    "A rare affectionate moment between the brothers hints at the family connection neither can completely leave behind.",
  "2009/damon/damon-01.jpg":
    "Damon appears relaxed and self-assured, presenting the charm he often uses to conceal his more complicated feelings.",
  "2009/damon/damon-02.jpg":
    "A shadowed portrait captures Damon’s darker, more guarded side and the loneliness behind his confident exterior.",
  "2009/stefan/stefan-01.jpg":
    "Stefan’s focused expression reflects the discipline he tries to maintain while resisting the instincts that come with being a vampire.",
  "2009/stefan/stefan-02.jpg":
    "In this quieter portrait, Stefan looks inward, reflecting the thoughtful and restrained side of his character.",
  "1864/brotherhood/1864-01.jpg":
    "Damon and Stefan appear in their formal Founders’ Era attire, before the events that permanently change their family.",
  "1864/brotherhood/1864-02.jpg":
    "The brothers face one another in the world of 1864, where family duty and their different choices begin to pull them apart.",
  "1864/brotherhood/1864-03.jpg":
    "A warm moment between the young Salvatore brothers preserves a glimpse of their earlier closeness.",
  "1864/damon/damon-1864-01.jpg":
    "Damon is shown in the clothing and setting of 1864, when his life as a human Salvatore heir is nearing its turning point.",
  "1864/damon/damon-1864-02.jpg":
    "This formal portrait presents Damon in the public world of the Founders’ Era, before his return as a vampire.",
  "1864/stefan/stefan-1864-01.jpg":
    "Stefan’s youthful appearance reflects his life as the younger Salvatore son before the transformation that defines his future.",
  "1864/stefan/stefan-1864-02.jpg":
    "Dressed for the period, Stefan is captured in a composed portrait from the era that shaped his relationship with Damon.",
};
function galleryItemsForEra(era) {
  const base = `/gallery/${era}/`;
  return Object.keys(files)
    .filter((path) => path.toLowerCase().includes(base.toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((path) => {
      const normalized = path.replace(/^\.\/assets/, "");
      const lower = path.toLowerCase();
      const category = lower.includes("/brotherhood/")
        ? "brotherhood"
        : lower.includes("/damon/")
          ? "damon"
          : "stefan";
      const filename = path.split("/").pop();
      const title =
        category === "brotherhood"
          ? "The Salvatore Brothers"
          : category === "damon"
            ? "Damon Salvatore"
            : "Stefan Salvatore";
      const key = `${era}/${category}/${filename}`.toLowerCase();
      const description =
        galleryDescriptions[key] ||
        `${title} — a ${era === "1864" ? "Founders’ Era" : "modern-era"} photograph highlighting a distinct moment in this character’s story.`;
      return { category, item: [title, normalized, description] };
    });
}

function AudioDirector({ era, enabled }) {
  const audioRef = useRef(null);
  const currentKey = useRef("");
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!enabled) {
      audio.pause();
      return;
    }
    const key = era;
    if (currentKey.current === key && !audio.paused) return;
    currentKey.current = key;
    audio.pause();
    audio.src =
      era === "1864"
        ? "/audio/1864/audio-1864.mp3"
        : "/audio/2009/audio-2009.mp3";
    audio.currentTime = 0;
    const startAt = era === "2009" ? 132 : 0;
    // Loop the selected era's intended segment: 2009 returns to 02:12,
    // while 1864 returns to the beginning of its track.
    const replayEraSegment = () => {
      audio.currentTime = startAt;
      audio.play().catch(() => {});
    };
    const begin = () => {
      audio.currentTime = startAt;
      audio.play().catch(() => {});
    };
    audio.addEventListener("loadedmetadata", begin, { once: true });
    audio.addEventListener("ended", replayEraSegment);
    audio.load();
    return () => {
      audio.removeEventListener("loadedmetadata", begin);
      audio.removeEventListener("ended", replayEraSegment);
    };
  }, [era, enabled]);
  return <audio ref={audioRef} preload="auto" />;
}

function DetailPanel({ item, onClose, kind = "archive" }) {
  if (!item) return null;
  const [title, image, description, ...facts] = item;
  const src = asset(image);
  return (
    <section
      className={`detail-panel ${kind}-detail`}
      id="selected-detail"
      aria-live="polite"
    >
      <button
        className="detail-close"
        onClick={onClose}
        aria-label="Close details"
      >
        ×
      </button>
      <div className="detail-copy">
        <p className="eyebrow">MYSTIC FALLS ARCHIVE / FEATURED RECORD</p>
        <h2>{title}</h2>
        <p className="detail-description">{description}</p>
        {facts.length > 0 && (
          <dl className="detail-facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <div className="detail-visual">
        {src ? (
          <img src={src} alt={title} />
        ) : (
          <div className="missing-image">IMAGE TO BE ADDED</div>
        )}
      </div>
    </section>
  );
}

function ImageCard({ item, index, selected, onSelect }) {
  const [title, image, description] = item;
  const src = asset(image);
  return (
    <button
      type="button"
      className={`archive-card archive-card-button ${selected ? "is-selected" : ""}`}
      style={{ "--delay": `${index * 45}ms` }}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <div className="archive-card-image">
        {src ? (
          <img src={src} alt={title} loading="lazy" />
        ) : (
          <div className="missing-image">IMAGE TO BE ADDED</div>
        )}
        <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="card-open-hint">VIEW RECORD ↗</span>
      </div>
      <div className="archive-card-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </button>
  );
}

function Home({ era, onEnter, entered }) {
  const data = eraContent[era];

  if (!entered) {
    return (
      <main className="entry-scene">
        <div
          className="entry-backdrop"
          style={{
            backgroundImage: data.entry ? `url("${data.entry}")` : "none",
          }}
        />
        <div className="entry-shade" />
        <div className="home-grain" />
        <div className="entry-content">
          <p className="eyebrow">
            <span /> {data.label} <span />
          </p>
          <h1>
            THE VAMPIRE
            <br />
            <em>DIARIES</em>
          </h1>
          <p className="home-subtitle">A TALE OF TWO ERAS</p>
          <p className="home-description entry-tagline">
            The town is waiting. The past is watching. Step into Mystic Falls.
          </p>
          <button className="enter-button" onClick={onEnter}>
            <span>ENTER MYSTIC FALLS</span>
            <b>↗</b>
          </button>
          {era === "1864" && <div className="entry-year">{era}</div>}
        </div>
        <div className="entry-footer">
          <span>BASED ON THE TELEVISION SERIES</span>
          <span>THE STORY NEVER ENDS</span>
        </div>
      </main>
    );
  }

  return (
    <main className={`home-scene home-era-${era}`}>
      <div
        className="home-backdrop"
        style={{
          backgroundImage: data.opening ? `url("${data.opening}")` : "none",
        }}
      />
      <div className="home-vignette" />
      <div className="home-grain" />
      <section className="home-hero-grid">
        <div className="home-content">
          <p className="eyebrow">
            <span /> {data.label} <span />
          </p>
          <h1>
            MYSTIC
            <br />
            <em>FALLS</em>
          </h1>
          <p className="home-subtitle">
            {era === "2009"
              ? "THE TOWN THAT NEVER FORGETS"
              : "THE FOUNDERS’ TOWN · 1864"}
          </p>
          <p className="home-description">{data.subtitle}</p>
          <div className="brothers-story">
            <p className="eyebrow">A LEGACY WRITTEN IN BLOOD</p>
            <h2>{data.brothersTitle}</h2>
            <div className="brothers-bios">
              <article>
                <h3>DAMON SALVATORE</h3>
                <p>{data.damonBio}</p>
              </article>
              <article>
                <h3>STEFAN SALVATORE</h3>
                <p>{data.stefanBio}</p>
              </article>
            </div>
          </div>
          <div className="home-year">{era}</div>
        </div>
        <div className="brothers-layer">
          {data.brothers && (
            <img src={data.brothers} alt="Damon and Stefan Salvatore" />
          )}
        </div>
      </section>
      <div className="home-bottom">
        <span>BASED ON THE TELEVISION SERIES</span>
        <span>THE STORY NEVER ENDS</span>
      </div>
    </main>
  );
}

function ArchivePage({ type, era }) {
  const collection = collections[type];
  const historical =
    type === "locations" && era === "1864" && collection.historical;
  const baseItems = historical || collection.items;
  const items =
    type === "gallery"
      ? galleryItemsForEra(era)
      : type === "museum" && era === "1864"
        ? baseItems.filter(
            (item) => !["Damon’s Car", "Stefan’s Car"].includes(item[0]),
          )
        : baseItems;
  const flatItems =
    type === "gallery" ? items.map((entry) => entry.item) : items;
  const [selected, setSelected] = useState(null);
  const active = selected === null ? null : flatItems[selected];
  useEffect(() => {
    setSelected(null);
  }, [type, era]);
  useEffect(() => {
    if (selected !== null) {
      const id = window.setTimeout(
        () =>
          document
            .getElementById("selected-detail")
            ?.scrollIntoView({ behavior: "smooth", block: "start" }),
        80,
      );
      return () => window.clearTimeout(id);
    }
  }, [selected]);
  return (
    <main className={`archive-page archive-${type}`}>
      <div className="archive-heading">
        <p className="eyebrow">THE VAMPIRE DIARIES / {era}</p>
        <h1>{collection.title}</h1>
        <p>{collection.intro}</p>
      </div>
      {type === "gallery" ? (
        <div className="gallery-era-groups">
          {["brotherhood", "damon", "stefan"].map((category) => {
            const group = items.filter((entry) => entry.category === category);
            const heading =
              category === "brotherhood"
                ? "THE BROTHERHOOD"
                : category === "damon"
                  ? "DAMON SALVATORE"
                  : "STEFAN SALVATORE";
            return group.length ? (
              <section
                className={`gallery-category gallery-${category}`}
                key={category}
              >
                <h2 className="gallery-category-heading">{heading}</h2>
                <div className="archive-grid">
                  {group.map(({ item }, index) => {
                    const globalIndex = items.findIndex(
                      (entry) => entry.item === item,
                    );
                    return (
                      <ImageCard
                        key={`${era}-${category}-${item[1]}`}
                        item={item}
                        index={index}
                        selected={selected === globalIndex}
                        onSelect={() =>
                          setSelected(
                            selected === globalIndex ? null : globalIndex,
                          )
                        }
                      />
                    );
                  })}
                </div>
              </section>
            ) : null;
          })}
        </div>
      ) : (
        <div className="archive-grid">
          {items.map((item, index) => (
            <ImageCard
              key={`${item[0]}-${era}`}
              item={item}
              index={index}
              selected={selected === index}
              onSelect={() => setSelected(selected === index ? null : index)}
            />
          ))}
        </div>
      )}
      <DetailPanel
        item={active ? [active[0], active[1], active[2], ["ERA", era]] : null}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}

function CharacterPage({ era }) {
  const groupRank = [
    "Salvatore",
    "Gilbert",
    "Bennett",
    "Mikaelson",
    "Donovan",
    "Lockwood",
    "Petrova",
    "Forbes",
    "Other",
  ];
  const familyOf = (name) => {
    if (/Salvatore/.test(name)) return "Salvatore";
    if (/Gilbert/.test(name)) return "Gilbert";
    if (/Bennett/.test(name)) return "Bennett";
    if (/Mikaelson/.test(name)) return "Mikaelson";
    if (/Donovan/.test(name)) return "Donovan";
    if (/Lockwood/.test(name)) return "Lockwood";
    if (/Katherine/.test(name)) return "Petrova";
    if (/Forbes|Caroline/.test(name)) return "Forbes";
    return "Other";
  };
  const list =
    era === "1864"
      ? [...characters[era]]
      : [...characters[era]].sort((a, b) => {
          const ga = groupRank.indexOf(familyOf(a[0])),
            gb = groupRank.indexOf(familyOf(b[0]));
          return ga - gb || a[0].localeCompare(b[0]);
        });
  const [selected, setSelected] = useState(null);
  const active = selected === null ? null : list[selected];
  useEffect(() => {
    setSelected(null);
  }, [era]);
  useEffect(() => {
    if (selected !== null) {
      const id = window.setTimeout(
        () =>
          document
            .getElementById("selected-detail")
            ?.scrollIntoView({ behavior: "smooth", block: "start" }),
        80,
      );
      return () => window.clearTimeout(id);
    }
  }, [selected]);
  const details = active
    ? [
        active[0],
        active[2],
        active[1],
        ["ERA", era],
        ["Born", String(active[3])],
        ["Origin", active[4]],
        ["Portrayed by", active[5]],
        ["Species / role", active[6]],
      ]
    : null;
  return (
    <main className="archive-page">
      <div className="archive-heading">
        <p className="eyebrow">THE PEOPLE OF MYSTIC FALLS / {era}</p>
        <h1>THE CHARACTERS</h1>
        <p>
          Explore the people, families and supernatural histories that shape
          Mystic Falls. Select any portrait to open a character record.
        </p>
      </div>
      <div className="character-grid">
        {list.map(([name, bio, image], index) => (
          <button
            type="button"
            className={`character-card character-card-button ${selected === index ? "is-selected" : ""}`}
            key={`${name}-${index}`}
            style={{ "--delay": `${index * 45}ms` }}
            onClick={() => setSelected(selected === index ? null : index)}
            aria-pressed={selected === index}
          >
            <div className="character-image">
              {asset(image) ? (
                <img src={asset(image)} alt={name} loading="lazy" />
              ) : (
                <div className="missing-image">PORTRAIT NEEDED</div>
              )}
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b className="card-open-hint">VIEW PROFILE ↗</b>
            </div>
            <div className="character-copy">
              <p className="eyebrow">{era} / MYSTIC FALLS</p>
              <h2>{name}</h2>
              <p>{bio}</p>
            </div>
          </button>
        ))}
      </div>
      <DetailPanel
        item={details}
        onClose={() => setSelected(null)}
        kind="character"
      />
    </main>
  );
}

function TimelineTransition({ era, onComplete }) {
  useEffect(() => {
    const id = window.setTimeout(onComplete, 1150);
    return () => window.clearTimeout(id);
  }, [onComplete]);
  return (
    <div
      className={`timeline-transition ${era === "1864" ? "to-past" : "to-present"}`}
    >
      <div className="clock-face">
        <span>✦</span>
        <strong>{era}</strong>
        <small>THE YEAR CHANGES</small>
      </div>
    </div>
  );
}

function Site() {
  const [era, setEra] = useState("2009");
  const [entered, setEntered] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [nextEra, setNextEra] = useState("2009");
  const location = useLocation();
  const activeEra = useMemo(() => era, [era]);
  const enterMysticFalls = () => {
    setEntered(true);
    setMusicEnabled(true);
  };
  const switchEra = () => {
    const target = era === "2009" ? "1864" : "2009";
    setNextEra(target);
    setTransitioning(true);
  };
  const finishTransition = () => {
    setEra(nextEra);
    setTransitioning(false);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, era]);
  const pageType = location.pathname.replace("/", "");
  const isHome = location.pathname === "/";
  return (
    <div className={`app-shell era-${era}`}>
      <AudioDirector era={activeEra} enabled={musicEnabled} />
      {entered && (
        <header className="site-header">
          <NavLink to="/" className="brand-mark">
            <span className="brand-symbol">✦</span>
            <span>
              THE VAMPIRE
              <br />
              <b>DIARIES</b>
            </span>
          </NavLink>
          <nav className="main-nav">
            {navItems
              .filter(
                ([label]) =>
                  era !== "1864" || !["Families", "Mythology"].includes(label),
              )
              .map(([label, path]) => (
                <NavLink key={path} to={path} end={path === "/"}>
                  {label}
                </NavLink>
              ))}
          </nav>
          <div className="header-actions">
            <button className="timeline-button" onClick={switchEra}>
              {era === "2009" ? "RETURN TO 1864" : "RETURN TO 2009"}{" "}
              <span>↗</span>
            </button>
            <button
              className="music-button"
              onClick={() => setMusicEnabled((v) => !v)}
              aria-label="Toggle music"
            >
              {musicEnabled ? "♫ ON" : "♫ OFF"}
            </button>
          </div>
        </header>
      )}
      {isHome ? (
        <Home era={era} entered={entered} onEnter={enterMysticFalls} />
      ) : (
        <>
          {!entered && (
            <div className="pre-entry">
              <div
                className="pre-entry-backdrop"
                style={{
                  backgroundImage: eraContent[era].entry
                    ? `url("${eraContent[era].entry}")`
                    : "none",
                }}
              />
              <div className="pre-entry-shade" />
              <p>THE PAST IS WAITING</p>
              <button className="enter-button" onClick={enterMysticFalls}>
                ENTER MYSTIC FALLS <b>↗</b>
              </button>
            </div>
          )}
          {entered &&
          era === "1864" &&
          ["families", "mythology"].includes(pageType) ? (
            <Navigate to="/" replace />
          ) : (
            entered &&
            (pageType === "characters" ? (
              <CharacterPage era={era} />
            ) : collections[pageType] ? (
              <ArchivePage type={pageType} era={era} />
            ) : (
              <ArchivePage type="gallery" era={era} />
            ))
          )}
        </>
      )}
      {entered && (
        <footer className="site-footer">
          <span>THE VAMPIRE DIARIES</span>
          <span>
            2009 <i>—</i> 1864
          </span>
          <span>A TALE OF TWO ERAS</span>
        </footer>
      )}
      {transitioning && (
        <TimelineTransition era={nextEra} onComplete={finishTransition} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  );
}
