import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FundDetailComponent } from './funds/fund-detail/fund-detail.component';
import { FundListComponent } from './funds/fund-list/fund-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FundDetailComponent,
    FundListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
