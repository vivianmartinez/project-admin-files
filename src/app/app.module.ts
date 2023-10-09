import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ManagementFilesComponent } from './components/management-files/management-files.component';
import { DetailFileComponent } from './components/detail-file/detail-file.component';

@NgModule({
  declarations: [
    AppComponent,
    ManagementFilesComponent,
    DetailFileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }