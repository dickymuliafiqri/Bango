import { BingChat } from "bing-chat";

class ChatBot {
  api = new BingChat({
    cookie: process.env.BING_TOKEN || "BING TOKEN HERE",
  });
}

const chatBot = new ChatBot();

export { chatBot };
