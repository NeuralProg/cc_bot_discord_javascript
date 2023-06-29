// Vous aurez besoin du module discord.js qui appelle l'API de Discord
const Discord = require("discord.js");

// Vous appelez une fonction de l'objet créé au-dessus qui permet de 
// récupérer un objet utilisateur client qui représente le bot 
const bot = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages] });

bot.on("ready", () => {
    //Ici vous afficherez dans le terminal que le bot est bien connecté
    console.log("Carapuce est dans la place");
});

// La ligne suivante permet d'indiquer à l'objet Discord qui est votre bot 
// afin qu'il puisse se connecter 

bot.login("MTEyMzg5MjMyMDk5NjE3OTk2OQ.G9yNe8.hp3nJFkoc-cTQx8-afIcTFWdg_hleNAt7s8pbA");

// Ici vous regardez quand le bot est en ligne et qu'il voit passer un message (peu importe le serveur)
bot.on("message", message => {
    //Vous regardez alors si le contenu du message est exactement "!ping"
    if (message.content === "!ping") 
    {
        message.channel.send("Carapong !");
    }
});
    
