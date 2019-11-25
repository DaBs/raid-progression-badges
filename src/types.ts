export interface IEncounter {
    id: number;
    name: string;
    kill?: boolean;
}

export interface IFightEncounter extends IEncounter {
    start_time: number;
    end_time: number;
    boss: number;
    size?: number;
    difficulty?: number;
    kill?: boolean;
    partial?: number;
    bossPercentage?: number;
    fightPercentage?: number;
    lastPhaseForPercentageDisplay?: number;
}

export interface IZone {
    id: number;
    name: string;
    frozen?: boolean;
    encounters: IEncounter[];
    progress?: number;
    hasClearedZone?: boolean;
}

export interface IReport {
    id: string;
    title: string;
    owner: string;
    start: number;
    end: number;
    zone: number;
}

export interface IEncounterZoneMap extends Record<number, number> {}
export interface IZoneProgressMap extends Record<number, IZone> {
    [index: number]: IZone;
};