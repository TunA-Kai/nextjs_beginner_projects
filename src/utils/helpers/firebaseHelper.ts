import { DocumentData, collection, CollectionReference } from 'firebase/firestore'
import { chatsColRef, db } from '~/firebase.config'

export function createCollection<T = DocumentData>(path: string, ...pathSegments: string[]) {
  return collection(db, path, ...pathSegments) as CollectionReference<T>
}

export function getChatMessageColRef<T = DocumentData>(chatDocId: string) {
  return collection(chatsColRef, chatDocId, 'messages') as CollectionReference<T>
}
