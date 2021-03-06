"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var UserService_1 = require("../services/UserService");
var bcrypt = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var NovoCadastroFactory_1 = require("../factories/NovoCadastroFactory");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, tp_usuario, senha, passwordHash, usu, novoCadastro, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = request.body, email = _a.email, tp_usuario = _a.tp_usuario, senha = _a.senha;
                        return [4 /*yield*/, bcrypt.hash(senha, 8)];
                    case 1:
                        passwordHash = _b.sent();
                        usu = { email: email, tp_usuario: tp_usuario, senha: passwordHash };
                        novoCadastro = new NovoCadastroFactory_1["default"](tp_usuario).getClasse();
                        console.log(novoCadastro.render());
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        return [2 /*return*/, response.status(406).json({
                                msg: "Erro na inserção do Usuario, por favor contatar o ADM",
                                error: err_1.message
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new UserService_1["default"]().getUser()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, response.json(res)];
                }
            });
        });
    };
    UserController.prototype.login = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, senha, tp_usuario, usuario, token, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, email = _a.email, senha = _a.senha, tp_usuario = _a.tp_usuario;
                        return [4 /*yield*/, new UserService_1["default"]().getUserByEmail(email, tp_usuario)];
                    case 1:
                        usuario = _b.sent();
                        if (!(usuario.length === 1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(senha, usuario[0].senha)];
                    case 2:
                        if (_b.sent()) {
                            token = jsonwebtoken_1["default"].sign({ id: usuario[0].id }, process.env.APP_SECRET || "34f08ca07a8ee8dec0c07a844115c08e", {
                                expiresIn: "1d"
                            });
                            data = {
                                id: usuario[0].id,
                                email: usuario[0].email,
                                token: token
                            };
                            return [2 /*return*/, response.status(200).json(data)];
                        }
                        _b.label = 3;
                    case 3:
                        response.status(404).json({ message: "Usuario ou senha inválido!" });
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports["default"] = UserController;
