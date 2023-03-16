import { ChatMessage } from "bing-chat";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

class Cache {
  private cache: {
    [index: string]: ChatMessage;
  } = {};
  private cacheFile = "./cache/cache.json";
  private isFileCache = process.env.FILE_CACHE || false;

  constructor() {
    if (this.isFileCache) {
      if (!existsSync("./cache")) mkdirSync("./cache");
      if (!existsSync(this.cacheFile)) writeFileSync(this.cacheFile, "{}");
    }
  }

  getData(userId: number) {
    if (this.isFileCache) {
      return JSON.parse(readFileSync(this.cacheFile).toString())[userId] as ChatMessage;
    } else {
      return this.cache[userId] as ChatMessage;
    }
  }

  setData(userId: number, data: ChatMessage) {
    if (this.isFileCache) {
      let cacheData = JSON.parse(readFileSync(this.cacheFile).toString());
      cacheData[userId] = data;

      writeFileSync(this.cacheFile, JSON.stringify(cacheData, null, 2));
    } else {
      this.cache[userId] = data;
    }
  }
}

const cache = new Cache();

export { cache };
