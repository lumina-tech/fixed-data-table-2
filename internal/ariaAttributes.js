"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _shallowEqualSelector = _interopRequireDefault(require('./shallowEqualSelector'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ariaAttributes
 */

/**
 * Calculate the aria attributes for the rows and the grid.
 *
 * @param {number} rowsCount
 * @param {boolean} useGroupHeader
 * @param {boolean} useFooter
 * @return {{
 *   ariaGroupHeaderIndex: number,
 *   ariaHeaderIndex: number,
 *   ariaFooterIndex: number,
 *   ariaRowCount: number,
 *   ariaRowIndexOffset: number
 * }}
 */
function calculateAriaAttributes(rowsCount, useGroupHeader, useFooter) {
  // first we calculate the default attribute values (without assuming group header or footer exists)
  var ariaGroupHeaderIndex = 1;
  var ariaHeaderIndex = 1;
  var ariaFooterIndex = rowsCount + 2;
  var ariaRowCount = rowsCount + 1; // offset to add to aria-rowindex (note that aria-rowindex is 1-indexed based, and since
  // we also need to add 1 for the header, the base offset will be 2)

  var ariaRowIndexOffset = 2; // if group header exists, then increase the indices and offsets by 1

  if (useGroupHeader) {
    ariaHeaderIndex++;
    ariaRowCount++;
    ariaFooterIndex++;
    ariaRowIndexOffset++;
  } // if footer exists, then row count increases by 1


  if (useFooter) {
    ariaRowCount++;
  }

  return {
    ariaGroupHeaderIndex: ariaGroupHeaderIndex,
    ariaHeaderIndex: ariaHeaderIndex,
    ariaFooterIndex: ariaFooterIndex,
    ariaRowCount: ariaRowCount,
    ariaRowIndexOffset: ariaRowIndexOffset
  };
}

var _default = (0, _shallowEqualSelector["default"])([function (state) {
  return state.rowsCount;
}, function (state) {
  return state.groupHeaderHeight > 0;
}, function (state) {
  return state.footerHeight > 0;
}], calculateAriaAttributes);

exports["default"] = _default;