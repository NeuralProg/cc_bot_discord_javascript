// Vous aurez besoin du module discord.js qui appelle l'API de Discord
const Discord = require("discord.js");
const quiz=require('./questions.json')

// Vous appelez une fonction de l'objet créé au-dessus qui permet de 
// récupérer un objet utilisateur client qui représente le bot 
const bot = new Discord.Client({intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent
] });

bot.on("ready", () => {
    //Ici vous afficherez dans le terminal que le bot est bien connecté
    console.log("Carapuce est dans la place");
});

// La ligne suivante permet d'indiquer à l'objet Discord qui est votre bot 
// afin qu'il puisse se connecter 
bot.login("MTEyMzg5MjMyMDk5NjE3OTk2OQ.G9yNe8.hp3nJFkoc-cTQx8-afIcTFWdg_hleNAt7s8pbA");

bot.on("messageCreate", (message) => {
    if (message.content === "!carabonjour") {
        message.reply("Carabonjour à toi !");
        message.react("<:Carapuce:1123941355496935434>")
    }
    if (message.content === "!emojilist") {
        const emojiliste = message.guild.emojis.cache.map((e) => ("\n<:" + e.name + ":" + e + "> => :" + e.name + ":"));
        message.reply(`${emojiliste}`)
    }
    //Si le tout premier mot du message est « !pin », épingler le message !
    if (message.content.startsWith("!pin")) {
        message.pin();
    }
    
    const lowercaseContent = message.content.toLowerCase();
    if (lowercaseContent.includes("carapuce")){
        message.react("<:Carapuce:1123941355496935434>")
    }

    if (message.content === "!caraquiz") {
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const collectorFilter = response => {
	    return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());};

        message.reply({ content: item.question, fetchReply: true })
        .then(() => {
            message.channel.awaitMessages({ filter: collectorFilter, max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    message.reply(`${collected.first().author} à eu la bonne réponse !`);
                })
                .catch(collected => {
                    message.reply('Mauvaise réponse.');
                });
        });
    }

    if (message.content === "!carahelp") {
                //on envoie un message de type embed dans le channel d'où provient le message
                const newEmbed = new Discord.EmbedBuilder()
                    .setColor('#3498db')
                    .setDescription("__**Les différentes commandes**__")
                    .setFields(
                        {
                            name: "!carahelp",
                            value:"Pour afficher cette aide."
                        },
                        {
                            name: "!carabonjour",
                            value:"Pour obtenir un bonjour de notre cher Carapuce."
                        },
                        {
                            name: "!pin + [Message]",
                            value:"Pour pin un message."
                        },
                        {
                            name: "!emojilist",
                            value:"Tous les emojis du serveur."
                        },
                        {
                            name: "!caraquiz",
                            value:"Un quizz sur pokemon."
                        }
                    )
            message.reply({embeds: [newEmbed]});
            }
        });
        

        
    
