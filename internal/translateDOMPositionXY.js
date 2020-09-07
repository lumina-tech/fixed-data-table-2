/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule translateDOMPositionXY
 * @typechecks
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BrowserSupportCore = _interopRequireDefault(require('./BrowserSupportCore'));

var _getVendorPrefixedName = _interopRequireDefault(require('./getVendorPrefixedName'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TRANSFORM = (0, _getVendorPrefixedName["default"])('transform');
var BACKFACE_VISIBILITY = (0, _getVendorPrefixedName["default"])('backfaceVisibility');

var translateDOMPositionXY = function () {
  if (_BrowserSupportCore["default"].hasCSSTransforms()) {
    var ua = global.window ? global.window.navigator.userAgent : 'UNKNOWN';
    var isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua); // It appears that Safari messes up the composition order
    // of GPU-accelerated layers
    // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
    // Use 2D translation instead.

    if (!isSafari && _BrowserSupportCore["default"].hasCSS3DTransforms()) {
      return function (
      /*object*/
      style,
      /*number*/
      x,
      /*number*/
      y) {
        style[TRANSFORM] = 'translate3d(' + x + 'px,' + y + 'px,0)';
      };
    } else {
      return function (
      /*object*/
      style,
      /*number*/
      x,
      /*number*/
      y) {
        style[TRANSFORM] = 'translate(' + x + 'px,' + y + 'px)';
      };
    }
  } else {
    return function (
    /*object*/
    style,
    /*number*/
    x,
    /*number*/
    y) {
      style.left = x + 'px';
      style.top = y + 'px';
    };
  }
}();

var _default = translateDOMPositionXY;
exports["default"] = _default;