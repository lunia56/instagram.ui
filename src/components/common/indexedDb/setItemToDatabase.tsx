import { DatabaseMetaDataType, getDatabase } from "@/components/common/indexedDb/getDatabase";

type SetItemParamsType = DatabaseMetaDataType & { itemData: any }

export const setItemToDatabase = async ({
  itemData,
  dbName,
  storeName,
  keyPath,
}: SetItemParamsType) => {
  const db = await getDatabase({ dbName, storeName, keyPath })
  const tx = db.transaction([storeName], 'readwrite')
  const store = tx.objectStore(storeName)

  const request = store.put(itemData, keyPath)
}
