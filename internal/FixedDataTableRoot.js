/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableRoot
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Table", {
  enumerable: true,
  get: function get() {
    return _FixedDataTableContainer["default"];
  }
});
Object.defineProperty(exports, "Cell", {
  enumerable: true,
  get: function get() {
    return _FixedDataTableCellDefault["default"];
  }
});
Object.defineProperty(exports, "Column", {
  enumerable: true,
  get: function get() {
    return _FixedDataTableColumn["default"];
  }
});
Object.defineProperty(exports, "ColumnGroup", {
  enumerable: true,
  get: function get() {
    return _FixedDataTableColumnGroup["default"];
  }
});
exports.version = void 0;

var _FixedDataTableContainer = _interopRequireDefault(require('./FixedDataTableContainer'));

var _FixedDataTableCellDefault = _interopRequireDefault(require('./FixedDataTableCellDefault'));

var _FixedDataTableColumn = _interopRequireDefault(require('./FixedDataTableColumn'));

var _FixedDataTableColumnGroup = _interopRequireDefault(require('./FixedDataTableColumnGroup'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var version = '1.1.0';
exports.version = version;