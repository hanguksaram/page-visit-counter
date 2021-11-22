import { VisitStorage } from "@/models/visistStorage";
import { KeyValue, VisitEntity } from "@/models/visitEntity";

export const calculateHashCode = (str: string): string => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      var character = str.charCodeAt(i);
      hash = (hash << 5) - hash + character;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  };

 const getPossibleTitles: () => string[] = () => {
    return <string[]>[[], "h1", "h2", "h3", "h4"].reduce(
      (acc: string[], val: string) => {
        const elements: HTMLCollection =
          document.getElementsByTagName(val);
        const textList: string[] = [...elements].map(
          (el) => (<any>el).innerText
        );
        return acc.concat(textList);
      }
    );
  };
 export const createVisit = (
    query: string,
    elem: VisitEntity,
    path: string,
    computedHash: string,
    entityToTrack: string[]
  ) => {
    const params = new URLSearchParams(query);
    const queryParams: KeyValue[] = [];
    for (const param of params) {
      queryParams.push({ key: param[0], value: param[1] });
    }

    elem = {
      pathUrl: path + query,
      computedHash,
      queryParams,
      entityName: entityToTrack[0],
      visitCount: 1,
      possibleTitles: getPossibleTitles(),
    };
    return elem;
  };
export const initializesessionStorage = (storageName: string, storage: VisitStorage) => {
      sessionStorage.setItem(storageName, JSON.stringify(storage));
      
}


