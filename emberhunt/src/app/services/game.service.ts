import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  sendCommand(command: {}) {
      return this.http.post(environment.apiEndpoints.sendCommand, command, {responseType: 'text'});
  }

  getLog() {
      return this.http.get(environment.apiEndpoints.getGameLog, {responseType: 'text'});
  }

  getLogFileName() {
      return this.http.get(environment.apiEndpoints.getLogFileName, {responseType: 'text'})
  }
}
