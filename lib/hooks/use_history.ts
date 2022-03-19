import { useEffect, useState } from "react";
import Dexie from "dexie";

export interface History {
  datetime: string;
  gifData: Blob;
}

let database: Dexie | null = null;
const db = new Dexie("video_to_gif");
db.version(1).stores({ histories: "&datetime" });

export const initIndexedDb = async (): Promise<boolean> =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (db as any).histories
    .orderBy("datetime")
    .reverse()
    .limit(1)
    .first()
    .then(() => {
      database = db;
      return true;
    })
    .catch(() => false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getHistoriesTable = (): Dexie.Table<History, string> | null => (database as any)?.histories ?? null;
const MAX_HISTORY = 30;

const saveHistory = async (gifData: Blob, datetime: string): Promise<boolean> => {
  const histories = getHistoriesTable();
  if (histories == null) return false;
  await histories.put({ datetime, gifData });
  const count = await histories.count();
  if (count > MAX_HISTORY) {
    histories.orderBy("datetime").reverse().offset(MAX_HISTORY).delete();
  }
  return true;
};

const listHistory = async (): Promise<Array<History>> => {
  const histories = getHistoriesTable();
  return histories == null ? [] : histories.orderBy("datetime").reverse().toArray();
};

interface UseHistoryState {
  addHistory: (gifData: Blob) => Promise<void>;
  canUseHistory: boolean;
  histories: History[];
}

export const useHistory = (): UseHistoryState => {
  const [canUseIndexedDb, setCanUseIndexedDb] = useState(false);
  const [histories, setHistories] = useState<History[]>([]);

  const addHistory = async (gifData: Blob): Promise<void> => {
    if (!canUseIndexedDb) return;
    const datetime = new Date().toISOString();
    saveHistory(gifData, datetime)
      .then(() => listHistory())
      .then(setHistories);
  };

  useEffect(() => {
    (async () => {
      const canUseIndexedDb = await initIndexedDb();
      setCanUseIndexedDb(canUseIndexedDb);
      if (canUseIndexedDb) {
        setHistories(await listHistory());
      }
    })();
  }, [setCanUseIndexedDb]);

  return { canUseHistory: canUseIndexedDb, histories, addHistory };
};
