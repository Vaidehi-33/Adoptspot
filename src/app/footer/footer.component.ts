import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() isProfilePage:boolean =false;
  email:string="Email: buddiesbyte01@gmail.com";
}
