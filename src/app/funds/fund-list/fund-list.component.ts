import { Component, OnInit } from '@angular/core';
import { Fund } from '../fund';
import { FundService } from '../fund.service';
import { FundDetailComponent } from '../fund-detail/fund-detail.component';

@Component({
  selector: 'fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.css'],
  providers: [FundService]
})

export class FundListComponent implements OnInit {

  funds: Fund[]
  selectedFund: Fund

  constructor(private fundService: FundService) { }

  ngOnInit() {
     this.fundService
      .getFunds()
      .then((funds: Fund[]) => {
        this.funds = funds.map((fund) => {}
          return fund;
        });
      });
  }

  private getIndexOfFund = (fundId: String) => {
    return this.funds.findIndex((fund) => {
      return fund._id === fundId;
    });
  }

  selectFund(fund: Fund) {
    this.selectedFund = fund
  }

  addFund = (fund: Fund) => {
    this.funds.push(fund);
    this.selectFund(fund);
    return this.funds;
  }

}