const { Telegraf, Markup } = require("telegraf");
const express = require("express");

const BOT_TOKEN = "8138361562:AAHWd_Fs08utaWsOPjp5p8UmUrAehutUrxc";
const WEB_APP_URL = "https://ashik2770.github.io/Tttttt/"; // Replace with your WebApp URL

const bot = new Telegraf(BOT_TOKEN);
const app = express();
app.use(express.json());

// Handle /start command
bot.start((ctx) => {
    const fullName = ctx.from.first_name + (ctx.from.last_name ? " " + ctx.from.last_name : "");
    ctx.reply(
        `👋 Welcome, ${fullName}!\n\n🚀 Start earning today! Click the button below to access the Web App.`,
        Markup.inlineKeyboard([
            [Markup.button.webApp("💰 Open Web App", WEB_APP_URL)]
        ])
    );
});

// Start the bot
bot.launch();
console.log("Bot is running...");

// Handle webhook (optional for server deployment)
app.post(`/${BOT_TOKEN}`, (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

// Express server setup (useful for webhook deployment)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
