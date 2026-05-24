# Backend Luminar

API REST em Node.js + Express + MySQL.

---

## Como rodar

```bash
npm install
cp env.example .env      # editar com suas credenciais MySQL
npm run dev              # sobe em http://localhost:3001
```

---

## Estrutura de pastas

```
backend/
├── app.js                 ← entrada: configura Express e sobe o servidor
├── config/                ← configurações (banco, JWT)
│   ├── database.js          pool MySQL
│   └── jwt.js               secret/expiresIn
├── routes/                ← URL → controller
│   ├── auth.routes.js       /api/auth/*
│   ├── user.routes.js       /api/usuarios/*
│   └── product.routes.js    /api/produtos/*
├── controllers/           ← lê req, devolve res. SEM regra de negócio.
│   ├── auth.controller.js
│   ├── user.controller.js
│   └── product.controller.js
├── services/              ← TODA regra de negócio mora aqui
│   ├── auth.service.js
│   ├── user.service.js
│   └── product.service.js
├── models/                ← acesso ao banco (SQL com prepared statements)
│   ├── user.model.js
│   └── product.model.js
├── middlewares/           ← código que roda ANTES/DEPOIS do controller
│   ├── auth.middleware.js   valida JWT + checa se é admin
│   ├── error.middleware.js  formata todo erro em JSON consistente
│   ├── log.middleware.js    console.log de cada request
│   └── upload.middleware.js multer pra upload de imagens
└── utils/                 ← helpers reutilizáveis
    ├── apiError.js          classe de erro customizada
    ├── asyncHandler.js      wrap pra capturar erro async
    ├── password.js          bcrypt hash/compare
    ├── response.js          ok / created / paginated
    └── validator.js         required / email / length / oneOf / id / pagination
```

---

## A regra é uma só: cada camada SÓ fala com a de baixo

```
Request → routes → controller → service → model → DB
                       ↓
                   utils, middlewares
```

- **Nunca** o model fala com o controller.
- **Nunca** o service toca em `req` ou `res`.
- **Nunca** o controller faz SQL ou hash de senha.

---

## Exemplo: o que acontece em `POST /api/auth/login`

1. `routes/auth.routes.js` → mapeia `POST /login` pra `authController.login`.
2. `controllers/auth.controller.js#login` → pega `req.body`, chama `authService.login(body)`, devolve `ok(res, data)`.
3. `services/auth.service.js#login` → valida campos, busca usuário, compara senha (bcrypt), gera JWT.
4. `models/user.model.js#findByEmail` → executa `SELECT ... FROM usuarios WHERE email = ?`.
5. Volta tudo até o controller, que responde:
   ```json
   {
     "success": true,
     "message": "Login realizado com sucesso",
     "data": {
       "token": "...",
       "usuario": { "id": 1, "nome": "X", "email": "x@y.com", "tipo": "CLIENTE" }
     }
   }
   ```

Se algo der errado, o service lança `throw ApiError.unauthorized('Email ou senha incorretos')` e o `error.middleware.js` transforma em:

```json
{ "success": false, "message": "Email ou senha incorretos" }
```

com status `401`.

---

## Como adicionar uma rota nova (cheat sheet)

Exemplo: `GET /api/produtos/categoria/:nome`

**1. Model** — adicione em `models/product.model.js`:

```js
export const findByCategory = async (categoria) => {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute('SELECT * FROM produtos WHERE categoria = ?', [categoria]);
    return rows;
  } finally {
    conn.release();
  }
};
```

**2. Service** — adicione em `services/product.service.js`:

```js
export const findByCategory = async (categoria) => {
  validator.required({ categoria });
  return productModel.findByCategory(categoria);
};
```

**3. Controller** — adicione em `controllers/product.controller.js`:

```js
export const findByCategory = asyncHandler(async (req, res) => {
  const data = await productService.findByCategory(req.params.nome);
  ok(res, data);
});
```

**4. Rota** — adicione em `routes/product.routes.js`:

```js
router.get('/categoria/:nome', productController.findByCategory);
```

Pronto. 4 arquivos, 4 trechos pequenos, cada um faz UMA coisa.

---

## Erros — como lançar e como o frontend recebe

No service:

```js
throw ApiError.validation('Mensagem'); // 400
throw ApiError.unauthorized(); // 401
throw ApiError.forbidden(); // 403
throw ApiError.notFound('Produto'); // 404
throw ApiError.conflict('Email já cadastrado'); // 409
throw new ApiError('Outro erro', 500);
```

O `errorMiddleware` transforma em:

```json
{ "success": false, "message": "Mensagem" }
```

com o status correto. O frontend só precisa olhar `response.ok` e `body.message`.

---

## Validações disponíveis (`utils/validator.js`)

| Função                                    | Pra que serve                                          |
| ----------------------------------------- | ------------------------------------------------------ |
| `validator.required({ nome, email })`     | Garante que todos os campos não estão vazios           |
| `validator.email(x)`                      | Formato de email válido                                |
| `validator.length(x, min, max, 'campo')`  | Tamanho da string                                      |
| `validator.oneOf(x, ['A', 'B'], 'campo')` | Valor entre opções (retorna em UPPERCASE)              |
| `validator.id(x, 'usuário')`              | ID inteiro positivo (retorna o número parseado)        |
| `validator.positiveNumber(x, 'preco')`    | Número > 0                                             |
| `validator.pagination(req.query)`         | Lê `?page=&limit=` e devolve `{ page, limit, offset }` |

---

## Respostas padrão (`utils/response.js`)

| Função                                  | Status | Forma do JSON                                  |
| --------------------------------------- | ------ | ---------------------------------------------- |
| `ok(res, data, msg)`                    | 200    | `{ success: true, message, data }`             |
| `created(res, data, msg)`               | 201    | `{ success: true, message, data }`             |
| `paginated(res, data, pagination, msg)` | 200    | `{ success: true, message, data, pagination }` |

---

## Padrões de código

- **Identificadores em inglês** (`userService`, `findByEmail`, `createUser`).
- **Comentários e mensagens da API em português** (frontend exibe direto pro usuário).
- **Domain fields no JSON em PT** (`nome`, `email`, `tipo`) — combinam com as colunas do banco.
- **Funções exportadas** (não classes): `export const x = ...`.
- Aspas simples, 2 espaços, ponto-e-vírgula sempre.
- Roda `npx prettier --write .` antes de commitar.

---

## Convenções de arquivo

- Pasta plural (`controllers/`, `services/`...).
- Arquivo singular com sufixo: `auth.controller.js`, `user.service.js`, `product.model.js`.
- Imports relativos: `../services/auth.service.js`.

---

## Por que essa arquitetura?

- **Controller fininho** = fácil de ler. Você vê a rota numa olhada.
- **Service grosso** = toda lógica num só lugar. Pra mudar regra, só mexe aqui.
- **Model = SQL** = se a coluna do banco mudar, só mexe num arquivo.
- **Utils reutilizáveis** = você não copia/cola validação ou tratamento de erro. Faz uma vez, usa em todo lugar.
- **asyncHandler + ApiError** = você nunca escreve `try/catch` no controller. Erro vai automaticamente pro `errorMiddleware`.
