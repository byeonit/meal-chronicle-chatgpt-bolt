import { Component } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from './services/firebase/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconModule } from '../shared/icon/icon.module';

@Component({
 standalone: true,
 imports: [
  CommonModule,
  FormsModule,
  IconModule
],  
  templateUrl: './boxed-signin.html',
  animations: [toggleAnimation],
})
export class BoxedSigninComponent {
  store: any;
  public email = '';
  public password = '';
  error: string | null = null;

  constructor(
    public translate: TranslateService,
    public storeData: Store<any>,
    public router: Router,
    private appSetting: AppService,
    private authService: AuthService,
  ) {
    this.initStore();
  }

  async initStore() {
    this.storeData
      .select((d) => d.index)
      .subscribe((d) => {
        this.store = d;
      });
  }

  changeLanguage(item: any) {
    this.translate.use(item.code);
    this.appSetting.toggleLanguage(item);
    if (this.store.locale?.toLowerCase() === 'ae') {
      this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
    } else {
      this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
    }
    window.location.reload();
  }

  async login() {
    try {
      console.log("*************************************");
      console.log("email : " + this.email);
      console.log("password : " + this.password);
      console.log("*************************************");

      const user = await this.authService.login(this.email, this.password);
      if (user) {
        this.error = null;
        console.log('User logged in:', user);

        // Redirect to dashboard
        this.router.navigate(['/']);
      }
    } catch (error: any) {
      console.log('User error :', error);
      this.error = error.message;
    }
  }
}
