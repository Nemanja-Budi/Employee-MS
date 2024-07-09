import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.css']
})
export class ShowMoreComponent {

  @Input() showText: string = '';
  @Input() showTextLength: number = 0;

  isShowen: boolean = false;
  
  onChangeShow(): void {
    this.isShowen = !this.isShowen;
  }

}
