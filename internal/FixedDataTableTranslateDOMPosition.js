"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BrowserSupportCore = _interopRequireDefault(require('./BrowserSupportCore'));

var _translateDOMPositionXY = _interopRequireDefault(require('./translateDOMPositionXY'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableTranslateDOMPosition
 * @typechecks
 */
function FixedDataTableTranslateDOMPosition(
/*object*/
style,
/*number*/
x,
/*number*/
y) {
  var initialRender = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var isRTL = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (style.display === 'none') {
    return;
  }

  if (initialRender) {
    style.left = x + 'px';
    style.top = y + 'px';
  } else {
    if (_BrowserSupportCore["default"].hasCSSTransforms()) {
      x *= isRTL ? -1 : 1;
    }

    (0, _translateDOMPositionXY["default"])(style, x, y);
  }

  if (isRTL) {
    style.right = style.left;
    style.left = 'auto';
  }
}

var _default = FixedDataTableTranslateDOMPosition;
exports["default"] = _default;