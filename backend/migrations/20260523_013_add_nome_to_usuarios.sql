-- Migration: Adicionar coluna nome à tabela usuarios
-- Data: 2026-05-23
-- Descrição: Adiciona a coluna nome necessária para o cadastro de usuários

USE luminar_api;

ALTER TABLE usuarios
    ADD COLUMN nome VARCHAR(255) NOT NULL DEFAULT '' AFTER id_usuario;
