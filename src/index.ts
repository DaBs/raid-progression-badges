
import { Server } from '@hapi/hapi';

import routes from './routes';

const PORT = process.env['PORT'] || 3000;
const HOST = process.env['HOST'] || 'localhost';

const main = async () => {

    const server = new Server({
        port: PORT,
        host: HOST
    });

    routes(server); // Initial routes setup

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

main();