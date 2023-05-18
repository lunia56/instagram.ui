export type DatabaseMetaDataType = { dbName: string; storeName: string; keyPath: string };

export const getDatabase = async ({
                                    dbName,
                                    storeName,
                                    keyPath,
                                  }: DatabaseMetaDataType): Promise<IDBDatabase> => {
  const indexedDB =
    // @ts-ignore
    window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

  const openRequest = indexedDB.open(dbName, 1);

  return new Promise((resolve, reject) => {
    openRequest.onerror = () => {
      reject(openRequest.error);
    };

    openRequest.onupgradeneeded= (event) =>{
      //@ts-ignore
      const db=event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName,{keyPath:keyPath});
      }
    }

    openRequest.onsuccess= ()=>{
      resolve(openRequest.result);
    }
  });
};