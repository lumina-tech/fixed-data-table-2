/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule computeRenderedRows
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = computeRenderedRows;

var _clamp = _interopRequireDefault(require('lodash/clamp'));

var _updateRowHeight = _interopRequireDefault(require('./updateRowHeight'));

var _roughHeights = _interopRequireDefault(require('./roughHeights'));

var _scrollbarsVisible = _interopRequireDefault(require('./scrollbarsVisible'));

var _tableHeights = _interopRequireDefault(require('./tableHeights'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Returns data about the rows to render
 * rows is a map of rowIndexes to render to their heights
 * firstRowIndex & firstRowOffset are calculated based on the lastIndex if
 * specified in scrollAnchor.
 * Otherwise, they are unchanged from the firstIndex & firstOffset scrollAnchor values.
 *
 * @param {!Object} state
 * @param {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 * }} scrollAnchor
 * @return {!Object} The updated state object
 */
function computeRenderedRows(state, scrollAnchor) {
  var newState = _extends({}, state);

  var rowRange = calculateRenderedRowRange(newState, scrollAnchor);
  var rowSettings = newState.rowSettings,
      scrollContentHeight = newState.scrollContentHeight;
  var rowsCount = rowSettings.rowsCount;

  var _tableHeightsSelector = (0, _tableHeights["default"])(newState),
      bodyHeight = _tableHeightsSelector.bodyHeight;

  var maxScrollY = scrollContentHeight - bodyHeight;
  var firstRowOffset; // NOTE (jordan) This handles #115 where resizing the viewport may
  // leave only a subset of rows shown, but no scrollbar to scroll up to the first rows.

  if (maxScrollY === 0) {
    if (rowRange.firstViewportIdx > 0) {
      rowRange = calculateRenderedRowRange(newState, {
        firstOffset: 0,
        lastIndex: rowsCount - 1
      });
    }

    firstRowOffset = 0;
  } else {
    firstRowOffset = rowRange.firstOffset;
  }

  var firstRowIndex = rowRange.firstViewportIdx;
  var endRowIndex = rowRange.endViewportIdx;
  computeRenderedRowOffsets(newState, rowRange, state.scrolling);
  var scrollY = 0;

  if (rowsCount > 0) {
    scrollY = newState.rowOffsets[rowRange.firstViewportIdx] - firstRowOffset;
  }

  scrollY = (0, _clamp["default"])(scrollY, 0, maxScrollY);
  return _extends(newState, {
    firstRowIndex: firstRowIndex,
    firstRowOffset: firstRowOffset,
    endRowIndex: endRowIndex,
    maxScrollY: maxScrollY,
    scrollY: scrollY
  });
}
/**
 * Determine the range of rows to render (buffer and viewport)
 * The leading and trailing buffer is based on a fixed count,
 * while the viewport rows are based on their height and the viewport height
 * We use the scrollAnchor to determine what either the first or last row
 * will be, as well as the offset.
 *
 * NOTE (jordan) This alters state so it shouldn't be called
 * without state having been cloned first.
 *
 * @param {!Object} state
 * @param {{
 *   firstIndex: number,
 *   firstOffset: number,
 *   lastIndex: number,
 * }} scrollAnchor
 * @return {{
 *   endBufferIdx: number,
 *   endViewportIdx: number,
 *   firstBufferIdx: number,
 *   firstOffset: number,
 *   firstViewportIdx: number,
 * }}
 * @private
 */


function calculateRenderedRowRange(state, scrollAnchor) {
  var _roughHeightsSelector = (0, _roughHeights["default"])(state),
      bufferRowCount = _roughHeightsSelector.bufferRowCount,
      maxAvailableHeight = _roughHeightsSelector.maxAvailableHeight;

  var rowsCount = state.rowSettings.rowsCount;

  if (rowsCount === 0) {
    return {
      endBufferIdx: 0,
      endViewportIdx: 0,
      firstBufferIdx: 0,
      firstOffset: 0,
      firstViewportIdx: 0
    };
  } // If our first or last index is greater than our rowsCount,
  // treat it as if the last row is at the bottom of the viewport


  var firstIndex = scrollAnchor.firstIndex,
      firstOffset = scrollAnchor.firstOffset,
      lastIndex = scrollAnchor.lastIndex;

  if (firstIndex >= rowsCount || lastIndex >= rowsCount) {
    lastIndex = rowsCount - 1;
  } // Walk the viewport until filled with rows
  // If lastIndex is set, walk backward so that row is the last in the viewport


  var step = 1;
  var startIdx = firstIndex;
  var totalHeight = firstOffset;

  if (lastIndex !== undefined) {
    step = -1;
    startIdx = lastIndex;
    totalHeight = 0;
  } // Loop to walk the viewport until we've touched enough rows to fill its height


  var rowIdx = startIdx;
  var endIdx = rowIdx;

  while (rowIdx < rowsCount && rowIdx >= 0 && totalHeight < maxAvailableHeight) {
    totalHeight += (0, _updateRowHeight["default"])(state, rowIdx);
    endIdx = rowIdx;
    rowIdx += step;
  }
  /* Handle the case where rows have shrunk and there's not enough content
     between the start scroll anchor and the end of the table to fill the available space.
     In this case process earlier rows as needed and act as if we've scrolled to the last row.
   */


  var forceScrollToLastRow = false;

  if (totalHeight < maxAvailableHeight && rowIdx === rowsCount && lastIndex === undefined) {
    forceScrollToLastRow = true;
    rowIdx = firstIndex - 1;

    while (rowIdx >= 0 && totalHeight < maxAvailableHeight) {
      totalHeight += (0, _updateRowHeight["default"])(state, rowIdx);
      startIdx = rowIdx;
      --rowIdx;
    }
  } // Loop to walk the leading buffer


  var firstViewportIdx = Math.min(startIdx, endIdx);
  var firstBufferIdx = Math.max(firstViewportIdx - bufferRowCount, 0);

  for (rowIdx = firstBufferIdx; rowIdx < firstViewportIdx; rowIdx++) {
    (0, _updateRowHeight["default"])(state, rowIdx);
  } // Loop to walk the trailing buffer


  var endViewportIdx = Math.max(startIdx, endIdx) + 1;
  var endBufferIdx = Math.min(endViewportIdx + bufferRowCount, rowsCount);

  for (rowIdx = endViewportIdx; rowIdx < endBufferIdx; rowIdx++) {
    (0, _updateRowHeight["default"])(state, rowIdx);
  }

  var _scrollbarsVisibleSel = (0, _scrollbarsVisible["default"])(state),
      availableHeight = _scrollbarsVisibleSel.availableHeight;

  if (lastIndex !== undefined || forceScrollToLastRow) {
    // Calculate offset needed to position last row at bottom of viewport
    // This should be negative and represent how far the first row needs to be offscreen
    // NOTE (jordan): The first offset should always be 0 when lastIndex is defined
    // since we don't currently support scrolling the last row into view with an offset.
    firstOffset = firstOffset + Math.min(availableHeight - totalHeight, 0); // Handle a case where the offset puts the first row fully offscreen
    // This can happen if availableHeight & maxAvailableHeight are different

    var storedHeights = state.storedHeights;

    if (-1 * firstOffset >= storedHeights[firstViewportIdx]) {
      firstViewportIdx += 1;
      firstOffset += storedHeights[firstViewportIdx];
    }
  }

  return {
    endBufferIdx: endBufferIdx,
    endViewportIdx: endViewportIdx,
    firstBufferIdx: firstBufferIdx,
    firstOffset: firstOffset,
    firstViewportIdx: firstViewportIdx
  };
}
/**
 * Walk the rows to render and compute the height offsets and
 * positions in the row buffer.
 *
 * NOTE (jordan) This alters state so it shouldn't be called
 * without state having been cloned first.
 *
 * @param {!Object} state
 * @param {{
 *   endBufferIdx: number,
 *   endViewportIdx: number,
 *   firstBufferIdx: number,
 *   firstViewportIdx: number,
 * }} rowRange
 * @param {boolean} viewportOnly
 * @private
 */


function computeRenderedRowOffsets(state, rowRange, viewportOnly) {
  var rowBufferSet = state.rowBufferSet,
      rowOffsetIntervalTree = state.rowOffsetIntervalTree,
      storedHeights = state.storedHeights;
  var endBufferIdx = rowRange.endBufferIdx,
      endViewportIdx = rowRange.endViewportIdx,
      firstBufferIdx = rowRange.firstBufferIdx,
      firstViewportIdx = rowRange.firstViewportIdx;
  var renderedRowsCount = endBufferIdx - firstBufferIdx;

  if (renderedRowsCount === 0) {
    state.rowOffsets = {};
    state.rows = [];
    return;
  }

  var startIdx = viewportOnly ? firstViewportIdx : firstBufferIdx;
  var endIdx = viewportOnly ? endViewportIdx : endBufferIdx; // output for this function

  var rows = []; // state.rows

  var rowOffsets = {}; // state.rowOffsets
  // incremental way for calculating rowOffset

  var runningOffset = rowOffsetIntervalTree.sumUntil(startIdx); // compute row index and offsets for every rows inside the buffer

  for (var rowIdx = startIdx; rowIdx < endIdx; rowIdx++) {
    // Update the offset for rendering the row
    rowOffsets[rowIdx] = runningOffset;
    runningOffset += storedHeights[rowIdx]; // Get position for the viewport row

    var rowPosition = addRowToBuffer(rowIdx, rowBufferSet, startIdx, endIdx, renderedRowsCount);
    rows[rowPosition] = rowIdx;
  } // now we modify the state with the newly calculated rows and offsets


  state.rows = rows;
  state.rowOffsets = rowOffsets;
}
/**
 * Add the row to the buffer set if it doesn't exist.
 * If addition isn't possible due to max buffer size, it'll replace an existing element outside the given range.
 *
 * @param {!number} rowIdx
 * @param {!number} rowBufferSet
 * @param {!number} startRange
 * @param {!number} endRange
 * @param {!number} maxBufferSize
 *
 * @return {?number} the position of the row after being added to the buffer set
 * @private
 */


function addRowToBuffer(rowIdx, rowBufferSet, startRange, endRange, maxBufferSize) {
  // Check if row already has a position in the buffer
  var rowPosition = rowBufferSet.getValuePosition(rowIdx); // Request a position in the buffer through eviction of another row

  if (rowPosition === null && rowBufferSet.getSize() >= maxBufferSize) {
    rowPosition = rowBufferSet.replaceFurthestValuePosition(startRange, endRange - 1, // replaceFurthestValuePosition uses closed interval from startRange to endRange
    rowIdx);
  }

  if (rowPosition === null) {
    rowPosition = rowBufferSet.getNewPositionForValue(rowIdx);
  }

  return rowPosition;
}