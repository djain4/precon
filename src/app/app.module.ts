import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { FlexComponent } from './components/flex/flex.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchComponent } from './components/search/search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRippleModule } from '@angular/material/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// Services
import { ApiService } from './services/api.service';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FlexComponent,
    SearchComponent,
    LeafletMapComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({echarts}),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatGridListModule,  
    MatRippleModule,
    MatCardModule,
    LeafletModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
