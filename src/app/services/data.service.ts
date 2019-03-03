import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASEURL = 'https://hacker-news.firebaseio.com/v0';
const JSONQUERY = '.json?print=pretty';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getStories() {
   return this.http.get(`${BASEURL}/topstories${JSONQUERY}`)
  }

  getStoryById(id) {
      return this.http.get(`${BASEURL}/item/${id}${JSONQUERY}`)
  }
}
