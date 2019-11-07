import { Component } from "@angular/core";
import { Observable, from } from 'rxjs';
import { Place } from './place';
import { AuthenticationService } from '../auth/authentication.service';
import { map } from 'rxjs/operators';


@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"]
})
export class ContainerComponent {
  places$= [
    { name: "Users", location: "/user-info"},
    { name: "Search", location: "/search"}
  ];

  // constructor(
  //   private authService: AuthenticationService
  // ) {}
  // places$: Observable<Place[]> = this.authService.isAdmin$.pipe(
  //   map(yes => yes
  //     ? [{ name: "Users", location: "/users-info"},
  //        { name: "test", location: "/test"}]
  //     : [])
  // );


}
