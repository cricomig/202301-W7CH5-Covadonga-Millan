import createDebug from 'debug';
import http from 'http';
import { dbConnect } from './db/mongo.connect.js';
import { app } from './app.js';
const debug = createDebug('W7CH5');

const PORT = process.env.PORT || 4200;

const server = http.createServer(app);

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug('DB:', mongoose.connection.db.databaseName);
  })
  .catch((error) => server.emit('error', error));

server.on('error', (error) => {
  debug('Server error:', error.message);
});

server.on('listening', () => {
  debug('Listening in http://localhost:' + PORT);
});
