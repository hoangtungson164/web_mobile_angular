import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../jwt/token.service';
import {DataStorageService} from '../storage/data-storage.service';
import {IInfo} from '../information/interface/i-info';
import {IndiService} from '../information/service/indi.service';

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
    info: IInfo;


    constructor(
        private route: ActivatedRoute,
        private tokenStorageService: TokenStorageService,
        private dataStorageService: DataStorageService,
        private infoService: IndiService,
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

    checkToSubmit() {
        return this.check && this.token === 'Done';
    }

    onSubmit() {
        this.saveInfo();
    }

    // ------------------ save individual info to database--------------------------------------
    saveInfo() {
        this.info = new IInfo(
            this.dataStorageService.getName(),
            this.dataStorageService.getNationalId());
        console.log(this.info, this.dataStorageService.getInstitution());
        this.infoService.postIndi(this.info).subscribe(next => {
            console.log(this.info);
            console.log('success to store individual');
            alert('success to send the report');
        }, error => {
            console.log('fail to store individual');
        });
    }
}
