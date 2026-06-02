-- Migration: Atualizar tabela usuários
-- Data: 2026-05-26
-- Descrição: Alteração usuários

USE luminar_api;

ALTER TABLE usuarios
ADD COLUMN token_cadastro VARCHAR(255) NOT NULL UNIQUE;