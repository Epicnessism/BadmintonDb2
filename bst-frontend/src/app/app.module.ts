import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


//* Angular Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
// import {MatGridListModule} from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { LoginComponent } from './components/login/login.component';
import { BracketViewComponent, SetDetailsDiaglogComponent } from './components/tournament/bracket-view/bracket-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PreviousRouteDirective } from './directives/previous-route.directive';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EventViewComponent } from './components/tournament/event-view/event-view.component';
import { CreateViewComponent } from './components/tournament/create-view/create-view.component';
import { TournamentViewComponent, TournamentSignUpDialogComponent } from './components/tournament/tournament-view/tournament-view.component';
import { EventSeedViewComponent } from './components/tournament/event-seed-view/event-seed-view.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UpcomingViewComponent } from './components/tournament/upcoming-view/upcoming-view.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BracketViewComponent,
    PageNotFoundComponent,
    SetDetailsDiaglogComponent,
    NavBarComponent,
    PreviousRouteDirective,
    SearchResultsComponent,
    ProfileComponent,
    EventViewComponent,
    CreateViewComponent,
    TournamentViewComponent,
    TournamentSignUpDialogComponent,
    EventSeedViewComponent,
    SignUpComponent,
    UpcomingViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, //formsModule must come before reactiveFormsModule otherwise no ControlContainer Promise Error
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatRippleModule,
    MatStepperModule,
    MatRadioModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatBadgeModule,
    DragDropModule,
    FlexLayoutModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
