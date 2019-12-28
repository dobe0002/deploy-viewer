import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  HashRouter as Router,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom';

import Builds from './Builds';
import Timeline from './Timeline';
import Error from './Error';
import { convertStringToDate } from '../js/getDates';
import FourOhFour from './FourOhFour';

export default class App extends React.Component {
  buildNav() {
    const { googleId } = this.props;
    const googleSheetURL = `https://docs.google.com/spreadsheets/d/${googleId}/`;
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <span className='navbar-brand'>AppDev RAS/C Deploy Status</span>

        <div className='navbar' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink
                exact
                activeClassName='active'
                className='nav-link'
                to='/deploys'
              >
                Deploys
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                activeClassName='active'
                className='nav-link'
                to='/timeline'
              >
                Timeline
              </NavLink>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href={googleSheetURL}
                target='_blank'
                rel='noreferrer noopener'
              >
                Google Sheet
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  render() {
    const basename = '';
    const { deployData, appGroups, error } = this.props;
    return (
      <Router basename={basename}>
        {this.buildNav()}
        <main>
          <Switch>
            {error !== '' && (
              <Route path='/' render={() => <Error error={error} />} />
            )}
            <Route
              path='/deploys//startDate/:startDate/endDate/:endDate'
              render={props => (
                <Builds
                  deployData={deployData}
                  appGroups={appGroups}
                  currentAppGroup={props.match.params.appGroup}
                  history={props.history}
                  startDate={convertStringToDate(props.match.params.startDate)}
                  endDate={convertStringToDate(props.match.params.endDate)}
                />
              )}
            />
            <Route
              path='/deploys/:appGroup/startDate/:startDate/endDate/:endDate'
              render={props => (
                <Builds
                  deployData={deployData}
                  appGroups={appGroups}
                  currentAppGroup={props.match.params.appGroup}
                  history={props.history}
                  startDate={convertStringToDate(props.match.params.startDate)}
                  endDate={convertStringToDate(props.match.params.endDate)}
                />
              )}
            />
            <Route
              path='/deploys/:appGroup?'
              render={props => (
                <Builds
                  deployData={deployData}
                  appGroups={appGroups}
                  currentAppGroup={props.match.params.appGroup}
                  history={props.history}
                />
              )}
            />
            <Route
              path='/timeline//startDate/:startDate/endDate/:endDate'
              render={props => (
                <Timeline
                  deployData={deployData}
                  appGroups={appGroups}
                  history={props.history}
                  startDate={convertStringToDate(props.match.params.startDate)}
                  endDate={convertStringToDate(props.match.params.endDate)}
                />
              )}
            />

            <Route
              path='/timeline/:appGroup/startDate/:startDate/endDate/:endDate'
              render={props => (
                <Timeline
                  deployData={deployData}
                  appGroups={appGroups}
                  history={props.history}
                  currentAppGroup={props.match.params.appGroup}
                  startDate={convertStringToDate(props.match.params.startDate)}
                  endDate={convertStringToDate(props.match.params.endDate)}
                />
              )}
            />
            <Route
              path='/timeline/:appGroup?'
              render={props => (
                <Timeline
                  deployData={deployData}
                  appGroups={appGroups}
                  history={props.history}
                  currentAppGroup={props.match.params.appGroup}
                />
              )}
            />
            <Route path='/' exact>
              <Redirect to='/deploys' />
            </Route>

            <Route path='/'>
              <FourOhFour />
            </Route>
          </Switch>
        </main>
      </Router>
    );
  }
}
App.propTypes = {
  deployData: PropTypes.arrayOf,
  appGroups: PropTypes.objectOf,
  googleId: PropTypes.string.isRequired,
  error: PropTypes.string
};
App.defaultProps = {
  deployData: [],
  appGroups: {},
  error: ''
};
