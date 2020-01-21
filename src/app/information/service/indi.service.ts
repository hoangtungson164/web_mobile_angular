import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IBankConsensus} from '../../bank-consensus/interface/i-bank-consensus';
import {IInfo} from '../interface/i-info';

const URL = environment.URL;

@Injectable({
    providedIn: 'root'
})
export class IndiService {

    private apiURL = URL + '/indi';

    constructor(private httpClient: HttpClient) {
    }

    postIndi(indiInfo: IInfo): Observable<IInfo> {
        return this.httpClient.post<IInfo>(this.apiURL, indiInfo);
    }

}
