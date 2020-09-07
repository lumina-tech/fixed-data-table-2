/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * @providesModule scrollActions
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopScroll = exports.startScroll = exports.scrollToY = exports.scrollToX = void 0;

var _ActionTypes = require('././ActionTypes');

/**
 * Scrolls the table horizontally to position
 *
 * @param {number} scrollX
 */
var scrollToX = function scrollToX(scrollX) {
  return {
    type: _ActionTypes.SCROLL_TO_X,
    scrollX: scrollX
  };
};
/**
 * Scrolls the table vertically to position
 *
 * @param {number} scrollY
 */


exports.scrollToX = scrollToX;

var scrollToY = function scrollToY(scrollY) {
  return {
    type: _ActionTypes.SCROLL_TO_Y,
    scrollY: scrollY
  };
};
/**
 * Fire when user starts scrolling
 */


exports.scrollToY = scrollToY;

var startScroll = function startScroll() {
  return {
    type: _ActionTypes.SCROLL_START
  };
};
/**
 * Fire when user starts scrolling
 */


exports.startScroll = startScroll;

var stopScroll = function stopScroll() {
  return {
    type: _ActionTypes.SCROLL_END
  };
};

exports.stopScroll = stopScroll;