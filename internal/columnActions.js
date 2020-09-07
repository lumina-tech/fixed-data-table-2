/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule columnActions
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeColumn = exports.moveColumnReorder = exports.stopColumnReorder = exports.startColumnReorder = void 0;

var _ActionTypes = require('././ActionTypes');

/**
 * Initiates column reordering
 *
 * @param {{scrollStart: number, columnKey: string, with: number, left: number}} reorderData
 */
var startColumnReorder = function startColumnReorder(reorderData) {
  return {
    type: _ActionTypes.COLUMN_REORDER_START,
    reorderData: reorderData
  };
};
/**
 * Stops column reordering
 */


exports.startColumnReorder = startColumnReorder;

var stopColumnReorder = function stopColumnReorder() {
  return {
    type: _ActionTypes.COLUMN_REORDER_END
  };
};
/**
 * Stops column reordering
 *
 * @param {number} deltaX
 */


exports.stopColumnReorder = stopColumnReorder;

var moveColumnReorder = function moveColumnReorder(deltaX) {
  return {
    type: _ActionTypes.COLUMN_REORDER_MOVE,
    deltaX: deltaX
  };
};
/**
 * Fires a resize on column
 *
 * @param {!Object} reorderData
 */


exports.moveColumnReorder = moveColumnReorder;

var resizeColumn = function resizeColumn(resizeData) {
  return {
    type: _ActionTypes.COLUMN_RESIZE,
    resizeData: resizeData
  };
};

exports.resizeColumn = resizeColumn;