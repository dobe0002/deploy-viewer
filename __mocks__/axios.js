/* eslint-disable prefer-promise-reject-errors */

let googleDeployData = [];
let error = '';
let calls = [];

module.exports = {
  setDeployData(data) {
    googleDeployData = data;
  },
  setError(data) {
    error = data;
  },
  resetCalls() {
    calls = [];
  },
  getCalls() {
    return calls;
  },

  get: jest.fn(endpoint => {
    calls.push(endpoint);
    switch (true) {
      case /list/.test(endpoint):
        if (error !== '') {
          return Promise.reject(new Error(error));
        }
        return Promise.resolve({ data: googleDeployData });
      default:
        if (error !== '') {
          return error;
        }
        return Promise.resolve({});
    }
  })
};
