export function someMutation(state, dados) {
  state.usuario = dados;
}

export function setTipoUsuarioForm(state, dados) {
  state.tp_usuario.tipo = dados.tipo;
  state.tp_usuario.title = dados.title;
  state.tp_usuario.paragrafo = dados.paragrafo;

}
