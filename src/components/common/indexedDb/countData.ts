export const countData = (dbName: string, storeName: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName)

    request.onupgradeneeded = function (event) {
      //@ts-ignore
      const db = event.target.result

      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName)
      }
    }

    request.onsuccess = function (event) {
      //@ts-ignore
      const db = event.target.result

      if (!db.objectStoreNames.contains(storeName)) {
        reject(0)

        return
      }

      const store = db.transaction(storeName, 'readonly').objectStore(storeName)

      // Use the count() method to count the number of records in the store
      const countRequest = store.count()

      countRequest.onsuccess = function (event: any) {
        const count = event.target.result

        resolve(count)
      }
      countRequest.onerror = function (event: any) {
        reject(event)
      }
    }
  })
}
