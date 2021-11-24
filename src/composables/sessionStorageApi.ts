
import { VisitStorage } from "@/models/visistStorage";
import { VisitEntity } from "@/models/visitEntity";
export const mergeVisitEntity = (dto: VisitEntity, storageName: string) => {
    const storage: VisitStorage = JSON.parse(
        sessionStorage.getItem(storageName)
    );
    storage.entities = storage.entities.filter(el => el.computedHash != dto.computedHash)
    storage.entities.push(dto)
    sessionStorage.setItem(storageName, JSON.stringify(storage));
}