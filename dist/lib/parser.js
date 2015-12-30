//(.*) - (.*) \[(.*)?\] "(.*)" (.*) (.*) "(.*)" "(.*)"

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('babel-polyfill');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var formatRegex = /\$\{\{(\w*)\}\}/gi;

var Parser = (function () {
    function Parser(opts) {
        _classCallCheck(this, Parser);

        this.opts = opts;
        this.matchMap = [];
        this.buildRegex(this.opts.logFormat);
    }

    _createClass(Parser, [{
        key: 'buildRegex',
        value: function buildRegex(logFormat) {
            if (typeof logFormat !== 'string') throw new Error('Log Format must be a string');

            var match = undefined;
            while (match = formatRegex.exec(logFormat)) {
                //jshint ignore:line
                this.matchMap.push(match[1]);
            }
            var directiveRegex = logFormat.replace(formatRegex, '__placeholder__').replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&').replace(/__placeholder__/g, '(.*)');

            this.directive = new RegExp(directiveRegex);
        }
    }, {
        key: 'parse',
        value: function parse(line) {
            if (line instanceof Buffer) line = line.toString();
            var newStat = {};

            var i = 0;
            var match = this.directive.exec(line);
            if (!match) {
                return;
            }

            this.matchMap.forEach(function (item) {
                newStat[item] = match[++i];
            });

            return newStat;
        }
    }]);

    return Parser;
})();

exports.default = Parser;