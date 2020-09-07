"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ScrollbarState = void 0;

var _widthHelper = require('./widthHelper');

var _Scrollbar = _interopRequireDefault(require('./Scrollbar'));

var _clamp = _interopRequireDefault(require('./clamp'));

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
 * @providesModule roughHeights
 */
var BORDER_HEIGHT = 1;
var MIN_BUFFER_ROWS = 3;
var MAX_BUFFER_ROWS = 6;
var ScrollbarState = {
  HIDDEN: 'hidden',
  JOINT_SCROLLBARS: 'JOINT_SCROLLBARS',
  VISIBLE: 'visible'
};
/**
 * Calculate the available height for the viewport.
 * Since we aren't 100% sure of whether scrollbars are visible
 * at this point, we compute a max & min viewport height.
 *
 * maxAvailableHeight is the largest it could be, while
 * minAvailableHeight is the smallest.
 * We also compute how large it is based on
 * the current scrollContentHeight in scrollbarsVisible.
 *
 * bufferRowCount is the number of rows to buffer both ahead and behind the viewport.
 * In total we will buffer twice this number of rows (half ahead, and half behind).
 *
 * reservedHeight is the height reserved for headers and footers.
 *
 * scrollStateX is the state of the horizontal scrollbar.
 * HIDDEN & VISIBLE are self explanatory, but
 * JOINT_SCROLLBARS mean the horizontal scroll will be shown if and
 * only if the vertical scrollbar is shown.
 *
 * @param {!Array.<{
 *   width: number,
 * }>} columnProps
 * @param {{
 *   cellGroupWrapperHeight: number,
 *   footerHeight: number,
 *   groupHeaderHeight: number,
 *   headerHeight: number,
 * }} elementHeights
 * @param {{
 *   bufferRowCount: ?number,
 *   rowHeight: number,
 *   subRowHeight: number,
 * }} rowSettings
 * @param {{
 *   overflowX: string,
 *   showScrollbarX: boolean,
 * }} scrollFlags
 * @param {{
 *   height: ?number,
 *   maxHeight: ?number,
 *   useMaxHeight: boolean,
 *   width: number,
 * }} tableSize
 * @return {{
 *   bufferRowsCount: number,
 *   minAvailableHeight: number,
 *   maxAvailableHeight: number,
 *   reservedHeight: number,
 *   scrollStateX: ScrollbarState,
 * }}
 */

exports.ScrollbarState = ScrollbarState;

function roughHeights(columnProps, elementHeights, rowSettings, scrollFlags, tableSize, scrollbarXHeight, scrollbarYWidth) {
  var cellGroupWrapperHeight = elementHeights.cellGroupWrapperHeight,
      footerHeight = elementHeights.footerHeight,
      headerHeight = elementHeights.headerHeight,
      groupHeaderHeight = elementHeights.groupHeaderHeight; // we don't need border height to be added to the table if we are using cellGroupWrapperHeight

  var borderHeight = cellGroupWrapperHeight ? 0 : 2 * BORDER_HEIGHT;
  var reservedHeight = footerHeight + headerHeight + groupHeaderHeight + borderHeight;
  var height = tableSize.height,
      maxHeight = tableSize.maxHeight,
      useMaxHeight = tableSize.useMaxHeight,
      width = tableSize.width;
  var maxComponentHeight = Math.round(useMaxHeight ? maxHeight : height);
  var roughAvailableHeight = maxComponentHeight - reservedHeight;
  var scrollStateX = getScrollStateX(columnProps, scrollFlags, width, scrollbarYWidth);
  /*
   * Early estimates of how much height we have to show rows.
   * We won't know which one is real until we know about horizontal scrollbar which
   * requires knowing about vertical scrollbar as well and that
   * requires scrollContentHeight which
   * requires us to have handled scrollTo / scrollToRow...
   */

  var minAvailableHeight = roughAvailableHeight;
  var maxAvailableHeight = roughAvailableHeight;

  switch (scrollStateX) {
    case ScrollbarState.VISIBLE:
      {
        minAvailableHeight -= scrollbarXHeight;
        maxAvailableHeight -= scrollbarXHeight;
        break;
      }

    case ScrollbarState.JOINT_SCROLLBARS:
      {
        minAvailableHeight -= scrollbarXHeight;
        break;
      }
  }

  return {
    bufferRowCount: getBufferRowCount(maxAvailableHeight, rowSettings),
    minAvailableHeight: Math.max(minAvailableHeight, 0),
    maxAvailableHeight: Math.max(maxAvailableHeight, 0),
    reservedHeight: reservedHeight,
    scrollStateX: scrollStateX
  };
}
/**
 * @param {!Array.<{
 *   width: number,
 * }>} columnProps
 * @param {{
 *   overflowX: string,
 *   showScrollbarX: boolean,
 * }} scrollFlags
 * @param {number} width
 * @return {ScrollbarState}
 */


function getScrollStateX(columnProps, scrollFlags, width, scrollbarYWidth) {
  var overflowX = scrollFlags.overflowX,
      showScrollbarX = scrollFlags.showScrollbarX;
  var minColWidth = (0, _widthHelper.getTotalWidth)(columnProps);

  if (overflowX === 'hidden' || showScrollbarX === false) {
    return ScrollbarState.HIDDEN;
  } else if (minColWidth > width) {
    return ScrollbarState.VISIBLE;
  }

  if (minColWidth > width - scrollbarYWidth) {
    return ScrollbarState.JOINT_SCROLLBARS;
  }

  return ScrollbarState.HIDDEN;
}
/**
 * @param {number} maxAvailableHeight
 * @param {{
 *   bufferRowCount: ?number,
 *   rowHeight: number,
 *   subRowHeight: number,
 * }} rowSettings
 * @return {number}
 */


function getBufferRowCount(maxAvailableHeight, rowSettings) {
  var bufferRowCount = rowSettings.bufferRowCount,
      rowHeight = rowSettings.rowHeight,
      subRowHeight = rowSettings.subRowHeight;

  if (bufferRowCount !== undefined) {
    console.log('buffer set: ' + bufferRowCount);
    return bufferRowCount;
  }

  var fullRowHeight = rowHeight + subRowHeight;
  var avgVisibleRowCount = Math.ceil(maxAvailableHeight / fullRowHeight) + 1;
  return (0, _clamp["default"])(Math.floor(avgVisibleRowCount / 2), MIN_BUFFER_ROWS, MAX_BUFFER_ROWS);
}

var _default = (0, _shallowEqualSelector["default"])([function (state) {
  return state.columnProps;
}, function (state) {
  return state.elementHeights;
}, function (state) {
  return state.rowSettings;
}, function (state) {
  return state.scrollFlags;
}, function (state) {
  return state.tableSize;
}, function (state) {
  return state.scrollbarXHeight;
}, function (state) {
  return state.scrollbarYWidth;
}], roughHeights);

exports["default"] = _default;