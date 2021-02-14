/* * Sean's bot (V 1.0.0)
   * This is my bot for Discord.
   * Author: Sean Trainor 
   * Date started: 03 May 2018
*/
//begin constants
const Discord = require("discord.js");

const TOKEN = "nope"
//adding this line for testing purposes
const YTDL = require("ytdl-core");

const PREFIX = "oi ";

const fs = require('fs')
//end constants

//begin functions
function readRole() { //reads a file called input
fs.readFile('Input.txt', 'utf8',function(err, data) {

        if (err) throw err;
        console.log(data)
        return data

    })
}

 function rannoprint(pp) { //not in use, still figuring it out
 	if(args[0])
 	Math.floor(Math.random() * pp.length)
 }

 //function randomIntFromInterval(min, max) {  //this function didn't do what i want it to but im scared to remove it
   //return Math.floor(Math.random() * (max - min + 1) + min);
 //}

 function getRandomIntInclusive(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
 }

 function play(connection, message) { //play music through the bot from youtube in the discord channel
    try {
    var content = message.content;
    var parts = content.split("oi play ");

        /*if(!parts[1].startsWith("https://www.youtube.com/")) {
            message.channel.send("You need to provide a YouTube URL.")
            if (message.guild.voiceConnection) {
            				    message.guild.voiceConnection.disconnect();
            }
            return
        }*/
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
    } catch (TypeError) { //caught this error, but for some reason the command is placed in some kind of cache and the sound effect will be played twice the next
           	                      //time the bot is called to play a sound effect
           	    console.log("Oops. I dun goof'd.")
           	    message.channel.send("Sorry. Something went wrong. Try again.")
           	    return
           	}
 }
//end functions
//begin variables
var bot = new Discord.Client();

var servers = {};

//TODO add Hoodwink
var dota = ["Abaddon", "Alchemist", "Axe", "Beastmaster", "Brewmaster", "Bristleback", "Centaur Warrunner", "Chaos Knight", "Clockwerk", "Doom", "Dragon Knight", "Earth Spirit", "Earthshaker", "Elder Titan","Huskar","Io","Kunkka", "Legion Commander", "Lifestealer","Lycan","Magnus", "Mars",
"Night Stalker","Omniknight","Phoenix","Pudge","Sand King","Slardar","Snapfire","Spirit Breaker","Sven","Tidehunter","Timbersaw","Tiny","Treant","Tusk","Underlord","Undying","Wraith King",
"Anti-Mage","Arc Warden","Bloodseeker","Bounty Hunter","Broodmother","Clinkz","Drow Ranger","Ember Spirit","Faceless Void","Gyrocopter","Juggernaut","Lone Druid","Luna","Medusa","Meepo","Mirana","Monkey King","Morphling","Naga Siren","Nyx","Pangolier","Phantom Assassin","Phantom Lancer",
"Razer","Riki","Shadow Fiend","Slark","Sniper","Spectre","Templar Assassin","Terrorblade","Troll Warlord","Ursa","Vengeful Spirit","Venomancer","Viper","Weaver","Ancient Apparition","Bane","Batrider","Chen",
"Crystal Maiden","Dark Seer","Dark Willow","Dazzle","Death Prophet","Disruptor","Bambi","Enigma","Grimstroke","Invoker","Jakiro","Keeper of the Light","Leshrac","Lich","Lina","Lion","Nature's Prophet","Necrophos","Ogre Magi","Oracle",
"Outworld Devourer","Puck","Pugna","Queen of Pain","Rubick","Shadow Demon","Shadow Shaman","Silencer","Skywrath Mage","Storm Spirit","Techies","Tinker","Visage","Void Spirit","Warlock","Windranger","Winter Wyvern","Witch Doctor","Zeus"]

var dotaStrength = ["Abaddon", "Alchemist", "Axe", "Beastmaster", "Brewmaster", "Bristleback", "Centaur Warrunner", "Chaos Knight", "Clockwerk", "Doom", "Dragon Knight", "Earth Spirit", "Earthshaker", "Elder Titan","Huskar","Io","Kunkka", "Legion Commander", "Lifestealer","Lycan","Magnus", "Mars",
"Night Stalker","Omniknight","Phoenix","Pudge","Sand King","Slardar","Snapfire","Spirit Breaker","Sven","Tidehunter","Timbersaw","Tiny","Treant","Tusk","Underlord","Undying","Wraith King"]

var dotaAgility = ["Anti-Mage","Arc Warden","Bloodseeker","Bounty Hunter","Broodmother","Clinkz","Drow Ranger","Ember Spirit","Faceless Void","Gyrocopter","Juggernaut","Lone Druid","Luna","Medusa","Meepo","Mirana","Monkey King","Morphling","Naga Siren","Nyx","Pangolier","Phantom Assassin","Phantom Lancer",
                   "Razer","Riki","Shadow Fiend","Slark","Sniper","Spectre","Templar Assassin","Terrorblade","Troll Warlord","Ursa","Vengeful Spirit","Venomancer","Viper","Weaver"]

var dotaIntelligence = ["Ancient Apparition","Bane","Batrider","Chen", "Crystal Maiden","Dark Seer","Dark Willow","Dazzle","Death Prophet","Disruptor","Bambi","Enigma","Grimstroke","Invoker","Jakiro","Keeper of the Light","Leshrac","Lich","Lina","Lion","Nature's Prophet","Necrophos","Ogre Magi","Oracle", "Outworld Devourer",
"Puck","Pugna","Queen of Pain","Rubick","Shadow Demon","Shadow Shaman","Silencer","Skywrath Mage","Storm Spirit",
"Techies","Tinker","Visage","Void Spirit","Warlock","Windranger","Winter Wyvern","Witch Doctor","Zeus"]

var apex = ["Bloodhound", "Gibraltar", "Lifeline", "Pathfinder", "Wraith", "Bangalore", "Caustic", "Mirage", "Octane", "Wattson", "Crypto", "Revenant", "Loba", "Rampart", "Horizon"] //TODO add Fuse

var fortunes = [
	"Yes.",
	"No.",
	"Maybe.",
	"Outlook is bleak.",
	"Could be."
];

var coin = ["Heads!", "Tails!"];

var hp = [
	"I did my waiting, 12 years of it! In Azkaban!",
	"What did you expect, pumpkin juice?",
	"Yer a wizard Harry!",
	"It's leviOHsa, not levioSAH.",
	"Why is it when something happens, it is always you three?",
	"We could have been killed — or worse, expelled.",
	"You're a little scary sometimes, you know that? Brilliant ... but scary.",
	"There will be no foolish wand-waving or silly incantations in this class.",
	"Dobby is free.",
	"I solemnly swear I am up to no good.",
	"Just because you have the emotional range of a teaspoon doesn't mean we all have.",
	"Not my daughter, you bitch!",
	"I've always wanted to use that spell."
];

var embed = new Discord.RichEmbed()

  			.addField("People", "Amber, Cody, Kagan, Liam, Sean, William, Myric, Razz", true)
  			.addField("Games","8ball, harrypotter, hesangry, coin, roll, repeat, hat", true)
  			.addField("Music","play (has to be a YouTube URL), skip, heel, goaway")
  			.addField("Other", "ping, noticeme, oi")
  			.addField("Audio clips", "ethan, cotton, thot, jelly, yeet, doug, doug2, stopitron, grace")
  			.addField("Dota", "randomhero, intelligence, strength, agility")
  			.addField("Apex", "legend")
  			.setColor(0x1d6d28)
  			.setTitle("Command list")
  			.setDescription("The prefix for this bot is oi.")
  			.setFooter("never EVER wot the bot.")

//end variables
//begin bot.on
bot.on("ready",function() { //initialize program to execute
	console.log("Good to go.");
});

bot.on('ready', () => {
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'with myself | oi help',
        }
    });
})

bot.on("guildMemberAdd", function(member) {

	member.guild.channels.find("name", "general").send(member.toString() + " Welcome to the server. All your base are belong to us.");

	member.addRole(member.guild.roles.find("name", "Honorable Member").id);

});

bot.on("message", function(message) { // this is the function that makes the bot not respond to anything, only if the message starts with the PREFIX "oi"

	if (!message.content.startsWith(PREFIX)) return;
	if (message.author.bot) return;


	var args = message.content.substring(PREFIX.length).split(" ");

    function ran(pp) { //generate random number

 	    if (args[0]) message.channel.send(pp[Math.floor(Math.random() * pp.length)] + "! " + message.author);

    } //this function gotta be here cause args
    function sound (p) { //functionality to play various hard-coded sound clips
    try {
     	if (!message.member.voiceChannel) {
     				message.channel.send("How do you expect to hear the audio if you're not in a channel?");
     				return;
     			}
     			if (!servers[message.guild.id]) servers[message.guild.id] = {
     				queue: []
     			};
     			var server = servers[message.guild.id];
     			server.queue.push(p);

     			if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
     				play(connection, message);
     			});
     	} catch (TypeError) { //caught this error, but for some reason the command is placed in some kind of cache and the sound effect will be played twice the next
     	                      //time the bot is called to play a sound effect
     	    console.log("Oops. I dun goof'd.")
     	    message.channel.send("Sorry. Something went wrong. Try again.")
     	    return
     	}
     } //this one too but cause message not defined

	switch(args[0].toLowerCase()) {
	//begin simple text return


		case "ping": // returns message in text channel
			message.channel.send("Pong! What did you expect, me to tell you what your ping is? Figure it out you lazy sod.");
			break;

		case "oi": // returns message in text channel
			message.channel.send("Stop spamming! If you want my list of commands, try oi help, silly." + message.author);
			break;

        case "william": // returns message in text channel
			message.channel.send("William is a sod, " + message.author);
			break;

		case "cody": // returns message in text channel
			message.channel.send("Cody is the very embodiment of salt, " + message.author);
			break;

		case "hesangry": // returns message in text channel
			message.channel.send("Fix it with a hammer! :hammer:");
			break;

		case "liam": // returns message in text channel
			message.channel.send("Liam is the Warframe Father Christmas, " + message.author);
			break;

		case "amber": // returns message in text channel
			message.channel.send("Amber is the Cody stealer, " + message.author);
			break;

		case "kagan": // returns message in text channel
			message.channel.send("Kagan is knaaaaaaahledge, " + message.author);
			break;

		case "sean": // returns message in text channel
			message.channel.send("Sean is a rat, but less so than William, " + message.author);
			break;

		case "myric": // returns message in text channel
			message.channel.send("Myric is best Myric, " + message.author);
			break;

		case "razz": // returns message in text channel
			message.channel.send("Razz is probably sleeping, " + message.author);
			break;

	    case "nathan": // returns message in text channel
	        message.channel.send("Nathan is too good at everything. " + message.author);
	        break

		case "noticeme": // returns message in text channel
			message.channel.send(message.author.toString() + " you're a weeb.");
			break;

		case "wot": // returns message in text channel
			message.channel.send("I gave you one rule, and you couldn't even follow that you ABSOLUTE DONKEY.");			// NEVER EVER WOT THE BOT

			break;
		//end simple text return
		//begin help
		case "help": // embeds a message in text channel with command list

            message.channel.send(embed)

			break;
        //end help
        //begin games
		case "8ball": // plays a "magic 8ball" game
		message.channel.send("Processing question..." );

		setTimeout(function(){

            if (args[1]) {
                message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
                }
            else {
            message.channel.send("You need to ask a question.");
            }

        }, 1000);

			break;

		case "harrypotter": // returns message in text channel with a random harry potter quote

			ran(hp);

			break;

		case "coin": // flips a coin in the text channel
			message.channel.send("The coin :moneybag: flies into the air and lands on: ");
				setTimeout(function(){
					ran(coin);
					message.channel.send("https://tenor.com/view/money-rich-coins-swag-count-gif-5633136");
				}, 1000);

			break;

		case "roll": // Quite proud of this one. "oi roll" will roll between 0-100. oi roll 290 will roll a number between 0 and 290. oi roll 280 2190 will roll a number between
                     // 280 and 2190.
            var content = message.content;
            var parts = content.split(" ");

            if (parts[2] == null) {

            var ranNum = getRandomIntInclusive(0, 100);

                        message.channel.send("Rolling for a random number between 0 and 100...")

            			setTimeout(function(){

            					var mes = message.channel.send("It landed on: **" + ranNum + "**! Try adding a [min] and [max] value after roll next time.");

            					if (ranNum == 69) {
            						message.channel.send("Yeah yeah, grow up!");
            					}

            				}, 1000);

            }
            else if (parts[2] != null && parts[3] == null) {

                var ranNum = getRandomIntInclusive(0, parts[2]);
                message.channel.send("Rolling for a random number between 0 and " + parts[2] + "...")

                setTimeout(function(){

                    var mes = message.channel.send("It landed on: **" + ranNum + "**!");

                        if (ranNum == 69) {
                        message.channel.send("Yeah yeah, grow up!");

                        }
                }, 1000);
            }

			else {

			var ranNum = getRandomIntInclusive(parts[2], parts[3]);

            message.channel.send("Rolling for a random number between " + parts[2] + " and " + parts[3] + "...")

                        			setTimeout(function(){

                        					var mes = message.channel.send("It landed on: **" + ranNum + "**! You did the thing!");

                        					if (ranNum == 69) {
                        						message.channel.send("Yeah yeah, grow up!");
                        					}

                        				}, 1000);
			}

			break;

        case "hat": // pulls a name out of a hat from given names
            var content = message.content;
            var parts = content.split(" ");
            var namesFinal = [];

            if (parts[2] == null) {
                message.channel.send("Hey, you should probably add some names to the hat so I can... y'know... draw from them...");
            break;

            }
            for(i = 2; i<= parts.length; i++) {
                namesFinal.push(parts[i]);
            }
                message.channel.send("The name pulled out of the hat is... **" + namesFinal[Math.floor(Math.random() * namesFinal.length)] + "!**")
                //ran(namesFinal);
            break;



        case "repeat": //this function will allow the bot to copy everything said after the word "repeat" and return that, then delete the original message so it looks like
                       //the bot is talking
        var content = message.content;
        var parts = content.split("oi repeat ");

        if (parts[1] == null) {
            message.channel.send("Hey idiot, try giving me something to repeat why don't you?")
        }
        else {
            for (i = 1; i < parts.length; i++) {
                 message.channel.send(" " + parts[i]);
        }
        message.delete();
        }

            break;
        //end games
        //begin join/leave
        case "heel": // makes the bot join your current voice channel, nothing else

            if (!message.member.voiceChannel) {
                    message.channel.send("How do you expect me to join a channel if you're not in one?");
            return;
            }
            else {
               const channel = message.member.voiceChannel;
                    channel.join()
            }

            break;

		case "goaway": // makes the bot leave the current voice chat
			var server = servers[message.guild.id];

			if (message.guild.voiceConnection) {
				    message.guild.voiceConnection.disconnect();
		    }

		    break;
        //end join/leave
        //begin play case
		case "play": //another one I'm proud of. Bot will play music in the voice channel from a provided youtube link. Little bit broken
            //TODO Fix the audio speeding up. Haven't the foggiest idea how.
			if(!args[1]) {
				message.channel.send("Please provide a link.");
				return;
			}
			if (!message.member.voiceChannel) {
				message.channel.send("You must be a in a voice channel.");
				return;
			}
			if (!servers[message.guild.id]) servers[message.guild.id] = {
				queue: []
			};
			var server = servers[message.guild.id];
			server.queue.push(args[1]);

			if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
				play(connection, message);
			});

			break;

		case "skip": //skips the current song to play the next song in the queue
			var server = servers[message.guild.id];

			if (server.dispatcher) {
				    server.dispatcher.end()
				}
			break;
        //end play case
        //begin play sound effects
		case "ethan": // plays sound effect from youtube

            if (message.author.id === "267949455171518465") {
                message.channel.send("Not for you Ethan. No no no.")
                return;
            }
            else {
                sound("https://youtu.be/EDDKlXy5dxk");
            }


			break;

		case "cotton": // plays sound effect from youtube
		    sound("https://www.youtube.com/watch?v=QmbKqSptaNA");

		    break;

        case "thot": // plays sound effect from youtube

        sound("https://www.youtube.com/watch?v=tyrKeThaEJM");

        break;

        case "jelly": // plays sound effect from youtube

        sound("https://www.youtube.com/watch?v=1OsnGOuVwMk");

        break;

        case "doug": // plays sound effect from youtube

        sound("https://www.youtube.com/watch?v=SBxpeuxUiOA&feature=youtu.be")

        break;

        case "doug2": // plays sound effect from youtube

        sound("https://www.youtube.com/watch?v=ts5af0aFcuw")

        break;

        case "yeet": // plays sound effect from youtube

        sound("https://www.youtube.com/watch?v=ksdiY7bqfP4")

        break

        case "bully":  //plays a sound effect from youtube
                    sound("https://www.youtube.com/watch?v=_AFbtgHJriw")
                    setTimeout(function(){
                                      var server = servers[message.guild.id]; //this function limits the duration of the video played
                                        if (message.guild.voiceConnection)
                                            message.guild.voiceConnection.disconnect();
                                            }, 9000);
        break

        case "grace":
            sound("https://www.youtube.com/watch?v=2_QniGKv4fg")
        break

        case "stopitron": // plays a sound effect from youtube

            sound("https://youtu.be/FWtO0cfgewY?t=6")

              setTimeout(function(){ //this function limits the duration of the video played
                  var server = servers[message.guild.id];
                    if (message.guild.voiceConnection)
                        message.guild.voiceConnection.disconnect();
                        }, 33500);

        break
        //end play sound effects
        //begin random video game stuff
        case "randomhero": // Returns a random dota 2 hero

        message.channel.send("The hero chosen for you is...")

        ran(dota)

        break

        case "strength": // Returns a random dota 2 strength hero
        message.channel.send("The Strength hero chosen for you is...")

        ran(dotaStrength)

        break

        case "intelligence": // Returns a random dota 2 intelligence hero
        message.channel.send("The Intelligence hero chosen for you is...")

        ran(dotaIntelligence)

        break

        case "agility": // Returns a random dota 2 agility hero
        message.channel.send("The Agility hero chosen for you is...")

        ran(dotaAgility)

        break

	    case "legend":  // Returns a random Apex Legend

	        message.channel.send("Your legend is...")
	        ran(apex)

	    break
        //end random video game stuff
        //begin file handling
        case "setrole": // My attempt at file handling. Doesn't do much now, just writes whatever is said after setrole to a file.
            var content = message.content;
            var parts = content.split("oi setrole ");
            if (parts[1] == null) {
                        message.channel.send("Hey idiot, try giving me something to set the role to why don't you?")
                    }
                    else {
                           var data = parts[1].toString()
                           fs.writeFile('Input.txt', data, (err) => {
                               if (err) throw err;

                               message.channel.send("The default role is now " + data )
                           })
                    }
        break

        case "readrole": //reads the file from setrole

        readRole()

        break
        //end file handling


		default:
			message.channel.send("Dude, that's not a command. Try again, silly.");
            message.channel.send(embed)
		break;
	}
});
bot.login(TOKEN);
