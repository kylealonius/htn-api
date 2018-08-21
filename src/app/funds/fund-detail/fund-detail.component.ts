import { Component, Input } from '@angular/core';
import { Fund } from '../fund';
import { FundService } from '../fund.service';

@Component({
  selector: 'fund-details',
  templateUrl: './fund-details.component.html',
  styleUrls: ['./fund-details.component.css']
})

export class FundDetailsComponent {
  @Input()
  fund: Fund;

  constructor (private fundService: FundService) {}

}