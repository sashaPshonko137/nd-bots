const { Highrise, Events, Facing, Emotes, GoldBars } = require("highrise.sdk.dev");
// const { GoldBars } = require("highrise.sdk");
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const token = "fdbc664cee3bf86c266147e5dcbdb6e44fc563dfb9c3fa4cdb777b908f2bd3a7";
const room = "68a5826cc71c2f71395f5e36";
const ownerID = "https://high.rs/room?id=68529363d23340447bc0b10c&invite_id=6878f0cda2765ebef404143f"
//https://high.rs/room?id=68a5826cc71c2f71395f5e36&invite_id=68a5dc6e8e17a1f30575deaf

const bot = new Highrise({
  Events: [Events.Messages, Events.Movements, Events.Leaves, Events.DirectMessages, Events.Joins, Events.Tips],
  AutoFetchMessages: true,
  Cache: true
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

bot.on("chatCreate", async (user, message) => {
    if (message.toLowerCase() === "!help") {
        bot.message.send(`\nхз, че писать`) .catch(e => console.error(e))
        setTimeout(()=> {
            bot.message.send(`\nя тупой(`) .catch(e => console.error(e))
        }, 2000)
        setTimeout(()=> {
            bot.message.send(`\nвладелец тоже`) .catch(e => console.error(e))
        }, 4000)
    }
})
// bot.on("playerMove", async (user, position) => {
//     console.log(position)
// })

bot.on('ready', async () => {
  bot.move.walk(4.5, 0, 1.5, Facing.FrontRight)
});

setInterval(() => {
    const num =  getRandomNumber(0, 20)
    bot.message.send(`\n${num}\nНапитки ничего не дают, данный контент исключительно в развлекательных целях.
📖 Спасибо за пожертвования, все средства идут на благие цели.🤗\n
!help для команд или брось реакцию мне 6;)`);
}, 120000)
// bot.on('playerJoin', (user, position) => {

//   // Send a welcome message to the user.
//   bot.message.send(`Welcome to the room, ${user.username}!`);
// });

bot.login(token, room);