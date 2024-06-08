import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordiongroup',
  templateUrl: './accordiongroup.component.html',
  styleUrl: './accordiongroup.component.scss',
})
export class AccordiongroupComponent {
  @Input() physicalCondition: string = '';
  @Input() description: string = '';
}
