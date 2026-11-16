# Evidências de teste

| /equipamentos | POST
| /equipamentos | GET
| /equipamentos/:id | GET
| /equipamentos/:id | PATCH
| /equipamentos/:id | DELETE
| /calibracoes | POST
| /calibracoes | GET
| /calibracoes/detalhadas | GET
| /calibracoes/:id | GET
| /calibracoes/:id | PATCH
| /calibracoes/:id | DELETE


### Cadastrar equipamento

{
  "codigoPatrimonio": "EQ-001",
  "nome": "Paquímetro Digital",
  "setor": "Qualidade",
  "status": "ativo"
}

{
  "codigoPatrimonio": "EQ-002",
  "nome": "Martelo",
  "setor": "Marcenaria",
  "status": "ativo"
}

### Atualizar equipamento codigoPatrimonio: EQ-001

{
  "nome": "Paquímetro Digital 150 mm",
  "setor": "Metrologia",
}

### Cadastrar calibração

{
  "equipamentoId": 1,
  "dataCalibracao": "2026-11-16",
  "resultado": "aprovado",
  "responsavel": "Ana Souza"
}