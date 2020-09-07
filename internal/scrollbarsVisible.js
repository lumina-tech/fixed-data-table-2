"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _roughHeights = _interopRequireWildcard(require('./roughHeights'));

var _shallowEqualSelector = _interopRequireDefault(require('./shallowEqualSelector'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule scrollbarsVisible
 */

/**
 * State regarding which scrollbars will be shown.
 * Also includes the actual availableHeight which depends on the scrollbars.
 *
 * @param {{
 *   minAvailableHeight: number,
 *   maxAvailableHeight: number,
 *   scrollStateX: ScrollbarState,
 * }} roughHeights
 * @param {number} scrollContentHeight,
 * @param {{
 *   overflowY: string,
 *   showScrollbarY: boolean,
 * }} scrollFlags
 * @return {{
 *   availableHeight: number,
 *   scrollEnabledX: boolean,
 *   scrollEnabledY: boolean,
 * }}
 */
function scrollbarsVisible(roughHeights, scrollContentHeight, scrollFlags) {
  var overflowY = scrollFlags.overflowY,
      showScrollbarY = scrollFlags.showScrollbarY;
  var allowScrollbarY = overflowY !== 'hidden' && showScrollbarY !== false;
  var minAvailableHeight = roughHeights.minAvailableHeight,
      maxAvailableHeight = roughHeights.maxAvailableHeight,
      scrollStateX = roughHeights.scrollStateX;
  var scrollEnabledY = false;
  var scrollEnabledX = false;

  if (scrollStateX === _roughHeights.ScrollbarState.VISIBLE) {
    scrollEnabledX = true;
  }

  if (allowScrollbarY && scrollContentHeight > maxAvailableHeight) {
    scrollEnabledY = true;
  } // Handle case where vertical scrollbar makes horizontal scrollbar necessary


  if (scrollEnabledY && scrollStateX === _roughHeights.ScrollbarState.JOINT_SCROLLBARS) {
    scrollEnabledX = true;
  }

  var availableHeight = maxAvailableHeight;

  if (scrollEnabledX) {
    availableHeight = minAvailableHeight;
  }

  return {
    availableHeight: availableHeight,
    scrollEnabledX: scrollEnabledX,
    scrollEnabledY: scrollEnabledY
  };
}

var _default = (0, _shallowEqualSelector["default"])([_roughHeights["default"], function (state) {
  return state.scrollContentHeight;
}, function (state) {
  return state.scrollFlags;
}], scrollbarsVisible);

exports["default"] = _default;