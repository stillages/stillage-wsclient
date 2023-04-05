import { client as WebSocketClient } from 'websocket';
import { EventEmitter } from 'events';
import { ECommandAction, IBaseCommand, IOpenWayCommand, IStopCommand, IVentilationCommand } from './communication/commands';

const WEB_SOCKET_PROTOCOL_NAME = 'rack-client-protocol';

export default class RacksClient extends EventEmitter {
    private _connection: any;
    // private _connections: any[];

    constructor() {
        super();
        // this._connections = [];
    }

    async Connect(url: string): Promise<void> {
        const client = new WebSocketClient({});
        client.connect(url, WEB_SOCKET_PROTOCOL_NAME);

        return new Promise((resolve, reject) => {
            client.on('connectFailed', (err: Error) => {
                reject(err);
            });
            client.on('connect', (connection) => {
                this._connection = connection;
                connection.on('close', () => {
                    console.log('Connection Closed');
                });
                connection.on('message', (message) => {
                    if (message.type === 'utf8') {
                        // console.log("Received: '" + message.utf8Data + "'");
                        let msg = JSON.parse(message.utf8Data);
                        this.emit('message', msg);
                    }
                });
                resolve();
            });
        });
    }

    OpenWay(way: number) {
        const cmd: IOpenWayCommand = {
            action: ECommandAction.openway,
            payload: { way: way }
        };
        this._send(cmd);
    }

    Stop() {
        const cmd: IStopCommand = {
            action: ECommandAction.stop,
        };
        this._send(cmd);
    }

    Ventilation() {
        const cmd: IVentilationCommand = {
            action: ECommandAction.ventilation,
        }
        this._send(cmd);
    }

    _send(cmd: IBaseCommand) {
        if (this._connection.connected) {
            this._connection.send(JSON.stringify(cmd));
        }

    }
}
