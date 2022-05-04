import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history: string[] = []

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    })
   }

   back(): void {
     this.history.pop()
     if(this.history.length > 0) {
       console.log(`history not zero, calling back function`);
       this.location.back()
     } else {
       this.router.navigateByUrl('/')
     }
   }

   navigateByUrl(url: string ): void {
    console.log(`hitting navigateByUrl in service`);
     this.router.navigateByUrl(url);
   }

}
