const query = require('./queries/query');
const db = require('./utils/database');
const socketIO = require('socket.io');
const Task = require('./task');


const setupSocket = (app) => {
    const io = socketIO.listen(app);
    io.on('connection', (socket) => {
        console.log('============== Starting Task');
        const params = {
            db,
            query: query.getApplications,
            countQuery: query.getApplicationsCount,
            chunk: 1
        }
        new Task(socket, params).start();
    });

}

module.exports = setupSocket