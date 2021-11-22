export interface VisitEntity {
    pathUrl: string,
    computedHash: string
    entityName: string,
    visitCount: number,
    possibleTitles: string[],
    queryParams: KeyValue[],
    timestamp?: number
}
export interface KeyValue {
    key: string,
    value: string
}
/*
pathUrl: path + query, computedHash, queryParams, entity: entityToTrack[0], visitCount: 1, possibleTitles: getPossibleTitles()*/