import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TabViewModule, TableModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
