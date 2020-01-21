import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataStorageService} from '../storage/data-storage.service';
import {TokenStorageService} from '../jwt/token.service';
import {AuthService} from '../jwt/auth.service';
import {MustMatch} from '../validators/mustMatch';
import {IndiService} from '../information/service/indi.service';
import {IInfo} from '../information/interface/i-info';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

    id: number;

    loginForm: FormGroup;

    check = false;

    report: string;

    name: string;

    nationalId: string;

    info: IInfo;

    constructor(
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private route: ActivatedRoute,
        private router: Router,
        private dataStorageService: DataStorageService,
        private fb: FormBuilder,
        private infoService: IndiService,
    ) {
    }

    ngOnInit() {
        this.name = this.dataStorageService.getName();
        this.nationalId = this.dataStorageService.getNationalId();
        this.loginForm = this.fb.group({
                email: ['', [Validators.required, Validators.minLength(5)]],
                password: ['', [Validators.required, Validators.minLength(5)]],
                confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
            }, {
                validator: MustMatch('password', 'confirmPassword')
            }
        );
        this.id = +this.route.snapshot.paramMap.get('id');
        this.report = this.dataStorageService.getReportName();
    }

    checkBox() {
        this.check = !this.check;
    }

    get f() {
        return this.loginForm.controls;
    }

    // ------------------------logic after click next button ----------------------------------------------
    onSubmit() {
        this.saveInfo();
        const {value} = this.loginForm;
        if (this.loginForm.invalid) {
            console.log('fail');
            return;
        }

        this.authService.attemptAuth(value).subscribe(
            data => {
                console.log(data.accessToken);
                this.tokenStorage.saveId(data.id);
                this.tokenStorage.saveEmail(data.email);
                this.tokenStorage.saveUsername(data.name);
                this.tokenStorage.saveToken(data.accessToken);
                console.log(this.tokenStorage.getToken());
                this.router.navigate(['/banks/report']).then(r => console.log('success to navigate'));
            },
            error => {
                console.log(error);
            }
        );
    }

    // ------------------ save individual info to database--------------------------------------
    saveInfo() {
        this.info = new IInfo(this.dataStorageService.getName(), +
            this.dataStorageService.getNationalId(), +
            this.dataStorageService.getReportCode(), +
            this.id.toString());
        this.infoService.postIndi(this.info).subscribe(next => {
            console.log(this.info);
            console.log('success to store individual');
        }, error => {
            console.log('fail to store individual');
        });
    }
}
