/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableCellGroup
 * @typechecks
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _FixedDataTableCell = _interopRequireDefault(require('./FixedDataTableCell'));

var _FixedDataTableTranslateDOMPosition = _interopRequireDefault(require('./FixedDataTableTranslateDOMPosition'));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require('react'));

var _cx = _interopRequireDefault(require('./cx'));

var _widthHelper = require('./widthHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FixedDataTableCellGroupImpl = /*#__PURE__*/function (_React$Component) {
  _inherits(FixedDataTableCellGroupImpl, _React$Component);

  var _super = _createSuper(FixedDataTableCellGroupImpl);

  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */
  function FixedDataTableCellGroupImpl(props) {
    var _this;

    _classCallCheck(this, FixedDataTableCellGroupImpl);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_renderCell", function (
    /*number*/
    rowIndex,
    /*number*/
    height,
    /*object*/
    columnProps,
    /*object*/
    cellTemplate,
    /*number*/
    left,
    /*string*/
    key,
    /*number*/
    columnGroupWidth,
    /*boolean*/
    isColumnReordering)
    /*object*/
    {
      var cellIsResizable = columnProps.isResizable && _this.props.onColumnResize;
      var onColumnResize = cellIsResizable ? _this.props.onColumnResize : null;
      var cellIsReorderable = columnProps.isReorderable && _this.props.onColumnReorder && rowIndex === -1 && columnGroupWidth !== columnProps.width;
      var onColumnReorder = cellIsReorderable ? _this.props.onColumnReorder : null;
      var className = columnProps.cellClassName;
      var pureRendering = columnProps.pureRendering || false;
      return /*#__PURE__*/_react["default"].createElement(_FixedDataTableCell["default"], {
        isScrolling: _this.props.isScrolling,
        isHeaderOrFooter: _this.props.isHeaderOrFooter,
        align: columnProps.align,
        className: className,
        height: height,
        key: key,
        maxWidth: columnProps.maxWidth,
        minWidth: columnProps.minWidth,
        touchEnabled: _this.props.touchEnabled,
        onColumnResize: onColumnResize,
        onColumnReorder: onColumnReorder,
        onColumnReorderMove: _this.props.onColumnReorderMove,
        onColumnReorderEnd: _this.props.onColumnReorderEnd,
        isColumnReordering: isColumnReordering,
        columnReorderingData: _this.props.columnReorderingData,
        rowIndex: rowIndex,
        columnKey: columnProps.columnKey,
        width: columnProps.width,
        left: left,
        cell: cellTemplate,
        columnGroupWidth: columnGroupWidth,
        pureRendering: pureRendering,
        isRTL: _this.props.isRTL
      });
    });

    _this._initialRender = true;
    return _this;
  }

  _createClass(FixedDataTableCellGroupImpl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._initialRender = false;
    }
  }, {
    key: "render",
    value: function render()
    /*object*/
    {
      var props = this.props;
      var columns = props.columns;
      var cells = new Array(columns.length);
      var contentWidth = (0, _widthHelper.sumPropWidths)(columns);
      var isColumnReordering = props.isColumnReordering && columns.reduce(function (acc, column) {
        return acc || props.columnReorderingData.columnKey === column.props.columnKey;
      }, false);
      var currentPosition = 0;

      for (var i = 0, j = columns.length; i < j; i++) {
        var columnProps = columns[i].props;
        var cellTemplate = columns[i].template;
        var recyclable = columnProps.allowCellsRecycling && !isColumnReordering;

        if (!recyclable || currentPosition - props.left <= props.width && currentPosition - props.left + columnProps.width >= 0) {
          var key = columnProps.columnKey || 'cell_' + i;
          cells[i] = this._renderCell(props.rowIndex, props.rowHeight, columnProps, cellTemplate, currentPosition, key, contentWidth, isColumnReordering);
        }

        currentPosition += columnProps.width;
      }

      var style = {
        height: props.height,
        position: 'absolute',
        width: contentWidth,
        zIndex: props.zIndex
      };
      (0, _FixedDataTableTranslateDOMPosition["default"])(style, -1 * props.left, 0, this._initialRender, this.props.isRTL);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _cx["default"])('fixedDataTableCellGroupLayout/cellGroup'),
        style: style
      }, cells);
    }
  }]);

  return FixedDataTableCellGroupImpl;
}(_react["default"].Component);

_defineProperty(FixedDataTableCellGroupImpl, "propTypes_DISABLED_FOR_PERFORMANCE", {
  /**
   * Array of per column configuration properties.
   */
  columns: _propTypes["default"].array.isRequired,
  isScrolling: _propTypes["default"].bool,
  left: _propTypes["default"].number,
  onColumnResize: _propTypes["default"].func,
  onColumnReorder: _propTypes["default"].func,
  onColumnReorderMove: _propTypes["default"].func,
  onColumnReorderEnd: _propTypes["default"].func,
  height: _propTypes["default"].number.isRequired,

  /**
   * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
   */
  cellGroupWrapperHeight: _propTypes["default"].number,
  rowHeight: _propTypes["default"].number.isRequired,
  rowIndex: _propTypes["default"].number.isRequired,
  width: _propTypes["default"].number.isRequired,
  zIndex: _propTypes["default"].number.isRequired,
  touchEnabled: _propTypes["default"].bool,
  isHeaderOrFooter: _propTypes["default"].bool,
  isRTL: _propTypes["default"].bool
});

var FixedDataTableCellGroup = /*#__PURE__*/function (_React$Component2) {
  _inherits(FixedDataTableCellGroup, _React$Component2);

  var _super2 = _createSuper(FixedDataTableCellGroup);

  function FixedDataTableCellGroup() {
    var _this2;

    _classCallCheck(this, FixedDataTableCellGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "_onColumnResize", function (
    /*number*/
    left,
    /*number*/
    width,
    /*?number*/
    minWidth,
    /*?number*/
    maxWidth,
    /*string|number*/
    columnKey,
    /*object*/
    event) {
      _this2.props.onColumnResize && _this2.props.onColumnResize(_this2.props.offsetLeft, left - _this2.props.left + width, width, minWidth, maxWidth, columnKey, event);
    });

    return _this2;
  }

  _createClass(FixedDataTableCellGroup, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(
    /*object*/
    nextProps)
    /*boolean*/
    {
      return !nextProps.isScrolling || this.props.rowIndex !== nextProps.rowIndex || this.props.left !== nextProps.left;
    }
  }, {
    key: "render",
    value: function render()
    /*object*/
    {
      var _this$props = this.props,
          offsetLeft = _this$props.offsetLeft,
          props = _objectWithoutProperties(_this$props, ["offsetLeft"]);

      var style = {
        height: props.cellGroupWrapperHeight || props.height,
        width: props.width
      };

      if (this.props.isRTL) {
        style.right = offsetLeft;
      } else {
        style.left = offsetLeft;
      }

      var onColumnResize = props.onColumnResize ? this._onColumnResize : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: style,
        className: (0, _cx["default"])('fixedDataTableCellGroupLayout/cellGroupWrapper')
      }, /*#__PURE__*/_react["default"].createElement(FixedDataTableCellGroupImpl, _extends({}, props, {
        onColumnResize: onColumnResize
      })));
    }
  }]);

  return FixedDataTableCellGroup;
}(_react["default"].Component);

_defineProperty(FixedDataTableCellGroup, "propTypes_DISABLED_FOR_PERFORMANCE", {
  isScrolling: _propTypes["default"].bool,

  /**
   * Height of the row.
   */
  height: _propTypes["default"].number.isRequired,
  offsetLeft: _propTypes["default"].number,
  left: _propTypes["default"].number,

  /**
   * Z-index on which the row will be displayed. Used e.g. for keeping
   * header and footer in front of other rows.
   */
  zIndex: _propTypes["default"].number.isRequired
});

_defineProperty(FixedDataTableCellGroup, "defaultProps",
/*object*/
{
  left: 0,
  offsetLeft: 0
});

var _default = FixedDataTableCellGroup;
exports["default"] = _default;