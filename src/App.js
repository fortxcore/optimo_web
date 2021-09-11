import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

const PaymentScreen = lazy(() => import('./pages/investing/wiz_payment'))
const ProtectedRoutes = lazy(() => import('./routes/protectedRoutes'))
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/auth/Login'))
const Banned = lazy(() => import('./pages/banned'))
const CreateAccount = lazy(() => import('./pages/auth/CreateAccount'))
const ProfileSetup = lazy(() => import('./pages/auth/profile-info'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const Refferal = lazy(() => import('./routes/refferal'))
function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <ProtectedRoutes path="/payment" children={PaymentScreen} />
          <ProtectedRoutes path="/profile-setup" children={ProfileSetup} />
          <ProtectedRoutes path="/app" children={Layout} />
          <Route path="/login" component={Login} />
          <Route path="/banned" component={Banned} />
          <Route path="/invest" component={Refferal} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Redirect exact from="/" to="/app" />
          {/* <Route path="/" exact component={Landing}/> */}
        </Switch>
      </Router>
    </>
  )
}

export default App
