// This simple game disk can be used as a starting point to create a new adventure.
// Change anything you want, add new rooms, etc.
const testDisk = {
  roomId: "start", // Set this to the ID of the room you want the player to start in.
  rooms: [
    {
      id: "start", // Unique identifier for this room. Entering a room will set the disk's roomId to this.
      name: "Hallen", // Displayed each time the player enters the room.
      desc: `Du står i hallen, framför dig ser du en lång korridor, bakom dig en låst dörr. Skriv SAKER för att se vad som mer finns i rummet.`, // Displayed when the player first enters the room.
      items: [
        {
          name: "dörr",
          desc: "Den leder till norr.", // Displayed when the player looks at the item.
          onUse: () => goDir("norr"), // Called when the player uses the item.
        },
        {
          name: ["klängväxter", "klängväxt"], // The player can refer to this item by either name. The game will use the first name.
          desc: `De växer över dörren så den går inte att öppna.`,
        },
        {
          name: "yxa",
          desc: `Du kan förmodligen använda den för att ta bort klängväxterna som växer över dörren.`,
          isTakeable: true, // Allows the player to take the item.
          onUse: () => {
            // Remove the block on the room's only exit.
            const room = getRoom("start");
            const exit = getExit("norr", room.exits);

            if (exit.block) {
              delete exit.block;
              println(
                `Du skär genom klängväxterna, dörren är nu fri att öppnas.`
              );
            } else {
              println(`Det finns inget att använda yxan till här.`);
            }
          },
        },
      ],
      exits: [
        {
          dir: "norr", // "dir" can be anything. If it's north, the player will type "go north" to get to the room called "A Forest Clearing".
          id: "forrest",
          block: `Dörren som leder norrut är övervuxen av klängväxter och går inte att öppna.`, // If an exit has a block, the player will not be able to go that direction until the block is removed.
        },
      ],
    },
    {
      id: "forrest",
      name: "En skog",
      desc: `Det är en skog här. Rummet du kommer från är söderut.`,
      exits: [
        {
          dir: "söder",
          id: "start",
        },
      ],
    },
  ],
  characters: [
    {
      name: ["Lisa"],
      roomId: "start",
      desc: "Hon ser lite lurig ut",
      onTalk: () => println(`"Hej" säger hon, "Hur kan jag hjälpa dig?"`),
      topics: [
        {
          option: "Berätta om HUSET",
          line:
            "Absolut! Det här är ett väldigt litet hus med bara en hall. Akta dig så du inte blir fast",
        },
        {
          option: "VAD gör du här?",
          line: "Jag har fastnat i en tidsloop",
        },
      ],
    },
  ],
};
