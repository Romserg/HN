import { Component, OnDestroy, OnInit } from '@angular/core';

const BASEURL = 'https://hacker-news.firebaseio.com/v0';
const JSONQUERY = '.json?print=pretty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  storiesIds = [];
  stories = [];
  kids = [];
  total = [];

  getDeepKids = (story) => {
    if (story.hasOwnProperty('kids') && story['kids'].length) {
      for (let kid of story['kids']) {
        fetch(`${BASEURL}/item/${kid}${JSONQUERY}`)
          .then((response) => {
          return (response.json());
        })
          .then(comment => {
            let {id, by, text, type} = comment;
            if (by && text && type === 'comment') {
              this.total.push({id, by, text, type});
            }
            if (comment.hasOwnProperty('kids') && comment['kids'].length) {
              return this.getDeepKids(comment);
            }
          })
          .catch( err => console.log(err) );
        console.log(this.total);
      }
    }
  }

  ngOnInit(): void {
    fetch(`${BASEURL}/topstories${JSONQUERY}`)
      .then((response) => {
        return (response.json());
      })
      .then(stories => {
        for (let i in stories) {
          if (+i < 1) {
            if (stories.hasOwnProperty(i)) {
              this.storiesIds.push(stories[i]);
            }
          }
        }
        for (let id of this.storiesIds) {
          fetch(`${BASEURL}/item/${id}${JSONQUERY}`)
            .then((story) => {
              return (story.json());
            })
            .then(story => {
              this.kids.push(story['kids']);
              this.stories.push(story);
              console.log(story);
              if (story.hasOwnProperty('kids') && story['kids'].length) {
                this.getDeepKids(story);
              }
            });
        }
        console.log(this.storiesIds);
      })
      .catch( err => console.log(err) );
  }
}
