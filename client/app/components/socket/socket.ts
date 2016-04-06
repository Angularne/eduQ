import {Component, OnInit, OnDestroy} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Title} from 'angular2/platform/browser';
import {CanActivate} from 'angular2/router';
import {isLoggedin}  from '../main/is-loggedin';
import {ProtectedDirective} from "../../directives/protected.directive";

//let SERVER_ADDRESS = 'http://109.189.16.142:3000';
let SERVER_ADDRESS = 'http://158.38.188.119:3000';
//let SERVER_ADDRESS = 'http://localhost:3000';


@Component({
  selector: 'socket',
  templateUrl: 'app/components/socket/socket.html',
  directives: [ROUTER_DIRECTIVES, ProtectedDirective],
  providers: [Title]
})

export class SocketController implements OnDestroy, OnInit{
  text: string = ' ';
  clientsConnected: number;
  socket: SocketIOClient.Socket;

  constructor(title: Title) {
    title.setTitle('Socket');

  }

  ngOnInit() {
    // this.socket = io.connect(SERVER_ADDRESS);
    //
    // this.socket.on('change', (data) => {
    //   this.text = data.text;
    //   this.clientsConnected = data.clients;
    // });
  }
  ngOnDestroy() {
    // if (this.socket) {
    //   this.socket.close();
    // }
  }

  send() {
    //this.socket.emit('send', {text: this.text});
  }
}
