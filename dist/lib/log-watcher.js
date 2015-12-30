'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogWatcher = undefined;

require('babel-polyfill');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _tail = require('tail');

var _tail2 = _interopRequireDefault(_tail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LogWatcher = exports.LogWatcher = function LogWatcher(opts) {
  //TODO: Tail File

  _classCallCheck(this, LogWatcher);
};