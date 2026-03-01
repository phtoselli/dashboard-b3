#!/bin/bash

# Script para alternar entre SQLite (desenvolvimento) e PostgreSQL (produção)

set -e

SCHEMA_DIR="prisma"
SQLITE_SCHEMA="schema.sqlite.prisma"
POSTGRES_SCHEMA="schema.postgres.prisma"
CURRENT_SCHEMA="schema.prisma"

echo "🔄 Trocando configuração do banco de dados..."

case "$1" in
  sqlite|dev|development)
    echo "📦 Configurando para SQLite (Desenvolvimento Local)"
    cp "$SCHEMA_DIR/$SQLITE_SCHEMA" "$SCHEMA_DIR/$CURRENT_SCHEMA"
    echo "✅ Schema atualizado para SQLite"
    echo "💡 Lembre-se de atualizar o .env com:"
    echo "   DATABASE_URL=\"file:./db/custom.db\""
    ;;

  postgres|prod|production)
    echo "🐘 Configurando para PostgreSQL (Produção)"
    cp "$SCHEMA_DIR/$POSTGRES_SCHEMA" "$SCHEMA_DIR/$CURRENT_SCHEMA"
    echo "✅ Schema atualizado para PostgreSQL"
    echo "💡 Lembre-se de atualizar o .env com suas credenciais do PostgreSQL"
    ;;

  current|status)
    if grep -q "provider = \"sqlite\"" "$SCHEMA_DIR/$CURRENT_SCHEMA" 2>/dev/null; then
      echo "📊 Banco atual: SQLite (Desenvolvimento)"
    elif grep -q "provider = \"postgresql\"" "$SCHEMA_DIR/$CURRENT_SCHEMA" 2>/dev/null; then
      echo "📊 Banco atual: PostgreSQL (Produção)"
    else
      echo "❓ Não foi possível determinar o tipo de banco"
    fi
    ;;

  *)
    echo "Usage: $0 {sqlite|postgres|current}"
    echo ""
    echo "Commands:"
    echo "  sqlite, dev, development  - Usa SQLite para desenvolvimento local"
    echo "  postgres, prod, production - Usa PostgreSQL para produção"
    echo "  current, status           - Mostra a configuração atual"
    exit 1
    ;;
esac

echo ""
echo "🔄 Gerando Prisma Client..."
npx prisma generate

echo "✅ Done!"
