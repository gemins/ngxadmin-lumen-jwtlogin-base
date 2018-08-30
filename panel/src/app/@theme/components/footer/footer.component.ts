import { Component } from '@angular/core';
import { SITE_CONF } from '../../../@core/core.constants';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Panel administrativo de <b><a [href]="siteConf.companyWebsite" target="_blank">{{siteConf.companyName}}</a></b> 2018</span>
    <!--<div class="socials">-->
      <!--<a href="#" target="_blank" class="ion ion-social-github"></a>-->
      <!--<a href="#" target="_blank" class="ion ion-social-facebook"></a>-->
      <!--<a href="#" target="_blank" class="ion ion-social-twitter"></a>-->
      <!--<a href="#" target="_blank" class="ion ion-social-linkedin"></a>-->
    <!--</div>-->
  `,
})
export class FooterComponent {
  siteConf:any=SITE_CONF;
}
