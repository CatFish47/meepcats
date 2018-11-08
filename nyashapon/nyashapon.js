/*
  TODO:
    - Implement graphics

  NOTE:
    - There is a precision error with the values of the equipment
    - Make the grade obtained from the equipment crate more rare
*/

class player {
  constructor() {
    this.tokens = 1; // Each token is for one nyashapon roll
    this.keys = 1; // Each key opens one create. Each crate has three equipment pieces
    this.coins = 100; // 100 coins can buy 1 token or 1 key
    this.catStorage = []; // Cats the player currently has
    this.equipmentStorage = []; // Equpment the player currently has
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
    if (this.keys == 0 && this.equipmentStorage.length == maxEquipmentStorage) {
      return null;
    }

    this.keys--;

    var types = ['helmet', 'body', 'boots', 'tail'];

    var grade = Math.round(Math.random() * (10 - 1)); // Randomizes grades
    var set = sets[Math.round(Math.random() * (sets.length - 1))].name;
    var type = types[Math.round(Math.random() * (types.length - 1))];

    var newEquipment = new equipment(set, type, grade);

    this.equipmentStorage.push(newEquipment);
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
    this.image =

    // Base stats
    this.baseHp = species.baseHp;
    this.baseAtk = species.baseAtk;
    this.baseDef = species.baseDef;
    this.baseSpd = species.baseSpd;
    this.baseCrt = species.baseCrt;
    this.baseCdm = species.baseCdm;

    // Equipment and added stats
    this.equipment = [null, null, null, null]; // Helmet, Body, Boots, Tail respectively
    this.addHp = 0;
    this.addAtk = 0;
    this.addDef = 0;
    this.addSpd = 0;
    this.addCrt = 0;
    this.addCdm = 0;

    // Total stats after equipment bonus
    this.hp = this.baseHp;
    this.atk = this.baseAtk;
    this.def = this.baseDef;
    this.spd = this.baseSpd;
    this.crt = this.baseCrt;
    this.cdm = this.baseCdm;
  }

  equip(equipment) { // Pass in an equipment class
    if (equipment.type == "helmet") { // If it's a helmet, equp to slot 1. Etc. for the rest
      this.equipment[0] = equipment;
    } else if (equipment.type == "body") {
      this.equipment[1] = equipment;
    } else if (equipment.type == "boots") {
      this.equipment[2] = equipment;
    } else if (equipment.type == "tail") {
      this.equipment[3] = equipment;
    }

    this.equipmentBonus(this.equipment);
  }

  checkFullSet(allEquipment) { // Takes in a list of equipment equipped as input
    for (var i = 0; i < allEquipment.length; i++) { // Iterate through through all equpped armor
      if (allEquipment[i] == null) { // Check if there are any that are not equpped
        return false; // If so, then no full set
      }
    }

    if (allEquipment[0].set == allEquipment[1].set // If all of the sets match
        && allEquipment[0].set == allEquipment[2].set
        && allEquipment[0].set == allEquipment[3].set) {
      return true;
    } else {
      return false;
    }
  }

  equipmentBonus(allEquipment) { // Adds quipment bonuses to the stats of the cat
    this.addHp = 0; // Resetting all add values
    this.addAtk = 0;
    this.addDef = 0;
    this.addSpd = 0;
    this.addCrt = 0;
    this.addCdm = 0;

    for (var i = 0; i < allEquipment.length; i++) {
      if (allEquipment[i]) { // If there is an equipment in that slot
        this.addHp += allEquipment[i].hp;
        this.addAtk += allEquipment[i].atk;
        this.addDef += allEquipment[i].def;
        this.addSpd += allEquipment[i].spd;
        this.addCrt += allEquipment[i].crt;
        this.addCdm += allEquipment[i].cdm;
      }
    }

    if (this.checkFullSet(allEquipment)) { // If the equipment is all one set
      for (var i = 0; i < sets.length; i++) { // Iterate through all sets
        if (allEquipment[0].set == sets[i].name) { // If the set names match
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

  updateStats() { // Adds equipment stats to base stats for total stats
    this.addHp = Math.round(this.addHp * 100) / 100;
    this.addAtk =

    this.hp = this.baseHp * (1 + this.addHp); // Set stats to base stat + additional equipment stats
    this.atk = this.baseAtk * (1 + this.addAtk);
    this.def = this.baseDef * (1 + this.addDef);
    this.spd = this.baseSpd * (1 + this.addSpd);
    this.crt = this.baseCrt + this.addCrt;
    this.cdm = this.baseCdm + this.addCdm;
  }
}

class equipment {
  constructor(set, type, grade) { // Type: helmet, body, boots, tail     Grade: 1-10
    var randomizer = []; // [hp, atk, def, spd, crit rate, crit dmg] all in %
    var armorSet = {};

    for (var i = 0; i < 6; i++) {
      var percentage = Math.round((Math.random() * grade / 17) * 100) / 100;
      randomizer.push(percentage); // Adds a stat depending on the grade of the equipment
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
        armorSet = sets[i]; // set armorSet to the matched set
      }
    }

    this.set = set; // What set it is and what bonuses the set gives
    this.type = type; // Helmet, body, boots, tail
    this.grade = grade; // Number from 1-10 -- determines how good the stats are
    this.hp = stats.hp;
    this.atk = stats.atk;
    this.def = stats.def;
    this.spd = stats.spd;
    this.crt = stats.crt;
    this.cdm = stats.cdm;

    this.hp += armorSet.stats[0]; // Add additional stats depending on what set the piece of armor is in
    this.atk += armorSet.stats[1];
    this.def += armorSet.stats[2];
    this.spd += armorSet.stats[3];
    this.crt += armorSet.stats[4];
    this.cdm += armorSet.stats[5];
  }
}

// Player Variables
var maxCatStorage = 100; // Max amount of cats one player can have
var maxEquipmentStorage = 500; // Max amount of equipment one player can have

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

// Equipment Variables
var sets = [ // Available armor sets in the game
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

grant.catStorage[0].equip(grant.equipmentStorage[0]);

console.log(grant.catStorage[0]);

// console.log(grant.catStorage);

// Canvas Variables
var $canvas = document.querySelector('canvas');
var context = $canvas.getContext("2d");
$canvas.width = 1200;
$canvas.height = 700;

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

function draw() {
  context.clearRect(0, 0, $canvas.width, $canvas.height);

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
