# MoneyControl - Docker Setup

## Como executar com Docker

### 1. Usando Docker Compose (Recomendado)

```bash
# Construir e executar os containers
docker-compose up --build

# Executar em background
docker-compose up -d --build
```

### 2. Usando Docker diretamente

```bash
# Construir a imagem
docker build -t money-control .

# Executar o container
docker run -p 3000:3000 -e MONGODB_URI="mongodb+srv://admin:admin123@cluster0.ej5o60i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" money-control
```

## Acessar a aplicação

Após executar, acesse: http://localhost:3000

## Parar os containers

```bash
# Parar containers do docker-compose
docker-compose down

# Parar container específico
docker stop <container_id>
```

## Logs

```bash
# Ver logs do docker-compose
docker-compose logs -f

# Ver logs de um container específico
docker logs <container_id>
```
