import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexComponent } from './components/flex/flex.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SearchComponent } from './components/search/search.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [AppComponent, routingComponents, FlexComponent, SearchComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FlexLayoutModule, MatButtonModule, MatInputModule, BrowserAnimationsModule, MatFormFieldModule, MatRippleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
