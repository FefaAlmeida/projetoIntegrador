-- Migration: Criar tabela orçamentos
-- Data: 2026-05-19
-- Descrição: Tabela para armazenar orçamentos do sistema

USE luminar_api;

CREATE TABLE IF NOT EXISTS orcamentos (
    id_orcamento INT PRIMARY KEY AUTO_INCREMENT,
    id_empresa INT NOT NULL,
    quantidade_placas INT NOT NULL,
    modelo_placa ENUM(
        'CANADIAN_550W',
        'JINKO_600W',
        'TRINA_575W',
        'LONGI_650W'
    ) NOT NULL,

    valor_instalacao DECIMAL(10,2),
    valor_placas DECIMAL(10,2),
    valor_total DECIMAL(10,2),

    status_orcamento ENUM(
        'PENDENTE',
        'APROVADO',
        'RECUSADO'
    ) NOT NULL DEFAULT 'PENDENTE',

    observacoes TEXT,
    data_orcamento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_orcamento_empresa
        FOREIGN KEY (id_empresa)
        REFERENCES empresa_clientes(id_empresa)
);