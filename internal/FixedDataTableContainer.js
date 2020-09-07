"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var ActionTypes = _interopRequireWildcard(require('./ActionTypes'));

var _FixedDataTable = _interopRequireDefault(require('./FixedDataTable'));

var _FixedDataTableStore = _interopRequireDefault(require('./FixedDataTableStore'));

var _react = _interopRequireDefault(require('react'));

var _redux = require('redux');

var columnActions = _interopRequireWildcard(require('./columnActions'));

var _invariant = _interopRequireDefault(require('./invariant'));

var _pick = _interopRequireDefault(require('lodash/pick'));

var scrollActions = _interopRequireWildcard(require('./scrollActions'));

var _ScrollContainer = _interopRequireDefault(require('./ScrollContainer'));

var _Scrollbar = _interopRequireDefault(require('./Scrollbar'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var FixedDataTableContainer = /*#__PURE__*/function (_React$Component) {
  _inherits(FixedDataTableContainer, _React$Component);

  var _super = _createSuper(FixedDataTableContainer);

  function FixedDataTableContainer(props) {
    var _this;

    _classCallCheck(this, FixedDataTableContainer);

    _this = _super.call(this, props);
    _this.update = _this.update.bind(_assertThisInitialized(_this));
    _this.reduxStore = _FixedDataTableStore["default"].get();
    _this.scrollActions = (0, _redux.bindActionCreators)(scrollActions, _this.reduxStore.dispatch);
    _this.columnActions = (0, _redux.bindActionCreators)(columnActions, _this.reduxStore.dispatch);

    _this.reduxStore.dispatch({
      type: ActionTypes.INITIALIZE,
      props: props
    });

    _this.unsubscribe = _this.reduxStore.subscribe(_this.update);
    _this.state = _this.getBoundState();
    return _this;
  }

  _createClass(FixedDataTableContainer, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      (0, _invariant["default"])(nextProps.height !== undefined || nextProps.maxHeight !== undefined, 'You must set either a height or a maxHeight');
      this.reduxStore.dispatch({
        type: ActionTypes.PROP_CHANGE,
        newProps: nextProps,
        oldProps: this.props
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }

      this.reduxStore = null;
    }
  }, {
    key: "render",
    value: function render() {
      var fdt = /*#__PURE__*/_react["default"].createElement(_FixedDataTable["default"], _extends({}, this.props, this.state, {
        scrollActions: this.scrollActions,
        columnActions: this.columnActions
      })); // For backward compatibility, by default we render FDT-2 scrollbars


      if (this.props.defaultScrollbars) {
        return /*#__PURE__*/_react["default"].createElement(_ScrollContainer["default"], this.props, fdt);
      }

      return fdt;
    }
  }, {
    key: "getBoundState",
    value: function getBoundState() {
      var state = this.reduxStore.getState();
      var boundState = (0, _pick["default"])(state, ['columnGroupProps', 'columnProps', 'columnReorderingData', 'columnResizingData', 'elementHeights', 'elementTemplates', 'firstRowIndex', 'endRowIndex', 'isColumnReordering', 'isColumnResizing', 'maxScrollX', 'maxScrollY', 'rows', 'rowOffsets', 'rowSettings', 'scrollContentHeight', 'scrollFlags', 'scrollX', 'scrollY', 'scrolling', 'scrollJumpedX', 'scrollJumpedY', 'tableSize']);
      return boundState;
    }
  }, {
    key: "update",
    value: function update() {
      this.setState(this.getBoundState());
    }
  }]);

  return FixedDataTableContainer;
}(_react["default"].Component);

_defineProperty(FixedDataTableContainer, "defaultProps", {
  defaultScrollbars: true,
  scrollbarXHeight: _Scrollbar["default"].SIZE,
  scrollbarYWidth: _Scrollbar["default"].SIZE
});

var _default = FixedDataTableContainer;
exports["default"] = _default;