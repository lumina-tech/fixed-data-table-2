"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

/**
 * Component that defines the attributes of a table column group.
 */
var FixedDataTableColumnGroup = /*#__PURE__*/function (_React$Component) {
  _inherits(FixedDataTableColumnGroup, _React$Component);

  var _super = _createSuper(FixedDataTableColumnGroup);

  function FixedDataTableColumnGroup() {
    _classCallCheck(this, FixedDataTableColumnGroup);

    return _super.apply(this, arguments);
  }

  _createClass(FixedDataTableColumnGroup, [{
    key: "render",
    value: function render() {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('Component <FixedDataTableColumnGroup /> should never render');
      }

      return null;
    }
  }]);

  return FixedDataTableColumnGroup;
}(_react["default"].Component);

_defineProperty(FixedDataTableColumnGroup, "__TableColumnGroup__", true);

_defineProperty(FixedDataTableColumnGroup, "propTypes", {
  /**
   * The horizontal alignment of the table cell content.
   */
  align: _propTypes["default"].oneOf(['left', 'center', 'right']),

  /**
   * Controls if the column group is fixed when scrolling in the X axis.
   */
  fixed: _propTypes["default"].bool,

  /**
   * This is the header cell for this column group.
   * This can either be a string or a React element. Passing in a string
   * will render a default footer cell with that string. By default, the React
   * element passed in can expect to receive the following props:
   *
   * ```
   * props: {
   *   height: number // (supplied from the groupHeaderHeight)
   *   width: number // (supplied from the Column)
   * }
   * ```
   *
   * Because you are passing in your own React element, you can feel free to
   * pass in whatever props you may want or need.
   *
   * You can also pass in a function that returns a react elemnt, with the
   * props object above passed in as the first parameter.
   */
  header: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func])
});

_defineProperty(FixedDataTableColumnGroup, "defaultProps", {
  fixed: false
});

var _default = FixedDataTableColumnGroup;
exports["default"] = _default;