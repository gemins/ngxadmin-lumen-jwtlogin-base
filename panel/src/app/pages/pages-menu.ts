import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Escritorio',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: false,
  },
  {
    title: 'Miscellaneous',
    icon: 'nb-shuffle',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
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