# FoiceBot

![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

FoiceBot é um bot fixe para Twitch, desenvolvido em Node.js, que responde a comandos e reage às mensagens do chat. 
Bora configurar e pôr a funcionar? 😎

---

## 🚀 **Como Começar**

### 1. **O que precisas**
- [Node.js](https://nodejs.org/) (recomendo a versão 16 ou mais recente)
- [Git](https://git-scm.com/)

### 2. **Fazer download do projeto**
No terminal, executa:
```bash
git clone https://github.com/seu-usuario/foicebot.git
cd foicebot
```

### 3. **Instalar as dependências**
Para instalar as dependências, executa:
```bash
npm install
```

### 4. **Configurar as credenciais**
Cria um ficheiro `.env` na raiz do projeto e adiciona:
```
BOT_USERNAME=OUsernameDoTeuBot
BOT_OAUTH=oauth:teu_oauth_token
```

---

## ⚙️ **Como Personalizar o Bot**

### 1. **Comandos**
Os comandos estão no ficheiro `commands.json`. Exemplo:
```json
{
  "comando": {
    "response": "Resposta do comando",
    "enabled": true
  }
}
```
- **`comando`**: Nome do comando (sem o `!`).
- **`response`**: O que o bot vai responder no chat.
- **`enabled`**: Ativa (`true`) ou desativa (`false`) o comando.

### 2. **Reacções**
As reacções estão no ficheiro `reactions.json`. Exemplo:
```json
{
  "palavra": {
    "response": "Resposta da reacção",
    "enabled": true
  }
}
```
- **`palavra`**: Palavra que activa a reacção.
- **`response`**: O que o bot vai responder no chat.
- **`enabled`**: Activa (`true`) ou desactiva (`false`) a reacção.

### 3. **Alterar o Código**
Queres mudar o comportamento do bot? Dá uma vista de olhos no `app.js`. Depois de editares, reinicia o bot:
```bash
npm start
```

---

## 🛠️ **Como Executar o Bot**

1. Certifica-te de que tudo está configurado e o `.env` está correcto.
2. Para ligar o bot, executa:
```bash
npm start
```
3. O bot vai entrar no canal e começar a interagir no chat. 🎉

---

## 📝 **Dicas Úteis**
- Nunca envies o ficheiro `.env` para o GitHub (já está no `.gitignore`).
- Testa as tuas alterações localmente antes de as submeteres para o repositório.
- Actualiza este README se adicionares algo novo. 😄

---

## 🤝 **Contribuições**
Queres ajudar? Abre uma issue ou envia um pull request. Toda a ajuda é bem-vinda! 🙌

---

## 📄 **Licença**
Este projeto está sob a [MIT License](LICENSE).

---
