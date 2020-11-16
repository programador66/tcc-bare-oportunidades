export function setVagaSelected(state, dados) {
  state.vagas = dados;
}

export function setOpotunitiesAndProfile(state, dados) {
  state.oportunityByAluno.aluno = dados.aluno;
  state.oportunityByAluno.vagasEscolhidas = dados.vagasEscolhidas;
}

export function setFavoriteVagas(state, dados) {
  state.vagas_favoritas = dados;
}