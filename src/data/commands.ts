import type { Command } from "@/data/commandTypes";
export type { Command, ParameterGroup, Permission, CommandIssue } from "@/data/commandTypes";
export { findCommandIssues } from "@/data/commandTypes";

export const commands: Command[] = [
  {
    "id": 1,
    "name": "!7tv",
    "permission": "follower",
    "commandGroups": [
      "Link"
    ],
    "description": "This command gives you a link to be able to view the emotes added to Layman's channel through 7TV."
  },
  {
    "id": 2,
    "name": "!addattempt",
    "aliases": [
      "!addtry",
      "!anothertry",
      "!tryagain"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Tries",
      "Death"
    ],
    "description": "This command adds an attempt made to the current struggle The Layman is suffering."
  },
  {
    "id": 3,
    "name": "!addchips",
    "usage": "[username] [number]",
    "permission": "moderator",
    "commandGroups": [
      "Economy"
    ],
    "description": "This command adds The Layman's currency to a viewer.",
    "parameterGroups": [
      {
        "usage": "all [number]",
        "description": "These options add The Layman's currency to all viewers present in the chat."
      }
    ]
  },
  {
    "id": 4,
    "name": "!adddeath",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Death"
    ],
    "description": "This command adds a death to the stream category to track Layman's deaths in-game... of course."
  },
  {
    "id": 5,
    "name": "!addquote",
    "usage": "[text]",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Lore",
      "Fun"
    ],
    "description": "This command allows the Laypeople to add something... funny that The Layman said. Heheh."
  },
  {
    "id": 6,
    "name": "!advice",
    "permission": "subscriber",
    "commandGroups": [
      "Chance"
    ],
    "description": "This command says advice you have given before."
  },
  {
    "id": 7,
    "name": "!age",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Lore"
    ],
    "description": "This command says Layman's age."
  },
  {
    "id": 8,
    "name": "!agent",
    "permission": "follower",
    "commandGroups": [
      "VALORANT"
    ],
    "description": "This command says a random agent from VALORANT."
  },
  {
    "id": 9,
    "name": "!answerquestionofthestream",
    "usage": "[text]",
    "aliases": [
      "!answerqots"
    ],
    "permission": "follower",
    "commandGroups": [
      "Viewer",
      "Interactive"
    ],
    "description": "This command answers the question of the stream."
  },
  {
    "id": 10,
    "name": "!attack",
    "massCompatible": true,
    "usage": "[username]",
    "permission": "follower",
    "commandGroups": [
      "Avatars"
    ],
    "description": "This command attacks another viewer's avatar with your avatar."
  },
  {
    "id": 11,
    "name": "!attempts",
    "aliases": [
      "!attempt",
      "!tries",
      "!try"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Tries",
      "Death"
    ],
    "description": "This command says how many attempts have been made to the current struggle The Layman is suffering."
  },
  {
    "id": 12,
    "name": "!basketball",
    "permission": "subscriber",
    "commandGroups": [
      "Avatars",
      "Mini-game"
    ],
    "description": "This command starts a game of basketball with the viewers that join.",
    "parameterGroups": [
      {
        "usage": "ffa",
        "description": "These options create a free-for-all basketball game with your avatars."
      },
      {
        "usage": "cancel",
        "description": "These options cancel the ongoing basketball match."
      }
    ]
  },
  {
    "id": 13,
    "name": "!battlenet",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Gamertag"
    ],
    "description": "This command says The Layman's Battle.net gamertag."
  },
  {
    "id": 14,
    "name": "!battleroyale",
    "permission": "follower",
    "commandGroups": [
      "Avatars",
      "Mini-game"
    ],
    "description": "This command starts a fighting competition with every present avatar.",
    "parameterGroups": [
      {
        "usage": "cancel",
        "description": "These options cancel the ongoing battle royale."
      }
    ]
  },
  {
    "id": 15,
    "name": "!birthday",
    "aliases": [
      "!affiliateday",
      "!anniversary"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Lore"
    ],
    "description": "This command says how much time until another year is added to The Layman."
  },
  {
    "id": 16,
    "name": "!bomb",
    "massCompatible": true,
    "permission": "follower",
    "commandGroups": [
      "Avatars"
    ],
    "description": "This command drops a bomb where your avatar is.",
    "parameterGroups": [
      {
        "usage": "[username]",
        "description": "These options allow you to drop a bomb on another viewer."
      }
    ]
  },
  {
    "id": 17,
    "name": "!boss",
    "permission": "subscriber",
    "commandGroups": [
      "Avatars",
      "Mini-game"
    ],
    "description": "This command starts a boss fight with everyone that joins.",
    "parameterGroups": [
      {
        "usage": "easy",
        "description": "These options start an easy boss fight with everyone that joins."
      },
      {
        "usage": "normal",
        "description": "These options start a normal boss fight with everyone that joins."
      },
      {
        "usage": "hard",
        "description": "These options start a hard boss fight with everyone that joins."
      },
      {
        "usage": "cancel",
        "description": "These options cancel the ongoing boss battle."
      }
    ]
  },
  {
    "id": 18,
    "name": "!chase",
    "permission": "follower",
    "commandGroups": [
      "Fun",
      "Utility"
    ],
    "description": "This command tells you how long The Layman has been getting chased."
  },
  {
    "id": 19,
    "name": "!checkuser",
    "permission": "streamer",
    "commandGroups": [
      "Viewer"
    ],
    "description": "This command checks if a viewer's real and returns their primary role."
  },
  {
    "id": 20,
    "name": "!chegg",
    "usage": "[question]",
    "permission": "follower",
    "commandGroups": [
      "Question"
    ],
    "description": "This command works with Chegg to answer any questions you have about anything."
  },
  {
    "id": 21,
    "name": "!chips",
    "permission": "follower",
    "commandGroups": [
      "Economy",
      "Viewer"
    ],
    "description": "This command checks how much you have of The Layman's currency.",
    "parameterGroups": [
      {
        "usage": "[username]",
        "description": "These option let YOU pocket peek and see how much someone else has of The Layman's currency."
      }
    ]
  },
  {
    "id": 22,
    "name": "!clashroyale",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Gamertag"
    ],
    "description": "This command gives you the Layman's Clan Tag!"
  },
  {
    "id": 23,
    "name": "!clearwordle",
    "permission": "follower",
    "commandGroups": [
      "Fun",
      "Mini-game"
    ],
    "description": "This command clears a bad guess in the current Wordle."
  },
  {
    "id": 24,
    "name": "!coin",
    "aliases": [
      "!coinflip"
    ],
    "permission": "follower",
    "commandGroups": [
      "Chance",
      "Fun"
    ],
    "description": "This command flips a virtual coin for you."
  },
  {
    "id": 25,
    "name": "!commands",
    "aliases": [
      "!cmds"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Setup",
      "Link"
    ],
    "description": "This command sends a link with EVERYTHING you can do in The Layman's chat."
  },
  {
    "id": 26,
    "name": "!dance",
    "massCompatible": true,
    "permission": "follower",
    "commandGroups": [
      "Avatars",
      "Fun"
    ],
    "description": "This command makes your avatar do a little boogie."
  },
  {
    "id": 27,
    "name": "!deadbydaylight",
    "aliases": [
      "!dbd",
      "!bhvr"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Gamertag"
    ],
    "description": "This command says Layman's Dead By Daylight gamertag."
  },
  {
    "id": 28,
    "name": "!deaths",
    "aliases": [
      "!death"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Death"
    ],
    "description": "This command tells us how many times Layman has died in the current game we are playing during this stream and EVER!"
  },
  {
    "id": 29,
    "name": "!dice",
    "usage": "[number]",
    "aliases": [
      "!roll"
    ],
    "permission": "follower",
    "commandGroups": [
      "Economy",
      "Gamble"
    ],
    "description": "This command lets you roll 2 virtual dice and Francis does the same. Who comes out on top? The winner.",
    "parameterGroups": [
      {
        "usage": "max",
        "aliases": [
          "all"
        ],
        "description": "These options allow you to gamble all of the currency you hold."
      }
    ]
  },
  {
    "id": 30,
    "name": "!disablewordle",
    "permission": "moderator",
    "commandGroups": [
      "Fun",
      "Mini-game"
    ],
    "description": "This command prevents the Laypeople from playing Wordle."
  },
  {
    "id": 31,
    "name": "!discord",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Link",
      "Social"
    ],
    "description": "This command sends the link for you to join The Layman's World."
  },
  {
    "id": 32,
    "name": "!duel",
    "usage": "[username]",
    "permission": "follower",
    "commandGroups": [
      "Avatars",
      "Mini-game"
    ],
    "description": "This command allows you to 1v1 someone to the death.",
    "parameterGroups": [
      {
        "usage": "[username] [number]",
        "description": "These options allow you to 1v1 someone and gives the winner some of The Layman's currency."
      },
      {
        "usage": "cancel",
        "description": "These options cancels the active duel."
      }
    ]
  },
  {
    "id": 33,
    "name": "!enablewordle",
    "permission": "streamer",
    "commandGroups": [
      "Fun",
      "Mini-game"
    ],
    "description": "This command allows the Laypeople to play Wordle."
  },
  {
    "id": 34,
    "name": "!endchase",
    "permission": "follower",
    "commandGroups": [
      "Fun",
      "Utility"
    ],
    "description": "This command says how long The Layman was chased OR ACTUALLY ESCAPED!"
  },
  {
    "id": 35,
    "name": "!endstopwatch",
    "permission": "follower",
    "commandGroups": [
      "Fun",
      "Utility"
    ],
    "description": "This command ends the stopwatch."
  },
  {
    "id": 36,
    "name": "!endstream",
    "permission": "moderator",
    "commandGroups": [
      "OBS",
      "Stream"
    ],
    "description": "This command ends The Layman's stream."
  },
  {
    "id": 37,
    "name": "!epicgames",
    "aliases": [
      "!epic"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Gamertag"
    ],
    "description": "This command says Layman's Epic Games gamertag."
  },
  {
    "id": 38,
    "name": "!escape",
    "permission": "follower",
    "commandGroups": [
      "Special",
      "Fun"
    ],
    "description": "This command says a funny message designed by TheOracleMind."
  },
  {
    "id": 39,
    "name": "!explode",
    "massCompatible": true,
    "permission": "subscriber",
    "commandGroups": [
      "Avatars"
    ],
    "description": "This command shakes your avatar until it disappears.",
    "parameterGroups": [
      {
        "usage": "[username]",
        "description": "These options let you shake someone else's avatar until they disappear."
      }
    ]
  },
  {
    "id": 40,
    "name": "!fact",
    "permission": "subscriber",
    "commandGroups": [
      "Chance"
    ],
    "description": "This command tells you a random fun fact.",
    "parameterGroups": [
      {
        "usage": "cat",
        "description": "These options tell you a random cat fact."
      },
      {
        "usage": "chuck",
        "description": "These options tell you a random fact of Chuck Norris."
      }
    ]
  },
  {
    "id": 41,
    "name": "!fart",
    "massCompatible": true,
    "permission": "follower",
    "commandGroups": [
      "Avatars",
      "Fun"
    ],
    "description": "This command lets your avatar let out some air..."
  },
  {
    "id": 42,
    "name": "!fighter",
    "permission": "follower",
    "commandGroups": [
      "Super Smash Bros. Ultimate"
    ],
    "description": "This command gives you a fighter to play from Super Smash Bros. Ultimate."
  },
  {
    "id": 43,
    "name": "!firework",
    "massCompatible": true,
    "permission": "subscriber",
    "commandGroups": [
      "Avatars"
    ],
    "description": "This command throws your avatar up in the air and explodes.",
    "parameterGroups": [
      {
        "usage": "[username]",
        "description": "These options let you throw someone else's avatar up in the air and explodes them."
      }
    ]
  },
  {
    "id": 44,
    "name": "!followerage",
    "aliases": [
      "!followage"
    ],
    "permission": "follower",
    "commandGroups": [
      "Viewer",
      "Statistics"
    ],
    "description": "This command tells us how long you have been following The Layman."
  },
  {
    "id": 45,
    "name": "!freeze",
    "massCompatible": true,
    "permission": "follower",
    "commandGroups": [
      "Avatars"
    ],
    "description": "This command puts your avatar in a icicle.",
    "parameterGroups": [
      {
        "usage": "[username]",
        "description": "These options let you put someone else's avatar in a icicle."
      }
    ]
  },
  {
    "id": 46,
    "name": "!game",
    "aliases": [
      "!category"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Stream"
    ],
    "description": "This command says the game The Layman is currently playing."
  },
  {
    "id": 47,
    "name": "!giftchips",
    "usage": "[username] [number]",
    "aliases": [
      "!givechips"
    ],
    "permission": "follower",
    "commandGroups": [
      "Economy"
    ],
    "description": "This command lets you give someone else some of your chips."
  },
  {
    "id": 48,
    "name": "!headset",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Setup"
    ],
    "description": "This command tells you the way Layman hears everything."
  },
  {
    "id": 49,
    "name": "!height",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Lore"
    ],
    "description": "This command tells you how tall Layman is."
  },
  {
    "id": 50,
    "name": "!hidechrome",
    "aliases": [
      "!hide",
      "!chrome",
      "!chromeisblockingthestream"
    ],
    "permission": "subscriber",
    "commandGroups": [
      "OBS",
      "Stream",
      "Utility"
    ],
    "description": "This command allows you to hide the chrome window Layman uses that blocks the center of the stream."
  },
  {
    "id": 51,
    "name": "!hug",
    "massCompatible": true,
    "usage": "[username]",
    "permission": "follower",
    "commandGroups": [
      "Avatars"
    ],
    "description": "This command gives a warm embrace to someone else's avatar with your avatar."
  },
  {
    "id": 52,
    "name": "!instagram",
    "aliases": [
      "!insta",
      "!ig"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Link",
      "Social"
    ],
    "description": "This command lets you check out Layman's Instagram."
  },
  {
    "id": 53,
    "name": "!internetprotocoladdress",
    "aliases": [
      "!ipaddress",
      "!ip"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Lore",
      "Setup"
    ],
    "description": "This command tells you Layman's IP address."
  },
  {
    "id": 54,
    "name": "!joke",
    "aliases": [
      "!dadjoke",
      "!cringejoke"
    ],
    "permission": "subscriber",
    "commandGroups": [
      "Chance"
    ],
    "description": "This command gives you a HILARIOUS joke to laugh at.",
    "parameterGroups": [
      {
        "usage": "chuck",
        "description": "These options give you a joke about Chuck Norris."
      }
    ]
  },
  {
    "id": 55,
    "name": "!jump",
    "massCompatible": true,
    "permission": "follower",
    "commandGroups": [
      "Avatars",
      "Mini-game"
    ],
    "description": "This command makes your avatar jump to either celebrate or catch a star."
  },
  {
    "id": 56,
    "name": "!keyboard",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Setup"
    ],
    "description": "This command tells you what The Layman uses to type everything."
  },
  {
    "id": 57,
    "name": "!lastquote",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Lore",
      "Fun"
    ],
    "description": "This command shows you the last thing Layman was quoted on."
  },
  {
    "id": 58,
    "name": "!lastsong",
    "permission": "follower",
    "commandGroups": [
      "Spotify"
    ],
    "description": "This command tells us the song that The Layman had just played before this one."
  },
  {
    "id": 59,
    "name": "!leaderboard",
    "permission": "follower",
    "commandGroups": [
      "Viewer",
      "Statistics"
    ],
    "description": "This command lets you see the 5 highest watchtime viewers."
  },
  {
    "id": 60,
    "name": "!lobby",
    "aliases": [
      "!room",
      "!arena"
    ],
    "permission": "follower",
    "commandGroups": [
      "Viewer",
      "Interactive"
    ],
    "description": "This command shows the current lobby information."
  },
  {
    "id": 61,
    "name": "!location",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Lore",
      "Setup"
    ],
    "description": "This command tells you where The Layman is currently at."
  },
  {
    "id": 62,
    "name": "!lounge",
    "usage": "[text]",
    "permission": "moderator",
    "commandGroups": [
      "Discord"
    ],
    "description": "This command sends a message through Francis to the #layman-lounge🛋️ for quick alerts."
  },
  {
    "id": 63,
    "name": "!lurk",
    "aliases": [
      "!brb",
      "!afk"
    ],
    "permission": "follower",
    "commandGroups": [
      "Viewer"
    ],
    "description": "This command lets The Layman know that you are stepping away for a bit, so he doesn't just keep talking to himself."
  },
  {
    "id": 64,
    "name": "!magic8ball",
    "aliases": [
      "!8ball",
      "!predict"
    ],
    "permission": "follower",
    "commandGroups": [
      "Chance",
      "Fun"
    ],
    "description": "This command shakes a virtual Magic 8 ball for you."
  },
  {
    "id": 65,
    "name": "!marker",
    "usage": "[text]",
    "aliases": [
      "!streammarker",
      "!highlight",
      "!highlightmarker"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Stream",
      "Twitch"
    ],
    "description": "This command sets a marker at the current stream time, so the layman could look at it again."
  },
  {
    "id": 66,
    "name": "!mass",
    "usage": "[command]",
    "permission": "moderator",
    "commandGroups": [
      "Avatars"
    ],
    "description": "This command allows you to make every present avatar do the command you'd like to do also.",
    "parameterGroups": [
      {
        "usage": "attack [username]",
        "description": "These options make everyone's avatar charge at someone's avatar."
      },
      {
        "usage": "bomb",
        "description": "These options rain bombs all over the stream."
      },
      {
        "usage": "fart",
        "description": "These options make everyone's avatar release some air..."
      },
      {
        "usage": "firework",
        "description": "These options throw everyone's avatar up in the air and explodes them."
      },
      {
        "usage": "freeze",
        "description": "These options put everyone's avatar into an icicle."
      },
      {
        "usage": "hug [username]",
        "description": "These options make everyone's avatar hug someone's avatar."
      }
    ]
  },
  {
    "id": 67,
    "name": "!math",
    "usage": "[expression]",
    "permission": "follower",
    "commandGroups": [
      "Fun",
      "Utility"
    ],
    "description": "This command lets Francis do math for you."
  },
  {
    "id": 68,
    "name": "!microphone",
    "aliases": [
      "!mic"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Setup"
    ],
    "description": "This command tells you how Layman sounds so amazing talk to y'all."
  },
  {
    "id": 69,
    "name": "!minecraft",
    "aliases": [
      "!xbox"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Gamertag"
    ],
    "description": "This command says Layman's Minecraft gamertag."
  },
  {
    "id": 70,
    "name": "!minigame exclude",
    "usage": "[username]",
    "permission": "moderator",
    "commandGroups": [
      "Avatars",
      "Mini-game"
    ],
    "description": "This command excludes someone from participating in any avatar minigames."
  },
  {
    "id": 71,
    "name": "!mouse",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Setup"
    ],
    "description": "This command shows you what Layman uses to have such amazing aim."
  },
  {
    "id": 72,
    "name": "!mutediscord",
    "permission": "moderator",
    "commandGroups": [
      "OBS",
      "Stream",
      "Utility"
    ],
    "description": "This command mutes Discord for the stream only. Meaning Layman can still hear you."
  },
  {
    "id": 73,
    "name": "!mutelayman",
    "permission": "moderator",
    "commandGroups": [
      "OBS",
      "Stream",
      "Utility"
    ],
    "description": "This command mutes Layman's microphone for stream."
  },
  {
    "id": 74,
    "name": "!myanimelist",
    "aliases": [
      "!mal"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Lore",
      "Social",
      "Link"
    ],
    "description": "This command lets you see the animes or mangas that Layman has seen or read."
  },
  {
    "id": 75,
    "name": "!newwordle",
    "aliases": [
      "!playagain"
    ],
    "permission": "follower",
    "commandGroups": [
      "Fun",
      "Mini-game"
    ],
    "description": "This command starts a new game of Wordle."
  },
  {
    "id": 76,
    "name": "!pause",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Fun"
    ],
    "description": "This command makes The Layman think about what he said..."
  },
  {
    "id": 77,
    "name": "!pcspecifications",
    "aliases": [
      "!pcspecs",
      "!specifications",
      "!specs"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Setup"
    ],
    "description": "This command shares Layman's PC build."
  },
  {
    "id": 78,
    "name": "!peakranks",
    "aliases": [
      "!peaks"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Lore"
    ],
    "description": "This command tells you how good The Layman before things happened..."
  },
  {
    "id": 79,
    "name": "!peterpiperwiththepeppers",
    "aliases": [
      "!peterpiper",
      "!peter"
    ],
    "permission": "follower",
    "commandGroups": [
      "Fun"
    ],
    "description": "This command says a tongue twister about Peter Piper for Layman to say."
  },
  {
    "id": 80,
    "name": "!pi",
    "permission": "subscriber",
    "commandGroups": [
      "Fun"
    ],
    "description": "This command says the best number in math."
  },
  {
    "id": 81,
    "name": "!pie",
    "permission": "subscriber",
    "commandGroups": [
      "Fun",
      "Chance"
    ],
    "description": "This command tells you how to make that pie you were thinking about earlier."
  },
  {
    "id": 82,
    "name": "!pin",
    "usage": "[username] [x] [y]",
    "permission": "subscriber",
    "commandGroups": [
      "Avatars"
    ],
    "description": "This command pins an avatar in place. Username defaults to you, and x and y default to random spots from 0 to 1.",
    "parameterGroups": [
      {
        "usage": "[username]",
        "description": "These options pin yourself or someone else at a random spot."
      },
      {
        "usage": "[username] [x] [y]",
        "description": "These options pin yourself or someone else at specific coordinates from 0 to 1."
      }
    ]
  },
  {
    "id": 83,
    "name": "!pokeball",
    "permission": "subscriber",
    "commandGroups": [
      "Pokémon",
      "Fun",
      "Chance"
    ],
    "description": "This command throws a pokeball to catch a wild Pokemon."
  },
  {
    "id": 84,
    "name": "!pokemiss",
    "permission": "subscriber",
    "commandGroups": [
      "Pokémon"
    ],
    "description": "This command shows your Pokemon collection."
  },
  {
    "id": 85,
    "name": "!pokepc",
    "aliases": [
      "!pokedex"
    ],
    "permission": "subscriber",
    "commandGroups": [
      "Pokémon"
    ],
    "description": "This command shows your Pokemon collection."
  },
  {
    "id": 86,
    "name": "!quote",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Lore",
      "Fun"
    ],
    "description": "This command tells us all a random quote that The Layman has said.",
    "parameterGroups": [
      {
        "usage": "[number]",
        "description": "These options say the exact quote associated with the number you put."
      }
    ]
  },
  {
    "id": 87,
    "name": "!quotes",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Lore",
      "Fun"
    ],
    "description": "This command gives you the link to see all of Layman's quotes."
  },
  {
    "id": 88,
    "name": "!raidmessage",
    "aliases": [
      "!raid"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Stream"
    ],
    "description": "This command gives a fun message to use for a raid!"
  },
  {
    "id": 89,
    "name": "!randomviewer",
    "aliases": [
      "!randomuser",
      "!viewer",
      "!user"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Viewer",
      "Moderation"
    ],
    "description": "This command picks a random viewer from chat."
  },
  {
    "id": 90,
    "name": "!ranks",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Lore"
    ],
    "description": "This command shares the current placement of the ranked games Layman plays."
  },
  {
    "id": 91,
    "name": "!refreshspotify",
    "permission": "moderator",
    "commandGroups": [
      "OBS",
      "Spotify"
    ],
    "description": "This command refreshes the Spotify overlay."
  },
  {
    "id": 92,
    "name": "!removeattempt",
    "aliases": [
      "!removetry",
      "!takeattempt",
      "!taketry",
      "subtractattempt",
      "subtracttry"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Tries",
      "Death"
    ],
    "description": "This command removes an attempt made to the current struggle The Layman is suffering for when extras are added."
  },
  {
    "id": 93,
    "name": "!removechips",
    "usage": "[username] [number]",
    "permission": "moderator",
    "commandGroups": [
      "Economy"
    ],
    "description": "This command removes The Layman's currency from a viewer.",
    "parameterGroups": [
      {
        "usage": "all [number]",
        "description": "These options remove The Layman's currency from all viewers present in the chat."
      }
    ]
  },
  {
    "id": 94,
    "name": "!removedeath",
    "aliases": [
      "!takedeath",
      "!subtractdeath"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Death"
    ],
    "description": "This command takes a death away from the stream category for when extras are added."
  },
  {
    "id": 95,
    "name": "!removequote",
    "usage": "[number]",
    "aliases": [
      "!deletequote"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Layman",
      "Lore",
      "Fun"
    ],
    "description": "This command lets the Layman Legion remove a quote that shouldn't have been added."
  },
  {
    "id": 96,
    "name": "!resetattempts",
    "aliases": [
      "!resetattempt",
      "!resettries",
      "!resettry"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Layman",
      "Tries",
      "Death"
    ],
    "description": "This command resets the attempts because The Layman is NO LONGER suffering!"
  },
  {
    "id": 97,
    "name": "!resetlobby",
    "aliases": [
      "!resetroom",
      "!resetarena"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Viewer",
      "Interactive"
    ],
    "description": "This command resets the current lobby information."
  },
  {
    "id": 98,
    "name": "!resetspotifyjam",
    "aliases": [
      "!resetjam"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Spotify",
      "Link"
    ],
    "description": "This command resets The Layman's Spotify jam session."
  },
  {
    "id": 99,
    "name": "!richest",
    "permission": "follower",
    "commandGroups": [
      "Economy",
      "Statistics"
    ],
    "description": "This command shows the richest viewers in chat."
  },
  {
    "id": 100,
    "name": "!rizz",
    "permission": "follower",
    "commandGroups": [
      "Chance",
      "Fun"
    ],
    "description": "This command checks your rizz level.",
    "parameterGroups": [
      {
        "usage": "[username]",
        "description": "These options check someone else's rizz level if they have done it already."
      }
    ]
  },
  {
    "id": 101,
    "name": "!roblox",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Gamertag"
    ],
    "description": "This command says Layman's Roblox gamertag."
  },
  {
    "id": 102,
    "name": "!rockpaperscissors",
    "usage": "[number] [choice]",
    "aliases": [
      "!rps"
    ],
    "permission": "follower",
    "commandGroups": [
      "Economy",
      "Gamble"
    ],
    "description": "This command lets you battle Francis in the most serious game ever. Never go rock first...",
    "parameterGroups": [
      {
        "usage": "[number] rock",
        "aliases": [
          "r"
        ],
        "description": "These options play rock against Francis."
      },
      {
        "usage": "[number] paper",
        "aliases": [
          "p"
        ],
        "description": "These options play paper against Francis."
      },
      {
        "usage": "[number] scissors",
        "aliases": [
          "s"
        ],
        "description": "These options play scissors against Francis."
      }
    ]
  },
  {
    "id": 103,
    "name": "!roulette",
    "usage": "[number] [choice]",
    "permission": "subscriber",
    "commandGroups": [
      "Economy",
      "Gamble"
    ],
    "description": "This command lets you spin the wheel and test your luck against Francis.",
    "parameterGroups": [
      {
        "usage": "[number] [0-36]",
        "description": "These options bet on rolling a specific number between 0 and 36."
      },
      {
        "usage": "[number] 1st12",
        "description": "These options bet on rolling one of the first dozen numbers being 1 through 12."
      },
      {
        "usage": "[number] 2nd12",
        "description": "These options bet on rolling one of the second dozen numbers being 13 through 24."
      },
      {
        "usage": "[number] 3rd12",
        "description": "These options bet on rolling one of the final dozen numbers being 25 through 36."
      },
      {
        "usage": "[number] purple",
        "description": "These options bet on rolling a purple number."
      },
      {
        "usage": "[number] black",
        "description": "These options bet on rolling a black number."
      },
      {
        "usage": "[number] green",
        "description": "These options bet on rolling the green number."
      },
      {
        "usage": "[number] odd",
        "description": "These options bet on rolling an odd number."
      },
      {
        "usage": "[number] even",
        "description": "These options bet on rolling an even number."
      }
    ]
  },
  {
    "id": 104,
    "name": "!sensitivity",
    "aliases": [
      "!sens"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Setup"
    ],
    "description": "This command tells you how Layman has his sensitivity set up."
  },
  {
    "id": 105,
    "name": "!setdeaths",
    "usage": "[number]",
    "aliases": [
      "!setdeath"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Layman",
      "Death"
    ],
    "description": "This command sets the amount of times Layman has died in the current stream category during this stream."
  },
  {
    "id": 106,
    "name": "!setgame",
    "usage": "[text]",
    "aliases": [
      "!setcategory",
      "!changegame",
      "!changecategory",
      "!updategame",
      "!updatecategory"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Stream"
    ],
    "description": "This command sets the game to whatever The Layman is playing!"
  },
  {
    "id": 107,
    "name": "!setlobby",
    "usage": "[text]",
    "aliases": [
      "!setroom",
      "!setarena"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Viewer",
      "Interactive"
    ],
    "description": "This command sets the lobby information for people to join."
  },
  {
    "id": 108,
    "name": "!setquestionofthestream",
    "usage": "[text]",
    "aliases": [
      "!setqots",
      "!updatequestionofthestream",
      "!updateqots"
    ],
    "permission": "streamer",
    "commandGroups": [
      "Viewer",
      "Interactive"
    ],
    "description": "This command sets the question of the stream."
  },
  {
    "id": 109,
    "name": "!setreminder",
    "usage": "[text]",
    "aliases": [
      "!remember"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Stream",
      "Utility"
    ],
    "description": "This command sets a reminder for Layman."
  },
  {
    "id": 110,
    "name": "!setscene",
    "usage": "[choice]",
    "aliases": [
      "!changescene"
    ],
    "permission": "moderator",
    "commandGroups": [
      "OBS",
      "Scene"
    ],
    "description": "This command changes the scene currently showing on stream.",
    "parameterGroups": [
      {
        "usage": "starting",
        "aliases": [
          "start",
          "begin",
          "beginning",
          "intro",
          "introduction"
        ],
        "description": "These options switch to the \"Stream is Starting\" scene shown before the stream begins."
      },
      {
        "usage": "brb",
        "aliases": [
          "be right back",
          "break",
          "break time",
          "intermission"
        ],
        "description": "These options switch to the \"Be Right Back\" scene for short breaks."
      },
      {
        "usage": "ending",
        "aliases": [
          "end",
          "ending soon",
          "outro"
        ],
        "description": "These options switch to the \"Stream is Ending\" scene when wrapping up the stream."
      },
      {
        "usage": "game",
        "aliases": [
          "gaming",
          "gameplay",
          "playing games",
          "layman gaming"
        ],
        "description": "These options switch to the main gameplay scene."
      },
      {
        "usage": "chrome",
        "aliases": [
          "browser",
          "web"
        ],
        "description": "These options switch to the Chrome scene for browsing content."
      },
      {
        "usage": "afk",
        "aliases": [
          "away",
          "gone",
          "sleep",
          "sleeping"
        ],
        "description": "These options switch to the AFK scene."
      }
    ]
  },
  {
    "id": 111,
    "name": "!setspotify",
    "usage": "[choice]",
    "aliases": [
      "!changespotify"
    ],
    "permission": "moderator",
    "commandGroups": [
      "OBS",
      "Spotify"
    ],
    "description": "This command changes the position of the Spotify overlay.",
    "parameterGroups": [
      {
        "usage": "tl",
        "aliases": [
          "top left",
          "lt",
          "left top",
          "ul",
          "up left",
          "lu",
          "left up"
        ],
        "description": "These options put the Spotify overlay on the top left."
      },
      {
        "usage": "tr",
        "aliases": [
          "top right",
          "rt",
          "right top",
          "ur",
          "up right",
          "ru",
          "right up"
        ],
        "description": "These options put the Spotify overlay on the top right."
      },
      {
        "usage": "bl",
        "aliases": [
          "bottom left",
          "lb",
          "left bottom",
          "dl",
          "down left",
          "ld",
          "left down"
        ],
        "description": "These options put the Spotify overlay on the bottom left."
      },
      {
        "usage": "br",
        "aliases": [
          "bottom right",
          "rb",
          "right bottom",
          "dr",
          "down right",
          "rd",
          "right down"
        ],
        "description": "These options put the Spotify overlay on the bottom right."
      }
    ]
  },
  {
    "id": 112,
    "name": "!setspotifyjam",
    "usage": "[text]",
    "aliases": [
      "!setjam"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Spotify",
      "Link"
    ],
    "description": "This command sets the Spotify jam session, so all the Laypeople can listen with Layman."
  },
  {
    "id": 113,
    "name": "!settimer",
    "usage": "[choice]",
    "aliases": [
      "setcountdown"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Utility"
    ],
    "description": "This command sets a timer so The Layman doesn't forget about something... hopefully.",
    "parameterGroups": [
      {
        "usage": "[number]H[number]M[number]S",
        "description": "These options set an exact hour(s), minute(s), and second(s) until the timer is over."
      },
      {
        "usage": "[number]H",
        "description": "These options set a timer for the amount of hour(s) that you set."
      },
      {
        "usage": "[number]M",
        "description": "These options set a timer for the amount of minute(s) that you set."
      },
      {
        "usage": "[number]S",
        "description": "These options set a timer for the amount of second(s) that you set."
      }
    ]
  },
  {
    "id": 114,
    "name": "!settitle",
    "usage": "[text]",
    "aliases": [
      "!changetitle",
      "!updatetitle"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Stream"
    ],
    "description": "This command sets the title to whatever the Layman Legion sets!"
  },
  {
    "id": 115,
    "name": "!settotaldeaths",
    "usage": "[number]",
    "aliases": [
      "!settotaldeath"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Layman",
      "Death"
    ],
    "description": "This command sets the TOTAL amount of times Layman has died in the current stream category deaths to what the Layman Legion says it is."
  },
  {
    "id": 116,
    "name": "!shoutout",
    "usage": "[username]",
    "aliases": [
      "!so"
    ],
    "permission": "moderator",
    "commandGroups": [
      "Viewer",
      "Promotion"
    ],
    "description": "This command promotes another streamer's channel to Layman's viewers."
  },
  {
    "id": 117,
    "name": "!sit",
    "massCompatible": true,
    "permission": "follower",
    "commandGroups": [
      "Avatars"
    ],
    "description": "This command lets your avatar take a break from running aroud."
  },
  {
    "id": 118,
    "name": "!slots",
    "usage": "[number]",
    "permission": "follower",
    "commandGroups": [
      "Economy",
      "Gamble"
    ],
    "description": "This command gives you a spin of a slot machine with the potential for a 5X multiplier payout!"
  },
  {
    "id": 119,
    "name": "!sob",
    "permission": "follower",
    "commandGroups": [
      "Special",
      "Fun",
      "Chance"
    ],
    "description": "This command says an upsetting message designed by cherrrios.",
    "parameterGroups": [
      {
        "usage": "max",
        "description": "These options say an even more upsetting message designed by cherrrioss."
      }
    ]
  },
  {
    "id": 120,
    "name": "!socialsecuritynumber",
    "aliases": [
      "!socialsecurity",
      "ssn"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Lore"
    ],
    "description": "This command says Layman's special numbers."
  },
  {
    "id": 121,
    "name": "!song",
    "permission": "follower",
    "commandGroups": [
      "Spotify"
    ],
    "description": "This command tells us the current song The Layman is hearing."
  },
  {
    "id": 122,
    "name": "!songcorrection",
    "permission": "moderator",
    "commandGroups": [
      "Spotify"
    ],
    "description": "This command lets the Layman Legion queue the correct song since SOMEONEEEE messed it up."
  },
  {
    "id": 123,
    "name": "!spawn game",
    "permission": "moderator",
    "commandGroups": [
      "Avatars",
      "Mini-game",
      "Fun"
    ],
    "description": "This command spawns a star to catch!"
  },
  {
    "id": 124,
    "name": "!spotify",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Spotify",
      "Link",
      "Social"
    ],
    "description": "This command lets you check out Layman's Spotify."
  },
  {
    "id": 125,
    "name": "!spotifyjam",
    "aliases": [
      "!jam"
    ],
    "permission": "follower",
    "commandGroups": [
      "Spotify",
      "Link"
    ],
    "description": "This command lets you join Layman's Spotify Jam session. If he started it..."
  },
  {
    "id": 126,
    "name": "!spotifyplaylist",
    "aliases": [
      "!playlist"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Spotify",
      "Link"
    ],
    "description": "This command shares the playlist Layman uses for strem!"
  },
  {
    "id": 127,
    "name": "!stand",
    "massCompatible": true,
    "permission": "follower",
    "commandGroups": [
      "Avatars"
    ],
    "description": "This command makes your avatar stand after taking a break."
  },
  {
    "id": 128,
    "name": "!startchase",
    "permission": "follower",
    "commandGroups": [
      "Fun",
      "Utility"
    ],
    "description": "This command starts the chase The Layman has entered."
  },
  {
    "id": 129,
    "name": "!startstopwatch",
    "permission": "follower",
    "commandGroups": [
      "Fun",
      "Utility"
    ],
    "description": "This command starts the stopwatch."
  },
  {
    "id": 130,
    "name": "!startstream",
    "permission": "moderator",
    "commandGroups": [
      "OBS",
      "Stream"
    ],
    "description": "This command starts The Layman's stream!"
  },
  {
    "id": 131,
    "name": "!steam",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Link",
      "Social"
    ],
    "description": "This command lets you check out Layman's Steam and add him as a friend."
  },
  {
    "id": 132,
    "name": "!stopwatch",
    "permission": "follower",
    "commandGroups": [
      "Fun",
      "Utility"
    ],
    "description": "This command tells you the status of the stopwatch."
  },
  {
    "id": 133,
    "name": "!subscriberage",
    "aliases": [
      "!subage"
    ],
    "permission": "follower",
    "commandGroups": [
      "Viewer",
      "Statistics"
    ],
    "description": "This command tells us how long you have been subscribing to The Layman."
  },
  {
    "id": 134,
    "name": "!test",
    "permission": "moderator",
    "commandGroups": [
      "Utility"
    ],
    "description": "This command is used by The Layman to test things for y'all!"
  },
  {
    "id": 135,
    "name": "!tiktok",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Link",
      "Social"
    ],
    "description": "This command lets you check out Layman's TikTok."
  },
  {
    "id": 136,
    "name": "!tonguetwister",
    "aliases": [
      "!twister"
    ],
    "permission": "subscriber",
    "commandGroups": [
      "Fun",
      "Chance"
    ],
    "description": "This command says a tongue twister about Peter Piper for Layman to possilby say."
  },
  {
    "id": 137,
    "name": "!twitch",
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Link",
      "Social"
    ],
    "description": "This command lets you check out The Layman's Twitch."
  },
  {
    "id": 138,
    "name": "!unlurk",
    "aliases": [
      "!back"
    ],
    "permission": "follower",
    "commandGroups": [
      "Viewer"
    ],
    "description": "This command lets The Layman know that you have returned, so he can yap!"
  },
  {
    "id": 139,
    "name": "!unmutediscord",
    "permission": "moderator",
    "commandGroups": [
      "OBS",
      "Stream",
      "Utility"
    ],
    "description": "This command unmutes Discord for the stream!"
  },
  {
    "id": 140,
    "name": "!valorant",
    "aliases": [
      "!valo",
      "!val",
      "!leagueoflegends",
      "!league",
      "!lol",
      "!teamfighttactics",
      "!tft"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Gamertag"
    ],
    "description": "This command says Layman's VALORANT gamertag."
  },
  {
    "id": 141,
    "name": "!watchtime",
    "permission": "follower",
    "commandGroups": [
      "Viewer",
      "Statistics"
    ],
    "description": "This command shows how much time you have spent with The Layman."
  },
  {
    "id": 142,
    "name": "!wordle",
    "usage": "[text]",
    "permission": "follower",
    "commandGroups": [
      "Fun",
      "Mini-game"
    ],
    "description": "This command lets you make a guess in the current Wordle."
  },
  {
    "id": 143,
    "name": "!youtube",
    "aliases": [
      "yt"
    ],
    "permission": "follower",
    "commandGroups": [
      "Layman",
      "Link",
      "Social"
    ],
    "description": "This command lets you check out The Layman's YouTube."
  },
  {
    "id": 144,
    "name": "milk",
    "permission": "follower",
    "commandGroups": [
      "Special",
      "Fun"
    ],
    "description": "This command says a funny message designed by nowat101."
  },
  {
    "id": 145,
    "name": "wtc",
    "permission": "follower",
    "commandGroups": [
      "Fun"
    ],
    "description": "This command says The Layman's famous quote that will one day be said by the ENTIRE world."
  }
];


