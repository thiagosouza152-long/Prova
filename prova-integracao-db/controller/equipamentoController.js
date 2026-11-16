import { Equipamento } from "../model/Equipamento.js";
import {
  cadastrar,
  listar,
  buscarPorId,
  atualizar,
  deletar
} from "../repository/equipamentoRepository.js";

export async function cadastrarEquipamento(req, res) {
  try {
    const { codigoPatrimonio, nome, setor, status } = req.body;

    if (!codigoPatrimonio || !nome || !setor) {
      return res.status(400).json({
        mensagem: "Código de patrimônio, nome e setor são obrigatórios"
      });
    }

    const equipamento = new Equipamento(codigoPatrimonio, nome, setor, status);
    const id = await cadastrar(equipamento);

    res.status(201).json({
      mensagem: "Equipamento cadastrado com sucesso",
      id_equipamento: id
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar equipamento: " + erro
    });
  }
}

export async function listarEquipamentos(req, res) {
  try {
    const listaDeEquipamentos = await listar();
    res.status(200).json(listaDeEquipamentos);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar equipamentos: " + erro
    });
  }
}

export async function buscarEquipamentoPorId(req, res) {
  try {
    const id = Number(req.params.id);
    const equipamento = await buscarPorId(id);

    if (!equipamento) {
      return res.status(404).json({ mensagem: "Equipamento não encontrado" });
    }

    res.status(200).json(equipamento);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar equipamento por ID: " + erro
    });
  }
}

export async function atualizarEquipamento(req, res) {
  try {
    const id = Number(req.params.id);
    const equipamento = await buscarPorId(id);

    if (!equipamento) {
      return res.status(404).json({ mensagem: "Equipamento não encontrado" });
    }

    const { codigoPatrimonio, nome, setor, status } = req.body;

    if (codigoPatrimonio !== undefined) equipamento.codigoPatrimonio = codigoPatrimonio;
    if (nome !== undefined) equipamento.nome = nome;
    if (setor !== undefined) equipamento.setor = setor;
    if (status !== undefined) equipamento.status = status;

    const resultado = await atualizar(id, equipamento);

    if (resultado === 0) {
      return res.status(404).json({
        mensagem: "Erro ao atualizar equipamento, nenhum equipamento atualizado"
      });
    }

    res.status(200).json({ mensagem: "Equipamento atualizado com sucesso" });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar equipamento: " + erro
    });
  }
}

export async function deletarEquipamento(req, res) {
  try {
    const id = Number(req.params.id);
    const equipamento = await buscarPorId(id);

    if (!equipamento) {
      return res.status(404).json({ mensagem: "Equipamento não encontrado" });
    }

    const resultado = await deletar(id);

    if (resultado === 0) {
      return res.status(404).json({ mensagem: "Nenhum equipamento deletado" });
    }

    res.status(204).send();
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao deletar equipamento: " + erro
    });
  }
}
