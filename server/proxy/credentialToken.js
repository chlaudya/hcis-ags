const axios = require('axios');
const config = require('config');
const fs = require('fs');
const date = require('date-and-time');
const baseProxy = require('./baseProxy');

const TOKEN_FILE = './config/token.json';

module.exports = function () {
  let $this = this;

  this.writeFile = async function (message) {
    if (!fs.existsSync(TOKEN_FILE)) {
      await fs.appendFile(TOKEN_FILE, message, function (err) {
        if (err) throw err;
        console.log('file token created ' + TOKEN_FILE);
        console.log(JSON.stringify(message));
      });
    } else {
      await fs.writeFile(TOKEN_FILE, message, function (err) {
        if (err) throw err;
        console.log('write token success' + JSON.stringify(message));
      });
    }
  };
  this.request = async function () {
    const oAuthConfig = config.get('oAuthApi');
    let paramRequest = {
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(oAuthConfig.ApiKeyName + ':' + oAuthConfig.ApiKeyValue).toString('base64'),
        'Content-Type': 'text/plain'
      }
    };
    return axios
      .post(oAuthConfig.Url + '/client_credentials/token?grant_type=client_credentials', {
        headers: paramRequest.headers
      })
      .then(async (response) => {
        let data = response.data;
        let hour = data.expires_in / 3600;
        data.expires_in = date.addHours(new Date(), hour);
        data.expires_in = date.format(data.expires_in, 'YYYY-MM-DD HH:mm:ss');
        let token = JSON.stringify(data);
        await $this.writeFile(token);
        return data;
      })
      .catch((error) => {
        console.error(`error at request token ${error}`);
        console.error(`error status ${error.response.status}`);
        let { fault } = error.response.data;
        if (fault) {
          console.error(fault.faultstring);
        }

        baseProxy.errorHandling(error);
      });
  };
  this.setCredential = async function () {
    try {
      let loadData = await fs.readFileSync(TOKEN_FILE, {
        encoding: 'utf8',
        flag: 'r'
      });
      let data = JSON.parse(loadData);

      let expired = new Date(data.expires_in);
      if (date.subtract(expired, new Date()).toHours() < 1) {
        console.log('request new token');
        return await $this.request();
      } else {
        return data;
      }
    } catch (error) {
      console.error(error);
      return await $this.request();
    }
  };
};
