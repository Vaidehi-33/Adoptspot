import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss',
})
export class DescriptionComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() descriptionStyle: string = '';
  @Input() labelStyle: string = '';
  @Input() containerStyle: string = '';
}
