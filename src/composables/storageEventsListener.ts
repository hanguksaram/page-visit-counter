import { VisitEntity } from "../models/visitEntity";
import { db } from "../store/firebase"
import { Unsubscribe } from "@firebase/util";
import { collection, query, where, onSnapshot, Timestamp } from "firebase/firestore";

export const configureStorageListener: (storageName: string, entityChangeEventName: string) => Unsubscribe = (storageName, eventName) => {

    const q = query(collection(db, storageName));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change, i) => {
            const data = <VisitEntity>change.doc.data()
            if (data.timestamp > window.visitCounterLibrary.storageRefreshTime) {
    
                window.dispatchEvent(new CustomEvent(eventName, {
                    detail: data
                }));
            }          
        });
    })
    return unsubscribe
}