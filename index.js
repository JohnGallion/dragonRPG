let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterName = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");
const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
]
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60 
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
]
const locations = [
    {
        name: "town square",
        "button text": ["Go to store","Go to cave","Fight dragon"],
        "button functions": [button1.onclick = goStore , button2.onclick = goCave , button3.onclick = fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    }
    ,
    {
        name: "store",
        "button text": [ "Buy 10 health (10 gold)","Buy weapon (30 gold)", "Go to town square"],
        "button functions": [button1.onclick = buyHealth , button2.onclick = buyWeapon , button3.onclick = goTown],
        text: "You enter the store."
    }
    ,
    {
        name: "cave",
        "button text": ["Fight slime","Fight fanged beast","Go to town square"],
        "button functions": [button1.onclick = fightSlime,button2.onclick = fightBeast , button3.onclick = goTown],
        text: "You enter the cave. You see some monsters."
    }
    ,
    {
        name: "fight",
        "button text": ["Attack","Dodge","Run"],
        "button functions": [button1.onclick = attack,button2.onclick = dodge , button3.onclick = goTown],
        text: "You are fighting a monster."
    }
    ,
    {
        name: "kill monster",
        "button text": ["Go to town square","Go to town square","Go to town square"],
        "button functions": [button1.onclick = goTown,button2.onclick = goTown,button3.onclick = goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    }
    ,
    {
        name: "lose",
        "button text": ["REPLAY?","REPLAY?","REPLAY?"],
        "button functions": [button1.onclick = restart,button2.onclick = restart,button3.onclick = restart],
        text: "You die. ☠️"
    }
]

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// functions

function update (location) {
    monsterStats.style.display = 'none';
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    text.innerText = location.text;

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
}

function goTown () {
    update(locations[0]);
}

function goStore () {
    update(locations[1])

}

function goCave () {
    update(locations[2])
}




function buyHealth () {
    if(gold >= 10) {
        gold -= 10;
     goldText.innerText = gold
     health += 10;
     healthText.innerText = health
    } else {
        text.innerText = "You do not have enough gold to buy health."
    }
}

function buyWeapon () {
    if(currentWeapon < weapons.length - 1) {
if(gold >= 30) {
    gold -= 30;
    currentWeapon ++;
    goldText.innerText = gold;
     let newWeapon = weapons[currentWeapon].name;
    text.innerText = "You now have a " + newWeapon + ".";
    inventory.push(newWeapon);
    text.innerText += " In your inventory you have: " + inventory;
} else {
    text.innerText = "You do not have enough gold to buy a weapon."
}
} else {
    button2.innerText = "Sell weapon for 15 gold.";
    button2.onclick = sellWeapon
    text.innerText = "You already have the most powerful weapon!";
}
}

function sellWeapon () {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold
        let currentWeapon = inventory.shift()
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!"
    }
}

function fightSlime () {
    fighting = 0;
    goFight();
}

function fightBeast () {
    fighting = 1;
    goFight();
}

function fightDragon () {
    fighting = 2;
    goFight();
}

function goFight () {
    update(locations[3]);
    monsterHealth = monsters[fighting].health
    monsterStats.style.display = "block"
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health
}

function attack () {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        defeatMonster();
    }
}

function dodge () {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster () {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose () {
 update(locations[5])
}

function restart () {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown()
}