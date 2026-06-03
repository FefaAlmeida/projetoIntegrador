-- Migration: Atualizar tabela usuários
-- Data: 2026-05-26
-- Descrição: Alteração usuários

USE luminar_api;

ALTER TABLE usuarios
DROP COLUMN token_cadastro;
