"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DOMMouseMoveTracker = _interopRequireDefault(require('./DOMMouseMoveTracker'));

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clamp = _interopRequireDefault(require('./clamp'));

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

var ColumnResizerLine = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ColumnResizerLine, _React$PureComponent);

  var _super = _createSuper(ColumnResizerLine);

  function ColumnResizerLine() {
    var _this;

    _classCallCheck(this, ColumnResizerLine);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state",
    /*object*/
    {
      width: 0,
      cursorDelta: 0
    });

    _defineProperty(_assertThisInitialized(_this), "_onMove", function (
    /*number*/
    deltaX) {
      if (_this.props.isRTL) {
        deltaX = -deltaX;
      }

      var newWidth = _this.state.cursorDelta + deltaX;
      var newColumnWidth = (0, _clamp["default"])(newWidth, _this.props.minWidth, _this.props.maxWidth); // Please note cursor delta is the different between the currently width
      // and the new width.

      _this.setState({
        width: newColumnWidth,
        cursorDelta: newWidth
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onColumnResizeEnd", function () {
      _this._mouseMoveTracker.releaseMouseMoves();

      _this.props.onColumnResizeEnd(_this.state.width, _this.props.columnKey);
    });

    return _this;
  }

  _createClass(ColumnResizerLine, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.initialEvent && !this._mouseMoveTracker.isDragging()) {
        this._mouseMoveTracker.captureMouseMoves(this.props.initialEvent);

        this.setState({
          width: this.props.initialWidth,
          cursorDelta: this.props.initialWidth
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mouseMoveTracker = new _DOMMouseMoveTracker["default"](this._onMove, this._onColumnResizeEnd, document.body, this.props.touchEnabled);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mouseMoveTracker.releaseMouseMoves();

      this._mouseMoveTracker = null;
    }
  }, {
    key: "render",
    value: function render()
    /*object*/
    {
      var style = {
        width: this.state.width,
        height: this.props.height
      };

      if (this.props.isRTL) {
        style.right = this.props.leftOffset;
      } else {
        style.left = this.props.leftOffset;
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _cx["default"])({
          'fixedDataTableColumnResizerLineLayout/main': true,
          'fixedDataTableColumnResizerLineLayout/hiddenElem': !this.props.visible,
          'public/fixedDataTableColumnResizerLine/main': true
        }),
        style: style
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _cx["default"])('fixedDataTableColumnResizerLineLayout/mouseArea'),
        style: {
          height: this.props.height
        }
      }));
    }
  }]);

  return ColumnResizerLine;
}(_react["default"].PureComponent);

_defineProperty(ColumnResizerLine, "propTypes", {
  visible: _propTypes["default"].bool.isRequired,

  /**
   * This is the height of the line
   */
  height: _propTypes["default"].number.isRequired,

  /**
   * Offset from left border of the table, please note
   * that the line is a border on diff. So this is really the
   * offset of the column itself.
   */
  leftOffset: _propTypes["default"].number.isRequired,

  /**
   * Height of the clickable region of the line.
   * This is assumed to be at the top of the line.
   */
  knobHeight: _propTypes["default"].number.isRequired,

  /**
   * The line is a border on a diff, so this is essentially
   * the width of column.
   */
  initialWidth: _propTypes["default"].number,

  /**
   * The minimum width this dragger will collapse to
   */
  minWidth: _propTypes["default"].number,

  /**
   * The maximum width this dragger will collapse to
   */
  maxWidth: _propTypes["default"].number,

  /**
   * Initial click event on the header cell.
   */
  initialEvent: _propTypes["default"].object,

  /**
   * When resizing is complete this is called.
   */
  onColumnResizeEnd: _propTypes["default"].func,

  /**
   * Column key for the column being resized.
   */
  columnKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),

  /**
   * Whether the resize handle should respond to touch events or not.
   */
  touchEnabled: _propTypes["default"].bool,

  /**
   * Whether the line should render in RTL mode
   */
  isRTL: _propTypes["default"].bool
});

var _default = ColumnResizerLine;
exports["default"] = _default;