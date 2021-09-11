import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

const Investments = lazy(() => import('../pages/investing/investments'))
const PackageConfirmation = lazy(() => import('../pages/investing/wiz_confirm'))
const PaymentScreen = lazy(() => import('../pages/investing/wiz_payment'))
const InvestmentDetails = lazy(() => import('../pages/investing/wiz_investment'))
const Packages = lazy(() => import('../pages/investing/packages'))
const Deposists = lazy(() => import('../pages/transactions/deposits'))
const Withdrawals = lazy(() => import('../pages/transactions/withdrawals'))
const Refferals = lazy(() => import('../pages/refferal/refferals'))
const Inbox = lazy(() => import('../pages/refferal/messages'))
const ProfileSetup = lazy(() => import('../pages/auth/profile-info'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/packages',
    component: Packages,
  },
  {
    path: '/investments',
    component: Investments,
  },
  {
    path: '/settings',
    component: ProfileSetup,
  },
  {
    path: '/refferals',
    component: Refferals,
  },
  {
    path: '/inbox',
    component: Inbox,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/deposits',
    component: Deposists,
  },
  {
    path: '/withdrawals',
    component: Withdrawals,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: '/invest/confirm',
    component: PackageConfirmation,
  },
  {
    path: '/invest/payment',
    component: PaymentScreen,
  },
  {
    path: '/invest/details',
    component: InvestmentDetails,
  },
]

export default routes
