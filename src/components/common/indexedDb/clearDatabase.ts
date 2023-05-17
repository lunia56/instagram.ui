import { DatabaseMetaDataType, getDatabase } from "@/components/common/indexedDb/getDatabase";

export const clearDatabase = async ({ dbName, storeName, keyPath }: DatabaseMetaDataType) => {
  const db = await getDatabase({ dbName, keyPath, storeName })
  const clearTx = db.transaction([storeName], 'readwrite')
  const clearStore = clearTx.objectStore(storeName)

  clearStore.clear()
}
