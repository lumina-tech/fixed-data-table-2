"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ExecutionEnvironment = _interopRequireDefault(require('./ExecutionEnvironment'));

var _camelize = _interopRequireDefault(require('./camelize'));

var _invariant = _interopRequireDefault(require('./invariant'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getVendorPrefixedName
 * @typechecks
 */
var memoized = {};
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
var prefixRegex = new RegExp('^(' + prefixes.join('|') + ')');
var testStyle = _ExecutionEnvironment["default"].canUseDOM ? document.createElement('div').style : {};

function getWithPrefix(name) {
  for (var i = 0; i < prefixes.length; i++) {
    var prefixedName = prefixes[i] + name;

    if (prefixedName in testStyle) {
      return prefixedName;
    }
  }

  return null;
}
/**
 * @param {string} property Name of a css property to check for.
 * @return {?string} property name supported in the browser, or null if not
 * supported.
 */


function getVendorPrefixedName(property) {
  var name = (0, _camelize["default"])(property);

  if (memoized[name] === undefined) {
    var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    if (prefixRegex.test(capitalizedName)) {
      (0, _invariant["default"])(false, 'getVendorPrefixedName must only be called with unprefixed' + 'CSS property names. It was called with %s', property);
    }

    memoized[name] = name in testStyle ? name : getWithPrefix(capitalizedName);
  }

  return memoized[name];
}

var _default = getVendorPrefixedName;
exports["default"] = _default;