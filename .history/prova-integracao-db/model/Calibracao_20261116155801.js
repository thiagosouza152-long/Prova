export class Calibracao {
  constructor(equipamentoId, dataCalibracao, resultado, responsavel) {
    this.equipamentoId = Number(equipamentoId);
    this.dataCalibracao = dataCalibracao;
    this.resultado = resultado;
    this.responsavel = responsavel;
  }

  validar() {
    if (!Number.isInteger(this.equipamentoId) || this.equipamentoId <= 0) {
      throw new Error("O equipamentoId deve ser um número inteiro positivo.");
    }

    if (!this.dataCalibracao || !this.resultado || !this.responsavel) {
      throw new Error("Data, resultado e responsável são obrigatórios.");
    }

    if (!['aprovado', 'reprovado'].includes(this.resultado)) {
      throw new Error("O resultado deve ser aprovado ou reprovado.");
    }
  }
}
