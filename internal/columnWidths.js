"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _widthHelper = require('./widthHelper');

var _Scrollbar = _interopRequireDefault(require('./Scrollbar'));

var _forEach = _interopRequireDefault(require('lodash/forEach'));

var _map = _interopRequireDefault(require('lodash/map'));

var _scrollbarsVisible = _interopRequireDefault(require('./scrollbarsVisible'));

var _shallowEqualSelector = _interopRequireDefault(require('./shallowEqualSelector'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * @typedef {{
 *   fixed: boolean,
 *   fixedRight: boolean,
 *   flexGrow: number,
 *   width: number,
 * }}
 */
var columnDefinition;
/**
 * @param {!Array.<columnDefinition>} columnGroupProps
 * @param {!Array.<columnDefinition>} columnProps
 * @param {boolean} scrollEnabledY
 * @param {number} width
 * @return {{
 *   columnGroupProps: !Array.<columnDefinition>,
 *   columnProps: !Array.<columnDefinition>,
 *   availableScrollWidth: number,
 *   fixedColumns: !Array.<columnDefinition>,
 *   fixedRightColumns: !Array.<columnDefinition>,
 *   scrollableColumns: !Array.<columnDefinition>,
 *   maxScrollX: number,
 * }} The total width of all columns.
 */

function columnWidths(columnGroupProps, columnProps, scrollEnabledY, width, scrollbarYWidth) {
  var scrollbarSpace = scrollEnabledY ? scrollbarYWidth : 0;
  var viewportWidth = width - scrollbarSpace;

  var _flexWidths = flexWidths(columnGroupProps, columnProps, viewportWidth),
      newColumnGroupProps = _flexWidths.newColumnGroupProps,
      newColumnProps = _flexWidths.newColumnProps;

  var _groupColumns = groupColumns(newColumnProps),
      fixedColumns = _groupColumns.fixedColumns,
      fixedRightColumns = _groupColumns.fixedRightColumns,
      scrollableColumns = _groupColumns.scrollableColumns;

  var availableScrollWidth = viewportWidth - (0, _widthHelper.getTotalWidth)(fixedColumns) - (0, _widthHelper.getTotalWidth)(fixedRightColumns);
  var maxScrollX = Math.max(0, (0, _widthHelper.getTotalWidth)(newColumnProps) - viewportWidth);
  return {
    columnGroupProps: newColumnGroupProps,
    columnProps: newColumnProps,
    availableScrollWidth: availableScrollWidth,
    fixedColumns: fixedColumns,
    fixedRightColumns: fixedRightColumns,
    scrollableColumns: scrollableColumns,
    maxScrollX: maxScrollX
  };
}
/**
 * @param {!Array.<columnDefinition>} columnGroupProps
 * @param {!Array.<columnDefinition>} columnProps
 * @param {number} viewportWidth
 * @return {{
 *   newColumnGroupProps: !Array.<columnDefinition>,
 *   newColumnProps: !Array.<columnDefinition>
 * }}
 */


function flexWidths(columnGroupProps, columnProps, viewportWidth) {
  var newColumnProps = columnProps;
  var remainingFlexGrow = (0, _widthHelper.getTotalFlexGrow)(columnProps); // if any column is a flex column, we'll need to calculate the widths for every column

  if (remainingFlexGrow !== 0) {
    var columnsWidth = (0, _widthHelper.getTotalWidth)(columnProps);
    var remainingFlexWidth = Math.max(viewportWidth - columnsWidth, 0); // calculate and set width for each column

    newColumnProps = (0, _map["default"])(columnProps, function (column) {
      var flexGrow = column.flexGrow; // if no flexGrow is specified, column defaults to original width

      if (!flexGrow) {
        return column;
      }

      var flexWidth = Math.floor(flexGrow * remainingFlexWidth / remainingFlexGrow);
      var newWidth = column.width + flexWidth;
      remainingFlexGrow -= flexGrow;
      remainingFlexWidth -= flexWidth;
      return _extends({}, column, {
        width: newWidth
      });
    });
  } // calculate width for each column group


  var columnGroupWidths = (0, _map["default"])(columnGroupProps, function () {
    return 0;
  });
  (0, _forEach["default"])(newColumnProps, function (column) {
    if (column.groupIdx !== undefined) {
      columnGroupWidths[column.groupIdx] += column.width;
    }
  }); // set the width for each column group

  var newColumnGroupProps = (0, _map["default"])(columnGroupProps, function (columnGroup, idx) {
    if (columnGroupWidths[idx] === columnGroup.width) {
      return columnGroup;
    }

    return _extends({}, columnGroup, {
      width: columnGroupWidths[idx]
    });
  });
  return {
    newColumnGroupProps: newColumnGroupProps,
    newColumnProps: newColumnProps
  };
}
/**
 * @param {!Array.<columnDefinition>} columnProps
 * @return {{
 *   fixedColumns: !Array.<columnDefinition>,
 *   fixedRightColumns: !Array.<columnDefinition>,
 *   scrollableColumns: !Array.<columnDefinition>
 * }}
 */


function groupColumns(columnProps) {
  var fixedColumns = [];
  var fixedRightColumns = [];
  var scrollableColumns = [];
  (0, _forEach["default"])(columnProps, function (columnProp) {
    var container = scrollableColumns;

    if (columnProp.fixed) {
      container = fixedColumns;
    } else if (columnProp.fixedRight) {
      container = fixedRightColumns;
    }

    container.push(columnProp);
  });
  return {
    fixedColumns: fixedColumns,
    fixedRightColumns: fixedRightColumns,
    scrollableColumns: scrollableColumns
  };
}

var _default = (0, _shallowEqualSelector["default"])([function (state) {
  return state.columnGroupProps;
}, function (state) {
  return state.columnProps;
}, function (state) {
  return (0, _scrollbarsVisible["default"])(state).scrollEnabledY;
}, function (state) {
  return state.tableSize.width;
}, function (state) {
  return state.scrollbarYWidth;
}], columnWidths);

exports["default"] = _default;