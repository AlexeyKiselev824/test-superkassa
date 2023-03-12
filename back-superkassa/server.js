import WebSocket, { WebSocketServer } from 'ws';
import { readFileSync, existsSync } from "fs";
import db from './database/db.js';
import * as dotenv from 'dotenv';
dotenv.config();

const config = existsSync('config.json') && readFileSync('config.json', 'utf-8');

const wss = new WebSocketServer({
    port: process.env.PORT || 7000,
}, () => console.log('Server started'));

wss.on('connection', function connection(ws) {
    ws.on('message', async function (message) {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                const phone = await insertPhone(message);
                phone && broadCastMessage({ type: 'message', data: [phone] });
                break;

            case 'connection':
                config && broadCastMessage({ type: 'config', data: config });
                const data = await getPhoneList();
                data.length && broadCastMessage({ type: 'message', data });
                break;
        }
    })
})

async function getPhoneList() {
    const res = await db.query(`SELECT * FROM ${process.env.db_name}`);
    return res.rows;
}

async function insertPhone({ phone, code }) {
    const res = await db.query(`INSERT INTO ${process.env.db_name} (code, phone) VALUES (${code}, ${phone}) RETURNING *`);
    return res.rows[0];
}

function broadCastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    })
}

