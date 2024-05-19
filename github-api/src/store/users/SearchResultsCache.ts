import { LRUCache } from "lru-cache";

const LRU_CONFIGS = {
  ttl: 1000 * 60 * 5, //5 min
  max: 10,
  maxSize: 10,
  sizeCalculation: () => {
    return 1;
  },
};
const searchResultsCache = new LRUCache(LRU_CONFIGS);

export { searchResultsCache };
