"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.someMutation = someMutation;

function someMutation(state, dados) {
  state.usuario = dados;
}