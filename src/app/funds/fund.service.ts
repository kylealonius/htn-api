import { Injectable } from '@angular/core';
import { Fund } from './fund';
import { Http, Response } from '@angular/http';

@Injectable()
export class FundService {
    private fundsUrl = '/api/funds';

    constructor (private http: Http) {}

    // get("/api/funds")
    getFunds(): Promise<void | Fund[]> {
      return this.http.get(this.fundsUrl)
                 .toPromise()
                 .then(response => response.json() as Fund[])
                 .catch(this.handleError);
    }

    // post("/api/funds")
    createFund(newFund: Fund): Promise<void | Fund> {
      return this.http.post(this.fundsUrl, newFund)
                 .toPromise()
                 .then(response => response.json() as Fund)
                 .catch(this.handleError);
    }

    // get("/api/funds/:id") endpoint not used by Angular app

    // delete("/api/funds/:id")
    deleteFund(delFundId: String): Promise<void | String> {
      return this.http.delete(this.fundsUrl + '/' + delFundId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/funds/:id")
    updateFund(putFund: Fund): Promise<void | Fund> {
      var putUrl = this.fundsUrl + '/' + putFund._id;
      return this.http.put(putUrl, putFund)
                 .toPromise()
                 .then(response => response.json() as Fund)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}