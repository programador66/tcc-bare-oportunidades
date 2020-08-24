"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _moduloUsuario = _interopRequireDefault(require("./modulo-usuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */


function _default()
/* { ssrContext } */
{
  var Store = new _vuex["default"].Store({
    modules: {
      usuario: _moduloUsuario["default"]
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });
  return Store;
}