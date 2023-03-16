import { ChatMessage } from "bing-chat";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

class Cache {
  private cacheFile = "./cache/cache.json";
  constructor() {
    if (!existsSync("./cache")) mkdirSync("./cache");
    if (!existsSync(this.cacheFile)) writeFileSync(this.cacheFile, "{}");
  }

  getData(userId: number) {
    return JSON.parse(readFileSync(this.cacheFile).toString())[userId] as ChatMessage;
  }

  setData(userId: number, data: ChatMessage) {
    let cacheData = JSON.parse(readFileSync(this.cacheFile).toString());
    cacheData[userId] = data;

    writeFileSync(this.cacheFile, JSON.stringify(cacheData, null, 2));
  }
}

const cache = new Cache();

export { cache };
