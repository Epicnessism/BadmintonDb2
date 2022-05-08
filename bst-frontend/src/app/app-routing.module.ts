import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { BracketViewComponent } from './components/tournament/bracket-view/bracket-view.component';

const routes: Routes = [
  {path: '', component: LoginComponent}, //* this is what router-outlet defaults to
  {path: 'bracketView', component: BracketViewComponent},
  {path: 'login', component: LoginComponent},
  {path: 'search/:searchParam', component: SearchResultsComponent},
  {path: 'profile', component: ProfileComponent},

  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
