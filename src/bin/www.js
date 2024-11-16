import { createServer } from '../lib/server.js';
import { initDatatbaseConnection  } from '../lib/db.js';
(async function bootstrap() {
    await initDatatbaseConnection();
    await createServer();
})()