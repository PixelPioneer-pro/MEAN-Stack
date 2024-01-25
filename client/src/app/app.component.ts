import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const ALL_LOCATIONS = gql`
query allLocations {
  allLocations {
    _id
    name
    address
    images
    imagesURL
    creator {
      _id
    }
    sunsetLikes {
      _id
    }
    viewsLikes {
      _id
    }
    restaurantsLikes {
      _id
    }
    categories
    description
    blog {
      _id
      createdAt
      messageText
      user {
        _id
        username
      }
    }
    barsLikes {
      _id
    }
  }
}`

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';
  quotes: Observable<any>;
  constructor(private apollo: Apollo) {}
  ngOnInit() {
    this.quotes = this.apollo.watchQuery({
      query: ALL_LOCATIONS
    }).valueChanges.pipe(
      map((result: any) => {
        console.log(result.data.allLocations.allLocations);
        return result.data.allLocations.allLocations
      })
    )
  }
  create(allLocations: string)
}
