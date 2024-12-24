import { Component } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from './services/firebase/auth.service';

@Component({
    templateUrl: './cover-login.html',
    animations: [toggleAnimation],
})
export class CoverLoginComponent {
    public email = '';
    public password = '';
  
    store: any;
    currYear: number = new Date().getFullYear();
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
          const user = await this.authService.login(this.email, this.password);
          if (user) {
            //this.error = null;
            console.log('User logged in:', user);
    
            // Redirect to dashboard
            this.router.navigate(['/']);
          }
        } catch (error: any) {
          console.log('User error :', error);
          //this.error = error.message;
        }
      }
}