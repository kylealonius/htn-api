import { Component, Input } from '@angular/core';
import { Fund } from '../fund';
import { FundService } from '../fund.service';

@Component({
  selector: 'fund-detail',
  templateUrl: './fund-detail.component.html',
  styleUrls: ['./fund-detail.component.css']
})

export class FundDetailsComponent {
  @Input()
  fund: Fund;

  constructor (private fundService: FundService) {}

}