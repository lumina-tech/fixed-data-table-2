"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DOMMouseMoveTracker = _interopRequireDefault(require('./DOMMouseMoveTracker'));

var _Keys = _interopRequireDefault(require('./Keys'));

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ReactDOM = _interopRequireDefault(require('./ReactDOM'));

var _ReactWheelHandler = _interopRequireDefault(require('./ReactWheelHandler'));

var _cx = _interopRequireDefault(require('./cx'));

var _emptyFunction = _interopRequireDefault(require('./emptyFunction'));

var _FixedDataTableTranslateDOMPosition = _interopRequireDefault(require('./FixedDataTableTranslateDOMPosition'));

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

var cssVar = require('./cssVar');

var UNSCROLLABLE_STATE = {
  position: 0,
  scrollable: false
};
var FACE_MARGIN = parseInt(cssVar('scrollbar-face-margin'), 10);
var FACE_MARGIN_2 = FACE_MARGIN * 2;
var FACE_SIZE_MIN = 30;
var KEYBOARD_SCROLL_AMOUNT = 40;
var _lastScrolledScrollbar = null;

var Scrollbar = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Scrollbar, _React$PureComponent);

  var _super = _createSuper(Scrollbar);

  function Scrollbar(_props)
  /*object*/
  {
    var _this;

    _classCallCheck(this, Scrollbar);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "_onRefFace", function (ref) {
      return _this._faceRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "_onRefRoot", function (ref) {
      return _this._rootRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "scrollBy", function (
    /*number*/
    delta) {
      _this._onWheel(delta);
    });

    _defineProperty(_assertThisInitialized(_this), "_shouldHandleX", function (
    /*number*/
    delta) {
      return (
        /*boolean*/
        _this.props.orientation === 'horizontal' ? _this._shouldHandleChange(delta) : false
      );
    });

    _defineProperty(_assertThisInitialized(_this), "_shouldHandleY", function (
    /*number*/
    delta) {
      return (
        /*boolean*/
        _this.props.orientation !== 'horizontal' ? _this._shouldHandleChange(delta) : false
      );
    });

    _defineProperty(_assertThisInitialized(_this), "_shouldHandleChange", function (
    /*number*/
    delta)
    /*boolean*/
    {
      var nextState = _this._calculateState(_this.state.position + delta, _this.props.size, _this.props.contentSize, _this.props.orientation);

      return nextState.position !== _this.state.position;
    });

    _defineProperty(_assertThisInitialized(_this), "_calculateState", function (
    /*number*/
    position,
    /*number*/
    size,
    /*number*/
    contentSize,
    /*string*/
    orientation)
    /*object*/
    {
      var clampedSize = Math.max(1, size);

      if (contentSize <= clampedSize) {
        return UNSCROLLABLE_STATE;
      }

      var stateKey = "".concat(position, "_").concat(clampedSize, "_").concat(contentSize, "_").concat(orientation);

      if (_this._stateKey === stateKey) {
        return _this._stateForKey;
      } // There are two types of positions here.
      // 1) Phisical position: changed by mouse / keyboard
      // 2) Logical position: changed by props.
      // The logical position will be kept as as internal state and the `render()`
      // function will translate it into physical position to render.


      var isHorizontal = orientation === 'horizontal';
      var scale = clampedSize / contentSize;
      var faceSize = clampedSize * scale;

      if (faceSize < FACE_SIZE_MIN) {
        scale = (clampedSize - FACE_SIZE_MIN) / (contentSize - clampedSize);
        faceSize = FACE_SIZE_MIN;
      }

      var scrollable = true;
      var maxPosition = contentSize - clampedSize;

      if (position < 0) {
        position = 0;
      } else if (position > maxPosition) {
        position = maxPosition;
      }

      var isDragging = _this._mouseMoveTracker ? _this._mouseMoveTracker.isDragging() : false; // This function should only return flat values that can be compared quiclky
      // by `ReactComponentWithPureRenderMixin`.

      var state = {
        faceSize: faceSize,
        isDragging: isDragging,
        isHorizontal: isHorizontal,
        position: position,
        scale: scale,
        scrollable: scrollable
      }; // cache the state for later use.

      _this._stateKey = stateKey;
      _this._stateForKey = state;
      return state;
    });

    _defineProperty(_assertThisInitialized(_this), "_onWheelY", function (
    /*number*/
    deltaX,
    /*number*/
    deltaY) {
      _this._onWheel(deltaY);
    });

    _defineProperty(_assertThisInitialized(_this), "_onWheelX", function (
    /*number*/
    deltaX,
    /*number*/
    deltaY) {
      _this._onWheel(deltaX);
    });

    _defineProperty(_assertThisInitialized(_this), "_onWheel", function (
    /*number*/
    delta) {
      var props = _this.props; // The mouse may move faster then the animation frame does.
      // Use `requestAnimationFrame` to avoid over-updating.

      _this._setNextState(_this._calculateState(_this.state.position + delta, props.size, props.contentSize, props.orientation));
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseDown", function (
    /*object*/
    event) {
      var nextState;

      if (event.target !== _this._faceRef) {
        // Both `offsetX` and `layerX` are non-standard DOM property but they are
        // magically available for browsers somehow.
        var nativeEvent = event.nativeEvent;
        var position = _this.state.isHorizontal ? nativeEvent.offsetX || nativeEvent.layerX || _this.getTouchX(nativeEvent) : nativeEvent.offsetY || nativeEvent.layerY || _this.getTouchY(nativeEvent); // MouseDown on the scroll-track directly, move the center of the
        // scroll-face to the mouse position.

        var props = _this.props;
        position /= _this.state.scale;
        nextState = _this._calculateState(position - _this.state.faceSize * 0.5 / _this.state.scale, props.size, props.contentSize, props.orientation);
      } else {
        nextState = {};
      }

      nextState.focused = true;

      _this._setNextState(nextState);

      _this._mouseMoveTracker.captureMouseMoves(event); // Focus the node so it may receive keyboard event.


      _this._rootRef.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "_onTouchCancel", function (
    /*object*/
    event) {
      event.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "_onTouchEnd", function (
    /*object*/
    event) {
      event.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "_onTouchMove", function (
    /*object*/
    event) {
      event.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "_onTouchStart", function (
    /*object*/
    event) {
      event.stopPropagation();

      _this._onMouseDown(event);
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseMove", function (
    /*number*/
    deltaX,
    /*number*/
    deltaY) {
      var props = _this.props;
      var delta = _this.state.isHorizontal ? deltaX * (_this.props.isRTL ? -1 : 1) : deltaY;
      delta /= _this.state.scale;

      _this._setNextState(_this._calculateState(_this.state.position + delta, props.size, props.contentSize, props.orientation));
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseMoveEnd", function () {
      _this._nextState = null;

      _this._mouseMoveTracker.releaseMouseMoves();

      _this.setState({
        isDragging: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onKeyDown", function (
    /*object*/
    event) {
      var keyCode = event.keyCode;

      if (keyCode === _Keys["default"].TAB) {
        // Let focus move off the scrollbar.
        return;
      }

      var distance = KEYBOARD_SCROLL_AMOUNT;
      var direction = 0;

      if (_this.state.isHorizontal) {
        switch (keyCode) {
          case _Keys["default"].HOME:
            direction = -1;
            distance = _this.props.contentSize;
            break;

          case _Keys["default"].LEFT:
            direction = -1;
            break;

          case _Keys["default"].RIGHT:
            direction = 1;
            break;

          default:
            return;
        }
      }

      if (!_this.state.isHorizontal) {
        switch (keyCode) {
          case _Keys["default"].SPACE:
            if (event.shiftKey) {
              direction = -1;
            } else {
              direction = 1;
            }

            break;

          case _Keys["default"].HOME:
            direction = -1;
            distance = _this.props.contentSize;
            break;

          case _Keys["default"].UP:
            direction = -1;
            break;

          case _Keys["default"].DOWN:
            direction = 1;
            break;

          case _Keys["default"].PAGE_UP:
            direction = -1;
            distance = _this.props.size;
            break;

          case _Keys["default"].PAGE_DOWN:
            direction = 1;
            distance = _this.props.size;
            break;

          default:
            return;
        }
      }

      event.preventDefault();
      var props = _this.props;

      _this._setNextState(_this._calculateState(_this.state.position + distance * direction, props.size, props.contentSize, props.orientation));
    });

    _defineProperty(_assertThisInitialized(_this), "_onFocus", function () {
      _this.setState({
        focused: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onBlur", function () {
      _this.setState({
        focused: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_blur", function () {
      var el = _ReactDOM["default"].findDOMNode(_assertThisInitialized(_this));

      if (!el) {
        return;
      }

      try {
        _this._onBlur();

        el.blur();
      } catch (oops) {// pass
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getTouchX", function (
    /*object*/
    e) {
      return Math.round(e.targetTouches[0].clientX - e.target.getBoundingClientRect().x);
    });

    _defineProperty(_assertThisInitialized(_this), "getTouchY", function (
    /*object*/
    e) {
      return Math.round(e.targetTouches[0].clientY - e.target.getBoundingClientRect().y);
    });

    _defineProperty(_assertThisInitialized(_this), "_setNextState", function (
    /*object*/
    nextState,
    /*?object*/
    props) {
      props = props || _this.props;
      var controlledPosition = props.position;
      var willScroll = _this.state.position !== nextState.position;

      if (controlledPosition === undefined) {
        var callback = willScroll ? _this._didScroll : undefined;

        _this.setState(nextState, callback);
      } else if (controlledPosition === nextState.position) {
        _this.setState(nextState);
      } else {
        // Scrolling is controlled. Don't update the state and let the owner
        // to update the scrollbar instead.
        if (nextState.position !== undefined && nextState.position !== _this.state.position) {
          _this.props.onScroll(nextState.position);
        }

        return;
      }

      if (willScroll && _lastScrolledScrollbar !== _assertThisInitialized(_this)) {
        _lastScrolledScrollbar && _lastScrolledScrollbar._blur();
        _lastScrolledScrollbar = _assertThisInitialized(_this);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_didScroll", function () {
      _this.props.onScroll(_this.state.position);
    });

    _this.state = _this._calculateState(_props.position || _props.defaultPosition || 0, _props.size, _props.contentSize, _props.orientation);
    _this._initialRender = true;
    return _this;
  }

  _createClass(Scrollbar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var controlledPosition = this.props.position;

      if (controlledPosition === undefined) {
        this._setNextState(this._calculateState(this.state.position, this.props.size, this.props.contentSize, this.props.orientation));
      } else {
        this._setNextState(this._calculateState(controlledPosition, this.props.size, this.props.contentSize, this.props.orientation), this.props);
      }
    }
  }, {
    key: "render",
    value: function render()
    /*?object*/
    {
      if (!this.state.scrollable) {
        return null;
      }

      var size = this.props.size;
      var mainStyle;
      var faceStyle;
      var isHorizontal = this.state.isHorizontal;
      var isVertical = !isHorizontal;
      var isActive = this.state.focused || this.state.isDragging;
      var faceSize = this.state.faceSize;
      var isOpaque = this.props.isOpaque;
      var verticalTop = this.props.verticalTop || 0;
      var mainClassName = (0, _cx["default"])({
        'ScrollbarLayout/main': true,
        'ScrollbarLayout/mainVertical': isVertical,
        'ScrollbarLayout/mainHorizontal': isHorizontal,
        'public/Scrollbar/main': true,
        'public/Scrollbar/mainOpaque': isOpaque,
        'public/Scrollbar/mainActive': isActive
      });
      var faceClassName = (0, _cx["default"])({
        'ScrollbarLayout/face': true,
        'ScrollbarLayout/faceHorizontal': isHorizontal,
        'ScrollbarLayout/faceVertical': isVertical,
        'public/Scrollbar/faceActive': isActive,
        'public/Scrollbar/face': true
      });
      var position = this.state.position * this.state.scale + FACE_MARGIN;

      if (isHorizontal) {
        mainStyle = {
          width: size
        };
        faceStyle = {
          width: faceSize - FACE_MARGIN_2,
          top: 0,
          bottom: 0
        };
        (0, _FixedDataTableTranslateDOMPosition["default"])(faceStyle, position, 0, this._initialRender, this.props.isRTL);
      } else {
        mainStyle = {
          top: verticalTop,
          height: size
        };

        if (this.props.isRTL) {
          mainStyle.left = mainStyle.right || 0;
          mainStyle.right = 'auto';
        }

        faceStyle = {
          height: faceSize - FACE_MARGIN_2
        };
        (0, _FixedDataTableTranslateDOMPosition["default"])(faceStyle, 0, position, this._initialRender, this.props.isRTL);
        faceStyle.left = 0;
        faceStyle.right = 0;
      }

      mainStyle.touchAction = 'none';
      mainStyle.zIndex = this.props.zIndex;

      if (this.props.trackColor === 'gray') {
        mainStyle.backgroundColor = cssVar('fbui-desktop-background-light');
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        onKeyDown: this._onKeyDown,
        onMouseDown: this._onMouseDown,
        onTouchCancel: this._onTouchCancel,
        onTouchEnd: this._onTouchEnd,
        onTouchMove: this._onTouchMove,
        onTouchStart: this._onTouchStart,
        className: mainClassName,
        style: mainStyle,
        ref: this._onRefRoot
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: this._onRefFace,
        className: faceClassName,
        style: faceStyle
      }));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var isHorizontal = this.props.orientation === 'horizontal';
      var onWheel = isHorizontal ? this._onWheelX : this._onWheelY;
      this._wheelHandler = new _ReactWheelHandler["default"](onWheel, this._shouldHandleX, // Should handle horizontal scroll
      this._shouldHandleY, // Should handle vertical scroll
      this.props.isRTL);
      this._rootRef && this._rootRef.addEventListener('wheel', this._wheelHandler.onWheel, {
        passive: false
      });
      this._mouseMoveTracker = new _DOMMouseMoveTracker["default"](this._onMouseMove, this._onMouseMoveEnd, document.documentElement, this.props.touchEnabled);

      if (this.props.position !== undefined && this.state.position !== this.props.position) {
        this._didScroll();
      }

      this._initialRender = false;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._rootRef && this._rootRef.removeEventListener('wheel', this._wheelHandler.onWheel, {
        passive: false
      });
      this._nextState = null;

      this._mouseMoveTracker.releaseMouseMoves();

      if (_lastScrolledScrollbar === this) {
        _lastScrolledScrollbar = null;
      }

      delete this._mouseMoveTracker;
    }
  }]);

  return Scrollbar;
}(_react["default"].PureComponent);

_defineProperty(Scrollbar, "propTypes", {
  contentSize: _propTypes["default"].number.isRequired,
  defaultPosition: _propTypes["default"].number,
  isOpaque: _propTypes["default"].bool,
  orientation: _propTypes["default"].oneOf(['vertical', 'horizontal']),
  onScroll: _propTypes["default"].func,
  position: _propTypes["default"].number,
  size: _propTypes["default"].number.isRequired,
  trackColor: _propTypes["default"].oneOf(['gray']),
  touchEnabled: _propTypes["default"].bool,
  zIndex: _propTypes["default"].number,
  verticalTop: _propTypes["default"].number,
  isRTL: _propTypes["default"].bool
});

_defineProperty(Scrollbar, "defaultProps",
/*object*/
{
  defaultPosition: 0,
  isOpaque: false,
  onScroll: _emptyFunction["default"],
  orientation: 'vertical',
  zIndex: 99
});

Scrollbar.KEYBOARD_SCROLL_AMOUNT = KEYBOARD_SCROLL_AMOUNT;
Scrollbar.SIZE = parseInt(cssVar('scrollbar-size'), 10);
Scrollbar.OFFSET = 1;
var _default = Scrollbar;
exports["default"] = _default;