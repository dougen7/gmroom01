"use strict";
//import { Room, Client } from "colyseus";
Object.defineProperty(exports, "__esModule", { value: true });
var Room = require('colyseus').Room;
//var Client = require('colyseus').Client;
//import Room = require('colyseus');
class ChatRoom extends Room {
    constructor() {
        super();
        //
        // Set the new room state.
        //
        this.setState({
            players: {},
            messages: []
        });
    }
    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(options) {
        return true;
    }
    // When room is initialized
    onInit(options) {
        //
        // Set frequency the patched state should be sent to all clients. (default: 50 = 20fps)
        //
        this.setPatchRate(1000 / 20);
        //
        // (Optional) Create the simulation interval that will change the state of the game.
        // Default simulation interval: 16.6ms(60fps)
        //
        this.setSimulationInterval(this.update.bind(this));
        console.log("ChatRoom created!", options);
    }
    // Checks if a new client is allowed to join. (default: `return true`)
    requestJoin(options, isNew) {
        return true;
    }
    //
    // Is called when client successfully join the room,
    // after requestJoin and onAuth has been succeeded.
    //
    // クライアントが Join したときに呼ばれる
    //
    onJoin(client) {
        console.log("client joined!", client.sessionId);
        //
        // これでデータ構造が決まってる
        //
        // clientのsessionId をキーにして、オブジェクトを記録
        //
        // Joinしたときに、オブジェクトを初期化しつつ登録
        //
        this.state.players[client.sessionId] = { x: 0, y: 0, zval: 0 };
    }
    //
    // クライアントが離れたときに呼ばれる
    //
    onLeave(client) {
        console.log("client left!", client.sessionId);
        delete this.state.players[client.sessionId];
    }
    //
    // room.Send("some_command"); ここで反応する
    //
    // When a client sends a message
    //
    // クライアントから room.Send  したときに呼ばれる
    //
    onMessage(client, data) {
        //console.log(data, "received from", client.sessionId + " " + data);
        this.state.messages.push(client.sessionId + " data " + data);
        //
        // 受け取ったオブジェクトをブロードキャストオブジェクトとして
        // json になってる想定
        //
        this.broadcast({ broadcast: data });
        //this.broadcast({ hello: "hello world" });
    }
    //
    // Cleanup callback, called after there are no more clients in the room.
    //
    onDispose() {
        console.log("Dispose ChatRoom");
    }
    //
    // このプログラムだと
    // 
    update() {
        //console.log("num clients:", Object.keys(this.clients).length);
        //for (var sessionId in this.state.players) {
        //    this.state.players[sessionId].x += 0.0001;
        //    this.state.players[sessionId].zval += 1;
        //    //console.log("update zval = " + this.state.players[sessionId].zval);
        //}
    }
}
exports.ChatRoom = ChatRoom;
// これが必要
module.exports = ChatRoom;
//# sourceMappingURL=ChatRoom.js.map