import fetch from 'node-fetch';
import { IZone, IEncounter, IFightEncounter, IReport, IZoneProgressMap, IEncounterZoneMap } from '../types';



const apiBase = 'https://classic.warcraftlogs.com/v1';

const fetchJson = async (url: string, apiKey: string) => {

    const request = await fetch(apiBase + url + '?api_key=' + apiKey);
    const json = await request.json();

    return json;
}

const getZoneInfo = async (zoneIds: number[], apiKey: string) => {
    const allZones: IZone[] = await fetchJson(`/zones`, apiKey);
    const filteredZones = allZones.filter(({ id }) => zoneIds.includes(id));

    const zoneProgressMap: IZoneProgressMap = {};
    const encounterZoneMap: IEncounterZoneMap = {};

    for (const { id: zoneId, name: zoneName, encounters } of filteredZones) {
        for (const { id: encounterId, name: encounterName } of encounters) {
            encounterZoneMap[encounterId] = zoneId;
        }

        zoneProgressMap[zoneId] = { encounters, id: zoneId, name: zoneName };
    }

    return {
        encounterZoneMap,
        zoneProgressMap,
    };
}


interface GetProgressParams {
    zoneIds: number[];
    guildName: string;
    serverSlug: string;
    region: string;
    apiKey: string;
}

export const getProgress = async ({ zoneIds, guildName, serverSlug, region, apiKey }: GetProgressParams) => {

    const { 
        zoneProgressMap,
        encounterZoneMap,
    } = await getZoneInfo(zoneIds, apiKey);

    let hasClearedZone = false;

    const reports: IReport[] = await fetchJson(`/reports/guild/${guildName}/${serverSlug}/${region}`, apiKey);
    const filteredReports = reports.filter(({ zone }) => zoneIds.includes(zone));

    for (const { id, zone, start, end } of filteredReports) {

        if (hasClearedZone) {
            continue;
        }

        const { fights }: { fights: IFightEncounter[] } = await fetchJson(`/report/fights/${id}`, apiKey);

        const killedBosses = fights.filter(({ boss, kill }) => boss != 0 && kill != false);

        for (const { boss: encounterId } of killedBosses) {
            const encounterZoneId = encounterZoneMap[encounterId];
            console.log(zoneProgressMap);
            const index = zoneProgressMap[encounterZoneId] ? zoneProgressMap[encounterZoneId].encounters.findIndex(({ id }) => id === encounterId) : -1;
            if (index != -1) {
                zoneProgressMap[encounterZoneId].encounters[index].kill = true;
            }
        }

        const progress = zoneProgressMap[zone].encounters.reduce((progress, { kill }) => progress += kill ? 1 : 0, 0);
        const isCleared = progress == zoneProgressMap[zone].encounters.length;

        if (isCleared) {
            hasClearedZone = true;
            zoneProgressMap[zone].hasClearedZone = true;
        }

        zoneProgressMap[zone].progress = progress;
    }

    return zoneProgressMap;
}