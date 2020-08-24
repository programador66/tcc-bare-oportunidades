"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var api =
/*#__PURE__*/
function () {
  function api() {
    _classCallCheck(this, api);

    var _api = _axios["default"].create({
      baseURL: "http://localhost:3333"
    });

    this.api = _api;
  }

  _createClass(api, [{
    key: "headerToken",
    value: function headerToken() {
      var token = JSON.parse(sessionStorage.getItem("usuario")).token;
      var config = {
        headers: {
          Authorization: "Bearer ".concat(token),
          Accept: "application/json"
        }
      };
      return config;
    }
  }]);

  return api;
}();

var _default = api;
exports["default"] = _default;