"use strict";
exports.__esModule = true;
var FaculdadeStrategy_1 = require("../strategies/FaculdadeStrategy");
var AlunoStrategy_copy_1 = require("../strategies/AlunoStrategy copy");
var NovoCadastroFactory = /** @class */ (function () {
    function NovoCadastroFactory(tp_usuario) {
        this.tp_usuario = tp_usuario;
        this.tp_usuario = tp_usuario;
    }
    NovoCadastroFactory.prototype.getClasse = function () {
        switch (this.tp_usuario) {
            case "F":
                return new FaculdadeStrategy_1["default"]();
                break;
            case "A":
                return new AlunoStrategy_copy_1["default"]();
                break;
            default:
                throw new Error("Strategie Inválida!");
        }
    };
    return NovoCadastroFactory;
}());
exports["default"] = NovoCadastroFactory;
