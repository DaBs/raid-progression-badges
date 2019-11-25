import { Server } from "@hapi/hapi";

import badge from './badge';

const setupRoutes = (server: Server) => {
    badge(server);
};

export default setupRoutes;