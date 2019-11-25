
import { getProgress } from '../services/api';
import { Server, RequestQuery } from '@hapi/hapi';
import { IZoneProgressMap } from '../types';

import CodeBadge from '../views/badges/code';
import BlizzardBadge from '../views/badges/blizzard';

interface BadgeRequestQuery extends RequestQuery {
    apiKey: string;
    view: string;
}

interface IViewMap {
    [index: string]: Function;
}

const viewMap: IViewMap = {
    'code': CodeBadge,
    'blizzard': BlizzardBadge,
};

const badge = (server: Server) => {
    server.route({
        method: 'GET',
        path: '/badge/{region}/{serverSlug}/{guildName}/{zoneId}',
        handler: async (request) => {

            const { region, serverSlug, guildName, zoneId } = request.params;
            const { apiKey, view = 'blizzard' } = <BadgeRequestQuery>request.query;

            if (!region || !serverSlug || !guildName || !zoneId || !apiKey) {
                return 'Invalid request. Please make sure you are sending region, server slug, guild name, api key and zone id (e.g. Molten Core is 1000)';
            }

            const zoneIds = [zoneId].map(parseInt);

            const progressMap: IZoneProgressMap = await getProgress({ zoneIds, guildName, serverSlug: serverSlug.toLowerCase(), region: region.toUpperCase(), apiKey });

            const progress = progressMap[zoneIds[0]];

            const ViewFunction = viewMap[view];

            if (!ViewFunction) {
                return 'View type not found';
            }

            return ViewFunction({
                region,
                zoneName: progress.name,
                progress: `${progress.progress} / ${progress.encounters.length}`,
                progressPercent: (progress.progress / progress.encounters.length * 100),
            });
        }
    });
}

export default badge;