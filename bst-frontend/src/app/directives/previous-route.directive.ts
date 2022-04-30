import { Directive, HostListener } from '@angular/core';
import { NavigationService } from '../services/navigation/navigation.service';

@Directive({
  selector: '[previousRoute]'
})
export class PreviousRouteDirective {

  constructor(private navigationService: NavigationService) { }

  @HostListener('click')
  onClick(): void {
    this.navigationService.back();
  }

}
//* <button previousRoute>Back with NavigationService</button>
