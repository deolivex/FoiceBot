require('dotenv').config();
const tmi = require('tmi.js');
const fs = require('fs');
const fetch = require('node-fetch');

// Define as opções de configuração
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.BOT_OAUTH
  },
  channels: [
    "elv3x"
  ]
};

// Cria um cliente com as opções definidas
const client = new tmi.client(opts);

// Registra os manipuladores de eventos
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Conecta ao Twitch
client.connect();

// Carrega os comandos do arquivo JSON
let commands = {};
fs.readFile('commands.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo commands.json:', err);
    return;
  }
  commands = JSON.parse(data);
});

// Carrega as reações do arquivo JSON
const reactions = {};
fs.readFile('reactions.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo reactions.json:', err);
    return;
  }
  Object.assign(reactions, JSON.parse(data));
});

// Função para normalizar texto removendo acentos
function normalizeText(text) {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

// Registra o horário de início do bot
const startTime = Date.now();

// Chamado sempre que uma mensagem é recebida
async function onMessageHandler(target, context, msg, self) {
  if (self) return; // Ignora mensagens do próprio bot

  // Remove espaços em branco da mensagem, normaliza e converte para minúsculas
  const commandName = normalizeText(msg.trim());

  // Verifica se o comando existe no JSON de comandos
  if (commandName.startsWith('!')) {
    const commandKey = commandName.slice(1); // Remove o prefixo '!'

    if (commandKey === 'comandos') {
      // Gera uma lista de comandos habilitados, excluindo 'comandos'
      const enabledCommands = Object.keys(commands)
        .filter(key => commands[key].enabled && key !== 'comandos')
        .join(', ');
      client.say(target, `Comandos disponíveis: ${enabledCommands}.`);
    } else if (commandKey === 'uptime') {
      // Calcula o tempo de atividade do bot
      const uptime = Date.now() - startTime;
      const hours = Math.floor(uptime / (1000 * 60 * 60));
      const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
      client.say(target, `/me ${hours}h:${minutes}m:${seconds}s @ WebTejo.Pt`);
    } else if (commands[commandKey] && commands[commandKey].enabled) {
      const command = commands[commandKey];

      if (command.api) {
        // Faz uma requisição à API
        try {
          const response = await fetch(command.api);
          const data = await response.json();

          // Substitui os placeholders na resposta
          let message = command.response;
          for (const key in data) {
            message = message.replace(`{{${key}}}`, data[key]);
          }
          message = message.replace('{{timezone}}', command.timezone || '');

          client.say(target, message);
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
          client.say(target, 'Desculpe, não foi possível obter os dados no momento.');
        }
      } else {
        const response = command.response.replace('{user}', context['display-name']);
        client.say(target, response);
      }
    } else {
      client.say(target, "/me Não conheço esse comando primo! cmonBruh");
    }
  } else {
    // Verifica se a mensagem corresponde a uma reação
    const reactionKey = commandName;
    if (reactions[reactionKey] && reactions[reactionKey].enabled) {
      const response = reactions[reactionKey].response.replace('{user}', context['display-name']);
      client.say(target, response);
    }
  }
}

// Chamado sempre que o bot se conecta ao Twitch
function onConnectedHandler(addr, port) {
  console.log(`* Conectado a ${addr}:${port}`);
}