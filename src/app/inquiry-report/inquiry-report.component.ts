import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../jwt/token.service';
import {DataStorageService} from '../storage/data-storage.service';

@Component({
    selector: 'app-report',
    templateUrl: './inquiry-report.component.html',
    styleUrls: ['./inquiry-report.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class InquiryReportComponent implements OnInit {

    id: number;
    report: string;
    token: string;
    check = false;

    constructor(
        private route: ActivatedRoute,
        private tokenStorageService: TokenStorageService,
        private dataStorageService: DataStorageService,
    ) {
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.report = this.dataStorageService.getReportName();
        this.checkToken();
    }

    checkToken() {
        if (this.tokenStorageService.getToken()) {
            this.token = 'Done';
        } else {
            this.token = 'Fail';
        }
    }

}
