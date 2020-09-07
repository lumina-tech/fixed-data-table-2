"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require('react'));

var _Scrollbar = _interopRequireDefault(require('./Scrollbar'));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _joinClasses = _interopRequireDefault(require('./joinClasses'));

var _cx = _interopRequireDefault(require('./cx'));

var _isEmpty = _interopRequireDefault(require('lodash/isEmpty'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var ScrollContainer = /*#__PURE__*/function (_React$Component) {
  _inherits(ScrollContainer, _React$Component);

  var _super = _createSuper(ScrollContainer);

  function ScrollContainer() {
    var _this;

    _classCallCheck(this, ScrollContainer);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(_args));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "_onScrollBarsUpdate", function (args) {
      _this.setState(args);
    });

    _defineProperty(_assertThisInitialized(_this), "_onVerticalScroll", function (
    /*number*/
    scrollPos) {
      if (_this.state.scrollToY !== undefined) {
        _this.state.scrollToY(scrollPos);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onHorizontalScroll", function (
    /*number*/
    scrollPos) {
      if (_this.state.scrollToX !== undefined) {
        _this.state.scrollToX(scrollPos);
      }
    });

    return _this;
  }

  _createClass(ScrollContainer, [{
    key: "render",
    value: function render() {
      var scrollbarY = !(0, _isEmpty["default"])(this.state) && /*#__PURE__*/_react["default"].createElement(_Scrollbar["default"], {
        size: this.state.viewportHeight,
        contentSize: this.state.contentHeight,
        onScroll: this._onVerticalScroll,
        verticalTop: this.state.scrollbarYOffsetTop,
        position: this.state.scrollY,
        touchEnabled: this.props.touchScrollEnabled,
        isRTL: this.props.isRTL
      });

      var scrollbarX = !(0, _isEmpty["default"])(this.state) && /*#__PURE__*/_react["default"].createElement(HorizontalScrollbar, {
        contentSize: this.state.contentWidth,
        offset: this.state.scrollbarXOffsetTop,
        onScroll: this._onHorizontalScroll,
        position: this.state.scrollX,
        size: this.state.viewportWidth,
        touchEnabled: this.props.touchScrollEnabled,
        isRTL: this.props.isRTL
      });

      return /*#__PURE__*/_react["default"].cloneElement(this.props.children, {
        onScrollBarsUpdate: this._onScrollBarsUpdate,
        scrollbarX: scrollbarX,
        scrollbarY: scrollbarY
      });
    }
  }]);

  return ScrollContainer;
}(_react["default"].Component);

var HorizontalScrollbar = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(HorizontalScrollbar, _React$PureComponent);

  var _super2 = _createSuper(HorizontalScrollbar);

  function HorizontalScrollbar() {
    _classCallCheck(this, HorizontalScrollbar);

    return _super2.apply(this, arguments);
  }

  _createClass(HorizontalScrollbar, [{
    key: "render",
    value: function render()
    /*object*/
    {
      var _this$props = this.props,
          offset = _this$props.offset,
          size = _this$props.size;
      var outerContainerStyle = {
        height: _Scrollbar["default"].SIZE,
        width: size
      };
      var innerContainerStyle = {
        height: _Scrollbar["default"].SIZE,
        overflow: 'hidden',
        width: size,
        top: offset
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _joinClasses["default"])((0, _cx["default"])('public/fixedDataTable/horizontalScrollbar')),
        style: outerContainerStyle
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: innerContainerStyle
      }, /*#__PURE__*/_react["default"].createElement(_Scrollbar["default"], _extends({}, this.props, {
        isOpaque: true,
        orientation: "horizontal",
        offset: undefined
      }))));
    }
  }]);

  return HorizontalScrollbar;
}(_react["default"].PureComponent);

_defineProperty(HorizontalScrollbar, "propTypes", {
  contentSize: _propTypes["default"].number.isRequired,
  offset: _propTypes["default"].number.isRequired,
  onScroll: _propTypes["default"].func.isRequired,
  position: _propTypes["default"].number.isRequired,
  size: _propTypes["default"].number.isRequired,
  isRTL: _propTypes["default"].bool
});

var _default = ScrollContainer;
exports["default"] = _default;