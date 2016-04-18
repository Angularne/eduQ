import {Injectable, Inject} from 'angular2/core';
import {Http, Headers, Request, RequestMethod} from "angular2/http";
import {User} from '../interfaces/user';
import {Subject, SubjectUser} from '../interfaces/subject';
import {Queue, Broadcast} from '../interfaces/subject';
import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {Binding} from '../common/binding';
import {authHeaders} from '../common/headers';


let SERVER_ADDRESS = 'http://localhost:3000';

@Injectable()
export class SubjectService {

  private socket: SocketIOClient.Socket;



  acceptTask(element: any) {
    var json = {
      "users": element.users,
      "tasks": element.tasks
    }
    this.http.post(`api/subject/${this.subject.code}/task`, JSON.stringify(json), {
       headers: authHeaders()
     }).subscribe();
  }




  subject: Subject;

  constructor(public http: Http, public authService: AuthService, public userService: UserService) {

  }

  fetchSubject(code: string) {
    return this.http.get(`api/subject/${code}?populate=students;firstname,lastname`, {
       headers: authHeaders()
     })
     .map((res : any) => {
       let data = res.json();
       this.subject = data;
       //this.queue.value = this.subject.queue;
       //this.broadcasts.value = this.subject.broadcasts;
       //this.students.value = this.subject.users.filter((value: SubjectUser, index: number, array: SubjectUser[]) => {
        // return value.role == 'Student';
       //});

       //this.setupSocket();

       return this.subject;
     });
  }

  getSubject(code: string, select: string = null, populate: string = null){
    let url = '/api/subject/' + code + '?'
    + (select ? 'select=' + select + '&': '')
    + (populate ? 'populate=' + populate : '');

    return this.http.get(url, {headers: authHeaders()}).map(res=>{
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  }

  getAllSubjects(q: any = null, select: string = null, populate: string = null) {
    //return new Promise<Subject[]>((resolve, reject) => {
    let url = '/api/subject?'
    + (q ? 'q=' + JSON.stringify(q) + '&': '')
    + (select ? 'select=' + select + '&': '')
    + (populate ? 'populate=' + populate : '');

    return this.http.get(url, {headers: authHeaders()}).map(res=>{
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });
  }

  getUserSubjectRole(code: string) {
    return new Promise<string>((resolve, reject) => {
      if (this.subject && this.subject.code === code) {
        resolve(this.userService.getUserRole(code));
      } else {
        this.fetchSubject(code).subscribe(() =>resolve(this.userService.getUserRole(code)));
      }
    });
  }

  saveSubject(subject: Subject) {
    var request: Request = new Request({
      url: '/api/subject/',
      headers: authHeaders(),
      body: JSON.stringify(subject)
    });

    if (subject._id) {
      // _id exists - update user
      request.method = RequestMethod.Put;
      request.url += subject.code;
    } else {
      // create new subject
      request.method = RequestMethod.Post;
    }

    return this.http.request(request).map((res) => {
      if (res.status == 200 || res.status == 201) {
        // Subject saved
        return res.json();
      } else {
        // Error
        console.error(res);
        return false;
      }
    });
  }
}