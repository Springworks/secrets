const core = require('@actions/core');
const SecretsManager = require('aws-sdk').SecretsManager;
const { writeFileSync } = require('fs');

let secret;

try {
  const secret_name = core.getInput('secret-name');
  const client = new SecretsManager({ apiVersion: '2017-10-17' });

  client.getSecretValue({ SecretId: secret_name }, function(err, data) {
    if (err) {
      throw err;
    }

    if (data && data.SecretString && typeof data.SecretString === 'string') {
      secret = JSON.parse(data.SecretString);
      Object.keys(secret).forEach(key => {
        writeFileSync(`./SECRET_${key}.txt`, secret[key]);
      });
    } else {
      throw new Error(`No secret found in AWS Secret Manager with name ${secret_name}`);
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
