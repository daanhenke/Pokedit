import {G1Offsets, G1Save, G1ItemList, G1Item, G1ItemNames} from "./gen1lib";

console.log(G1ItemNames);

G1Save.fromURL("/ye.sav", function (err, save) {
    if (err)
        throw err;
    console.log(save);

    console.log("Character names: ");

    console.log(save.readString(G1Offsets.PlayerName));
    console.log(save.readString(G1Offsets.RivalName));

    console.log("Checksum calculation: ");

    console.log(save.readByte(0x3523));
    console.log(save.calculateChecksum());

    console.log("Pocket ItemList: ");

    let itemList = save.readItemList(G1Offsets.pocketItemList);

    window.tempArray = ["Nothing", "Master Ball", "Ultra Ball", "Great Ball", "Poké Ball", "Town Map", "Bicycle", "?????", "Safari Ball", "Pokédex", "Moon Stone", "Antidote", "Burn Heal", "Ice Heal", "Awakening", "Parlyz Heal", "Full Restore", "Max Potion", "Hyper Potion", "Super Potion", "Potion", "BoulderBadge", "CascadeBadge", "ThunderBadge", "RainbowBadge", "SoulBadge", "MarshBadge", "VolcanoBadge", "EarthBadge", "Escape Rope", "Repel", "Old Amber", "Fire Stone", "Thunderstone", "Water Stone", "HP Up", "Protein", "Iron", "Carbos", "Calcium", "Rare Candy", "Dome Fossil", "Helix Fossil", "Secret Key", "?????", "Bike Voucher", "X Accuracy", "Leaf Stone", "Card Key", "Nugget", "PP Up*", "Poké Doll", "Full Heal", "Revive", "Max Revive", "Guard Spec.", "Super Repel", "Max Repel", "Dire Hit", "Coin", "Fresh Water", "Soda Pop", "Lemonade", "S.S. Ticket", "Gold Teeth", "X Attack", "X Defend", "X Speed", "X Special", "Coin Case", "Oak's Parcel", "Itemfinder", "Silph Scope", "Poké Flute", "Lift Key", "Exp. All", "Old Rod", "Good Rod", "Super Rod", "PP Up", "Ether", "Max Ether", "Elixer", "Max Elixer"];
    window.tempArray2 = ["HM01", "HM02", "HM03", "HM04", "HM05", "TM01", "TM02", "TM03", "TM04", "TM05", "TM06", "TM07", "TM08", "TM09", "TM10", "TM11", "TM12", "TM13", "TM14", "TM15", "TM16", "TM17", "TM18", "TM19", "TM20", "TM21", "TM22", "TM23", "TM24", "TM25", "TM26", "TM27", "TM28", "TM29", "TM30", "TM31", "TM32", "TM33", "TM34", "TM35", "TM36", "TM37", "TM38", "TM39", "TM40", "TM41", "TM42", "TM43", "TM44", "TM45", "TM46", "TM47", "TM48", "TM49", "TM50", "TM51", "TM52", "TM53", "TM54", "TM55"];
    let len = 255 - window.tempArray.length - window.tempArray2.length;
    window.ultimateArray = window.tempArray.concat()

    for (let i in itemList.list) {
        console.log(itemList.getItem(i).getItemName() + " x " + itemList.getItem(i).amount);
    }
});