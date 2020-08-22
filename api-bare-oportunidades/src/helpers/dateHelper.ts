class DateHelper {
  async valor_a_pagar(horaInicial: String, horaFinal: String) {
    // Tratamento se a hora inicial é menor que a final

    const hIni = horaInicial.split(":");
    const hFim = horaFinal.split(":");

    let IhorasFor = parseInt(hIni[0], 10);
    let IminFor = parseInt(hIni[1], 10);

    let FhorasFor = parseInt(hFim[0], 10);
    let FminFor = parseInt(hFim[1], 10);

    let horasTotal = parseInt(hFim[0], 10) - parseInt(hIni[0], 10);
    let minutosTotal = parseInt(hFim[1], 10) - parseInt(hIni[1], 10);

    if (minutosTotal >= 60) {
      minutosTotal -= 60;
      horasTotal += 1;
    }

    let valortotal = 0;

    if (IhorasFor >= 8 && IminFor >= 0 && FhorasFor <= 12 && FminFor == 0) {
      valortotal = horasTotal * 2;
    } else if (IhorasFor >= 12 && IminFor > 0 && FhorasFor <= 18) {
      valortotal = horasTotal * 3;
    } else {
      for (let i = IhorasFor; i < FhorasFor; i++) {
        if (i < 12) {
          valortotal += 1 * 2;
        } else {
          valortotal += 1 * 3;
        }
        console.log(valortotal);
      }
    }

    return valortotal;
  }

  async valor_a_pagarFS(horaInicial: String, horaFinal: String) {
    const hIni = horaInicial.split(":");
    const hFim = horaFinal.split(":");

    let horasTotal = parseInt(hFim[0], 10) - parseInt(hIni[0], 10);
    let minutosTotal = parseInt(hFim[1], 10) - parseInt(hIni[1], 10);

    if (minutosTotal >= 60) {
      minutosTotal -= 60;
      horasTotal += 1;
    }

    return horasTotal * 2.5;
  }

  async validaDiaERetornaValor(
    dia: String,
    horaInicial: String,
    horaFinal: String
  ) {
    switch (dia) {
      case "sábado":
        return await this.valor_a_pagarFS(horaInicial, horaFinal);

      case "domingo":
        return await this.valor_a_pagarFS(horaInicial, horaFinal);

      default:
        return await this.valor_a_pagar(horaInicial, horaFinal);
    }
  }

  async validaHoraDeEntrada(horaInicial: String) {
    const hIni = horaInicial.split(":");

    let IhorasFor = parseInt(hIni[0], 10);
    let IminFor = parseInt(hIni[1], 10);

    if (IhorasFor < 8 || (IhorasFor >= 18 && IminFor > 0)) {
      return false;
    }

    return true;
  }
}

export default DateHelper;
