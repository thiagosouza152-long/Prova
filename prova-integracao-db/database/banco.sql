CREATE DATABASE IF NOT EXISTS calibratech_db;

USE calibratech_db;

CREATE TABLE IF NOT EXISTS equipamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo_patrimonio VARCHAR(30) NOT NULL UNIQUE,
  nome VARCHAR(100) NOT NULL,
  setor VARCHAR(80) NOT NULL,
  status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo'
);

CREATE TABLE IF NOT EXISTS calibracoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  equipamento_id INT NOT NULL,
  data_calibracao DATE NOT NULL,
  resultado ENUM('aprovado', 'reprovado') NOT NULL,
  responsavel VARCHAR(100) NOT NULL,
  CONSTRAINT fk_calibracoes_equipamentos
    FOREIGN KEY (equipamento_id) REFERENCES equipamentos(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);
