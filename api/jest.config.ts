require('dotenv').config({
  path: require('path').resolve(__dirname, `./.env.${process.env.NODE_ENV}`),
});
require('dotenv').config();

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
