"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _FixedDataTableBufferedRows = _interopRequireDefault(require('./FixedDataTableBufferedRows'));

var _ColumnResizerLine = _interopRequireDefault(require('./ColumnResizerLine'));

var _FixedDataTableEventHelper = _interopRequireDefault(require('./FixedDataTableEventHelper'));

var _FixedDataTableRow = _interopRequireDefault(require('./FixedDataTableRow'));

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ReactTouchHandler = _interopRequireDefault(require('./ReactTouchHandler'));

var _ReactWheelHandler = _interopRequireDefault(require('./ReactWheelHandler'));

var _ariaAttributes = _interopRequireDefault(require('./ariaAttributes'));

var _columnTemplates = _interopRequireDefault(require('./columnTemplates'));

var _cx = _interopRequireDefault(require('./cx'));

var _debounceCore = _interopRequireDefault(require('./debounceCore'));

var _isNaN = _interopRequireDefault(require('lodash/isNaN'));

var _joinClasses = _interopRequireDefault(require('./joinClasses'));

var _scrollbarsVisible3 = _interopRequireDefault(require('./scrollbarsVisible'));

var _tableHeights = _interopRequireDefault(require('./tableHeights'));

var _shallowEqual = _interopRequireDefault(require('./shallowEqual'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var ARROW_SCROLL_SPEED = 25;
/**
 * Data grid component with fixed or scrollable header and columns.
 *
 * The layout of the data table is as follows:
 *
 * ```
 * +---------------------------------------------------+
 * | Fixed Column Group    | Scrollable Column Group   |
 * | Header                | Header                    |
 * |                       |                           |
 * +---------------------------------------------------+
 * |                       |                           |
 * | Fixed Header Columns  | Scrollable Header Columns |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * |                       |                           |
 * | Fixed Body Columns    | Scrollable Body Columns   |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * |                       |                           |
 * | Fixed Footer Columns  | Scrollable Footer Columns |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * ```
 *
 * - Fixed Column Group Header: These are the headers for a group
 *   of columns if included in the table that do not scroll
 *   vertically or horizontally.
 *
 * - Scrollable Column Group Header: The header for a group of columns
 *   that do not move while scrolling vertically, but move horizontally
 *   with the horizontal scrolling.
 *
 * - Fixed Header Columns: The header columns that do not move while scrolling
 *   vertically or horizontally.
 *
 * - Scrollable Header Columns: The header columns that do not move
 *   while scrolling vertically, but move horizontally with the horizontal
 *   scrolling.
 *
 * - Fixed Body Columns: The body columns that do not move while scrolling
 *   horizontally, but move vertically with the vertical scrolling.
 *
 * - Scrollable Body Columns: The body columns that move while scrolling
 *   vertically or horizontally.
 */

var FixedDataTable = /*#__PURE__*/function (_React$Component) {
  _inherits(FixedDataTable, _React$Component);

  var _super = _createSuper(FixedDataTable);

  function FixedDataTable(_props) {
    var _this;

    _classCallCheck(this, FixedDataTable);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "_shouldHandleTouchX", function (
    /*number*/
    delta) {
      return (
        /*boolean*/
        _this.props.touchScrollEnabled && _this._shouldHandleWheelX(delta)
      );
    });

    _defineProperty(_assertThisInitialized(_this), "_shouldHandleTouchY", function (
    /*number*/
    delta) {
      return (
        /*boolean*/
        _this.props.touchScrollEnabled && _this._shouldHandleWheelY(delta)
      );
    });

    _defineProperty(_assertThisInitialized(_this), "_shouldHandleWheelX", function (
    /*number*/
    delta)
    /*boolean*/
    {
      var _this$props = _this.props,
          maxScrollX = _this$props.maxScrollX,
          scrollFlags = _this$props.scrollFlags,
          scrollX = _this$props.scrollX;
      var overflowX = scrollFlags.overflowX;

      if (overflowX === 'hidden') {
        return false;
      }

      delta = Math.round(delta);

      if (delta === 0) {
        return false;
      }

      return delta < 0 && scrollX > 0 || delta >= 0 && scrollX < maxScrollX;
    });

    _defineProperty(_assertThisInitialized(_this), "_shouldHandleWheelY", function (
    /*number*/
    delta)
    /*boolean*/
    {
      var _this$props2 = _this.props,
          maxScrollY = _this$props2.maxScrollY,
          scrollFlags = _this$props2.scrollFlags,
          scrollY = _this$props2.scrollY;
      var overflowY = scrollFlags.overflowY;

      if (overflowY === 'hidden' || delta === 0) {
        return false;
      }

      delta = Math.round(delta);

      if (delta === 0) {
        return false;
      }

      return delta < 0 && scrollY > 0 || delta >= 0 && scrollY < maxScrollY;
    });

    _defineProperty(_assertThisInitialized(_this), "_reportContentHeight", function () {
      var _tableHeightsSelector = (0, _tableHeights["default"])(_this.props),
          contentHeight = _tableHeightsSelector.contentHeight;

      var onContentHeightChange = _this.props.onContentHeightChange;

      if (contentHeight !== _this._contentHeight && onContentHeightChange) {
        onContentHeightChange(contentHeight);
      }

      _this._contentHeight = contentHeight;
    });

    _defineProperty(_assertThisInitialized(_this), "_renderRows", function (
    /*number*/
    offsetTop, fixedCellTemplates, fixedRightCellTemplates, scrollableCellTemplates, bodyHeight,
    /*number*/
    ariaRowIndexOffset)
    /*object*/
    {
      var _scrollbarsVisible = (0, _scrollbarsVisible3["default"])(_this.props),
          scrollEnabledY = _scrollbarsVisible.scrollEnabledY;

      var props = _this.props;
      return /*#__PURE__*/_react["default"].createElement(_FixedDataTableBufferedRows["default"], {
        ariaRowIndexOffset: ariaRowIndexOffset,
        isScrolling: props.scrolling,
        fixedColumns: fixedCellTemplates,
        fixedRightColumns: fixedRightCellTemplates,
        firstViewportRowIndex: props.firstRowIndex,
        endViewportRowIndex: props.endRowIndex,
        height: bodyHeight,
        offsetTop: offsetTop,
        onRowClick: props.onRowClick,
        onRowContextMenu: props.onRowContextMenu,
        onRowDoubleClick: props.onRowDoubleClick,
        onRowMouseUp: props.onRowMouseUp,
        onRowMouseDown: props.onRowMouseDown,
        onRowMouseEnter: props.onRowMouseEnter,
        onRowMouseLeave: props.onRowMouseLeave,
        onRowTouchStart: props.touchScrollEnabled ? props.onRowTouchStart : null,
        onRowTouchEnd: props.touchScrollEnabled ? props.onRowTouchEnd : null,
        onRowTouchMove: props.touchScrollEnabled ? props.onRowTouchMove : null,
        rowClassNameGetter: props.rowClassNameGetter,
        rowExpanded: props.rowExpanded,
        rowKeyGetter: props.rowKeyGetter,
        rowSettings: props.rowSettings,
        scrollLeft: props.scrollX,
        scrollTop: props.scrollY,
        scrollableColumns: scrollableCellTemplates,
        showLastRowBorder: true,
        width: props.tableSize.width,
        rowsToRender: props.rows,
        rowOffsets: props.rowOffsets,
        showScrollbarY: scrollEnabledY,
        scrollbarYWidth: props.scrollbarYWidth,
        isRTL: props.isRTL
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onRef", function (div) {
      _this._divRef = div;

      if (_this.props.stopReactWheelPropagation) {
        _this._wheelHandler.setRoot(div);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onColumnResize", function (
    /*number*/
    combinedWidth,
    /*number*/
    leftOffset,
    /*number*/
    cellWidth,
    /*?number*/
    cellMinWidth,
    /*?number*/
    cellMaxWidth,
    /*number|string*/
    columnKey,
    /*object*/
    event) {
      var coordinates = _FixedDataTableEventHelper["default"].getCoordinatesFromEvent(event);

      var clientX = coordinates.x;
      var clientY = coordinates.y;

      _this.props.columnActions.resizeColumn({
        cellMinWidth: cellMinWidth,
        cellMaxWidth: cellMaxWidth,
        cellWidth: cellWidth,
        columnKey: columnKey,
        combinedWidth: combinedWidth,
        clientX: clientX,
        clientY: clientY,
        leftOffset: leftOffset
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onColumnReorder", function (
    /*string*/
    columnKey,
    /*number*/
    width,
    /*number*/
    left,
    /*object*/
    event) {
      _this.props.columnActions.startColumnReorder({
        scrollStart: _this.props.scrollX,
        columnKey: columnKey,
        width: width,
        left: left
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onColumnReorderMove", function (
    /*number*/
    deltaX) {
      _this.props.columnActions.moveColumnReorder(deltaX);
    });

    _defineProperty(_assertThisInitialized(_this), "_onColumnReorderEnd", function (
    /*object*/
    props,
    /*object*/
    event) {
      var _this$props3 = _this.props,
          columnActions = _this$props3.columnActions,
          _this$props3$columnRe = _this$props3.columnReorderingData,
          cancelReorder = _this$props3$columnRe.cancelReorder,
          columnAfter = _this$props3$columnRe.columnAfter,
          columnBefore = _this$props3$columnRe.columnBefore,
          columnKey = _this$props3$columnRe.columnKey,
          scrollStart = _this$props3$columnRe.scrollStart,
          onColumnReorderEndCallback = _this$props3.onColumnReorderEndCallback,
          onHorizontalScroll = _this$props3.onHorizontalScroll,
          scrollX = _this$props3.scrollX;
      columnActions.stopColumnReorder();

      if (cancelReorder) {
        return;
      }

      onColumnReorderEndCallback({
        columnAfter: columnAfter,
        columnBefore: columnBefore,
        reorderColumn: columnKey
      });

      if (scrollStart !== scrollX && onHorizontalScroll) {
        onHorizontalScroll(scrollX);
      }

      ;
    });

    _defineProperty(_assertThisInitialized(_this), "_onScroll", function (
    /*number*/
    deltaX,
    /*number*/
    deltaY) {
      var _this$props4 = _this.props,
          maxScrollX = _this$props4.maxScrollX,
          maxScrollY = _this$props4.maxScrollY,
          onHorizontalScroll = _this$props4.onHorizontalScroll,
          onVerticalScroll = _this$props4.onVerticalScroll,
          scrollActions = _this$props4.scrollActions,
          scrollFlags = _this$props4.scrollFlags,
          scrollX = _this$props4.scrollX,
          scrollY = _this$props4.scrollY,
          scrolling = _this$props4.scrolling;
      var overflowX = scrollFlags.overflowX,
          overflowY = scrollFlags.overflowY;
      var x = scrollX;
      var y = scrollY;

      if (Math.abs(deltaY) > Math.abs(deltaX) && overflowY !== 'hidden') {
        y += deltaY;
        y = y < 0 ? 0 : y;
        y = y > maxScrollY ? maxScrollY : y; //NOTE (jordan) This is a hacky workaround to prevent FDT from setting its internal state

        if (onVerticalScroll ? onVerticalScroll(y) : true) {
          scrollActions.scrollToY(y);
        }
      } else if (deltaX && overflowX !== 'hidden') {
        x += deltaX;
        x = x < 0 ? 0 : x;
        x = x > maxScrollX ? maxScrollX : x; // This is a workaround to prevent content blurring. This happens when translate3d
        // is applied with non-rounded values to elements having text.

        var roundedX = Math.round(x); //NOTE (asif) This is a hacky workaround to prevent FDT from setting its internal state

        if (onHorizontalScroll ? onHorizontalScroll(roundedX) : true) {
          scrollActions.scrollToX(roundedX);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_scrollTo", function (
    /*number*/
    scrollX,
    /*number*/
    scrollY) {
      _this._scrollToX(scrollX);

      _this._scrollToY(scrollY);
    });

    _defineProperty(_assertThisInitialized(_this), "_scrollToX", function (
    /*number*/
    scrollPos) {
      var _this$props5 = _this.props,
          onHorizontalScroll = _this$props5.onHorizontalScroll,
          scrollActions = _this$props5.scrollActions,
          scrollX = _this$props5.scrollX,
          scrolling = _this$props5.scrolling;

      if (scrollPos === scrollX) {
        return;
      } // This is a workaround to prevent content blurring. This happens when translate3d
      // is applied with non-rounded values to elements having text.


      var roundedScrollPos = Math.round(scrollPos);

      if (onHorizontalScroll ? onHorizontalScroll(roundedScrollPos) : true) {
        scrollActions.scrollToX(roundedScrollPos);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_scrollToY", function (
    /*number*/
    scrollPos) {
      var _this$props6 = _this.props,
          onVerticalScroll = _this$props6.onVerticalScroll,
          scrollActions = _this$props6.scrollActions,
          scrollY = _this$props6.scrollY;

      if (scrollPos === scrollY) {
        return;
      }

      if (onVerticalScroll ? onVerticalScroll(scrollPos) : true) {
        scrollActions.scrollToY(scrollPos);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_didScroll", function (
    /* !object */
    prevProps) {
      var _this$props7 = _this.props,
          onScrollStart = _this$props7.onScrollStart,
          scrollX = _this$props7.scrollX,
          scrollY = _this$props7.scrollY,
          onHorizontalScroll = _this$props7.onHorizontalScroll,
          onVerticalScroll = _this$props7.onVerticalScroll,
          ownerHeight = _this$props7.tableSize.ownerHeight;
      var oldEndRowIndex = prevProps.endRowIndex,
          oldFirstRowIndex = prevProps.firstRowIndex,
          oldScrollX = prevProps.scrollX,
          oldScrollY = prevProps.scrollY,
          oldOwnerHeight = prevProps.tableSize.ownerHeight; // check if scroll values have changed - we have an extra check on NaN because (NaN !== NaN)

      var ownerHeightChanged = ownerHeight !== oldOwnerHeight && !((0, _isNaN["default"])(ownerHeight) && (0, _isNaN["default"])(oldOwnerHeight));
      var scrollXChanged = scrollX !== oldScrollX;
      var scrollYChanged = scrollY !== oldScrollY; // if none of the above changed, then a scroll didn't happen at all

      if (!ownerHeightChanged && !scrollXChanged && !scrollYChanged) {
        return;
      } // only call onScrollStart if scrolling wasn't on previously


      if (!_this.props.scrolling && onScrollStart) {
        onScrollStart(oldScrollX, oldScrollY, oldFirstRowIndex, oldEndRowIndex);
      }

      if (scrollXChanged && onHorizontalScroll) {
        onHorizontalScroll(scrollX);
      }

      if (scrollYChanged && onVerticalScroll) {
        onVerticalScroll(scrollY);
      } // debounced version of didScrollStop as we don't immediately stop scrolling


      _this._didScrollStop();
    });

    _defineProperty(_assertThisInitialized(_this), "_didScrollStopSync", function () {
      var _this$props8 = _this.props,
          endRowIndex = _this$props8.endRowIndex,
          firstRowIndex = _this$props8.firstRowIndex,
          onScrollEnd = _this$props8.onScrollEnd,
          scrollActions = _this$props8.scrollActions,
          scrollX = _this$props8.scrollX,
          scrollY = _this$props8.scrollY,
          scrolling = _this$props8.scrolling;

      if (!scrolling) {
        return;
      }

      scrollActions.stopScroll();

      if (onScrollEnd) {
        onScrollEnd(scrollX, scrollY, firstRowIndex, endRowIndex);
      }
    });

    _this._didScrollStop = (0, _debounceCore["default"])(_this._didScrollStopSync, 200, _assertThisInitialized(_this));
    _this._onKeyDown = _this._onKeyDown.bind(_assertThisInitialized(_this));
    _this._wheelHandler = new _ReactWheelHandler["default"](_this._onScroll, _this._shouldHandleWheelX, _this._shouldHandleWheelY, _this.props.isRTL, _this.props.stopScrollDefaultHandling, _this.props.stopScrollPropagation);
    _this._touchHandler = new _ReactTouchHandler["default"](_this._onScroll, _this._shouldHandleTouchX, _this._shouldHandleTouchY, _this.props.stopScrollDefaultHandling, _this.props.stopScrollPropagation);
    return _this;
  }

  _createClass(FixedDataTable, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // TODO (pradeep): Remove these and pass to our table component directly after
      // React provides an API where event handlers can be specified to be non-passive (facebook/react#6436)
      this._divRef && this._divRef.removeEventListener('wheel', this._wheelHandler.onWheel, {
        passive: false
      });
      this._divRef && this._divRef.removeEventListener('touchmove', this._touchHandler.onTouchMove, {
        passive: false
      });
      this._wheelHandler = null;
      this._touchHandler = null; // Cancel any pending debounced scroll handling and handle immediately.

      this._didScrollStop.reset();

      this._didScrollStopSync();
    }
  }, {
    key: "_onKeyDown",
    value: function _onKeyDown(event) {
      var _tableHeightsSelector2 = (0, _tableHeights["default"])(this.props),
          scrollbarYHeight = _tableHeightsSelector2.scrollbarYHeight;

      if (this.props.keyboardPageEnabled) {
        switch (event.key) {
          case 'PageDown':
            this._onScroll(0, scrollbarYHeight);

            event.preventDefault();
            break;

          case 'PageUp':
            this._onScroll(0, scrollbarYHeight * -1);

            event.preventDefault();
            break;

          default:
            break;
        }
      }

      if (this.props.keyboardScrollEnabled) {
        switch (event.key) {
          case 'ArrowDown':
            this._onScroll(0, ARROW_SCROLL_SPEED);

            event.preventDefault();
            break;

          case 'ArrowUp':
            this._onScroll(0, ARROW_SCROLL_SPEED * -1);

            event.preventDefault();
            break;

          case 'ArrowRight':
            this._onScroll(ARROW_SCROLL_SPEED, 0);

            event.preventDefault();
            break;

          case 'ArrowLeft':
            this._onScroll(ARROW_SCROLL_SPEED * -1, 0);

            event.preventDefault();
            break;

          default:
            break;
        }
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual["default"])(this.props, nextProps);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._divRef && this._divRef.addEventListener('wheel', this._wheelHandler.onWheel, {
        passive: false
      });

      if (this.props.touchScrollEnabled) {
        this._divRef && this._divRef.addEventListener('touchmove', this._touchHandler.onTouchMove, {
          passive: false
        });
      }

      this._reportContentHeight();

      this._reportScrollBarsUpdates();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(
    /*object*/
    prevProps) {
      this._didScroll(prevProps);

      this._reportContentHeight();

      this._reportScrollBarsUpdates();
    }
    /**
     * Method to report scrollbars updates
     * @private
     */

  }, {
    key: "_reportScrollBarsUpdates",
    value: function _reportScrollBarsUpdates() {
      var _tableHeightsSelector3 = (0, _tableHeights["default"])(this.props),
          bodyOffsetTop = _tableHeightsSelector3.bodyOffsetTop,
          scrollbarXOffsetTop = _tableHeightsSelector3.scrollbarXOffsetTop,
          visibleRowsHeight = _tableHeightsSelector3.visibleRowsHeight;

      var _this$props9 = this.props,
          width = _this$props9.tableSize.width,
          scrollContentHeight = _this$props9.scrollContentHeight,
          scrollY = _this$props9.scrollY,
          scrollX = _this$props9.scrollX;
      var newScrollState = {
        viewportHeight: visibleRowsHeight,
        contentHeight: scrollContentHeight,
        scrollbarYOffsetTop: bodyOffsetTop,
        scrollY: scrollY,
        viewportWidth: width,
        contentWidth: width + this.props.maxScrollX,
        scrollbarXOffsetTop: scrollbarXOffsetTop,
        scrollX: scrollX,
        scrollTo: this._scrollTo,
        scrollToX: this._scrollToX,
        scrollToY: this._scrollToY
      };

      if (!(0, _shallowEqual["default"])(this.previousScrollState, newScrollState)) {
        this.props.onScrollBarsUpdate(newScrollState);
        this.previousScrollState = newScrollState;
      }
    }
  }, {
    key: "render",
    value: function render()
    /*object*/
    {
      var _ariaAttributesSelect = (0, _ariaAttributes["default"])(this.props),
          ariaGroupHeaderIndex = _ariaAttributesSelect.ariaGroupHeaderIndex,
          ariaHeaderIndex = _ariaAttributesSelect.ariaHeaderIndex,
          ariaFooterIndex = _ariaAttributesSelect.ariaFooterIndex,
          ariaRowCount = _ariaAttributesSelect.ariaRowCount,
          ariaRowIndexOffset = _ariaAttributesSelect.ariaRowIndexOffset;

      var _columnTemplatesSelec = (0, _columnTemplates["default"])(this.props),
          fixedColumnGroups = _columnTemplatesSelec.fixedColumnGroups,
          fixedColumns = _columnTemplatesSelec.fixedColumns,
          fixedRightColumnGroups = _columnTemplatesSelec.fixedRightColumnGroups,
          fixedRightColumns = _columnTemplatesSelec.fixedRightColumns,
          scrollableColumnGroups = _columnTemplatesSelec.scrollableColumnGroups,
          scrollableColumns = _columnTemplatesSelec.scrollableColumns;

      var _tableHeightsSelector4 = (0, _tableHeights["default"])(this.props),
          bodyHeight = _tableHeightsSelector4.bodyHeight,
          bodyOffsetTop = _tableHeightsSelector4.bodyOffsetTop,
          componentHeight = _tableHeightsSelector4.componentHeight,
          footOffsetTop = _tableHeightsSelector4.footOffsetTop,
          scrollbarXOffsetTop = _tableHeightsSelector4.scrollbarXOffsetTop,
          visibleRowsHeight = _tableHeightsSelector4.visibleRowsHeight;

      var _this$props10 = this.props,
          className = _this$props10.className,
          columnReorderingData = _this$props10.columnReorderingData,
          columnResizingData = _this$props10.columnResizingData,
          elementHeights = _this$props10.elementHeights,
          isColumnReordering = _this$props10.isColumnReordering,
          isColumnResizing = _this$props10.isColumnResizing,
          gridAttributesGetter = _this$props10.gridAttributesGetter,
          maxScrollX = _this$props10.maxScrollX,
          maxScrollY = _this$props10.maxScrollY,
          onColumnReorderEndCallback = _this$props10.onColumnReorderEndCallback,
          onColumnResizeEndCallback = _this$props10.onColumnResizeEndCallback,
          scrollContentHeight = _this$props10.scrollContentHeight,
          scrollX = _this$props10.scrollX,
          scrollY = _this$props10.scrollY,
          scrolling = _this$props10.scrolling,
          tableSize = _this$props10.tableSize,
          touchScrollEnabled = _this$props10.touchScrollEnabled,
          scrollbarYWidth = _this$props10.scrollbarYWidth;
      var ownerHeight = tableSize.ownerHeight,
          width = tableSize.width;
      var cellGroupWrapperHeight = elementHeights.cellGroupWrapperHeight,
          footerHeight = elementHeights.footerHeight,
          groupHeaderHeight = elementHeights.groupHeaderHeight,
          headerHeight = elementHeights.headerHeight;

      var _scrollbarsVisible2 = (0, _scrollbarsVisible3["default"])(this.props),
          scrollEnabledX = _scrollbarsVisible2.scrollEnabledX,
          scrollEnabledY = _scrollbarsVisible2.scrollEnabledY;

      var onColumnReorder = onColumnReorderEndCallback ? this._onColumnReorder : null;
      var attributes = gridAttributesGetter && gridAttributesGetter();
      var groupHeader;

      if (groupHeaderHeight > 0) {
        groupHeader = /*#__PURE__*/_react["default"].createElement(_FixedDataTableRow["default"], {
          key: "group_header",
          ariaRowIndex: ariaGroupHeaderIndex,
          isHeaderOrFooter: true,
          isScrolling: scrolling,
          className: (0, _joinClasses["default"])((0, _cx["default"])('fixedDataTableLayout/header'), (0, _cx["default"])('public/fixedDataTable/header')),
          width: width,
          height: groupHeaderHeight,
          cellGroupWrapperHeight: cellGroupWrapperHeight,
          index: 0,
          zIndex: 1,
          offsetTop: 0,
          scrollLeft: scrollX,
          fixedColumns: fixedColumnGroups,
          fixedRightColumns: fixedRightColumnGroups,
          scrollableColumns: scrollableColumnGroups,
          visible: true,
          onColumnResize: this._onColumnResize,
          onColumnReorder: onColumnReorder,
          onColumnReorderMove: this._onColumnReorderMove,
          showScrollbarY: scrollEnabledY,
          scrollbarYWidth: scrollbarYWidth,
          isRTL: this.props.isRTL
        });
      }

      var scrollbarY;

      if (scrollEnabledY) {
        scrollbarY = this.props.scrollbarY;
      }

      var scrollbarX;

      if (scrollEnabledX) {
        scrollbarX = this.props.scrollbarX;
      }

      var dragKnob = /*#__PURE__*/_react["default"].createElement(_ColumnResizerLine["default"], {
        height: componentHeight,
        initialWidth: columnResizingData.width || 0,
        minWidth: columnResizingData.minWidth || 0,
        maxWidth: columnResizingData.maxWidth || Number.MAX_VALUE,
        visible: !!isColumnResizing,
        leftOffset: columnResizingData.left || 0,
        knobHeight: headerHeight,
        initialEvent: columnResizingData.initialEvent,
        onColumnResizeEnd: onColumnResizeEndCallback,
        columnKey: columnResizingData.key,
        touchEnabled: touchScrollEnabled,
        isRTL: this.props.isRTL
      });

      var footer = null;

      if (footerHeight) {
        footer = /*#__PURE__*/_react["default"].createElement(_FixedDataTableRow["default"], {
          key: "footer",
          ariaRowIndex: ariaFooterIndex,
          isHeaderOrFooter: true,
          isScrolling: scrolling,
          className: (0, _joinClasses["default"])((0, _cx["default"])('fixedDataTableLayout/footer'), (0, _cx["default"])('public/fixedDataTable/footer')),
          width: width,
          height: footerHeight,
          index: -1,
          zIndex: 1,
          offsetTop: footOffsetTop,
          visible: true,
          fixedColumns: fixedColumns.footer,
          fixedRightColumns: fixedRightColumns.footer,
          scrollableColumns: scrollableColumns.footer,
          scrollLeft: scrollX,
          showScrollbarY: scrollEnabledY,
          scrollbarYWidth: scrollbarYWidth,
          isRTL: this.props.isRTL
        });
      }

      var rows = this._renderRows(bodyOffsetTop, fixedColumns.cell, fixedRightColumns.cell, scrollableColumns.cell, bodyHeight, ariaRowIndexOffset);

      var header = /*#__PURE__*/_react["default"].createElement(_FixedDataTableRow["default"], {
        key: "header",
        ariaRowIndex: ariaHeaderIndex,
        isHeaderOrFooter: true,
        isScrolling: scrolling,
        className: (0, _joinClasses["default"])((0, _cx["default"])('fixedDataTableLayout/header'), (0, _cx["default"])('public/fixedDataTable/header')),
        width: width,
        height: headerHeight,
        cellGroupWrapperHeight: cellGroupWrapperHeight,
        index: -1,
        zIndex: 1,
        offsetTop: groupHeaderHeight,
        scrollLeft: scrollX,
        visible: true,
        fixedColumns: fixedColumns.header,
        fixedRightColumns: fixedRightColumns.header,
        scrollableColumns: scrollableColumns.header,
        touchEnabled: touchScrollEnabled,
        onColumnResize: this._onColumnResize,
        onColumnReorder: onColumnReorder,
        onColumnReorderMove: this._onColumnReorderMove,
        onColumnReorderEnd: this._onColumnReorderEnd,
        isColumnReordering: !!isColumnReordering,
        columnReorderingData: columnReorderingData,
        showScrollbarY: scrollEnabledY,
        scrollbarYWidth: scrollbarYWidth,
        isRTL: this.props.isRTL
      });

      var topShadow;

      if (scrollY) {
        topShadow = /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _joinClasses["default"])((0, _cx["default"])('fixedDataTableLayout/topShadow'), (0, _cx["default"])('public/fixedDataTable/topShadow')),
          style: {
            top: bodyOffsetTop
          }
        });
      } // ownerScrollAvailable is true if the rows rendered will overflow the owner element
      // so we show a shadow in that case even if the FDT component can't scroll anymore


      var ownerScrollAvailable = ownerHeight && ownerHeight < componentHeight && scrollContentHeight > visibleRowsHeight;
      var bottomShadow;

      if (ownerScrollAvailable || scrollY < maxScrollY) {
        bottomShadow = /*#__PURE__*/_react["default"].createElement("div", {
          className: (0, _joinClasses["default"])((0, _cx["default"])('fixedDataTableLayout/bottomShadow'), (0, _cx["default"])('public/fixedDataTable/bottomShadow')),
          style: {
            top: footOffsetTop
          }
        });
      }

      var tabIndex = null;

      if (this.props.keyboardPageEnabled || this.props.keyboardScrollEnabled) {
        tabIndex = 0;
      }

      var tableClassName = className;

      if (this.props.isRTL) {
        tableClassName = (0, _joinClasses["default"])(tableClassName, 'fixedDataTable_isRTL');
      }

      return /*#__PURE__*/_react["default"].createElement("div", _extends({
        className: (0, _joinClasses["default"])(tableClassName, (0, _cx["default"])('fixedDataTableLayout/main'), (0, _cx["default"])('public/fixedDataTable/main')),
        role: "grid",
        "aria-rowcount": ariaRowCount
      }, attributes, {
        tabIndex: tabIndex,
        onKeyDown: this._onKeyDown,
        onTouchStart: touchScrollEnabled ? this._touchHandler.onTouchStart : null,
        onTouchEnd: touchScrollEnabled ? this._touchHandler.onTouchEnd : null,
        onTouchCancel: touchScrollEnabled ? this._touchHandler.onTouchCancel : null,
        ref: this._onRef,
        style: {
          height: componentHeight,
          width: width
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _cx["default"])('fixedDataTableLayout/rowsContainer'),
        style: {
          height: scrollbarXOffsetTop,
          width: width
        }
      }, dragKnob, groupHeader, header, rows, footer, topShadow, bottomShadow), scrollbarY, scrollbarX);
    }
  }]);

  return FixedDataTable;
}(_react["default"].Component);

_defineProperty(FixedDataTable, "propTypes", {
  // TODO (jordan) Remove propType of width without losing documentation (moved to tableSize)

  /**
   * Pixel width of table. If all columns do not fit,
   * a horizontal scrollbar will appear.
   */
  width: _propTypes["default"].number.isRequired,
  // TODO (jordan) Remove propType of height without losing documentation (moved to tableSize)

  /**
   * Pixel height of table. If all rows do not fit,
   * a vertical scrollbar will appear.
   *
   * Either `height` or `maxHeight` must be specified.
   */
  height: _propTypes["default"].number,

  /**
   * Class name to be passed into parent container
   */
  className: _propTypes["default"].string,
  // TODO (jordan) Remove propType of maxHeight without losing documentation (moved to tableSize)

  /**
   * Maximum pixel height of table. If all rows do not fit,
   * a vertical scrollbar will appear.
   *
   * Either `height` or `maxHeight` must be specified.
   */
  maxHeight: _propTypes["default"].number,
  // TODO (jordan) Remove propType of ownerHeight without losing documentation (moved to tableSize)

  /**
   * Pixel height of table's owner, this is used in a managed scrolling
   * situation when you want to slide the table up from below the fold
   * without having to constantly update the height on every scroll tick.
   * Instead, vary this property on scroll. By using `ownerHeight`, we
   * over-render the table while making sure the footer and horizontal
   * scrollbar of the table are visible when the current space for the table
   * in view is smaller than the final, over-flowing height of table. It
   * allows us to avoid resizing and reflowing table when it is moving in the
   * view.
   *
   * This is used if `ownerHeight < height` (or `maxHeight`).
   */
  ownerHeight: _propTypes["default"].number,
  // TODO (jordan) Remove propType of overflowX & overflowY without losing documentation (moved to scrollFlags)
  overflowX: _propTypes["default"].oneOf(['hidden', 'auto']),
  overflowY: _propTypes["default"].oneOf(['hidden', 'auto']),

  /**
   * Boolean flag indicating of touch scrolling should be enabled
   * This feature is current in beta and may have bugs
   */
  touchScrollEnabled: _propTypes["default"].bool,

  /**
   * Boolean flags to control if scrolling with keys is enabled
   */
  keyboardScrollEnabled: _propTypes["default"].bool,
  keyboardPageEnabled: _propTypes["default"].bool,

  /**
   * Scrollbar X to be rendered
   */
  scrollbarX: _propTypes["default"].node,

  /**
   * Height to be reserved for scrollbar X
   */
  scrollbarXHeight: _propTypes["default"].number,

  /**
   * Scrollbar Y to be rendered
   */
  scrollbarY: _propTypes["default"].node,

  /**
   * Width to be reserved for scrollbar Y
   */
  scrollbarYWidth: _propTypes["default"].number,

  /**
   * Function to listen to scroll bars related updates like scroll position, visible rows height, all rows height,....
   */
  onScrollBarsUpdate: _propTypes["default"].func,
  // TODO Remove propType of defaultScrollbars without losing documentation (this is required for FixedDataTableContainer only)

  /**
   * Default scrollbars provided by FDT-2 will be rendered, pass false if you want to render custom scrollbars (by passing scrollbarX and scrollbarY props)
   */
  defaultScrollbars: _propTypes["default"].bool,
  // TODO (jordan) Remove propType of showScrollbarX & showScrollbarY without losing documentation (moved to scrollFlags)

  /**
   * Hide the scrollbar but still enable scroll functionality
   */
  showScrollbarX: _propTypes["default"].bool,
  showScrollbarY: _propTypes["default"].bool,

  /**
   * Callback when horizontally scrolling the grid.
   *
   * Return false to stop propagation.
   */
  onHorizontalScroll: _propTypes["default"].func,

  /**
   * Callback when vertically scrolling the grid.
   *
   * Return false to stop propagation.
   */
  onVerticalScroll: _propTypes["default"].func,
  // TODO (jordan) Remove propType of rowsCount without losing documentation (moved to rowSettings)

  /**
   * Number of rows in the table.
   */
  rowsCount: _propTypes["default"].number.isRequired,
  // TODO (jordan) Remove propType of rowHeight without losing documentation (moved to rowSettings)

  /**
   * Pixel height of rows unless `rowHeightGetter` is specified and returns
   * different value.
   */
  rowHeight: _propTypes["default"].number.isRequired,
  // TODO (jordan) Remove propType of rowHeightGetter without losing documentation (moved to rowSettings)

  /**
   * If specified, `rowHeightGetter(index)` is called for each row and the
   * returned value overrides `rowHeight` for particular row.
   */
  rowHeightGetter: _propTypes["default"].func,
  // TODO (jordan) Remove propType of subRowHeight without losing documentation (moved to rowSettings)

  /**
   * Pixel height of sub-row unless `subRowHeightGetter` is specified and returns
   * different value.  Defaults to 0 and no sub-row being displayed.
   */
  subRowHeight: _propTypes["default"].number,
  // TODO (jordan) Remove propType of subRowHeightGetter without losing documentation (moved to rowSettings)

  /**
   * If specified, `subRowHeightGetter(index)` is called for each row and the
   * returned value overrides `subRowHeight` for particular row.
   */
  subRowHeightGetter: _propTypes["default"].func,

  /**
   * The row expanded for table row.
   * This can either be a React element, or a function that generates
   * a React Element. By default, the React element passed in can expect to
   * receive the following props:
   *
   * ```
   * props: {
   *   rowIndex; number // (the row index)
   *   height: number // (supplied from subRowHeight or subRowHeightGetter)
   *   width: number // (supplied from the Table)
   * }
   * ```
   *
   * Because you are passing in your own React element, you can feel free to
   * pass in whatever props you may want or need.
   *
   * If you pass in a function, you will receive the same props object as the
   * first argument.
   */
  rowExpanded: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].func]),

  /**
   * To get any additional CSS classes that should be added to a row,
   * `rowClassNameGetter(index)` is called.
   */
  rowClassNameGetter: _propTypes["default"].func,

  /**
   * If specified, `rowKeyGetter(index)` is called for each row and the
   * returned value overrides `key` for the particular row.
   */
  rowKeyGetter: _propTypes["default"].func,
  // TODO (jordan) Remove propType of groupHeaderHeight without losing documentation (moved to elementHeights)

  /**
   * Pixel height of the column group header.
   */
  groupHeaderHeight: _propTypes["default"].number,
  // TODO (jordan) Remove propType of headerHeight without losing documentation (moved to elementHeights)

  /**
   * Pixel height of header.
   */
  headerHeight: _propTypes["default"].number.isRequired,

  /**
   * Pixel height of fixedDataTableCellGroupLayout/cellGroupWrapper.
   * Default is headerHeight and groupHeaderHeight.
   *
   * This can be used with CSS to make a header cell span both the group & normal header row.
   * Setting this to a value larger than height will cause the content to
   * overflow the height. This is useful when adding a 2nd table as the group
   * header and vertically merging the 2 headers when a column is not part
   * of a group. Here are the necessary CSS changes:
   *
   * Both headers:
   *  - cellGroupWrapper needs overflow-x: hidden and pointer-events: none
   *  - cellGroup needs pointer-events: auto to reenable them on child els
   * Group header:
   *  - Layout/main needs overflow: visible and a higher z-index
   *  - CellLayout/main needs overflow-y: visible
   *  - cellGroup needs overflow: visible
   */
  cellGroupWrapperHeight: _propTypes["default"].number,
  // TODO (jordan) Remove propType of footerHeight without losing documentation (moved to elementHeights)

  /**
   * Pixel height of footer.
   */
  footerHeight: _propTypes["default"].number,

  /**
   * Value of horizontal scroll.
   */
  scrollLeft: _propTypes["default"].number,
  // TODO (jordan) Remove propType of scrollToRow & scrollToColumn without losing documentation

  /**
   * Index of column to scroll to.
   */
  scrollToColumn: _propTypes["default"].number,

  /**
   * Value of vertical scroll.
   */
  scrollTop: _propTypes["default"].number,

  /**
   * Index of row to scroll to.
   */
  scrollToRow: _propTypes["default"].number,

  /**
   * Callback that is called when scrolling starts. The current horizontal and vertical scroll values,
   * and the current first and last row indexes will be provided to the callback.
   */
  onScrollStart: _propTypes["default"].func,

  /**
   * Callback that is called when scrolling ends. The new horizontal and vertical scroll values,
   * and the new first and last row indexes will be provided to the callback.
   */
  onScrollEnd: _propTypes["default"].func,

  /**
   * If enabled scroll events will not be propagated outside of the table.
   */
  stopReactWheelPropagation: _propTypes["default"].bool,

  /**
   * If enabled scroll events will never be bubbled to the browser default handler.
   * If disabled (default when unspecified), scroll events will be bubbled up if the scroll
   * doesn't lead to a change in scroll offsets, which is preferable if you like
   * the page/container to scroll up when the table is already scrolled up max.
   */
  stopScrollDefaultHandling: _propTypes["default"].bool,

  /**
   * If enabled scroll events will not be propagated outside of the table.
   */
  stopScrollPropagation: _propTypes["default"].bool,

  /**
   * Callback that is called when `rowHeightGetter` returns a different height
   * for a row than the `rowHeight` prop. This is necessary because initially
   * table estimates heights of some parts of the content.
   */
  onContentHeightChange: _propTypes["default"].func,

  /**
   * Callback that is called when a row is clicked.
   */
  onRowClick: _propTypes["default"].func,

  /**
   * Callback that is called when a contextual-menu event happens on a row.
   */
  onRowContextMenu: _propTypes["default"].func,

  /**
   * Callback that is called when a row is double clicked.
   */
  onRowDoubleClick: _propTypes["default"].func,

  /**
   * Callback that is called when a mouse-down event happens on a row.
   */
  onRowMouseDown: _propTypes["default"].func,

  /**
   * Callback that is called when a mouse-up event happens on a row.
   */
  onRowMouseUp: _propTypes["default"].func,

  /**
   * Callback that is called when a mouse-enter event happens on a row.
   */
  onRowMouseEnter: _propTypes["default"].func,

  /**
   * Callback that is called when a mouse-leave event happens on a row.
   */
  onRowMouseLeave: _propTypes["default"].func,

  /**
   * Callback that is called when a touch-start event happens on a row.
   */
  onRowTouchStart: _propTypes["default"].func,

  /**
   * Callback that is called when a touch-end event happens on a row.
   */
  onRowTouchEnd: _propTypes["default"].func,

  /**
   * Callback that is called when a touch-move event happens on a row.
   */
  onRowTouchMove: _propTypes["default"].func,

  /**
   * Callback that is called when resizer has been released
   * and column needs to be updated.
   *
   * Required if the isResizable property is true on any column.
   *
   * ```
   * function(
   *   newColumnWidth: number,
   *   columnKey: string,
   * )
   * ```
   */
  onColumnResizeEndCallback: _propTypes["default"].func,

  /**
   * Callback that is called when reordering has been completed
   * and columns need to be updated.
   *
   * ```
   * function(
   *   event {
   *     columnBefore: string|undefined, // the column before the new location of this one
   *     columnAfter: string|undefined,  // the column after the new location of this one
   *     reorderColumn: string,          // the column key that was just reordered
   *   }
   * )
   * ```
   */
  onColumnReorderEndCallback: _propTypes["default"].func,

  /**
   * Whether a column is currently being resized.
   */
  isColumnResizing: _propTypes["default"].bool,

  /**
   * Whether columns are currently being reordered.
   */
  isColumnReordering: _propTypes["default"].bool,

  /**
   * Whether the grid should be in RTL mode
   */
  isRTL: _propTypes["default"].bool,
  // TODO (jordan) Remove propType of bufferRowCount without losing documentation

  /**
   * The number of rows outside the viewport to prerender. Defaults to roughly
   * half of the number of visible rows.
   */
  bufferRowCount: _propTypes["default"].number,
  // TODO (pradeep): Move elementHeights to a selector instead of passing it through redux as state variables

  /**
   * Row heights of the header, groupheader, footer, and cell group wrapper
   * grouped into a single object.
   *
   * @ignore
   */
  elementHeights: _propTypes["default"].shape({
    cellGroupWrapperHeight: _propTypes["default"].number,
    footerHeight: _propTypes["default"].number,
    groupHeaderHeight: _propTypes["default"].number,
    headerHeight: _propTypes["default"].number
  }),

  /**
   * Callback that returns an object of html attributes to add to the grid element
   */
  gridAttributesGetter: _propTypes["default"].func
});

_defineProperty(FixedDataTable, "defaultProps",
/*object*/
{
  elementHeights: {
    cellGroupWrapperHeight: undefined,
    footerHeight: 0,
    groupHeaderHeight: 0,
    headerHeight: 0
  },
  keyboardScrollEnabled: false,
  keyboardPageEnabled: false,
  touchScrollEnabled: false,
  stopScrollPropagation: false
});

var _default = FixedDataTable;
exports["default"] = _default;