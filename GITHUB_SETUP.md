# 🚀 Guia para Subir o Projeto para o GitHub

## 📋 Pré-requisitos

- Conta no GitHub
- Git instalado localmente
- Docker e Docker Compose (opcional)

## 🔧 Configuração Inicial

### 1. Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em "New repository"
3. Nome: `money-control`
4. Descrição: `Sistema de controle financeiro pessoal`
5. Marque como "Public" ou "Private"
6. **NÃO** marque "Initialize with README" (já temos um)
7. Clique em "Create repository"

### 2. Configurar Git Local

```bash
# Inicializar repositório Git (se ainda não foi feito)
git init

# Adicionar arquivo .gitignore
git add .gitignore

# Fazer primeiro commit
git add .
git commit -m "Initial commit: Money Control system"

# Adicionar remote do GitHub
git remote add origin https://github.com/SEU-USUARIO/money-control.git

# Renomear branch principal para main
git branch -M main

# Fazer push inicial
git push -u origin main
```

### 3. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp env.example .env

# Editar com suas configurações
# NÃO commitar o arquivo .env (já está no .gitignore)
```

## 🐳 Configuração Docker

### Desenvolvimento Local

```bash
# Usar Docker Compose para desenvolvimento
docker-compose -f docker-compose.dev.yml up -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Parar serviços
docker-compose -f docker-compose.dev.yml down
```

### Produção

```bash
# Usar Docker Compose para produção
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

## 📝 Comandos Git Úteis

```bash
# Ver status
git status

# Adicionar arquivos
git add .
git add arquivo-especifico.js

# Fazer commit
git commit -m "Descrição da mudança"

# Fazer push
git push origin main

# Fazer pull
git pull origin main

# Ver histórico
git log --oneline

# Criar branch
git checkout -b feature/nova-funcionalidade

# Voltar para main
git checkout main

# Merge branch
git merge feature/nova-funcionalidade
```

## 🔄 Workflow de Desenvolvimento

### 1. Criar Nova Feature

```bash
# Criar e mudar para nova branch
git checkout -b feature/nome-da-feature

# Fazer mudanças no código
# ... editar arquivos ...

# Adicionar mudanças
git add .

# Fazer commit
git commit -m "feat: adicionar nova funcionalidade"

# Fazer push da branch
git push origin feature/nome-da-feature
```

### 2. Criar Pull Request

1. Acesse o repositório no GitHub
2. Clique em "Compare & pull request"
3. Preencha título e descrição
4. Clique em "Create pull request"

### 3. Merge Pull Request

1. Revisar o código
2. Aprovar o PR
3. Fazer merge
4. Deletar a branch (opcional)

## 🚀 Deploy

### Heroku

1. Instalar Heroku CLI
2. Fazer login: `heroku login`
3. Criar app: `heroku create money-control-app`
4. Configurar variáveis:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=sua_uri_mongodb
   ```
5. Fazer deploy: `git push heroku main`

### Docker Hub

1. Fazer login: `docker login`
2. Construir imagem: `docker build -t seu-usuario/money-control .`
3. Fazer push: `docker push seu-usuario/money-control`

### VPS/Cloud

1. Fazer clone do repositório
2. Configurar variáveis de ambiente
3. Executar com Docker Compose:
   ```bash
   docker-compose up -d
   ```

## 📋 Checklist para Deploy

- [ ] Repositório criado no GitHub
- [ ] Código commitado e enviado
- [ ] Arquivo `.env` configurado (não commitado)
- [ ] Docker funcionando localmente
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Variáveis de ambiente configuradas no servidor
- [ ] Domínio configurado (se aplicável)
- [ ] SSL/HTTPS configurado (se aplicável)

## 🛠️ Comandos Úteis

```bash
# Ver containers rodando
docker ps

# Ver logs de um container
docker logs container-name

# Entrar em um container
docker exec -it container-name sh

# Limpar containers parados
docker container prune

# Limpar imagens não utilizadas
docker image prune

# Limpar tudo
docker system prune -a
```

## 📞 Suporte

Se tiver problemas:

1. Verifique os logs: `docker-compose logs -f`
2. Verifique as variáveis de ambiente
3. Verifique se as portas estão disponíveis
4. Consulte a documentação do MongoDB
5. Abra uma issue no GitHub

## 🎉 Próximos Passos

Após subir para o GitHub:

1. Configurar GitHub Actions para CI/CD
2. Configurar webhooks para deploy automático
3. Configurar monitoramento
4. Configurar backup do banco de dados
5. Configurar domínio personalizado
