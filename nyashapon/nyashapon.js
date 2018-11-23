/*
  TODO:
    - Draw wireframes for different scenes
      - Home screen
      - View profile screen
      - Labyrinth screen
      - Gym screen
      - Forest training screen
      - Fishing screen
      - Nyashapon screen
      - Create screen
    - Think about how labyrinth will work
    - Think about how forest training will work
    - Implement a cat leveling system (WIP)
    - Implement fishing system

  ICEBOX:
    - Implement skills
    - Implement fighting
      - Implement element advantages
      - Implement def and attack calculations
    - Implement PvP

  NOTE:
    - There is a precision error with the values of the augments
    - Make the grade obtained from the augment storage more rare
*/

class player {
  constructor() {
    this.tokens = 1; // Each token is for one nyashapon roll
    this.keys = 1; // Each key opens one create. Each crate has three augment pieces
    this.coins = 100; // 100 coins can buy 1 token or 1 key
    this.catStorage = []; // Cats the player currently has
    this.augmentStorage = []; // Equpment the player currently has
  }

  nyashapon() {
    if (this.tokens == 0 && this.catStorage.length == maxCatStorage) { // If not enough tokens or max storage reached
      return null;
    }

    this.tokens--; // Pay a token

    // Play animation sequence

    var pool; // The pool that you will pull from
    var rarity = Math.random(); // Take a random number

    if (rarity < commonRate) { // If between certain numbers, determine rarity
      pool = commonCatPool;
    } else if (commonRate < rarity && rarity < (rareRate + commonRate)) {
      pool = rareCatPool;
    } else if ((rareRate + commonRate) < rarity && rarity < (epicRate + rareRate + commonRate)) {
      pool = epicCatPool;
    } else {
      pool = legendaryCatPool;
    }

    var index = Math.round(Math.random() * (pool.length - 1)); // Set index to random cat in pool

    var newCat = new cat(pool[index].name); // Create a new cat object

    this.catStorage.push(newCat); // Add cat to storage
  }

  crate() {
    if (this.keys == 0 && this.augmentStorage.length == maxAugmentStorage) {
      return null;
    }

    this.keys--;

    var types = ['helmet', 'body', 'boots', 'tail'];

    var grade = Math.round(Math.random() * (10 - 1)); // Randomizes grades
    var set = sets[Math.round(Math.random() * (sets.length - 1))].name;
    var type = types[Math.round(Math.random() * (types.length - 1))];

    var newAugment = new augment(set, grade);

    this.augmentStorage.push(newAugment);
  }
}

class cat {
  constructor(catName) { // The name of the cat will match up with a list, and stats and such will be defined as such
    var species; // Create a species that will soon be a json of cat data

    for (var i = 0; i < catTypes.length; i++) { // Itereates through catTypes list
      if (catName == catTypes[i].name) { // If the input of the constructor is equal to the name of the indexed cat
        species = catTypes[i]; // Make the species variable equal the indexed cat
      }
    }

    this.name = species.name; // Set each variable to what the key of the dictionary is to
    this.type = species.type;
    this.rarity = species.rarity;
    this.unit = species.unit;
    this.image = new Image();
    this.image.src = `images/${this.name.toLowerCase()}.png`;

    // Base stats
    this.baseHp = species.baseHp;
    this.baseAtk = species.baseAtk;
    this.baseDef = species.baseDef;
    this.baseSpd = species.baseSpd;
    this.baseCrt = species.baseCrt;
    this.baseCdm = species.baseCdm;

    // augment and added stats
    this.augment = [null, null, null, null]; // Helmet, Body, Boots, Tail respectively
    this.addHp = 0;
    this.addAtk = 0;
    this.addDef = 0;
    this.addSpd = 0;
    this.addCrt = 0;
    this.addCdm = 0;

    // Total stats after augment bonus
    this.hp = this.baseHp;
    this.atk = this.baseAtk;
    this.def = this.baseDef;
    this.spd = this.baseSpd;
    this.crt = this.baseCrt;
    this.cdm = this.baseCdm;

    // Level
    this.level = 1;
    this.exp = 0;
    // MAX EXP FORMULA HERE
    this.max = 0; // Change later
  }

  equip(augment) { // Pass in an augment class
    if (augment.type == "helmet") { // If it's a helmet, equp to slot 1. Etc. for the rest
      this.augment[0] = augment;
    } else if (augment.type == "body") {
      this.augment[1] = augment;
    } else if (augment.type == "boots") {
      this.augment[2] = augment;
    } else if (augment.type == "tail") {
      this.augment[3] = augment;
    }

    this.augmentBonus(this.augment);
  }

  checkFullSet(allAugments) { // Takes in a list of augment equipped as input
    for (var i = 0; i < allAugments.length; i++) { // Iterate through through all equpped augment
      if (allAugments[i] == null) { // Check if there are any that are not equpped
        return false; // If so, then no full set
      }
    }

    if (allAugments[0].set == allAugments[1].set // If all of the sets match
        && allAugments[0].set == allAugments[2].set
        && allAugments[0].set == allAugments[3].set) {
      return true;
    } else {
      return false;
    }
  }

  augmentBonus(allAugments) { // Adds quipment bonuses to the stats of the cat
    this.addHp = 0; // Resetting all add values
    this.addAtk = 0;
    this.addDef = 0;
    this.addSpd = 0;
    this.addCrt = 0;
    this.addCdm = 0;

    for (var i = 0; i < allAugments.length; i++) {
      if (allAugments[i]) { // If there is an augment in that slot
        this.addHp += allAugments[i].hp;
        this.addAtk += allAugments[i].atk;
        this.addDef += allAugments[i].def;
        this.addSpd += allAugments[i].spd;
        this.addCrt += allAugments[i].crt;
        this.addCdm += allAugments[i].cdm;
      }
    }

    if (this.checkFullSet(allAugments)) { // If the augment is all one set
      for (var i = 0; i < sets.length; i++) { // Iterate through all sets
        if (allAugments[0].set == sets[i].name) { // If the set names match
          this.addHp += sets[i].fullSet[0]; // Add to the to-be added stats
          this.addAtk += sets[i].fullSet[1];
          this.addDef += sets[i].fullSet[2];
          this.addSpd += sets[i].fullSet[3];
          this.addCrt += sets[i].fullSet[4];
          this.addCdm += sets[i].fullSet[5];
        }
      }
    }

    this.updateStats();
  }

  updateStats() { // Adds augment stats to base stats for total stats
    this.addHp = Math.round(this.addHp * 100) / 100;
    this.addAtk =

    this.hp = this.baseHp * (1 + this.addHp); // Set stats to base stat + additional augment stats
    this.atk = this.baseAtk * (1 + this.addAtk);
    this.def = this.baseDef * (1 + this.addDef);
    this.spd = this.baseSpd * (1 + this.addSpd);
    this.crt = this.baseCrt + this.addCrt;
    this.cdm = this.baseCdm + this.addCdm;
  }
}

class augment {
  constructor(set, grade) { //  Grade: 1-10
    var randomizer = []; // [hp, atk, def, spd, crit rate, crit dmg] all in %
    var augmentSet = {};

    for (var i = 0; i < 6; i++) {
      var percentage = Math.round((Math.random() * grade / 17) * 100) / 100;
      randomizer.push(percentage); // Adds a stat depending on the grade of the augment
    }

    var stats = { // Assign stats values to randomizer values
      hp: randomizer[0],
      atk: randomizer[1],
      def: randomizer[2],
      spd: randomizer[3],
      crt: randomizer[4],
      cdm: randomizer[5]
    }

    for (var i = 0; i < sets.length; i++) { // Iterate through the sets list
      if (sets[i].name == set) { // If the inputted set and the set in the list of sets match
        augmentSet = sets[i]; // set augmentSet to the matched set
      }
    }

    this.set = set; // What set it is and what bonuses the set gives
    this.grade = grade; // Number from 1-10 -- determines how good the stats are
    this.hp = stats.hp;
    this.atk = stats.atk;
    this.def = stats.def;
    this.spd = stats.spd;
    this.crt = stats.crt;
    this.cdm = stats.cdm;

    this.hp += augmentSet.stats[0]; // Add additional stats depending on what set the piece of augment is in
    this.atk += augmentSet.stats[1];
    this.def += augmentSet.stats[2];
    this.spd += augmentSet.stats[3];
    this.crt += augmentSet.stats[4];
    this.cdm += augmentSet.stats[5];
  }
}

// Player Variables
var maxCatStorage = 100; // Max amount of cats one player can have
var maxAugmentStorage = 500; // Max amount of augment one player can have

// Cat Variables
var legendaryCatPool = [ // List of json values for legendary cats only
  {
    name: "Leo", // Name of the cat "species"
    type: "fire", // Element of cat
    baseHp: 100, // base HP
    baseAtk: 200, // Base attack
    baseDef: 100, // Base defense
    baseSpd: 100, // Base speed
    baseCrt: 0.15, // Base Crit Rate by percentage
    baseCdm: 0.50, // Base Crit Damage by percentage
    rarity: "legendary",
    unit: "attack"
  }
];
var epicCatPool = [
  {
    name: "Stella",
    type: "water",
    baseHp: 200,
    baseAtk: 50,
    baseDef: 120,
    baseSpd: 100,
    baseCrt: 0.15,
    baseCdm: 0.50,
    rarity: "epic",
    unit: "support"
  }
]; // Epic cats only
var rareCatPool = [
  {
    name: "Cathbad",
    type: "wood",
    baseHp: 200,
    baseAtk: 50,
    baseDef: 120,
    baseSpd: 100,
    baseCrt: 0.15,
    baseCdm: 0.50,
    rarity: "rare",
    unit: "support"
  }
]; // Rare cats only
var commonCatPool = [
  {
    name: "Acinon",
    type: "fire",
    baseHp: 100,
    baseAtk: 50,
    baseDef: 120,
    baseSpd: 120,
    baseCrt: 0.15,
    baseCdm: 0.50,
    rarity: "common",
    unit: "speed"
  }
]; // Common cats only
var catTypes = commonCatPool.concat(rareCatPool, epicCatPool, legendaryCatPool); // All cat types in one list

var legendaryRate = 0.07; // Rates for getting each rarity from a nyashapon machine
var epicRate = 0.15;
var rareRate = 0.33;
var commonRate = 0.45;

var catSize = 200;

// augment Variables
var sets = [ // Available augment sets in the game
  {
    name: "Claw", // Name of the set
    stats: [0, 0.03, 0, 0, 0.03, 0.03], // For each piece, add this much to the stat
    fullSet: [0.04, 0.16, 0.04, 0.12, 0.16, 0.16] // If one full set, adds additional stats
  }
]

// Testing
var grant = new player();

grant.nyashapon();

grant.crate();

grant.catStorage[0].equip(grant.augmentStorage[0]);

console.log(grant.catStorage[0].image);

// console.log(grant.catStorage);

// Canvas Variables
var $canvas = document.querySelector('canvas');
var context = $canvas.getContext("2d");
$canvas.width = 900;
$canvas.height = 500;

// Game Variables
var leave = false; // Did the player leave the game?

function init() {
  // Request data from server & loading screen
  window.requestAnimationFrame(animate);
}

function terminate() {

}

function update() {

}

function draw(mess) {
  context.clearRect(0, 0, $canvas.width, $canvas.height);

  if (mess == "home") {

  }

  return 0;
}

function animate() {
  update();

  if (draw() == 0) {
    if (!leave) {
      window.requestAnimationFrame(animate);
    } else {
      terminate();
    }
  }
}

init();
