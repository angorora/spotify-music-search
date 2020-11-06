const fs = require('fs');
const yargs = require('yargs/yargs');

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = yargs.environment;
const isProd = environment === 'prod';

const targetPath = `./src/environments/environment.prod.ts`;
const envConfigFile = `
export const environment = {
  production: true,
  baseURL: "${process.env.BASE_URL}",
  clientId: "${process.env.CLIENT_ID}",
  clientSecret: "${process.env.CLIENT_SECRET}" 
};
`;
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
