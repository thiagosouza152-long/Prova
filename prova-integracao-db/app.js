import express from "express";
import equipamentoRoutes from "./routes/equipamentoRoutes.js";
import calibracaoRoutes from "./routes/calibracaoRoutes.js";
import { conexao } from "./config/conexao.js";

const app = express();
const port = Number(process.env.PORT);

app.use(express.json());
app.use("/equipamentos", equipamentoRoutes);
app.use("/calibracoes", calibracaoRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ mensagem: "API CalibraTech em execução" });
});

try {
  await conectarBanco();
  app.listen(port, () => {
    console.log(`Servidor executando em http://localhost:${port}`);
  });
} catch (erro) {
  console.error("Não foi possível iniciar a API:", erro.message);
  process.exit(1);
}
