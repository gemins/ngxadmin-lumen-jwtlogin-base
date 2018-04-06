import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: any =
    [
      {
        title: 'Escritorio',
        icon: 'nb-home',
        link: '/pages/dashboard',
        home: true
      },
      {
        title: 'Usuarios',
        icon: 'nb-person',
        link: '/pages/users',
        children: [
          {
            title: 'Listado',
            link: '/pages/users/list',
          },
          {
            title: 'Nuevo',
            link: '/pages/users/create',
          }
        ]
      }
    ];