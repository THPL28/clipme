# Plano de Escalabilidade (Gratuito)

Para suportar de 100 a 500 usuários ativos sem custos iniciais elevados:

## 1. Armazenamento (Storage)
- **Supabase Storage (Free Tier):** Oferece 1GB de armazenamento gratuito. Ideal para vídeos temporários de 30s (~5-10MB por vídeo).
- **Firebase Storage (Spark Plan):** Alternativa sólida com 5GB de armazenamento gratuito e CDN rápida.

## 2. Banco de Dados
- **Supabase (PostgreSQL):** Excelente plano gratuito com 500MB de banco de dados e autenticação integrada.
- **SQLite:** Para o MVP inicial, dispensando infraestrutura externa e rodando diretamente no servidor do backend.

## 3. Hospedagem do Backend
- **Render ou Railway:** Oferecem planos gratuitos para serviços web.
- **Dica de Performance:** Como processamento de vídeo consome CPU, vídeos devem ser deletados do storage após o download do usuário para economizar espaço.

## 4. Estratégia de Processamento
- **Fila de Tarefas (Celery/Redis):** Em uma fase pós-MVP, usar uma fila para processar vídeos em background, evitando que o backend trave enquanto o MoviePy trabalha. No plano gratuito do Render, o processamento pode ser lento, então o feedback visual no App ("Estamos preparando sua magia...") é crucial.

## 5. Limites de MVP
- **Vídeos:** Máximo 30 segundos.
- **Resolução:** 720p ou 480p para reduzir uso de banda e CPU.
- **Cleanup:** Script automático no backend para limpar a pasta `videos/temp` e `videos/processed` a cada 1 hora.
