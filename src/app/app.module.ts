import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KeypadComponent } from './keypad/keypad.component';
import { HighlightDirective } from './highlight.directive';
import { ActiveDirective } from './active.directive';
import { DisplayComponent } from './display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    KeypadComponent,
    HighlightDirective,
    ActiveDirective,
    DisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
