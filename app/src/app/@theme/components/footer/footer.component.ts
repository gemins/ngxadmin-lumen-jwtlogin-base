import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Admin <b><a href="http://www.incubit.com.ar" target="_blank">Base</a></b> 2018</span>
    <!--<div class="socials">-->
      <!--<a href="#" target="_blank" class="ion ion-social-github"></a>-->
      <!--<a href="#" target="_blank" class="ion ion-social-facebook"></a>-->
      <!--<a href="#" target="_blank" class="ion ion-social-twitter"></a>-->
      <!--<a href="#" target="_blank" class="ion ion-social-linkedin"></a>-->
    <!--</div>-->
  `,
})
export class FooterComponent {
}
