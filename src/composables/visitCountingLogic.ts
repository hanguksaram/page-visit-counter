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

            let elem: VisitEntity = await GetVisitEntityById(storageName, computedHash)

            if (elem) {
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
            await updateVisitEntity(elem, storageName)

        }
    };
}