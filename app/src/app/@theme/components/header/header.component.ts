import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { ApiService } from '../../../@core';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [
    { title: 'Perfil', link: ['/pages/users/edit', {id: this.userService.user.id}] },
    { title: 'Desloguear', link: '/auth/logout' }
  ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private apiService: ApiService,
              private userService: UserService,
              private authService: NbAuthService,
              private analyticsService: AnalyticsService) {

  }

  ngOnInit() {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
