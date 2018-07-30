const Discord = require('discord.js');
const googlehome =  require('google-home-notifier');
const config= require('./config');
const client = new Discord.Client();

googlehome.device(config.device.name, config.language);
googlehome.ip(config.device.ip, config.language);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
  const channelId = 
    newState.voiceChannelID === null
      ? oldState.voiceChannelID
      : newState.voiceChannelID;
  const userName = newState.user.username;
  const channelName = client.channels.find('id', channelId).name;

  let msg = "";

  if (oldState.voiceChannelID == null && newState.voiceChannelID != null) {
    msg = `${userName}が${channelName}チャンネルにJoinしました`;
  } else if (oldState.voiceChannelID != null && newState.voiceChannelID == null) {
    msg = `${userName}が${channelName}チャンネルをLeaveしました`;
  } else if (oldState.voiceChannelID !== newState.voiceChannelID){
    msg = `${userName}が${channelName}チャンネルにMoveしました`;
  } else {
    return;
  }

  googlehome.notify(msg, function(res) {});
  console.log(msg)
});

client.login(config.bot.token);
