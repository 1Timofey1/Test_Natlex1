import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts.component';
import { SecondOneComponent } from './second-one/second-one.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    SecondOneComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'charts', component: ChartsComponent},
      {path: 'second-one', component: SecondOneComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
