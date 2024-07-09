import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { ShowMoreComponent } from './components/show-more/show-more.component';

@NgModule({
  declarations: [ValidationMessagesComponent, ShowMoreComponent],
  imports: [
    CommonModule,
  ],
  exports: [ValidationMessagesComponent, ShowMoreComponent]
})
export class SharedModule { }
