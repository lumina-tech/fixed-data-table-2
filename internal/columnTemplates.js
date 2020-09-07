"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _columnWidths = _interopRequireDefault(require('./columnWidths'));

var _forEach = _interopRequireDefault(require('lodash/forEach'));

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
 * @providesModule columnTemplates
 */

/**
 * @typedef {{
 *   props: !Object,
 *   template: ReactElement,
 * }}
 */
var cellDetails;
/**
 * @typedef {{
 *   cell: !Array.<cellDetails>,
 *   footer: !Array.<cellDetails>,
 *   header: !Array.<cellDetails>,
 * }}
 */

var columnDetails;
/**
 * Lists of cell templates & component props for
 * the fixed and scrollable columns and column groups
 *
 * @param {{
 *   columnGroupProps: !Array.<!Object>,
 *   columnProps: !Array.<!Object>,
 * }} columnWidths
 * @param {{
 *   cell: !Array.<ReactElement>,
 *   footer: !Array.<ReactElement>,
 *   groupHeader !Array.<ReactElement>,
 *   header !Array.<ReactElement>,
 * }} elementTemplates
 * @return {{
 *   fixedColumnGroups: !Array.<cellDetails>,
 *   fixedRightColumnGroups: !Array.<cellDetails>,
 *   scrollableColumnGroups: !Array.<cellDetails>,
 *   fixedColumns: !Array.<columnDetails>,
 *   fixedRightColumns: !Array.<columnDetails>,
 *   scrollableColumns: !Array.<columnDetails>,
 * }}
 */

function columnTemplates(columnWidths, elementTemplates) {
  var columnGroupProps = columnWidths.columnGroupProps,
      columnProps = columnWidths.columnProps; // Ugly transforms to extract data into a row consumable format.
  // TODO (jordan) figure out if this can efficiently be merged with
  // the result of convertColumnElementsToData.

  var fixedColumnGroups = [];
  var fixedRightColumnGroups = [];
  var scrollableColumnGroups = [];
  (0, _forEach["default"])(columnGroupProps, function (columnGroup, index) {
    var groupData = {
      props: columnGroup,
      template: elementTemplates.groupHeader[index]
    };

    if (columnGroup.fixed) {
      fixedColumnGroups.push(groupData);
    } else if (columnGroup.fixedRight) {
      fixedRightColumnGroups.push(groupData);
    } else {
      scrollableColumnGroups.push(groupData);
    }
  });
  var fixedColumns = {
    cell: [],
    header: [],
    footer: []
  };
  var fixedRightColumns = {
    cell: [],
    header: [],
    footer: []
  };
  var scrollableColumns = {
    cell: [],
    header: [],
    footer: []
  };
  (0, _forEach["default"])(columnProps, function (column, index) {
    var columnContainer = scrollableColumns;

    if (column.fixed) {
      columnContainer = fixedColumns;
    } else if (column.fixedRight) {
      columnContainer = fixedRightColumns;
    }

    columnContainer.cell.push({
      props: column,
      template: elementTemplates.cell[index]
    });
    columnContainer.header.push({
      props: column,
      template: elementTemplates.header[index]
    });
    columnContainer.footer.push({
      props: column,
      template: elementTemplates.footer[index]
    });
  });
  return {
    fixedColumnGroups: fixedColumnGroups,
    fixedColumns: fixedColumns,
    fixedRightColumnGroups: fixedRightColumnGroups,
    fixedRightColumns: fixedRightColumns,
    scrollableColumnGroups: scrollableColumnGroups,
    scrollableColumns: scrollableColumns
  };
}

var _default = (0, _shallowEqualSelector["default"])([function (state) {
  return (0, _columnWidths["default"])(state);
}, function (state) {
  return state.elementTemplates;
}], columnTemplates);

exports["default"] = _default;