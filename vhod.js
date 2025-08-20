const { Highrise, Events, Facing, Emotes, GoldBars } = require("highrise.sdk.dev");
// const { GoldBars } = require("highrise.sdk");
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const token = "99aba915d607df074d68df405ef9afd3631d3bd8a4d063004467ba541c2d4388";
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
async function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
const msgs = [
    `\nПриветствуем в комнате\n"Найди друга" 💗💍\nПравила:\n\n\nНе спамить и не флудить. Это включает многократные одинаковые сообщения, слишком большие сообщения и т.д., которые могут мешать другим.\nРеклама любого вида запрещена. Это включает, но`,
    `действий, которые могут раздражать или мешать другим пользователям, особенно если это делается намеренно.
    Поддерживайте позитивную атмосферу. Мы ценим вежливость и доброжелательность в общении. Не допускайте поведения, которое может ухудшить`,
    `настроение других участников.
    Запрещено копирование или имитация уникального дизайна, концепции, правил и любых других особенностей нашей комнаты без предварительного письменного согласия.
    Всё содержание комнаты защищено авторскими`,
    `правами.
    Copying or imitating the unique design, concept, rules, and any other features of our room without prior written consent is prohibited.
    All content of the room is protected by copyright.`
]

setInterval(async () => {
    await bot.player.emote('68a633049cb92a01a6c5f75e', "dance-hipshake").catch(console.error)
}, 12000)


bot.on('playerJoin', async (user, position) => {
  for (m of msgs) {
    bot.message.send(`${getRandomNumber(0,20)}\n${m}`) .catch(e => console.error(e))
    await delay(1000)
  }
});

// bot.on("playerMove", async (user, position) => {
//     console.log(position)
// })

bot.on('ready', async () => {
  bot.move.walk(16.5, 7.25, 11.5, Facing.FrontRight)
});

bot.login(token, room);