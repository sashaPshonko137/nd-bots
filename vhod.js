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
    console.log(user.username)
  for (m of msgs) {
    bot.message.send(`${getRandomNumber(0,20)}\n${m}`) .catch(e => console.error(e))
    await delay(1000)
  }
});

bot.on("whisperCreate", async (user, message) => {
const msg = message.toLowerCase();


    if (user.id !== "67f8078652db7b9f7a0e68fb" && user.id !== "67a2b617a337e1b57da53360") return
    if (msg === 'баланс' || msg === 'бал') {
        const balance = await bot.wallet.gold.get().catch(console.error)
        bot.whisper.send(user.id, `баланс - ${balance}`).catch(e => console.error(e));
        return
    }
    if (msg === 'старт') {
        if (razdacha.isRunning) return
        razdacha.isRunning = true
        const players = await bot.room.players.get().catch(console.error);
        const playerIDs = players.map(item => item[0].id);
        const totalPlayers = playerIDs.length;
        for (const id of playerIDs) {
            if (id === '6835fa9c903951782e5c18e4') continue
            try {
                await bot.player.react(id, Reactions.Clap).catch(e => console.error(e));
            } catch (error) {
                console.error(error)
            }
        }
        bot.message.send(`\nWhoever drops 10g after the word ✅START✅ will receive 20g`).catch(console.error);
        bot.message.send(`\nПервый, кто скинет 10г после слова ✅START✅ - получит 20г`).catch(console.error);
        await delay(getRandomDelayInRange(5000, 8000))
        if (Math.random() < 0.5) {
            const words = ['✅STRAT✅', "✅STSRT✅", "✅STYRT✅", "✅SPART✅", "✅STUPID✅"]
            const word = getRandomElement(words)
            await bot.message.send(`\n${word}`).catch(console.error);
            await delay(getRandomDelayInRange(5000, 8000))
            if (Math.random() < 0.5) {
                const words = ['✅STRAT✅', "✅STSRT✅", "✅STYRT✅", "✅SPART✅", "✅STUPID✅"]
                const word = getRandomElement(words)
                await bot.message.send(`\n${word}`).catch(console.error);
                await delay(getRandomDelayInRange(5000, 8000))
            }
        }
        await bot.message.send(`\n✅START✅`).catch(console.error);
    }

          const price = extractNumberFromString(msg)
  if (price !== 0) {
    try {
        const balance = await bot.wallet.gold.get().catch(console.error);
        console.log('Current balance:', balance);
        
        if (!balance && balance !== 0) {
            console.error('Failed to get balance');
            return;
        }

        const players = await bot.room.players.get().catch(console.error);
        if (!players || !players.length) {
            console.error('No players found');
            return;
        }

        const playerIDs = players.map(item => item[0].id);
        const totalPlayers = playerIDs.length;

        // Проверка баланса и отправка чаевых
        let barType, requiredAmount;
        
        switch(price) {
            case 1:
                barType = GoldBars.BAR_1;
                requiredAmount = totalPlayers * 2;
                break;
            case 5:
                barType = GoldBars.BAR_5;
                requiredAmount = totalPlayers * 6;
                break;
            case 10:
                barType = GoldBars.BAR_10;
                requiredAmount = totalPlayers * 11;
                break;
            default:
                console.error('Invalid price value');
                return;
        }

        if (balance < requiredAmount) {
            await bot.message.send(`Не хватает золота! Баланс: ${balance}, требуется: ${requiredAmount}`).catch(console.error);
            return;
        }

        // Отправка чаевых всем игрокам
let successCount = 0;
let failedCount = 0;

for (const id of playerIDs) {
        if (user.id === "67f8078652db7b9f7a0e68fb" || user.id === "67a2b617a337e1b57da53360" || user.id === bot.info.user.id) continue
    try {
        await bot.player.tip(id, barType);
        console.log(`Sent tip to ${id}`);
        successCount++;
    } catch (error) {
        console.error(`Failed to tip player ${id}:`, error);
        failedCount++;
    }
}

    } catch (error) {
        console.error('Error in tipping process:', error);
    }
}

 const usData = parseUserAction(message)
    if (usData) {
        const players = await bot.room.players.get().catch(console.error);
        if (!players) return
        const partner = players.find(player => player[0].username === usData.username)
        if (!partner) {
            return
        }
        const id = partner[0].id
        switch(usData.action) {
            case 'кик':
                await bot.player.kick(id).catch(e => console.error(e));
            case 'бан':
                await bot.player.ban(id, 3200).catch(e => console.error(e));
            case 'модер':
                await bot.player.moderator.add(id).catch(e => console.error(e));
            case 'диз':
                await bot.player.designer.add(id).catch(e => console.error(e));
            case 'немодер':
                await bot.player.moderator.remove(id).catch(e => console.error(e));
            case 'недиз':
                await bot.player.designer.remove(id).catch(e => console.error(e));
            case 'войс':
                await bot.player.voice.add(id).catch(e => console.error(e));
            case 'невойс':
                await bot.player.voice.remove(user.id).catch(e => console.error(e));

        }
        return
    }



});

function parseUserAction(inputString) {
    // Удаляем пробелы в начале и конце, затем разбиваем по пробелам
    const trimmedInput = inputString.trim();
    const [action, ...rest] = trimmedInput.split(/\s+/);
    
    if (!action || rest.length === 0) {
        return null
    }

    // Объединяем остаток, удаляем @ и пробелы в имени пользователя
    const username = rest.join(' ').replace(/^@/, '').trim();

    return { action, username };
}

function extractNumberFromString(inputString) {
  try {
    // Проверяем что это строка и не пустая
    if (typeof inputString !== 'string' || inputString.trim() === '') return 0;
    
    // Строгая проверка формата "тип 123"
    const match = inputString.match(/^тип\s(\d+)$/);
    if (!match) return 0;
    
    // Парсим число
    const number = parseInt(match[1], 10);
    return isNaN(number) ? 0 : number;
    
  } catch {
    return 0;
  }
}


// bot.on("playerMove", async (user, position) => {
//     console.log(position)
// })

bot.on('ready', async () => {
  bot.move.walk(16.5, 7.25, 11.5, Facing.FrontRight)
});

bot.login(token, room);