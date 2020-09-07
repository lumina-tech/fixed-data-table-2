"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Scrollbar = _interopRequireDefault(require('./Scrollbar'));

var _roughHeights = _interopRequireDefault(require('./roughHeights'));

var _scrollbarsVisible = _interopRequireDefault(require('./scrollbarsVisible'));

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
 * @providesModule tableHeights
 */

/**
 * Compute the necessary heights for rendering parts of the table
 *
 * @param {{
 *   footerHeight: number,
 *   groupHeaderHeight: number,
 *   headerHeight: number,
 * }} elementHeights
 * @param {number|undefined} ownerHeight
 * @param {number} reservedHeight
 * @param {number} scrollContentHeight
 * @param {{
 *   availableHeight: number,
 *   scrollEnabledX: boolean,
 * }} scrollbarsVisible
 * @param {boolean} useMaxHeight
 * @return {{
 *   bodyHeight: number,
 *   bodyOffsetTop: number,
 *   componentHeight: number,
 *   contentHeight: number,
 *   footOffsetTop: number,
 *   scrollbarXOffsetTop: number,
 *   scrollbarYHeight: number,
 *   visibleRowsHeight: number,
 * }}
 */
function tableHeights(elementHeights, ownerHeight, reservedHeight, scrollContentHeight, scrollbarsVisible, useMaxHeight, scrollbarXHeight) {
  var availableHeight = scrollbarsVisible.availableHeight,
      scrollEnabledX = scrollbarsVisible.scrollEnabledX;
  var reservedWithScrollbar = reservedHeight;

  if (scrollEnabledX) {
    reservedWithScrollbar += scrollbarXHeight;
  } // If less content than space for rows (bodyHeight), then
  // we should shrink the space for rows to fit our row content (scrollContentHeight).


  var bodyHeight = Math.min(availableHeight, scrollContentHeight); // If using max height, component should only be sized to content.
  // Otherwise use all available height.

  var rowContainerHeight = useMaxHeight ? bodyHeight : availableHeight;
  var componentHeight = rowContainerHeight + reservedWithScrollbar; // If we have an owner height and it's less than the component height,
  // adjust visible height so we show footer and scrollbar position at the bottom of owner.

  var visibleRowsHeight = rowContainerHeight;

  if (ownerHeight < componentHeight) {
    visibleRowsHeight = ownerHeight - reservedWithScrollbar;
  } // If using max height, virtual row container is scrollContentHeight, otherwise
  // it is the larger of that or the available height.


  var virtualRowContainerHeight = useMaxHeight ? scrollContentHeight : Math.max(scrollContentHeight, availableHeight); // contentHeight is the virtual rows height and reserved height,
  // or ownerHeight if that's larger

  var contentHeight = virtualRowContainerHeight + reservedWithScrollbar;

  if (ownerHeight) {
    contentHeight = Math.max(ownerHeight, contentHeight);
  } // Determine component offsets


  var footerHeight = elementHeights.footerHeight,
      groupHeaderHeight = elementHeights.groupHeaderHeight,
      headerHeight = elementHeights.headerHeight;
  var bodyOffsetTop = groupHeaderHeight + headerHeight;
  var footOffsetTop = bodyOffsetTop + visibleRowsHeight;
  var scrollbarXOffsetTop = footOffsetTop + footerHeight;
  var scrollbarYHeight = Math.max(0, footOffsetTop - bodyOffsetTop);
  return {
    bodyHeight: bodyHeight,
    bodyOffsetTop: bodyOffsetTop,
    componentHeight: componentHeight,
    contentHeight: contentHeight,
    footOffsetTop: footOffsetTop,
    scrollbarXOffsetTop: scrollbarXOffsetTop,
    scrollbarYHeight: scrollbarYHeight,
    visibleRowsHeight: visibleRowsHeight
  };
}

var _default = (0, _shallowEqualSelector["default"])([function (state) {
  return state.elementHeights;
}, function (state) {
  return state.tableSize.ownerHeight;
}, function (state) {
  return (0, _roughHeights["default"])(state).reservedHeight;
}, function (state) {
  return state.scrollContentHeight;
}, _scrollbarsVisible["default"], function (state) {
  return state.tableSize.useMaxHeight;
}, function (state) {
  return state.scrollbarXHeight;
}], tableHeights);

exports["default"] = _default;