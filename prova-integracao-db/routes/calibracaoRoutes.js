import { Router } from "express";
import {
  cadastrar,
  listar,
  listarDetalhadas,
  buscarPorId,
  atualizar,
  excluir
} from "../controller/calibracaoController.js";

const router = Router();

router.post("/", cadastrar);
router.get("/", listar);
router.get("/detalhadas", listarDetalhadas);
router.get("/:id", buscarPorId);
router.patch("/:id", atualizar);
router.delete("/:id", excluir);

export default router;
