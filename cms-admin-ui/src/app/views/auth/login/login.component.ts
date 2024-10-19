import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AdminApiAuthApiClient, AuthenticatedResult, LoginRequest } from '../../../api/admin-api.service.generated';
import { AlertService } from '../../../shared/services/alert.service';
import { UrlConstants } from 'src/app/shared/constants/url.constants';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  loading = false;
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authApiClient: AdminApiAuthApiClient,
    private alertService: AlertService,
    private tokenSerivce: TokenStorageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  login() {
    this.loading = true;

    var request: LoginRequest = new LoginRequest({
      userName: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value,
    });

    this.authApiClient
      .login(request)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: AuthenticatedResult) => {
          //Save token and refresh token to localstorage
          this.tokenSerivce.saveToken(res.token);
          this.tokenSerivce.saveRefreshToken(res.refreshToken);
          this.tokenSerivce.saveUser(res);
          //Redirect to dashboard
          this.router.navigate([UrlConstants.HOME]);
        },
        error: (error: any) => {
          console.log(error);
          this.alertService.showError('Đăng nhập không đúng.');
          this.loading = false;

        },
      });
  }
}