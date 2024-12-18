const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the CORS package

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Enable CORS for all origins (you can restrict it to specific domains)
app.use(cors({
  origin: '*', // Allow only localhost:4200
  methods: ['GET', 'POST','*'], // Specify allowed methods
  allowedHeaders: ['Content-Type'] // Specify allowed headers
}));

// server.use(cors({
//   origin: '*', // Allow only localhost:4200
//   methods: ['GET', 'POST','*'], // Specify allowed methods
//   allowedHeaders: ['Content-Type'] // Specify allowed headers
// }));
// Serve static files (optional)
app.use(express.static('public'));
let socketMap={};
// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('New user connected',socket.id);


  if(!socketMap[socket.id]){
   socketMap[socket.id]=animeUsername();
  }

  socket.on('private message', (data) => {
    console.log("🚀 ~ socket.on ~ data:", data)
    const { to, content } = data;
    const recipientSocketId = to;
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('private message', {
        from: socket.id,
        content: content,
      });
            console.log(`Private message from ${socket.id} to ${socketMap[to]}: ${content}`);
    }
  });


  io.emit('newConnection',socketMap); // Broadcast message

  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast message
  });

  socket.on('setMyUsername', (userData) => {
    socketMap[socket.id]=userData.username;
   io.emit('newConnection',socketMap); // Broadcast message
    });


  socket.on('disconnect', () => {
    delete socketMap[socket.id];
    console.log('User disconnected',socket.id);
       io.emit('newConnection',socketMap); // Broadcast message

  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

function animeUsername() {
  var title = [
  "Nightshade", "ViperStrike", "SteelFury", "ChaosReaper", "ShadowBlaze", "IronClad", "BlackoutX", "DeathPulse",
  "VenomFist", "RogueStorm", "SkyRider", "FireWolf", "BloodViper", "SteelTalon", "DarkKnight", "Thunderstrike",
  "LunarVenom", "BlazeHorn", "RedMist", "HellRaiser", "VoidHunter", "ShadowDemon", "SteelPhoenix", "ReaperWing",
  "DarkSaber", "TitaniumFury", "StormSurge", "BloodFury", "BlitzBrawler", "WarlockX", "VortexBlade", "Firestorm",
  "BladeRunner", "RageFist", "SoulReaper", "DreadForce", "VigilanteX", "FrostViper", "NightRaven", "ThunderClash",
  "HexRider", "Hellhound", "GhostMarauder", "IronFist", "WraithBlade", "SavageEdge", "VenomClaw", "PhoenixAsh",
  "CrimsonShadow", "BoltStorm", "PhantomWraith", "ShadowReaper", "DoomSlayer", "ToxicViper", "StormBreaker",
  "SinisterGhost", "VampyreKing", "ThunderWolf", "RageMachine", "DarkSpectre", "FrostFury", "IronClaw", "SoulBurner",
  "StealthFury", "DragonClash", "Hellstorm", "ChaosKnight", "NightFlare", "InfernoStrike", "DemonCannon", "BlazeRider",
  "SilentAssassin", "VampireWraith", "XenonStorm", "PhantomRage", "CyberReaper", "FuryBlade", "DreadSlicer", "DarkEcho",
  "OmegaBlaze", "IronVengeance", "ThunderFury", "SonicBlade", "SoulSlicer", "Blackhawk", "VenomStrike", "TitanRage",
  "InfernalFist", "DarkPhantom", "RedReaper", "SkullCrusher", "SpecterFury", "DoomCrusher", "BlackFire", "ViperClaw",
  "ChaosReign", "NightWolf", "ShadowRage", "SteelWraith", "RogueFury", "IronStorm", "DarkPhoenix", "RogueTitan",
  "VortexGhost", "StormReaper", "ThunderFang", "VenomStrike", "CrimsonFury", "FrostVortex", "HellfireClaw", "ChaosDrifter",
  "BlazeShifter", "SilentViper", "ReaperBlade", "SkullKing", "ShadowGrim", "NightFury", "BlackTitan", "VengefulRage",
  "DarkSteel", "DoomSpecter", "SoulEater", "BlitzFury", "InfernoBeast", "RageHawk", "DarkSlinger", "SpecterWhisper",
  "VampyreFury", "SavageBlade", "RedDragon", "MurderGhost", "NightmareWolf", "FrostRider", "SteelReaper", "FeralHound",
  "DreadFang", "FireSerpent", "ChaosCrusader", "ThunderRider", "BlazeVulture", "HurricaneClaw", "ToxicHunter", "VoidKnight",
  "IronWitch", "BerserkerClaw", "SavageReaper", "DeathViper", "HellScythe", "TidalKnight", "RageWolf", "TempestFury",
  "FuryStorm", "SteelWarden", "VenomStorm", "NightHunter", "InfernalMarauder", "SoulRipper", "CrimsonShade", "VengefulGhost",
  "DemonTalon", "GhostViper", "TitanReaver", "ShadowLord", "BurningSpecter", "DreadPhoenix", "ViperStrike", "BladeWolf",
  "FrostClaw", "TitanViper", "ScorchFury", "RavenShadow", "VenomCloak", "SoulBurner", "ThunderRaven", "VortexFury",
  "SavageSpecter", "FrostKnight", "DarkSpecter", "SoulReaper", "InfernalClaw", "FeralTitan", "ViperClash", "RageSpecter",
  "CrimsonSlayer", "StormVulture", "NightShade", "IronVanguard", "DarkRanger", "BlackScythe", "RevengeViper", "VortexFang",
  "ShadowCrusher", "StormChaser", "BladeReaper", "HellRider", "VampyreClaw", "SpecterMarauder", "VenomViper", "RavenClaw",
  "FuryShade"
];

  var onePieceChars = [
    "Luffy", "Zoro", "Nami", "Usopp", "Sanji", "Chopper", "Robin", "Franky", 
    "Brook", "Jinbe", "Ace", "Sabo", "Shanks", "Kaido", "Big Mom", "Law", "Hancock"
  ];

  var narutoChars = [
    "Naruto", "Sasuke", "Sakura", "Kakashi", "Hinata", "Itachi", "Jiraiya", "Tobirama", 
    "Minato", "Madara", "Obito", "Shikamaru", "Gaara", "Killer Bee", "Orochimaru", 
    "Kaguya", "Boruto", "Sarada", "Mitsuki"
  ];

  var dbzChars = [
    "Goku", "Vegeta", "Gohan", "Piccolo", "Frieza", "Cell", "Majin Buu", "Trunks", 
    "Goten", "Krillin", "Yamcha", "Tien", "Raditz", "Broly", "Beerus", "Whis", "Chi-Chi"
  ];

  // Combine all character arrays into one list
  var allChars = onePieceChars.concat(narutoChars, dbzChars);

  // Randomly choose a character
  var character = allChars[Math.floor(Math.random() * allChars.length)];

  // Generate a random number to append (for uniqueness)
  // var randomNumber = Math.floor(Math.random() * 100);  // You can adjust the range as needed

  var titleword = title[Math.floor(Math.random() * title.length)].toLocaleLowerCase();

  // Return the character name with the random number, formatted like a username
  return `${character}_${titleword}`;
}
