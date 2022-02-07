import { VisitStorage } from "../models/visistStorage";
import { VisitEntity } from "../models/visitEntity";
import { db } from "../store/firebase"
import { getFirestore, collection, getDocs, Timestamp, doc, setDoc, getDoc, enableIndexedDbPersistence } from 'firebase/firestore';


export const getRemoteStorage: (storageName: string) => Promise<VisitStorage> = async (storageName) => {

    // enableIndexedDbPersistence(db)
    //     .catch((err) => {
    //         if (err.code == 'failed-precondition') {
    //             // Multiple tabs open, persistence can only be enabled
    //             // in one tab at a a time.
    //             // ...
    //         } else if (err.code == 'unimplemented') {
    //             // The current browser does not support all of the
    //             // features required to enable persistence
    //             // ...
    //         }
    //     });
    // // Subsequent queries will use persistence, if it was enabled successfully

    //temporary solution

    return {entities: []}
    
    try {

        const remoteCollection = collection(db, storageName);
        const remoteCollectionSnapshot = await getDocs(remoteCollection);
        const visitStorageList = remoteCollectionSnapshot.docs.map(doc => doc.data());
        const visitStorage: VisitStorage = {
            entities: []
        }
        visitStorage.entities = visitStorageList.map(el => <VisitEntity>el)
        return visitStorage
    }

    catch (error) {
        console.log("firebase data loading issues", error)
    }
}

export const updateVisitEntity = async (dto: VisitEntity, storageName: string) => {
    dto.timestamp = Timestamp.now().toMillis()
    await setDoc(doc(db, storageName, dto.computedHash), dto)
    sessionStorage.setItem("pageVisitCounterRefreshTime", Timestamp.now().toMillis().toString())
    
}
export const GetVisitEntityById: (storageName: string, id: string) => Promise<VisitEntity> = async (storageName, id) => {
    
    const docRef = doc(db, storageName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return  <VisitEntity>docSnap.data();
    } else {
        null
    }
}