import React from 'react';
import ReactDOM from 'react-dom';
import GetData from '../js/getData';
import Loading from './icons/Loading';
import App from './App';
import config from '../appConfig';
// eslint-disable-next-line no-unused-vars
import html from '../index.html';

const container = document.getElementById('react-root');

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deployData: [],
      appGroups: {},
      showLoader: true,
      error: '',
      googleId: `${config.googleId}`
    };
  }

  componentDidMount() {
    const { googleId } = this.state;
    const getData = new GetData(googleId);
    getData.getDeployData((errorDeploy, json) => {
      // need to find out if errorDeploy is not null
      // need to find out if json is expected date

      if (errorDeploy !== null) {
        this.setState({
          error: errorDeploy,
          showLoader: false
        });
      } else {
        getData.getGroups((errorGroup, appGroups) => {
          this.setState({
            deployData: json,
            showLoader: false,
            appGroups
          });
        });
      }
    });
  }

  render() {
    const { showLoader, deployData, googleId, appGroups, error } = this.state;
    return (
      <div>
        {showLoader && <Loading />}
        {!showLoader && (
          <App
            deployData={deployData}
            googleId={googleId}
            appGroups={appGroups}
            error={error}
          />
        )}
      </div>
    );
  }
}

ReactDOM.render(<MainApp />, container);

export default MainApp;
