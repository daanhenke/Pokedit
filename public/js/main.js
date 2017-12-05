import {G1Offsets, G1Save} from "./gen1lib";

G1Save.fromURL("/re.sav", function (err, save) {
    if (err)
        throw err;
    console.log(save);

    // console.log("Character names: ");
    //
    // console.log(save.readString(G1Offsets.PlayerName));
    // console.log(save.readString(G1Offsets.RivalName));
    //
    // console.log("Checksum calculation: ");
    //
    // console.log(save.readByte(0x3523));
    // console.log(save.calculateChecksum());
    //
    // console.log("Pocket ItemList: ");
    //
    // let itemList = save.readItemList(G1Offsets.pocketItemList);
    // let masterBalls = itemList.getItem(1);
    // masterBalls.amount = 20;
    // itemList.setItem(1, masterBalls);
    //
    // for (let i in itemList.list) {
    //     console.log(itemList.getItem(i).getItemName() + " x " + itemList.getItem(i).amount);
    // }

    let bagItems = save.readItemList(G1Offsets.pocketItemList);

    let list = document.querySelector("#skrt");

    for (let i = 0; i < bagItems.list.length; i++) {
        let item = bagItems.getItem(i);
        let element = document.createElement("li");
        let image = document.createElement("img");

        image.src = "/img/gen1items.png";
        image.style.objectFit = "none";
        image.style.objectPosition = -(26 * item.type) + "px 0";
        image.style.width = "26px";
        image.style.height = "26px";

        element.appendChild(image);

        let text = document.createElement("span");
        text.innerText = "x " + item.amount;

        element.appendChild(text);

        list.appendChild(element);
    }

    console.log("Has seen: ");

    console.log(save.readHasSeen(20));
    save.writeHasSeen(20, true);
    console.log(save.readHasSeen(20));

    console.log("Time played: ");
    console.log(save.readTimePlayed());
});