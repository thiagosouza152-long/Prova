export class Equipamento {
  constructor(codigoPatrimonio, nome, setor, status_eq = "ativo") {
    this.codigoPatrimonio = codigoPatrimonio;
    this.nome = nome;
    this.setor = setor;
    this.status_eq = status_eq;
  }

  validar() {
    if (!this.codigoPatrimonio || !this.nome || !this.setor) {
      throw new Error("Código, nome e setor são obrigatórios.");
    }

    if (!['ativo', 'inativo'].includes(this.status_eq)) {
      throw new Error("O status deve ser ativo ou inativo.");
    }
  }
  static validarId(id){
      if (!Number.isInteger(id) || id == 0){
        throw new Error ("ID de equipamento deve ser um numero inteiro positivo");
      }
}
}
