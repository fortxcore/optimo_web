/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/investments',
    icon: 'FormsIcon',
    name: 'Investments',
  },
  {
    path: '/app/packages',
    icon: 'CardsIcon',
    name: 'Packages',
  },
  {
    icon: 'TablesIcon',
    name: 'Transactions',
    routes: [
      // submenu
      {
        path: '/app/deposits',
        name: 'Deposits',
      },
      {
        path: '/app/withdrawals',
        name: 'Withdrawals',
      },
    ],
  },
  {
    path: '/app/refferals',
    icon: 'OutlinePersonIcon',
    name: 'Refferals',
  },
  {
    path: '/app/inbox',
    icon: 'ChatIcon',
    name: 'Inbox',
  },
  {
    path: '/app/settings',
    icon: 'ButtonsIcon',
    name: 'Settings',
  },
  
]

export default routes
