import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'MENUITEMS.USERMANAGEMENT.TEXT',
    icon: 'las la-tachometer-alt',
    isCollapsed: true,
    subItems: [
      {
        id: 3,
        label: 'MENUITEMS.USERMANAGEMENT.LIST.USERLIST',
        link: '/user-management/user-list',
        parentId: 2
      },
      {
        id: 4,
        label: 'MENUITEMS.USERMANAGEMENT.LIST.ROLELIST',
        link: '/user-management/role-list',
        parentId: 2
      }
    ]
  }
];
