import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {}
  title = 'Hacker News Stories';
  storiesIds = [];
  stories = [];

  ngOnInit() {
    this.dataService.getStories()
      .subscribe(
        result => {
          for (let prop in result) {
            if (+prop < 30) {
              this.storiesIds.push(result[prop]);
            }
          }
          for(let i of this.storiesIds){
           this.dataService.getStoryById(i)
             .subscribe(
               result => {
                 this.stories.push(result)
               },
               err => console.log(err)
             )
          }
          console.log(this.stories);
        },
        err => console.log(err)
      );
  }
}
