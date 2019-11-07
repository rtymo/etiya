import { Component } from "@angular/core";

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
}
