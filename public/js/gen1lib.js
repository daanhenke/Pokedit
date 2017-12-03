export const G1StringTable = "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ABCDEFGHIVSLM:JJ''\"\"*.JJJB=B|BB ABCDEFGHIJKLMNOPQRSTUVWXYZ():;[]abcdefghijklmnopqrstuvwxyzedlstv00000000000000000000000000000000'PM-rm?!.JJJ>>vM$x./,F0123456789";

export const G1Offsets = {
    PlayerName: 0x2598,
    RivalName: 0x25F6,

    pocketItemList: 0x25C9,

    checkSumStart: 0x2598,
    checkSumEnd: 0x3522,

    checkSumLocation: 0x3523
};

export const G1ItemNames =  ["Nothing","Master Ball","Ultra Ball","Great Ball","Poké Ball","Town Map","Bicycle","?????","Safari Ball","Pokédex","Moon Stone","Antidote","Burn Heal","Ice Heal","Awakening","Parlyz Heal","Full Restore","Max Potion","Hyper Potion","Super Potion","Potion","BoulderBadge","CascadeBadge","ThunderBadge","RainbowBadge","SoulBadge","MarshBadge","VolcanoBadge","EarthBadge","Escape Rope","Repel","Old Amber","Fire Stone","Thunderstone","Water Stone","HP Up","Protein","Iron","Carbos","Calcium","Rare Candy","Dome Fossil","Helix Fossil","Secret Key","?????","Bike Voucher","X Accuracy","Leaf Stone","Card Key","Nugget","PP Up*","Poké Doll","Full Heal","Revive","Max Revive","Guard Spec.","Super Repel","Max Repel","Dire Hit","Coin","Fresh Water","Soda Pop","Lemonade","S.S. Ticket","Gold Teeth","X Attack","X Defend","X Speed","X Special","Coin Case","Oak's Parcel","Itemfinder","Silph Scope","Poké Flute","Lift Key","Exp. All","Old Rod","Good Rod","Super Rod","PP Up","Ether","Max Ether","Elixer","Max Elixer",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"HM01","HM02","HM03","HM04","HM05","TM01","TM02","TM03","TM04","TM05","TM06","TM07","TM08","TM09","TM10","TM11","TM12","TM13","TM14","TM15","TM16","TM17","TM18","TM19","TM20","TM21","TM22","TM23","TM24","TM25","TM26","TM27","TM28","TM29","TM30","TM31","TM32","TM33","TM34","TM35","TM36","TM37","TM38","TM39","TM40","TM41","TM42","TM43","TM44","TM45","TM46","TM47","TM48","TM49","TM50","TM51","TM52","TM53","TM54","TM55"]

export class G1Save {
    constructor(binaryData) {
        this.data = binaryData;
    }

    readByte(address) {
        return this.data[address];
    }

    writeByte(address, byte) {
        this.data[address] = byte;
    }

    readCharacter(address) {
        return G1StringTable[this.readByte(address)];
    }

    writeCharacter(address, character) {
        this.writeByte(address, G1StringTable.indexOf(character));
    }

    readString(address) {
        let string = "";
        let offset = 0;

        while (this.readByte(address + offset) !== 0x50) {
            string += this.readCharacter(address + offset);
            offset++;
        }

        return string;
    }

    writeString(address, string) {
        for (let i = 0; i < string.length; i++) {
            this.writeCharacter(address + i, string[i]);
        }
    }

    readItemList(address) {
        let entries = this.readByte(address);
        let itemList = new G1ItemList([]);

        address += 1;

        for (let i = 0; i < entries; i++) {
            let index = this.readByte((address) + (2 * i));
            let amount = this.readByte((address + 1) + (2 * i));

            itemList.addItem(new G1Item(index, amount));
        }

        return itemList;
    }

    calculateChecksum() {
        let checksum = new Uint8Array([0xFF]);
        for (let i = G1Offsets.checkSumEnd; i >= G1Offsets.checkSumStart; i--) {
            checksum[0] -= this.readByte(i);
        }

        return checksum[0];
    }

    fixChecksum() {
        this.writeByte(G1Offsets.checkSumLocation, this.calculateChecksum());
    }

    static fromURL(url, callback) {
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        request.onload = function (event) {
            let arrayBuffer = request.response;
            console.log(arrayBuffer);
            if (arrayBuffer)
                callback(null, new G1Save(new Uint8Array(arrayBuffer)));
            else
                callback(event.err);
        };

        request.send(null);
    }
}

export class G1Item {
    constructor(type, amount) {
        this.type = type;
        this.amount = amount;
    }

    getItemName() {
        return G1ItemNames[this.type];
    }

    static fromString(name, amount) {
        if (G1StringTable.indexOf(name) !== -1)
            return new G1Item(G1StringTable.indexOf(name), amount);
        else
            return new G1Item(0, amount);
    }
}

export class G1ItemList {
    constructor(items) {
        this.list = items;
    }

    addItem(item) {
        this.list.push(item);
    }

    getItem(index) {
        return this.list[index];
    }

    setItem(index, item) {
        this.list[index] = item;
    }

    removeItem() {
        this.list.pop();
    }
}