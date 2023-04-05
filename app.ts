import { IBaseMessage } from './communication/messages';
import RacksClient from './racks-client';

(
async () => {
    const client = new RacksClient();
    client.on('message', onMessage);

    await client.Connect('ws://localhost:8080');
    await sleep(3000);
    client.OpenWay(4);
    await sleep(15000);
    await client.Ventilation();
    await sleep(15000);
    client.Stop();
}
)();

function onMessage(msg: IBaseMessage) {
    console.log(`msg: ${msg.action} payload: ${JSON.stringify(msg.payload)}`);
}

function sleep(ms: number): Promise<void> {
    return new Promise((res, _) => { setTimeout(() => res(), ms)});
}
