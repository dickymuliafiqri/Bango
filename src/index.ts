import { Bot } from "grammy";
import { cache } from "./modules/cache/index.js";
import { chatBot } from "./modules/bingchat/index.js";
import { clearInterval } from "timers";
import { ChatMessage } from "bing-chat";

const bot = new Bot(process.env.BOT_TOKEN || "BOT TOKEN HERE");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on("message", async (ctx) => {
  const userId = ctx.from.id;
  const chatId = ctx.chat.id;
  const text = ctx.message.text;

  if (!text) return;

  const { message_id } = await ctx.reply("🤔");

  let isDone = false;
  let res = cache.getData(userId);
  if (parseInt(res?.invocationId || "0") > 15) {
    await bot.api.editMessageText(chatId, message_id, "Conversation limit exceeded, creating new topic ...");

    res = {} as ChatMessage;
  }

  chatBot.api
    .sendMessage(text, {
      ...res,
      onProgress: async (partialResponse) => (res = partialResponse),
    })
    .catch((e: any) => {
      console.error(`Error: ${e.message}`);
    })
    .finally(() => {
      if (res.author == "bot") {
        cache.setData(userId, res);
      }

      isDone = true;
    });

  const updateInterval = setInterval(() => {
    if (isDone) {
      clearInterval(updateInterval);
    } else if (!res?.text) {
      return;
    }

    bot.api.editMessageText(chatId, message_id, res.text).catch((e) => {
      console.error(`Error: ${e.message}`);
    });
  }, 7000);
});

bot.start();
