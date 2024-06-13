import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor( private router: Router) { }

  toggleList(identifier: string) {
    const sublist = document.getElementById(identifier);
    if (sublist.style.display === "none") {
      sublist.style.display = "block";
    } else {
      sublist.style.display = "none";
    }
  }
  navAf(){
    console.log("eeee")
    this.router.navigate(['af']);

  }
}
