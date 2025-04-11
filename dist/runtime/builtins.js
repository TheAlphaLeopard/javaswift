"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.now = exports.sleep = exports.on = exports.removeClass = exports.addClass = exports.setText = exports.setHTML = exports.createElement = exports.querySelectorAll = exports.querySelector = exports.print = void 0;
// filepath: /pronto-lang/pronto-lang/src/runtime/builtins.ts
function print(...args) {
    console.log(...args);
}
exports.print = print;
function querySelector(selector) {
    return document.querySelector(selector);
}
exports.querySelector = querySelector;
function querySelectorAll(selector) {
    return document.querySelectorAll(selector);
}
exports.querySelectorAll = querySelectorAll;
function createElement(tag) {
    return document.createElement(tag);
}
exports.createElement = createElement;
function setHTML(element, html) {
    element.innerHTML = html;
}
exports.setHTML = setHTML;
function setText(element, text) {
    element.textContent = text;
}
exports.setText = setText;
function addClass(element, className) {
    element.classList.add(className);
}
exports.addClass = addClass;
function removeClass(element, className) {
    element.classList.remove(className);
}
exports.removeClass = removeClass;
function on(element, event, handler) {
    element.addEventListener(event, handler);
}
exports.on = on;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function now() {
    return Date.now();
}
exports.now = now;
