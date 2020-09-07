"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getVendorPrefixedName = _interopRequireDefault(require('./getVendorPrefixedName'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule BrowserSupportCore
 */
var BrowserSupportCore = {
  /**
   * @return {bool} True if browser supports css animations.
   */
  hasCSSAnimations: function hasCSSAnimations() {
    return !!(0, _getVendorPrefixedName["default"])('animationName');
  },

  /**
   * @return {bool} True if browser supports css transforms.
   */
  hasCSSTransforms: function hasCSSTransforms() {
    return !!(0, _getVendorPrefixedName["default"])('transform');
  },

  /**
   * @return {bool} True if browser supports css 3d transforms.
   */
  hasCSS3DTransforms: function hasCSS3DTransforms() {
    return !!(0, _getVendorPrefixedName["default"])('perspective');
  },

  /**
   * @return {bool} True if browser supports css transitions.
   */
  hasCSSTransitions: function hasCSSTransitions() {
    return !!(0, _getVendorPrefixedName["default"])('transition');
  }
};
var _default = BrowserSupportCore;
exports["default"] = _default;