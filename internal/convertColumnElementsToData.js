/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule convertColumnElementsToData
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require('react'));

var _forEach = _interopRequireDefault(require('lodash/forEach'));

var _invariant = _interopRequireDefault(require('./invariant'));

var _map = _interopRequireDefault(require('lodash/map'));

var _pick = _interopRequireDefault(require('lodash/pick'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extractProps(column) {
  return (0, _pick["default"])(column.props, ['align', 'allowCellsRecycling', 'cellClassName', 'columnKey', 'flexGrow', 'fixed', 'fixedRight', 'maxWidth', 'minWidth', 'isReorderable', 'isResizable', 'pureRendering', 'width']);
}

;

function _extractTemplates(elementTemplates, columnElement) {
  elementTemplates.cell.push(columnElement.props.cell);
  elementTemplates.footer.push(columnElement.props.footer);
  elementTemplates.header.push(columnElement.props.header);
}

;
/**
 * Converts React column / column group elements into props and cell rendering templates
 */

function convertColumnElementsToData(childComponents) {
  var children = [];

  _react["default"].Children.forEach(childComponents, function (child, index) {
    if (child == null) {
      return;
    }

    (0, _invariant["default"])(child.type.__TableColumnGroup__ || child.type.__TableColumn__, 'child type should be <FixedDataTableColumn /> or <FixedDataTableColumnGroup />');
    children.push(child);
  });

  var elementTemplates = {
    cell: [],
    footer: [],
    groupHeader: [],
    header: []
  };
  var columnProps = [];
  var hasGroupHeader = children.length && children[0].type.__TableColumnGroup__;

  if (hasGroupHeader) {
    var columnGroupProps = (0, _map["default"])(children, _extractProps);
    (0, _forEach["default"])(children, function (columnGroupElement, index) {
      elementTemplates.groupHeader.push(columnGroupElement.props.header);

      _react["default"].Children.forEach(columnGroupElement.props.children, function (child) {
        var column = _extractProps(child);

        column.groupIdx = index;
        columnProps.push(column);

        _extractTemplates(elementTemplates, child);
      });
    });
    return {
      columnGroupProps: columnGroupProps,
      columnProps: columnProps,
      elementTemplates: elementTemplates,
      useGroupHeader: true
    };
  } // Use a default column group


  (0, _forEach["default"])(children, function (child) {
    columnProps.push(_extractProps(child));

    _extractTemplates(elementTemplates, child);
  });
  return {
    columnGroupProps: [],
    columnProps: columnProps,
    elementTemplates: elementTemplates,
    useGroupHeader: false
  };
}

;
var _default = convertColumnElementsToData;
exports["default"] = _default;