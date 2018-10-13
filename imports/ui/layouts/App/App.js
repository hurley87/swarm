/* eslint-disable jsx-a11y/no-href */

import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Navigation from '../../components/Navigation/Navigation';
import Authenticated from '../../components/Authenticated/Authenticated';
import Public from '../../components/Public/Public';
import Index from '../../pages/Index/Index';
import Documents from '../../pages/Documents/Documents';
import Chats from '../../pages/Chats/Chats';
import Votes from '../../pages/Votes/Votes';
import NewDocument from '../../pages/NewDocument/NewDocument';
import ViewDocument from '../../pages/ViewDocument/ViewDocument';
import EditDocument from '../../pages/EditDocument/EditDocument';
import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';
import Logout from '../../pages/Logout/Logout';
import VerifyEmail from '../../pages/VerifyEmail/VerifyEmail';
import RecoverPassword from '../../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Footer from '../../components/Footer/Footer';
import Terms from '../../pages/Terms/Terms';
import Privacy from '../../pages/Privacy/Privacy';
import ExamplePage from '../../pages/ExamplePage/ExamplePage';
import VerifyEmailAlert from '../../components/VerifyEmailAlert/VerifyEmailAlert';
import getUserName from '../../../modules/get-user-name';
import Applois from '../../pages/Applois/Applois';
import Nextopias from '../../pages/Nextopias/Nextopias';
import Q4Launchs from '../../pages/Q4Launchs/Q4Launchs';
import Reitanos from '../../pages/Reitanos/Reitanos';
import Reitano_Responses from '../../pages/Reitano_Responses/Reitano_Responses';
import Nextopia_Responses from '../../pages/Nextopia_Responses/Nextopia_Responses';
import Q4Launch_Responses from '../../pages/Q4Launch_Responses/Q4Launch_Responses';
import Apploi_Responses from '../../pages/Apploi_Responses/Apploi_Responses';
import All from '../../pages/All/All';
import LeaderboardsPage from '../../pages/LeaderboardsPage/LeaderboardsPage';
import Responses from '../../pages/Responses/Responses';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { afterLoginPath: null };
    autoBind(this);
  }

  setAfterLoginPath(afterLoginPath) {
    this.setState({ afterLoginPath });
  }

  render() {
    const { props, state, setAfterLoginPath } = this;
    return (
      <Router>
        {!props.loading ? (
          <div className="App">
            <Grid>
              <Switch>
                <Route exact name="index" path="/" component={Index} />
                <Authenticated exact path="/documents" component={Documents} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/chats" component={Chats} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/apploi" component={Applois} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/nextopia" component={Nextopias} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/q4launch" component={Q4Launchs} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/reitano" component={Reitanos} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/reitano_responses" component={Reitano_Responses} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/nextopia_responses" component={Nextopia_Responses} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/apploi_responses" component={Apploi_Responses} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/q4launch_responses" component={Q4Launch_Responses} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/all" component={All} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/votes" component={Votes} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/documents/new" component={NewDocument} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/documents/:_id" component={ViewDocument} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/documents/:_id/edit" component={EditDocument} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/profile" component={Profile} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/leaderboard" component={LeaderboardsPage} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/responses" component={Responses} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Public path="/signup" component={Signup} {...props} {...state} />
                <Public path="/login" component={Login} {...props} {...state} />
                <Route path="/logout" render={routeProps => <Logout {...routeProps} setAfterLoginPath={setAfterLoginPath} />} {...props} {...state} />
                <Route name="verify-email" path="/verify-email/:token" component={VerifyEmail} />
                <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
                <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
                <Route name="terms" path="/terms" component={Terms} />
                <Route name="privacy" path="/privacy" component={Privacy} />
                <Route name="examplePage" path="/example-page" component={ExamplePage} />
                <Route component={NotFound} />
              </Switch>
            </Grid>
          </div>
        ) : ''}
      </Router>
    );
  }
}

App.defaultProps = {
  userId: '',
  emailAddress: '',
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  emailAddress: PropTypes.string,
  emailVerified: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
    userId,
    emailAddress,
    emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
  };
})(App);