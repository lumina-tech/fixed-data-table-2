/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule reducers
 */
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _scrollAnchor3 = require('./scrollAnchor');

var ActionTypes = _interopRequireWildcard(require('./ActionTypes'));

var _IntegerBufferSet = _interopRequireDefault(require('./IntegerBufferSet'));

var _PrefixIntervalTree = _interopRequireDefault(require('./PrefixIntervalTree'));

var _columnStateHelper = _interopRequireDefault(require('./columnStateHelper'));

var _computeRenderedRows = _interopRequireDefault(require('./computeRenderedRows'));

var _convertColumnElementsToData = _interopRequireDefault(require('./convertColumnElementsToData'));

var _pick = _interopRequireDefault(require('lodash/pick'));

var _shallowEqual = _interopRequireDefault(require('./shallowEqual'));

var _Scrollbar = _interopRequireDefault(require('./Scrollbar'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Returns the default initial state for the redux store.
 * This must be a brand new, independent object for each table instance
 * or issues may occur due to multiple tables sharing data.
 *
 * @return {!Object}
 */
function getInitialState() {
  return {
    /*
     * Input state set from props
     */
    columnProps: [],
    columnGroupProps: [],
    elementTemplates: {
      cell: [],
      footer: [],
      groupHeader: [],
      header: []
    },
    elementHeights: {
      footerHeight: 0,
      groupHeaderHeight: 0,
      headerHeight: 0
    },
    rowSettings: {
      bufferRowCount: undefined,
      rowAttributesGetter: undefined,
      rowHeight: 0,
      rowHeightGetter: function rowHeightGetter() {
        return 0;
      },
      rowsCount: 0,
      subRowHeight: 0,
      subRowHeightGetter: function subRowHeightGetter() {
        return 0;
      }
    },
    scrollFlags: {
      overflowX: 'auto',
      overflowY: 'auto',
      showScrollbarX: true,
      showScrollbarY: true
    },
    tableSize: {
      height: undefined,
      maxHeight: 0,
      ownerHeight: undefined,
      useMaxHeight: false,
      width: 0
    },

    /*
     * Output state passed as props to the the rendered FixedDataTable
     * NOTE (jordan) rows may contain undefineds if we don't need all the buffer positions
     */
    columnReorderingData: {},
    columnResizingData: {},
    firstRowIndex: 0,
    firstRowOffset: 0,
    isColumnReordering: false,
    isColumnResizing: false,
    maxScrollX: 0,
    maxScrollY: 0,
    rowOffsets: {},
    rows: [],
    // rowsToRender
    scrollContentHeight: 0,
    scrollX: 0,
    scrollbarXHeight: _Scrollbar["default"].SIZE,
    scrollY: 0,
    scrollbarYWidth: _Scrollbar["default"].SIZE,
    scrolling: false,

    /*
     * Internal state only used by this file
     * NOTE (jordan) internal state is altered in place
     * so don't trust it for redux history or immutability checks
     * TODO (jordan) investigate if we want to move this to local or scoped state
     */
    rowBufferSet: new _IntegerBufferSet["default"](),
    storedHeights: [],
    rowOffsetIntervalTree: null // PrefixIntervalTree

  };
}

function reducers() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getInitialState();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ActionTypes.INITIALIZE:
      {
        var props = action.props;
        var newState = setStateFromProps(state, props);
        newState = initializeRowHeightsAndOffsets(newState);
        var scrollAnchor = (0, _scrollAnchor3.getScrollAnchor)(newState, props);
        newState = (0, _computeRenderedRows["default"])(newState, scrollAnchor);
        return _columnStateHelper["default"].initialize(newState, props, {});
      }

    case ActionTypes.PROP_CHANGE:
      {
        var newProps = action.newProps,
            oldProps = action.oldProps;

        var _newState = setStateFromProps(state, newProps);

        if (oldProps.rowsCount !== newProps.rowsCount || oldProps.rowHeight !== newProps.rowHeight || oldProps.subRowHeight !== newProps.subRowHeight) {
          _newState = initializeRowHeightsAndOffsets(_newState);
        }

        if (oldProps.rowsCount !== newProps.rowsCount) {
          // NOTE (jordan) bad practice to modify state directly, but okay since
          // we know setStateFromProps clones state internally
          _newState.rowBufferSet = new _IntegerBufferSet["default"]();
        }

        var _scrollAnchor = (0, _scrollAnchor3.getScrollAnchor)(_newState, newProps, oldProps); // If anything has changed in state, update our rendered rows


        if (!(0, _shallowEqual["default"])(state, _newState) || _scrollAnchor.changed) {
          _newState = (0, _computeRenderedRows["default"])(_newState, _scrollAnchor);
        }

        _newState = _columnStateHelper["default"].initialize(_newState, newProps, oldProps); // if scroll values have changed, then we're scrolling!

        if (_newState.scrollX !== state.scrollX || _newState.scrollY !== state.scrollY) {
          _newState.scrolling = _newState.scrolling || true;
        } // TODO REDUX_MIGRATION solve w/ evil-diff
        // TODO (jordan) check if relevant props unchanged and
        // children column widths and flex widths are unchanged
        // alternatively shallow diff and reconcile props


        return _newState;
      }

    case ActionTypes.SCROLL_END:
      {
        var _newState2 = _extends({}, state, {
          scrolling: false
        });

        var previousScrollAnchor = {
          firstIndex: state.firstRowIndex,
          firstOffset: state.firstRowOffset,
          lastIndex: state.lastIndex
        };
        return (0, _computeRenderedRows["default"])(_newState2, previousScrollAnchor);
      }

    case ActionTypes.SCROLL_TO_Y:
      {
        var scrollY = action.scrollY;

        var _newState3 = _extends({}, state, {
          scrolling: true
        });

        var _scrollAnchor2 = (0, _scrollAnchor3.scrollTo)(_newState3, scrollY);

        return (0, _computeRenderedRows["default"])(_newState3, _scrollAnchor2);
      }

    case ActionTypes.COLUMN_RESIZE:
      {
        var resizeData = action.resizeData;
        return _columnStateHelper["default"].resizeColumn(state, resizeData);
      }

    case ActionTypes.COLUMN_REORDER_START:
      {
        var reorderData = action.reorderData;
        return _columnStateHelper["default"].reorderColumn(state, reorderData);
      }

    case ActionTypes.COLUMN_REORDER_END:
      {
        return _extends({}, state, {
          isColumnReordering: false,
          columnReorderingData: {}
        });
      }

    case ActionTypes.COLUMN_REORDER_MOVE:
      {
        var deltaX = action.deltaX;
        return _columnStateHelper["default"].reorderColumnMove(state, deltaX);
      }

    case ActionTypes.SCROLL_TO_X:
      {
        var scrollX = action.scrollX;
        return _extends({}, state, {
          scrolling: true,
          scrollX: scrollX
        });
      }

    default:
      {
        return state;
      }
  }
}
/**
 * Initialize row heights (storedHeights) & offsets based on the default rowHeight
 *
 * @param {!Object} state
 * @private
 */


function initializeRowHeightsAndOffsets(state) {
  var _state$rowSettings = state.rowSettings,
      rowHeight = _state$rowSettings.rowHeight,
      rowsCount = _state$rowSettings.rowsCount,
      subRowHeight = _state$rowSettings.subRowHeight;
  var defaultFullRowHeight = rowHeight + subRowHeight;

  var rowOffsetIntervalTree = _PrefixIntervalTree["default"].uniform(rowsCount, defaultFullRowHeight);

  var scrollContentHeight = rowsCount * defaultFullRowHeight;
  var storedHeights = new Array(rowsCount);

  for (var idx = 0; idx < rowsCount; idx++) {
    storedHeights[idx] = defaultFullRowHeight;
  }

  return _extends({}, state, {
    rowOffsetIntervalTree: rowOffsetIntervalTree,
    scrollContentHeight: scrollContentHeight,
    storedHeights: storedHeights
  });
}
/**
 * @param {!Object} state
 * @param {!Object} props
 * @return {!Object}
 * @private
 */


function setStateFromProps(state, props) {
  var _convertColumnElement = (0, _convertColumnElementsToData["default"])(props.children),
      columnGroupProps = _convertColumnElement.columnGroupProps,
      columnProps = _convertColumnElement.columnProps,
      elementTemplates = _convertColumnElement.elementTemplates,
      useGroupHeader = _convertColumnElement.useGroupHeader;

  var newState = _extends({}, state, {
    columnGroupProps: columnGroupProps,
    columnProps: columnProps,
    elementTemplates: elementTemplates
  });

  newState.elementHeights = _extends({}, newState.elementHeights, (0, _pick["default"])(props, ['cellGroupWrapperHeight', 'footerHeight', 'groupHeaderHeight', 'headerHeight']));

  if (!useGroupHeader) {
    newState.elementHeights.groupHeaderHeight = 0;
  }

  newState.rowSettings = _extends({}, newState.rowSettings, (0, _pick["default"])(props, ['bufferRowCount', 'rowHeight', 'rowsCount', 'subRowHeight']));
  var _newState$rowSettings = newState.rowSettings,
      rowHeight = _newState$rowSettings.rowHeight,
      subRowHeight = _newState$rowSettings.subRowHeight;

  newState.rowSettings.rowHeightGetter = props.rowHeightGetter || function () {
    return rowHeight;
  };

  newState.rowSettings.subRowHeightGetter = props.subRowHeightGetter || function () {
    return subRowHeight || 0;
  };

  newState.rowSettings.rowAttributesGetter = props.rowAttributesGetter;
  newState.scrollFlags = _extends({}, newState.scrollFlags, (0, _pick["default"])(props, ['overflowX', 'overflowY', 'showScrollbarX', 'showScrollbarY']));
  newState.tableSize = _extends({}, newState.tableSize, (0, _pick["default"])(props, ['height', 'maxHeight', 'ownerHeight', 'width']));
  newState.tableSize.useMaxHeight = newState.tableSize.height === undefined;
  newState.scrollbarXHeight = props.scrollbarXHeight;
  newState.scrollbarYWidth = props.scrollbarYWidth;
  return newState;
}

var _default = reducers;
exports["default"] = _default;