TELEGRAM_BOT_TOKEN = "1708236215:AAE9-leEv_plT7SpCC9pQge2aS2OdI_iEvI";
const TeleBot = require("telebot");
const bot = new TeleBot(TELEGRAM_BOT_TOKEN);
const chatIds = [];

const CronJob = require("cron").CronJob;
const job = new CronJob("* * * * * *", function(){
    console.log("Yuborildi!");
        chatIds.forEach((chatId) => {
            bot.sendMessage(chatId, "Hello");
        });
}, null, true);

bot.on("text", (msg) => msg.reply.text("Kelgan xabar: " + msg.text));

bot.on(["/start"], (msg) => {
    let chatId = msg.chat.id;
    if (!chatIds.includes(chatId)) {
        chatIds.push(chatId);
        msg.reply.text("Started!");
        job.start();
    }
});
bot.on(["/stop"], (msg) => {
    let chatId = msg.chat.id;
    chatIds.pop(chatId);
});
bot.start();