import axios from 'axios';
import each from 'lodash/each';
import sortBy from 'lodash/sortBy';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { format } from 'date-fns';

class GetSpreadsheetData {
  constructor(docId, sheetNum = 1) {
    this.docId = docId;
    this.sheetNum = sheetNum;
    this.deployData = {};
    this.appGroups = {};

    this.url = `https://spreadsheets.google.com/feeds/list/${this.docId}/${this.sheetNum}/public/full?alt=json`;
  }

  getDeployData(done) {
    axios
      .get(this.url)
      .then(response => {
        const formatError = GetSpreadsheetData.verifyFormat(response.data);
        if (formatError !== null) {
          return done(formatError);
        }
        const deployData = this.formatData(response.data); // this sets this.deployData
        this.formatAppGroups(deployData); // this sets this.appGroups
        return done(null, deployData);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('ERROR in getDeployData:', error);
        return done(
          'There was an issue retrieving information from the Google Sheet.'
        );
      });
  }

  getGroups(done) {
    if (!isEmpty(this.appGroups)) {
      return done(null, this.appGroups);
    }

    return this.getDeployData((errorGetDeployData, deployData) => {
      const appGroups = this.formatAppGroups(deployData);
      this.appGroups = appGroups;
      return done(errorGetDeployData, appGroups);
    });
  }

  formatAppGroups(deployData) {
    const appGroups = {};
    each(deployData, app => {
      const { appGroup } = app;
      const { appGroupTitle } = app;
      if (!appGroups[appGroup]) {
        appGroups[appGroup] = appGroupTitle;
      }
    });
    this.appGroups = appGroups;
    return appGroups;
  }

  static verifyFormat(rawGoogleJson) {
    if (
      rawGoogleJson.feed === undefined ||
      rawGoogleJson.feed.entry === undefined ||
      rawGoogleJson.feed.entry.length === 0
    ) {
      return 'No data was sent from the Google spreadsheet.';
    }
    const testEntry = rawGoogleJson.feed.entry[0];

    if (testEntry.gsx$app === undefined) {
      return 'Application title is not available.';
    }
    if (testEntry.gsx$appcode === undefined) {
      return 'Application code is not available.';
    }
    if (testEntry.gsx$groupcode === undefined) {
      return 'Application group code is not available.';
    }
    if (testEntry.gsx$appgroup === undefined) {
      return 'Application group is not available.';
    }
    if (testEntry.gsx$date === undefined) {
      return 'Event date is not available.';
    }
    if (testEntry.gsx$eventcode === undefined) {
      return 'Event code is not available.';
    }
    if (testEntry.gsx$event === undefined) {
      return 'Event description is not available.';
    }
    return null;
  }

  formatData(rawGoogleJson) {
    let deployData = {};
    each(rawGoogleJson.feed.entry, (entry, i) => {
      // note Google skips the first row - it assumes it is a header row
      const appCode = entry.gsx$appcode.$t;
      if (deployData[appCode] === undefined) {
        // Add new app into the deployData object:
        deployData[appCode] = {
          title: entry.gsx$app.$t,
          appCode,
          appGroup: entry.gsx$groupcode.$t,
          appGroupTitle: entry.gsx$appgroup.$t,
          status: []
        };
      }

      // Add status
      const date = entry.gsx$date.$t.match(/\d+/g);
      const year = parseInt(date[2], 10);
      const month = parseInt(date[0], 10) - 1;
      const day = parseInt(date[1], 10);
      const jsDate = new Date(year, month, day);

      deployData[appCode].status.push({
        row: i + 2,
        status: entry.gsx$eventcode.$t,
        statusDescription: entry.gsx$event.$t,
        dateString: format(jsDate, 'MM/dd/yyyy'),
        dateSort: parseInt(format(jsDate, 'yyyyMMdd'), 10),
        date: jsDate,
        note: entry.gsx$notes.$t
      });
    });
    // Sort each status
    each(deployData, app => {
      deployData[app.appCode].status = sortBy(
        app.status,
        event => event.dateString
      );
    });

    // convert back to array for easy sorting
    deployData = map(deployData, app => app);

    // Sort by application
    deployData = sortBy(deployData, app => app.title);

    this.deployData = deployData;
    return deployData;
  }
}

export default GetSpreadsheetData;
