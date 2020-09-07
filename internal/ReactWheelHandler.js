/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * This is utility that handles onWheel events and calls provided wheel
 * callback with correct frame rate.
 *
 * @providesModule ReactWheelHandler
 * @typechecks
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _emptyFunction = _interopRequireDefault(require('./emptyFunction'));

var _normalizeWheel = _interopRequireDefault(require('./normalizeWheel'));

var _requestAnimationFramePolyfill = _interopRequireDefault(require('./requestAnimationFramePolyfill'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ReactWheelHandler = /*#__PURE__*/function () {
  /**
   * onWheel is the callback that will be called with right frame rate if
   * any wheel events happened
   * onWheel should is to be called with two arguments: deltaX and deltaY in
   * this order
   */
  function ReactWheelHandler(
  /*function*/
  onWheel,
  /*boolean|function*/
  handleScrollX,
  /*boolean|function*/
  handleScrollY,
  /*?boolean*/
  isRTL,
  /*?boolean*/
  preventDefault,
  /*?boolean*/
  stopPropagation) {
    _classCallCheck(this, ReactWheelHandler);

    this._animationFrameID = null;
    this._deltaX = 0;
    this._deltaY = 0;
    this._didWheel = this._didWheel.bind(this);
    this._rootRef = null;

    if (typeof handleScrollX !== 'function') {
      handleScrollX = handleScrollX ? _emptyFunction["default"].thatReturnsTrue : _emptyFunction["default"].thatReturnsFalse;
    }

    if (typeof handleScrollY !== 'function') {
      handleScrollY = handleScrollY ? _emptyFunction["default"].thatReturnsTrue : _emptyFunction["default"].thatReturnsFalse;
    }

    this._handleScrollX = handleScrollX;
    this._handleScrollY = handleScrollY;
    this._preventDefault = preventDefault;
    this._stopPropagation = stopPropagation;
    this._onWheelCallback = onWheel;
    this.onWheel = this.onWheel.bind(this);
    this._isRTL = isRTL;
  }

  _createClass(ReactWheelHandler, [{
    key: "onWheel",
    value: function onWheel(
    /*object*/
    event) {
      if (this._preventDefault) {
        event.preventDefault();
      }

      var normalizedEvent = (0, _normalizeWheel["default"])(event); // if shift is held, swap the axis of scrolling.

      if (event.shiftKey && ReactWheelHandler._allowInternalAxesSwap()) {
        normalizedEvent = ReactWheelHandler._swapNormalizedWheelAxis(normalizedEvent);
      } else if (!event.shiftKey) {
        normalizedEvent.pixelX *= this._isRTL ? -1 : 1;
      }

      var deltaX = this._deltaX + normalizedEvent.pixelX;
      var deltaY = this._deltaY + normalizedEvent.pixelY;

      var handleScrollX = this._handleScrollX(deltaX, deltaY);

      var handleScrollY = this._handleScrollY(deltaY, deltaX);

      if (!handleScrollX && !handleScrollY) {
        return;
      }

      if (this._rootRef && !this._contains(event.target)) {
        return;
      }

      this._deltaX += handleScrollX ? normalizedEvent.pixelX : 0;
      this._deltaY += handleScrollY ? normalizedEvent.pixelY : 0; // This will result in a scroll to the table, so there's no need to let the parent containers scroll

      if (!event.defaultPrevented) {
        event.preventDefault();
      }

      var changed;

      if (this._deltaX !== 0 || this._deltaY !== 0) {
        if (this._stopPropagation) {
          event.stopPropagation();
        }

        changed = true;
      }

      if (changed === true && this._animationFrameID === null) {
        this._animationFrameID = (0, _requestAnimationFramePolyfill["default"])(this._didWheel);
      }
    }
  }, {
    key: "setRoot",
    value: function setRoot(rootRef) {
      this._rootRef = rootRef;
    }
  }, {
    key: "_didWheel",
    value: function _didWheel() {
      this._animationFrameID = null;

      this._onWheelCallback(this._deltaX, this._deltaY);

      this._deltaX = 0;
      this._deltaY = 0;
    }
  }, {
    key: "_contains",
    value: function _contains(target) {
      var parent = target;

      while (parent != document.body) {
        if (parent === this._rootRef) {
          return true;
        }

        parent = parent.parentNode;
      }

      return false;
    }
  }], [{
    key: "_swapNormalizedWheelAxis",
    value: function _swapNormalizedWheelAxis(
    /*object*/
    normalizedEvent)
    /*object*/
    {
      return {
        spinX: normalizedEvent.spinY,
        spinY: normalizedEvent.spinX,
        pixelX: normalizedEvent.pixelY,
        pixelY: normalizedEvent.pixelX
      };
    }
  }, {
    key: "_allowInternalAxesSwap",
    value: function _allowInternalAxesSwap()
    /*boolean*/
    {
      return navigator.platform !== "MacIntel";
    }
  }]);

  return ReactWheelHandler;
}();

var _default = ReactWheelHandler;
exports["default"] = _default;