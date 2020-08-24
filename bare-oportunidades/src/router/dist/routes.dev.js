"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var routes = [{
  path: "/",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("layouts/LoginLayout.vue"));
    });
  }
}, {
  path: "/home-students",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("layouts/Aluno/MainLayout.vue"));
    });
  },
  children: [{
    path: "",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/Index.vue"));
      });
    }
  }]
}, // Always leave this as last one,
// but you can also remove it
{
  path: "*",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("pages/Error404.vue"));
    });
  }
}];
var _default = routes;
exports["default"] = _default;