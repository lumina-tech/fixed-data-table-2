"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DOMMouseMoveTracker = _interopRequireDefault(require('./DOMMouseMoveTracker'));

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FixedDataTableEventHelper = _interopRequireDefault(require('./FixedDataTableEventHelper'));

var _cx = _interopRequireDefault(require('./cx'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var FixedDataTableColumnReorderHandle = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(FixedDataTableColumnReorderHandle, _React$PureComponent);

  var _super = _createSuper(FixedDataTableColumnReorderHandle);

  function FixedDataTableColumnReorderHandle() {
    var _this;

    _classCallCheck(this, FixedDataTableColumnReorderHandle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state",
    /*object*/
    {
      dragDistance: 0
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (event) {
      var targetRect = event.target.getBoundingClientRect();

      var coordinates = _FixedDataTableEventHelper["default"].getCoordinatesFromEvent(event);

      var mouseLocationInElement = coordinates.x - targetRect.left;
      var mouseLocationInRelationToColumnGroup = mouseLocationInElement + event.target.parentElement.offsetLeft;
      _this._mouseMoveTracker = new _DOMMouseMoveTracker["default"](_this._onMove, _this._onColumnReorderEnd, document.body, _this.props.touchEnabled);

      _this._mouseMoveTracker.captureMouseMoves(event);

      _this.setState({
        dragDistance: 0
      });

      _this.props.onMouseDown({
        columnKey: _this.props.columnKey,
        mouseLocation: {
          dragDistance: 0,
          inElement: mouseLocationInElement,
          inColumnGroup: mouseLocationInRelationToColumnGroup
        }
      });

      _this._distance = 0;
      _this._animating = true;
      _this.frameId = requestAnimationFrame(_this._updateState);
      /**
       * This prevents the rows from moving around when we drag the
       * headers on touch devices.
       */

      if (_this.props.touchEnabled) {
        event.stopPropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onMove", function (
    /*number*/
    deltaX) {
      _this._distance = _this.state.dragDistance + deltaX * (_this.props.isRTL ? -1 : 1);
    });

    _defineProperty(_assertThisInitialized(_this), "_onColumnReorderEnd", function (
    /*boolean*/
    cancelReorder) {
      _this._animating = false;
      cancelAnimationFrame(_this.frameId);
      _this.frameId = null;

      _this._mouseMoveTracker.releaseMouseMoves();

      _this.props.columnReorderingData.cancelReorder = cancelReorder;

      _this.props.onColumnReorderEnd();
    });

    _defineProperty(_assertThisInitialized(_this), "_updateState", function () {
      if (_this._animating) {
        _this.frameId = requestAnimationFrame(_this._updateState);
      }

      _this.setState({
        dragDistance: _this._distance
      });

      _this.props.onColumnReorderMove(_this._distance);
    });

    return _this;
  }

  _createClass(FixedDataTableColumnReorderHandle, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._mouseMoveTracker) {
        cancelAnimationFrame(this.frameId);
        this.frameId = null;

        this._mouseMoveTracker.releaseMouseMoves();

        this._mouseMoveTracker = null;
      }
    }
  }, {
    key: "render",
    value: function render()
    /*object*/
    {
      var style = {
        height: this.props.height
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _cx["default"])({
          'fixedDataTableCellLayout/columnReorderContainer': true,
          'fixedDataTableCellLayout/columnReorderContainer/active': false
        }),
        onMouseDown: this.onMouseDown,
        onTouchStart: this.props.touchEnabled ? this.onMouseDown : null,
        onTouchEnd: this.props.touchEnabled ? function (e) {
          return e.stopPropagation();
        } : null,
        onTouchMove: this.props.touchEnabled ? function (e) {
          return e.stopPropagation();
        } : null,
        style: style
      });
    }
  }]);

  return FixedDataTableColumnReorderHandle;
}(_react["default"].PureComponent);

_defineProperty(FixedDataTableColumnReorderHandle, "propTypes", {
  /**
   * When resizing is complete this is called.
   */
  onColumnReorderEnd: _propTypes["default"].func,

  /**
   * Column key for the column being reordered.
   */
  columnKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),

  /**
   * Whether the reorder handle should respond to touch events or not.
   */
  touchEnabled: _propTypes["default"].bool,

  /**
   * If the component should render for RTL direction
   */
  isRTL: _propTypes["default"].bool
});

var _default = FixedDataTableColumnReorderHandle;
exports["default"] = _default;