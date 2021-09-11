import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
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
