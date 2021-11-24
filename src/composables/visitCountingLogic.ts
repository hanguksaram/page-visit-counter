import { calculateHashCode, createVisit } from './applicationLogic'
import { VisitEntity } from '../models/visitEntity';
import { VisitStorage } from '../models/visistStorage';
import { GetVisitEntityById, updateVisitEntity } from './remoteStorageApi';

export default (storageName: string): ((args) => void) => {
    return async (...args) => {
         
                const path = window.location.pathname;
                const query = window.location.search;

                const pathHash = calculateHashCode(path);
                const queryHash = calculateHashCode(query);

                const entityToTrack: string[] = args.filter((el) => path.includes(el));

                if (entityToTrack != null && entityToTrack.length > 0) {
                    const computedHash: string = pathHash + queryHash;
                    const storage: VisitStorage = JSON.parse(
                        sessionStorage.getItem(storageName)
                    );
                    let elem: VisitEntity = await GetVisitEntityById(storageName, computedHash)
                    if (elem) {
                        storage.entities = storage.entities.filter(el => el.computedHash != elem.computedHash)
                        elem.visitCount += 1;
                    } else {
                        elem = createVisit(
                            query,
                            elem,
                            path,
                            computedHash,
                            entityToTrack
                        );

                      
                    }
                    storage.entities.push(elem);
                    sessionStorage.setItem(storageName, JSON.stringify(storage));
                    await updateVisitEntity(elem, storageName)

                }
        };
    }