import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataStorageService} from '../../storage/data-storage.service';
import {TokenStorageService} from '../../jwt/token.service';
import {AuthService} from '../../jwt/auth.service';

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

    constructor(
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private route: ActivatedRoute,
        private router: Router,
        private dataStorageService: DataStorageService,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
                username: ['', [Validators.required, Validators.minLength(2)]],
                password: ['', [Validators.required, Validators.minLength(2)]],
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
        const {value} = this.loginForm;
        if (this.loginForm.invalid) {
            console.log('fail');
            return;
        }

        this.authService.attemptAuth(value).subscribe(
            data => {
                this.tokenStorage.saveToken(data.token);
                console.log(this.tokenStorage.getToken());
                this.router.navigate(['/banks', this.id, 'inquiryReport']).then(r => console.log('success to navigate'));
            },
            error => {
                console.log(error);
            }
        );
    }
}
