/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableRow
 * @typechecks
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _FixedDataTableCellGroup = _interopRequireDefault(require('./FixedDataTableCellGroup'));

var _FixedDataTableTranslateDOMPosition = _interopRequireDefault(require('./FixedDataTableTranslateDOMPosition'));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require('react'));

var _Scrollbar = _interopRequireDefault(require('./Scrollbar'));

var _cx = _interopRequireDefault(require('./cx'));

var _joinClasses = _interopRequireDefault(require('./joinClasses'));

var _widthHelper = require('./widthHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

// .fixedDataTableLayout/header border-bottom-width
var HEADER_BORDER_BOTTOM_WIDTH = 1;
/**
 * Component that renders the row for <FixedDataTable />.
 * This component should not be used directly by developer. Instead,
 * only <FixedDataTable /> should use the component internally.
 */

var FixedDataTableRowImpl = /*#__PURE__*/function (_React$Component) {
  _inherits(FixedDataTableRowImpl, _React$Component);

  var _super = _createSuper(FixedDataTableRowImpl);

  function FixedDataTableRowImpl() {
    var _this;

    _classCallCheck(this, FixedDataTableRowImpl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "mouseLeaveIndex", null);

    _defineProperty(_assertThisInitialized(_this), "_getRowExpanded", function (
    /*number*/
    subRowHeight)
    /*?object*/
    {
      if (_this.props.rowExpanded) {
        var rowExpandedProps = {
          rowIndex: _this.props.index,
          height: subRowHeight,
          width: _this.props.width
        };
        var rowExpanded;

        if ( /*#__PURE__*/_react["default"].isValidElement(_this.props.rowExpanded)) {
          rowExpanded = /*#__PURE__*/_react["default"].cloneElement(_this.props.rowExpanded, rowExpandedProps);
        } else if (typeof _this.props.rowExpanded === 'function') {
          rowExpanded = _this.props.rowExpanded(rowExpandedProps);
        }

        return rowExpanded;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_renderColumnsLeftShadow", function (
    /*number*/
    left)
    /*?object*/
    {
      var className = (0, _cx["default"])({
        'fixedDataTableRowLayout/fixedColumnsDivider': left > 0,
        'fixedDataTableRowLayout/columnsShadow': _this.props.scrollLeft > 0,
        'public/fixedDataTableRow/fixedColumnsDivider': left > 0,
        'public/fixedDataTableRow/columnsShadow': _this.props.scrollLeft > 0
      });
      var dividerHeight = _this.props.cellGroupWrapperHeight ? _this.props.cellGroupWrapperHeight - HEADER_BORDER_BOTTOM_WIDTH : _this.props.height;
      var style = {
        left: left,
        height: dividerHeight
      };

      if (_this.props.isRTL) {
        style.right = left;
        style.left = 'auto';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: className,
        style: style
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_renderFixedRightColumnsShadow", function (
    /*number*/
    left)
    /*?object*/
    {
      var className = (0, _cx["default"])('fixedDataTableRowLayout/columnsShadow', 'fixedDataTableRowLayout/columnsRightShadow', 'fixedDataTableRowLayout/fixedColumnsDivider', 'public/fixedDataTableRow/columnsShadow', 'public/fixedDataTableRow/columnsRightShadow', 'public/fixedDataTableRow/fixedColumnsDivider');
      var style = {
        height: _this.props.height,
        left: left
      };

      if (_this.props.isRTL) {
        style.right = left;
        style.left = 'auto';
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: className,
        style: style
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_renderColumnsRightShadow", function (
    /*number*/
    totalWidth)
    /*?object*/
    {
      if (Math.ceil(_this.props.scrollLeft + _this.props.width) < Math.floor(totalWidth)) {
        var className = (0, _cx["default"])('fixedDataTableRowLayout/columnsShadow', 'fixedDataTableRowLayout/columnsRightShadow', 'public/fixedDataTableRow/columnsShadow', 'public/fixedDataTableRow/columnsRightShadow');
        var style = {
          height: _this.props.height
        };
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: className,
          style: style
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onClick", function (
    /*object*/
    event) {
      _this.props.onClick(event, _this.props.index);
    });

    _defineProperty(_assertThisInitialized(_this), "_onContextMenu", function (
    /*object*/
    event) {
      _this.props.onContextMenu(event, _this.props.index);
    });

    _defineProperty(_assertThisInitialized(_this), "_onDoubleClick", function (
    /*object*/
    event) {
      _this.props.onDoubleClick(event, _this.props.index);
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseUp", function (
    /*object*/
    event) {
      _this.props.onMouseUp(event, _this.props.index);
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseDown", function (
    /*object*/
    event) {
      _this.props.onMouseDown(event, _this.props.index);
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseEnter", function (
    /*object*/
    event) {
      /**
       * This is necessary so that onMouseLeave is fired with the initial
       * row index since this row could be updated with a different index
       * when scrolling.
       */
      _this.mouseLeaveIndex = _this.props.index;

      if (_this.props.onMouseEnter) {
        _this.props.onMouseEnter(event, _this.props.index);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseLeave", function (
    /*object*/
    event) {
      if (_this.mouseLeaveIndex === null) {
        _this.mouseLeaveIndex = _this.props.index;
      }

      _this.props.onMouseLeave(event, _this.mouseLeaveIndex);

      _this.mouseLeaveIndex = null;
    });

    _defineProperty(_assertThisInitialized(_this), "_onTouchStart", function (
    /*object*/
    event) {
      _this.props.onTouchStart(event, _this.props.index);
    });

    _defineProperty(_assertThisInitialized(_this), "_onTouchEnd", function (
    /*object*/
    event) {
      _this.props.onTouchEnd(event, _this.props.index);
    });

    _defineProperty(_assertThisInitialized(_this), "_onTouchMove", function (
    /*object*/
    event) {
      _this.props.onTouchMove(event, _this.props.index);
    });

    return _this;
  }

  _createClass(FixedDataTableRowImpl, [{
    key: "render",
    value: function render()
    /*object*/
    {
      if (this.props.fake) {
        return null;
      }

      var subRowHeight = this.props.subRowHeight || 0;
      var style = {
        width: this.props.width,
        height: this.props.height + subRowHeight
      };
      var className = (0, _cx["default"])({
        'fixedDataTableRowLayout/main': true,
        'public/fixedDataTableRow/main': true,
        'public/fixedDataTableRow/highlighted': this.props.index % 2 === 1,
        'public/fixedDataTableRow/odd': this.props.index % 2 === 1,
        'public/fixedDataTableRow/even': this.props.index % 2 === 0
      });
      var fixedColumnsWidth = (0, _widthHelper.sumPropWidths)(this.props.fixedColumns);

      var fixedColumns = /*#__PURE__*/_react["default"].createElement(_FixedDataTableCellGroup["default"], {
        key: "fixed_cells",
        isScrolling: this.props.isScrolling,
        height: this.props.height,
        cellGroupWrapperHeight: this.props.cellGroupWrapperHeight,
        left: 0,
        width: fixedColumnsWidth,
        zIndex: 2,
        columns: this.props.fixedColumns,
        touchEnabled: this.props.touchEnabled,
        onColumnResize: this.props.onColumnResize,
        onColumnReorder: this.props.onColumnReorder,
        onColumnReorderMove: this.props.onColumnReorderMove,
        onColumnReorderEnd: this.props.onColumnReorderEnd,
        isColumnReordering: this.props.isColumnReordering,
        columnReorderingData: this.props.columnReorderingData,
        rowHeight: this.props.height,
        rowIndex: this.props.index,
        isHeaderOrFooter: this.props.isHeaderOrFooter,
        isRTL: this.props.isRTL
      });

      var columnsLeftShadow = this._renderColumnsLeftShadow(fixedColumnsWidth);

      var fixedRightColumnsWidth = (0, _widthHelper.sumPropWidths)(this.props.fixedRightColumns);
      var scrollbarOffset = this.props.showScrollbarY ? this.props.scrollbarYWidth : 0;

      var fixedRightColumns = /*#__PURE__*/_react["default"].createElement(_FixedDataTableCellGroup["default"], {
        key: "fixed_right_cells",
        isScrolling: this.props.isScrolling,
        height: this.props.height,
        cellGroupWrapperHeight: this.props.cellGroupWrapperHeight,
        offsetLeft: this.props.width - fixedRightColumnsWidth - scrollbarOffset,
        width: fixedRightColumnsWidth,
        zIndex: 2,
        columns: this.props.fixedRightColumns,
        touchEnabled: this.props.touchEnabled,
        onColumnResize: this.props.onColumnResize,
        onColumnReorder: this.props.onColumnReorder,
        onColumnReorderMove: this.props.onColumnReorderMove,
        onColumnReorderEnd: this.props.onColumnReorderEnd,
        isColumnReordering: this.props.isColumnReordering,
        columnReorderingData: this.props.columnReorderingData,
        rowHeight: this.props.height,
        rowIndex: this.props.index,
        isHeaderOrFooter: this.props.isHeaderOrFooter,
        isRTL: this.props.isRTL
      });

      var fixedRightColumnsShadow = fixedRightColumnsWidth ? this._renderFixedRightColumnsShadow(this.props.width - fixedRightColumnsWidth - scrollbarOffset - 5) : null;

      var scrollableColumns = /*#__PURE__*/_react["default"].createElement(_FixedDataTableCellGroup["default"], {
        key: "scrollable_cells",
        isScrolling: this.props.isScrolling,
        height: this.props.height,
        cellGroupWrapperHeight: this.props.cellGroupWrapperHeight,
        align: "right",
        left: this.props.scrollLeft,
        offsetLeft: fixedColumnsWidth,
        width: this.props.width - fixedColumnsWidth - fixedRightColumnsWidth - scrollbarOffset,
        zIndex: 0,
        columns: this.props.scrollableColumns,
        touchEnabled: this.props.touchEnabled,
        onColumnResize: this.props.onColumnResize,
        onColumnReorder: this.props.onColumnReorder,
        onColumnReorderMove: this.props.onColumnReorderMove,
        onColumnReorderEnd: this.props.onColumnReorderEnd,
        isColumnReordering: this.props.isColumnReordering,
        columnReorderingData: this.props.columnReorderingData,
        rowHeight: this.props.height,
        rowIndex: this.props.index,
        isHeaderOrFooter: this.props.isHeaderOrFooter,
        isRTL: this.props.isRTL
      });

      var scrollableColumnsWidth = (0, _widthHelper.sumPropWidths)(this.props.scrollableColumns);

      var columnsRightShadow = this._renderColumnsRightShadow(fixedColumnsWidth + scrollableColumnsWidth);

      var rowExpanded = this._getRowExpanded(subRowHeight);

      var rowExpandedStyle = {
        height: subRowHeight,
        top: this.props.height,
        width: this.props.width
      };
      var scrollbarSpacer = null;

      if (this.props.showScrollbarY) {
        var spacerStyles = {
          width: scrollbarOffset,
          height: this.props.height,
          // Since the box-sizing = border-box the border on the table is included in the width
          // so we need to account for the left and right border
          left: this.props.isRTL ? 2 : this.props.width - scrollbarOffset - 2
        };
        scrollbarSpacer = /*#__PURE__*/_react["default"].createElement("div", {
          style: spacerStyles,
          className: (0, _cx["default"])('public/fixedDataTable/scrollbarSpacer')
        });
      }

      return /*#__PURE__*/_react["default"].createElement("div", _extends({
        className: (0, _joinClasses["default"])(className, this.props.className),
        role: 'row',
        "aria-rowindex": this.props.ariaRowIndex
      }, this.props.attributes, {
        onClick: this.props.onClick ? this._onClick : null,
        onContextMenu: this.props.onContextMenu ? this._onContextMenu : null,
        onDoubleClick: this.props.onDoubleClick ? this._onDoubleClick : null,
        onMouseDown: this.props.onMouseDown ? this._onMouseDown : null,
        onMouseUp: this.props.onMouseUp ? this._onMouseUp : null,
        onMouseEnter: this.props.onMouseEnter || this.props.onMouseLeave ? this._onMouseEnter : null,
        onMouseLeave: this.props.onMouseLeave ? this._onMouseLeave : null,
        onTouchStart: this.props.onTouchStart ? this._onTouchStart : null,
        onTouchEnd: this.props.onTouchEnd ? this._onTouchEnd : null,
        onTouchMove: this.props.onTouchMove ? this._onTouchMove : null,
        style: style
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _cx["default"])('fixedDataTableRowLayout/body')
      }, fixedColumns, scrollableColumns, columnsLeftShadow, fixedRightColumns, fixedRightColumnsShadow, scrollbarSpacer), rowExpanded && /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _cx["default"])('fixedDataTableRowLayout/rowExpanded'),
        style: rowExpandedStyle
      }, rowExpanded), columnsRightShadow);
    }
  }]);

  return FixedDataTableRowImpl;
}(_react["default"].Component);

_defineProperty(FixedDataTableRowImpl, "propTypes", {
  isScrolling: _propTypes["default"].bool,

  /**
   * Array of data for the fixed columns.
   */
  fixedColumns: _propTypes["default"].array.isRequired,

  /**
   * Array of <FixedDataTableColumn /> for the fixed columns positioned at end of the table.
   */
  fixedRightColumns: _propTypes["default"].array.isRequired,

  /**
   * Height of the row.
   */
  height: _propTypes["default"].number.isRequired,

  /**
   * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
   */
  cellGroupWrapperHeight: _propTypes["default"].number,

  /**
   * Height of the content to be displayed below the row.
   */
  subRowHeight: _propTypes["default"].number,

  /**
   * the row expanded.
   */
  rowExpanded: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].func]),

  /**
   * The row index.
   */
  index: _propTypes["default"].number.isRequired,

  /**
   * Array of data for the scrollable columns.
   */
  scrollableColumns: _propTypes["default"].array.isRequired,

  /**
   * The distance between the left edge of the table and the leftmost portion
   * of the row currently visible in the table.
   */
  scrollLeft: _propTypes["default"].number.isRequired,

  /**
   * Pass true to not render the row. This is used internally for buffering rows.
   */
  fake: _propTypes["default"].bool,

  /**
   * Width of the row.
   */
  width: _propTypes["default"].number.isRequired,

  /**
   * Fire when a row is clicked.
   */
  onClick: _propTypes["default"].func,

  /**
   * Fire when a contextual-menu is requested above a row.
   */
  onContextMenu: _propTypes["default"].func,

  /**
   * Fire when a row is double clicked.
   */
  onDoubleClick: _propTypes["default"].func,

  /**
   * Callback for when resizer knob (in FixedDataTableCell) is clicked
   * to initialize resizing. Please note this is only on the cells
   * in the header.
   * @param number combinedWidth
   * @param number leftOffset
   * @param number cellWidth
   * @param number|string columnKey
   * @param object event
   */
  onColumnResize: _propTypes["default"].func,
  isColumnReordering: _propTypes["default"].bool,

  /**
   * Callback for when reorder handle (in FixedDataTableCell) is clicked
   * to initialize reordering. Please note this is only on the cells
   * in the header.
   * @param number|string columnKey
   * @param number cellWidth
   * @param number leftOffset
   * @param object event
   */
  onColumnReorder: _propTypes["default"].func,

  /**
   * Callback for when a cell is moved while reordering.
   * @param number distance
   */
  onColumnReorderMove: _propTypes["default"].func,

  /**
   * Callback for when the mouse is released to complete reordering.
   * @param number distance
   */
  onColumnReorderEnd: _propTypes["default"].func,
  touchEnabled: _propTypes["default"].bool,

  /**
   * Whether the row is part of the header or footer.
   */
  isHeaderOrFooter: _propTypes["default"].bool,

  /**
   * The value of the aria-rowindex attribute.
   */
  ariaRowIndex: _propTypes["default"].number,

  /**
   * Whether the grid should be in RTL mode
   */
  isRTL: _propTypes["default"].bool,

  /**
   * DOM attributes to be applied to the row.
   */
  attributes: _propTypes["default"].object
});

var FixedDataTableRow = /*#__PURE__*/function (_React$Component2) {
  _inherits(FixedDataTableRow, _React$Component2);

  var _super2 = _createSuper(FixedDataTableRow);

  function FixedDataTableRow(props) {
    var _this2;

    _classCallCheck(this, FixedDataTableRow);

    _this2 = _super2.call(this, props);
    _this2._initialRender = true;
    return _this2;
  }

  _createClass(FixedDataTableRow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._initialRender = false;
    }
  }, {
    key: "render",
    value: function render()
    /*object*/
    {
      var style = {
        width: this.props.width,
        height: this.props.height,
        zIndex: this.props.zIndex ? this.props.zIndex : 0,
        display: this.props.visible ? 'block' : 'none'
      };
      (0, _FixedDataTableTranslateDOMPosition["default"])(style, 0, this.props.offsetTop, this._initialRender, this.props.isRTL);

      var _this$props = this.props,
          offsetTop = _this$props.offsetTop,
          zIndex = _this$props.zIndex,
          visible = _this$props.visible,
          rowProps = _objectWithoutProperties(_this$props, ["offsetTop", "zIndex", "visible"]);

      return /*#__PURE__*/_react["default"].createElement("div", {
        style: style,
        className: (0, _cx["default"])('fixedDataTableRowLayout/rowWrapper')
      }, /*#__PURE__*/_react["default"].createElement(FixedDataTableRowImpl, rowProps));
    }
  }]);

  return FixedDataTableRow;
}(_react["default"].Component);

_defineProperty(FixedDataTableRow, "propTypes", {
  isScrolling: _propTypes["default"].bool,

  /**
   * Height of the row.
   */
  height: _propTypes["default"].number.isRequired,

  /**
   * Z-index on which the row will be displayed. Used e.g. for keeping
   * header and footer in front of other rows.
   */
  zIndex: _propTypes["default"].number,

  /**
   * The vertical position where the row should render itself
   */
  offsetTop: _propTypes["default"].number.isRequired,

  /**
   * Pass false to hide the row via CSS
   */
  visible: _propTypes["default"].bool.isRequired,

  /**
   * Width of the row.
   */
  width: _propTypes["default"].number.isRequired
});

var _default = FixedDataTableRow;
exports["default"] = _default;