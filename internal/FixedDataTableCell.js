"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _FixedDataTableCellDefault = _interopRequireDefault(require('./FixedDataTableCellDefault'));

var _FixedDataTableColumnReorderHandle = _interopRequireDefault(require('././FixedDataTableColumnReorderHandle'));

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _cx = _interopRequireDefault(require('./cx'));

var _joinClasses = _interopRequireDefault(require('./joinClasses'));

var _shallowEqual = _interopRequireDefault(require('./shallowEqual'));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var FixedDataTableCell = /*#__PURE__*/function (_React$Component) {
  _inherits(FixedDataTableCell, _React$Component);

  var _super = _createSuper(FixedDataTableCell);

  function FixedDataTableCell() {
    var _this;

    _classCallCheck(this, FixedDataTableCell);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isReorderingThisColumn: false,
      displacement: 0,
      reorderingDisplacement: 0
    });

    _defineProperty(_assertThisInitialized(_this), "_onColumnResizerMouseDown", function (
    /*object*/
    event) {
      _this.props.onColumnResize(_this.props.left, _this.props.width, _this.props.minWidth, _this.props.maxWidth, _this.props.columnKey, event);
      /**
       * This prevents the rows from moving around when we resize the
       * headers on touch devices.
       */


      if (_this.props.touchEnabled) {
        event.preventDefault();
        event.stopPropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onColumnReorderMouseDown", function (
    /*object*/
    event) {
      _this.props.onColumnReorder(_this.props.columnKey, _this.props.width, _this.props.left, event);
    });

    _defineProperty(_assertThisInitialized(_this), "_suppressEvent", function (
    /*object*/
    event) {
      event.preventDefault();
      event.stopPropagation();
    });

    return _this;
  }

  _createClass(FixedDataTableCell, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.isScrolling && this.props.rowIndex === nextProps.rowIndex) {
        return false;
      } //Performance check not enabled


      if (!nextProps.pureRendering) {
        return true;
      }

      var _this$props = this.props,
          oldCell = _this$props.cell,
          oldIsScrolling = _this$props.isScrolling,
          oldProps = _objectWithoutProperties(_this$props, ["cell", "isScrolling"]);

      var newCell = nextProps.cell,
          newIsScrolling = nextProps.isScrolling,
          newProps = _objectWithoutProperties(nextProps, ["cell", "isScrolling"]);

      if (!(0, _shallowEqual["default"])(oldProps, newProps)) {
        return true;
      }

      if (!oldCell || !newCell || oldCell.type !== newCell.type) {
        return true;
      }

      if (!(0, _shallowEqual["default"])(oldCell.props, newCell.props)) {
        return true;
      }

      return false;
    }
  }, {
    key: "render",
    value: function render()
    /*object*/
    {
      var _this$props2 = this.props,
          height = _this$props2.height,
          width = _this$props2.width,
          columnKey = _this$props2.columnKey,
          isHeaderOrFooter = _this$props2.isHeaderOrFooter,
          props = _objectWithoutProperties(_this$props2, ["height", "width", "columnKey", "isHeaderOrFooter"]);

      var style = {
        height: height,
        width: width
      };

      if (this.props.isRTL) {
        style.right = props.left;
      } else {
        style.left = props.left;
      }

      if (this.state.isReorderingThisColumn) {
        var DIR_SIGN = this.props.isRTL ? -1 : 1;
        style.transform = "translateX(".concat(this.state.displacement * DIR_SIGN, "px) translateZ(0)");
        style.zIndex = 1;
      }

      var className = (0, _joinClasses["default"])((0, _cx["default"])({
        'fixedDataTableCellLayout/main': true,
        'fixedDataTableCellLayout/lastChild': props.lastChild,
        'fixedDataTableCellLayout/alignRight': props.align === 'right',
        'fixedDataTableCellLayout/alignCenter': props.align === 'center',
        'public/fixedDataTableCell/alignRight': props.align === 'right',
        'public/fixedDataTableCell/highlighted': props.highlighted,
        'public/fixedDataTableCell/main': true,
        'public/fixedDataTableCell/hasReorderHandle': !!props.onColumnReorder,
        'public/fixedDataTableCell/reordering': this.state.isReorderingThisColumn
      }), props.className);
      var columnResizerComponent;

      if (props.onColumnResize) {
        var columnResizerStyle = {
          height: height
        };
        columnResizerComponent = /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _cx["default"])('fixedDataTableCellLayout/columnResizerContainer'),
          style: columnResizerStyle,
          onMouseDown: this._onColumnResizerMouseDown,
          onTouchStart: this.props.touchEnabled ? this._onColumnResizerMouseDown : null,
          onTouchEnd: this.props.touchEnabled ? this._suppressEvent : null,
          onTouchMove: this.props.touchEnabled ? this._suppressEvent : null
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _joinClasses["default"])((0, _cx["default"])('fixedDataTableCellLayout/columnResizerKnob'), (0, _cx["default"])('public/fixedDataTableCell/columnResizerKnob')),
          style: columnResizerStyle
        }));
      }

      var columnReorderComponent;

      if (props.onColumnReorder) {
        //header row
        columnReorderComponent = /*#__PURE__*/_react["default"].createElement(_FixedDataTableColumnReorderHandle["default"], _extends({
          columnKey: this.columnKey,
          touchEnabled: this.props.touchEnabled,
          onMouseDown: this._onColumnReorderMouseDown,
          onTouchStart: this._onColumnReorderMouseDown,
          height: height
        }, this.props));
      }

      var cellProps = {
        columnKey: columnKey,
        height: height,
        width: width
      };

      if (props.rowIndex >= 0) {
        cellProps.rowIndex = props.rowIndex;
      }

      var content;

      if ( /*#__PURE__*/_react["default"].isValidElement(props.cell)) {
        content = /*#__PURE__*/_react["default"].cloneElement(props.cell, cellProps);
      } else if (typeof props.cell === 'function') {
        content = props.cell(cellProps);
      } else {
        content = /*#__PURE__*/_react["default"].createElement(_FixedDataTableCellDefault["default"], cellProps, props.cell);
      }

      var role = isHeaderOrFooter ? 'columnheader' : 'gridcell';
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: className,
        style: style,
        role: role
      }, columnResizerComponent, columnReorderComponent, content);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var left = nextProps.left + prevState.displacement;
      var newState = {
        isReorderingThisColumn: false
      };

      if (!nextProps.isColumnReordering) {
        newState.displacement = 0;
        return newState;
      }

      var originalLeft = nextProps.columnReorderingData.originalLeft;
      var reorderCellLeft = originalLeft + nextProps.columnReorderingData.dragDistance;
      var farthestPossiblePoint = nextProps.columnGroupWidth - nextProps.columnReorderingData.columnWidth; // ensure the cell isn't being dragged out of the column group

      reorderCellLeft = Math.max(reorderCellLeft, 0);
      reorderCellLeft = Math.min(reorderCellLeft, farthestPossiblePoint); // check if current cell belongs to the column that's being reordered

      if (nextProps.columnKey === nextProps.columnReorderingData.columnKey) {
        newState.displacement = reorderCellLeft - nextProps.left;
        newState.isReorderingThisColumn = true;
        return newState;
      }

      var reorderCellRight = reorderCellLeft + nextProps.columnReorderingData.columnWidth;
      var reorderCellCenter = reorderCellLeft + nextProps.columnReorderingData.columnWidth / 2;
      var centerOfThisColumn = left + nextProps.width / 2;
      var cellIsBeforeOneBeingDragged = reorderCellCenter > centerOfThisColumn;
      var cellWasOriginallyBeforeOneBeingDragged = originalLeft > nextProps.left;
      var changedPosition = false;

      if (cellIsBeforeOneBeingDragged) {
        if (reorderCellLeft < centerOfThisColumn) {
          changedPosition = true;

          if (cellWasOriginallyBeforeOneBeingDragged) {
            newState.displacement = nextProps.columnReorderingData.columnWidth;
          } else {
            newState.displacement = 0;
          }
        }
      } else {
        if (reorderCellRight > centerOfThisColumn) {
          changedPosition = true;

          if (cellWasOriginallyBeforeOneBeingDragged) {
            newState.displacement = 0;
          } else {
            newState.displacement = nextProps.columnReorderingData.columnWidth * -1;
          }
        }
      }

      if (changedPosition) {
        if (cellIsBeforeOneBeingDragged) {
          if (!nextProps.columnReorderingData.columnAfter) {
            nextProps.columnReorderingData.columnAfter = nextProps.columnKey;
          }
        } else {
          nextProps.columnReorderingData.columnBefore = nextProps.columnKey;
        }
      } else if (cellIsBeforeOneBeingDragged) {
        nextProps.columnReorderingData.columnBefore = nextProps.columnKey;
      } else if (!nextProps.columnReorderingData.columnAfter) {
        nextProps.columnReorderingData.columnAfter = nextProps.columnKey;
      }

      return newState;
    }
  }]);

  return FixedDataTableCell;
}(_react["default"].Component);

_defineProperty(FixedDataTableCell, "propTypes_DISABLED_FOR_PERFORMANCE", {
  isScrolling: _propTypes["default"].bool,
  align: _propTypes["default"].oneOf(['left', 'center', 'right']),
  className: _propTypes["default"].string,
  highlighted: _propTypes["default"].bool,
  width: _propTypes["default"].number.isRequired,
  minWidth: _propTypes["default"].number,
  maxWidth: _propTypes["default"].number,
  height: _propTypes["default"].number.isRequired,
  cell: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element, _propTypes["default"].func]),
  columnKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),

  /**
   * The row index that will be passed to `cellRenderer` to render.
   */
  rowIndex: _propTypes["default"].number.isRequired,

  /**
   * Callback for when resizer knob (in FixedDataTableCell) is clicked
   * to initialize resizing. Please note this is only on the cells
   * in the header.
   * @param number combinedWidth
   * @param number left
   * @param number width
   * @param number minWidth
   * @param number maxWidth
   * @param number|string columnKey
   * @param object event
   */
  onColumnResize: _propTypes["default"].func,
  onColumnReorder: _propTypes["default"].func,

  /**
   * The left offset in pixels of the cell.
   */
  left: _propTypes["default"].number,

  /**
   * Flag for enhanced performance check
   */
  pureRendering: _propTypes["default"].bool,

  /**
   * Whether touch is enabled or not.
   */
  touchEnabled: _propTypes["default"].bool,

  /**
   * Whether the cell group is part of the header or footer
   */
  isHeaderOrFooter: _propTypes["default"].bool,

  /**
   * If the component should render for RTL direction
   */
  isRTL: _propTypes["default"].bool
});

_defineProperty(FixedDataTableCell, "defaultProps",
/*object*/
{
  align: 'left',
  highlighted: false
});

var _default = (0, _reactLifecyclesCompat.polyfill)(FixedDataTableCell);

exports["default"] = _default;