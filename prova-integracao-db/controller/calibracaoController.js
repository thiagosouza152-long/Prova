import { Calibracao } from "../model/Calibracao.js";
import {
  cadastrar,
  listar,
  listarDetalhadas,
  buscarPorId,
  atualizar,
  deletar
} from "../repository/calibracaoRepository.js";

export async function cadastrarCalibracao(req, res) {
  try {
    const { equipamentoId, dataCalibracao, resultado, responsavel } = req.body;

    if (!equipamentoId || !dataCalibracao || !resultado || !responsavel) {
      return res.status(400).json({
        mensagem: "Equipamento, data, resultado e responsável são obrigatórios"
      });
    }

    const calibracao = new Calibracao(
      equipamentoId,
      dataCalibracao,
      resultado,
      responsavel
    );

    const id = await cadastrar(calibracao);

    res.status(201).json({
      mensagem: "Calibração cadastrada com sucesso",
      id_calibracao: id
    });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar calibração: " + erro
    });
  }
}

export async function listarCalibracoes(req, res) {
  try {
    const listaDeCalibracoes = await listar();
    res.status(200).json(listaDeCalibracoes);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar calibrações: " + erro
    });
  }
}

export async function listarCalibracoesDetalhadas(req, res) {
  try {
    const listaDetalhada = await listarDetalhadas();
    res.status(200).json(listaDetalhada);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar calibrações detalhadas: " + erro
    });
  }
}

export async function buscarCalibracaoPorId(req, res) {
  try {
    const id = Number(req.params.id);
    const calibracao = await buscarPorId(id);

    if (!calibracao) {
      return res.status(404).json({ mensagem: "Calibração não encontrada" });
    }

    res.status(200).json(calibracao);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar calibração por ID: " + erro
    });
  }
}

export async function atualizarCalibracao(req, res) {
  try {
    const id = Number(req.params.id);
    const calibracao = await buscarPorId(id);

    if (!calibracao) {
      return res.status(404).json({ mensagem: "Calibração não encontrada" });
    }

    const { equipamentoId, dataCalibracao, resultado, responsavel } = req.body;

    if (equipamentoId !== undefined) calibracao.equipamentoId = Number(equipamentoId);
    if (dataCalibracao !== undefined) calibracao.dataCalibracao = dataCalibracao;
    if (resultado !== undefined) calibracao.resultado = resultado;
    if (responsavel !== undefined) calibracao.responsavel = responsavel;

    const resultadoAtualizacao = await atualizar(id, calibracao);

    if (resultadoAtualizacao === 0) {
      return res.status(404).json({
        mensagem: "Erro ao atualizar calibração, nenhuma calibração atualizada"
      });
    }

    res.status(200).json({ mensagem: "Calibração atualizada com sucesso" });
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar calibração: " + erro
    });
  }
}

export async function deletarCalibracao(req, res) {
  try {
    const id = Number(req.params.id);
    const calibracao = await buscarPorId(id);

    if (!calibracao) {
      return res.status(404).json({ mensagem: "Calibração não encontrada" });
    }

    const resultado = await deletar(id);

    if (resultado === 0) {
      return res.status(404).json({ mensagem: "Nenhuma calibração deletada" });
    }

    res.status(204).send();
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao deletar calibração: " + erro
    });
  }
}
