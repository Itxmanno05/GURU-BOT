import {
    promises,
    readFileSync
   } from "fs"
   import {
    join
   } from "path"
   import {
    xpRange
   } from "../lib/levelling.js"
   import moment from "moment-timezone"
   import os from "os"

  
   let groupmenu = `
   âœ¦ â”€â”€â”€ã€Ž *group* ã€â”€â”€â”€ âš
  â—ˆ .getbio <@tag/reply>  â“
  â—ˆ .animequote
  â—ˆ .Setdesc <text>
  â—ˆ .setname <text>
  â—ˆ .add
  â—ˆ .delete
  â—ˆ .delwarn @user
  â—ˆ .demote (@tag)
  â—ˆ .infogp
  â—ˆ .hidetag
  â—ˆ .invite <917xxx>
  â—ˆ .kick @user
  â—ˆ .link
  â—ˆ .poll question|option|option
  â—ˆ .profile
  â—ˆ .promote
  â—ˆ .resetlink
  â—ˆ .setbye <text>
  â—ˆ .group *open/close*
  â—ˆ .setwelcome <text>
  â—ˆ .simulate <event> @user
  â—ˆ .staff
  â—ˆ .tagall
  â—ˆ .totag
  â—ˆ .warn @user
  â—ˆ .warns
  â—ˆ .main
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹`
  
  let ownermenu = `
  âœ¦ â”€â”€â”€ã€Ž *owner* ã€â”€â”€â”€ âš
  â—ˆ .addprem <@tag>
  â—ˆ .addowner @user
  â—ˆ .allow <@tag>
  â—ˆ .HEROKU
  â—ˆ .ban @user
  â—ˆ .banchat
  â—ˆ .tx
  â—ˆ .broadcastgroup <text>
  â—ˆ .bcgc <text>
  â—ˆ .cleartmp
  â—ˆ .delexpired
  â—ˆ .delprem @user
  â—ˆ .removeowner @user
  â—ˆ .setppbotfull
  â—ˆ .getplugin <name file>
  â—ˆ .getfile <name file>
  â—ˆ .join <chat.whatsapp.com> <dias>
  â—ˆ .reset <54xxx>
  â—ˆ .resetprefix
  â—ˆ .restart
  â—ˆ ..setprefix
  â—ˆ ..setprefix [symbol]
  â—ˆ .unban @user
  â—ˆ .unbanchat
  â—ˆ .update
  â—ˆ .config
  â—ˆ .listban
  â—ˆ .deleteplugin <name>
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹`
  
  let funmenu = `
  âœ¦ â”€â”€â”€ã€Ž *fun* ã€â”€â”€â”€ âš
  â—ˆ .afk <reason>
  â—ˆ .tomp3
  â—ˆ .toav
  â—ˆ .bot
  â—ˆ .character @tag
  â—ˆ .dare
  â—ˆ .flirt
  â—ˆ .gay @user
  â—ˆ .pickupline
  â—ˆ .question
  â—ˆ .shayari
  â—ˆ .ship
  â—ˆ .yomamajoke
  â—ˆ .truth
  â—ˆ .waste @user
  â—ˆ .image
  â—ˆ .meme
  â—ˆ .quote
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹`
  
  let reactmenu = `
  âœ¦ â”€â”€â”€ã€Ž *reaction* ã€â”€â”€â”€ âš
  â—ˆ .bully @tag
  â—ˆ .cuddle @tag
  â—ˆ .cry @tag
  â—ˆ .hug @tag
  â—ˆ .awoo @tag
  â—ˆ .kiss @tag
  â—ˆ .lick @tag
  â—ˆ .pat @tag
  â—ˆ .smug @tag
  â—ˆ .bonk @tag
  â—ˆ .yeet @tag
  â—ˆ .blush @tag
  â—ˆ .smile @tag
  â—ˆ .wave @tag
  â—ˆ .highfive @tag
  â—ˆ .handhold @tag
  â—ˆ .nom @tag
  â—ˆ .bite @tag
  â—ˆ .glomp @tag
  â—ˆ .slap @tag
  â—ˆ .kill @tag
  â—ˆ .happy @tag
  â—ˆ .wink @tag
  â—ˆ .poke @tag
  â—ˆ .dance @tag
  â—ˆ .cringe @tag
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹`
  
  let dlmenu = `
  âœ¦ â”€â”€â”€ã€Ž *downloader* ã€â”€â”€â”€ âš
  â—ˆ .facebook <url>
  â—ˆ .gdrive ðŸ…Ÿ
  â—ˆ .gitclone <url>
  â—ˆ .igstalk
  â—ˆ .instagram
  â—ˆ .mediafire <url>
  â—ˆ .mega
  â—ˆ .modapk
  â—ˆ .play <query>
  â—ˆ .play2 <text>
  â—ˆ .playvid <text>
  â—ˆ .spotify
  â—ˆ .tiktok <url>
  â—ˆ .tiktokstalk
  â—ˆ .twitter <url>
  â—ˆ .ytmp3 <url>
  â—ˆ .ytsearch
  â—ˆ .ytmp4 <yt-link>
  â—ˆ .wallpaper <query>
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹`
  
  let gamemenu = `
  âœ¦ â”€â”€â”€ã€Ž *game* ã€â”€â”€â”€ âš
  â—ˆ .slot <amount>
  â—ˆ .chess [from to]
  â—ˆ .chess delete
  â—ˆ .chess join
  â—ˆ .chess start
  â—ˆ .delttt
  â—ˆ .guessflag
  â—ˆ .Maths <modes>
  â—ˆ .ppt <rock/paper/scissors>
  â—ˆ .tictactoe <tag number>
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹`
  let logomenu = `
  âœ¦ â”€â”€â”€ã€Ž *maker* ã€â”€â”€â”€ âš
  â—ˆ .blur
  â—ˆ .difuminar2
  â—ˆ .hornycard
  â—ˆ .hornylicense
  â—ˆ .gfx1
  â—ˆ .gfx2
  â—ˆ .gfx3
  â—ˆ .gfx4
  â—ˆ .gfx5
  â—ˆ .gfx6
  â—ˆ .gfx7
  â—ˆ .gfx8
  â—ˆ .gfx9
  â—ˆ .gfx10
  â—ˆ .gfx11
  â—ˆ .gfx12
  â—ˆ .simpcard
  â—ˆ .itssostupid
  â—ˆ .iss
  â—ˆ .stupid
  â—ˆ .tweet <comment>
  â—ˆ .lolicon
  â—ˆ .ytcomment <comment>
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹`
  
  let stickermenu = `
  âœ¦ â”€â”€â”€ã€Ž *sticker* ã€â”€â”€â”€ âš
  â—ˆ .emojimix <emoji+emoji>
  â—ˆ .getsticker
  â—ˆ .smaker
  â—ˆ .stickerwithmeme (caption|reply media)
  â—ˆ .swmeme <url>
  â—ˆ .swm(caption|reply media)
  â—ˆ .sfull
  â—ˆ .toimg <sticker>
  â—ˆ .tovid
  â—ˆ .trigger <@user>
  â—ˆ .ttp
  â—ˆ .ttp2
  â—ˆ .ttp3
  â—ˆ .ttp4
  â—ˆ .ttp5
  â—ˆ .attp
  â—ˆ .attp2
  â—ˆ .attp3
  â—ˆ .take <name>|<author>
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹`
  
  let audiomenu = `
  âœ¦ â”€â”€â”€ã€Ž *audio* ã€â”€â”€â”€ âš
  â—ˆ .bass [vn]
  â—ˆ .blown [vn]
  â—ˆ .deep [vn]
  â—ˆ .earrape [vn]
  â—ˆ .fast [vn]
  â—ˆ .fat [vn]
  â—ˆ .nightcore [vn]
  â—ˆ .reverse [vn]
  â—ˆ .robot [vn]
  â—ˆ .slow [vn]
  â—ˆ .smooth [vn]
  â—ˆ .tupai [vn]
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹`
  
  
  let newsmenu = `
  âœ¦ â”€â”€â”€ã€Ž *news* ã€â”€â”€â”€ âš
  â—ˆ .news
  â—ˆ .technews
  â—ˆ .ndtv
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹
  `
  let economy = `
  âœ¦ â”€â”€â”€ã€Ž *economy* ã€â”€â”€â”€ âš
  â—ˆ .addgold <@user>
  â—ˆ .addxp <@user>
  â—ˆ .bank
  â—ˆ .buych
  â—ˆ .cock-fight <amount>
  â—ˆ .buy
  â—ˆ .buyall
  â—ˆ .daily
  â—ˆ .deposit
  â—ˆ .gamble <amount> <color(red/black)>
  â—ˆ .give credit [amount] [@tag]
  â—ˆ .levelup
  â—ˆ .rank
  â—ˆ .rob
  â—ˆ .roulette <amount> <color(red/black)>
  â—ˆ .wallet
  â—ˆ .withdraw
  â—ˆ .work
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹`
  let animemenu = `
  âœ¦ â”€â”€â”€ã€Ž *anime* ã€â”€â”€â”€ âš
  â—ˆ .anime
  â—ˆ .akira
  â—ˆ .akiyama
  â—ˆ .anna
  â—ˆ .asuna
  â—ˆ .ayuzawa
  â—ˆ .boruto
  â—ˆ .chiho
  â—ˆ .chitoge
  â—ˆ .deidara
  â—ˆ .erza
  â—ˆ .elaina
  â—ˆ .eba
  â—ˆ .emilia
  â—ˆ .hestia
  â—ˆ .hinata
  â—ˆ .inori
  â—ˆ .isuzu
  â—ˆ .itachi
  â—ˆ .itori
  â—ˆ .kaga
  â—ˆ .kagura
  â—ˆ .kaori
  â—ˆ .keneki
  â—ˆ .kotori
  â—ˆ .kurumi
  â—ˆ .madara
  â—ˆ .mikasa
  â—ˆ .miku
  â—ˆ .minato
  â—ˆ .naruto
  â—ˆ .nezuko
  â—ˆ .sagiri
  â—ˆ .sasuke
  â—ˆ .sakura
  â—ˆ .manhwa
  â—ˆ .waifu
  â—ˆ .neko
  â—ˆ .zerotwo
  â—ˆ .loli
  â—ˆ .pokedex <pokemon>
  â—ˆ .trace
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹
  `
  let nsfwmenu = `
  âœ¦ â”€â”€â”€ã€Ž *nsfw* ã€â”€â”€â”€ âš
  â—ˆ .genshin
  â—ˆ .swimsuit
  â—ˆ .schoolswimsuit
  â—ˆ .white
  â—ˆ .barefoot
  â—ˆ .touhou
  â—ˆ .gamecg
  â—ˆ .hololive
  â—ˆ .uncensored
  â—ˆ .sunglasses
  â—ˆ .glasses
  â—ˆ .weapon
  â—ˆ .shirtlift
  â—ˆ .chain
  â—ˆ .fingering
  â—ˆ .flatchest
  â—ˆ .torncloth
  â—ˆ .bondage
  â—ˆ .demon
  â—ˆ .wet
  â—ˆ .pantypull
  â—ˆ .headdress
  â—ˆ .headphone
  â—ˆ .tie
  â—ˆ .anusview
  â—ˆ .shorts
  â—ˆ .stokings
  â—ˆ .topless
  â—ˆ .beach
  â—ˆ .bunnygirl
  â—ˆ .bunnyear
  â—ˆ .idol
  â—ˆ .vampire
  â—ˆ .gun
  â—ˆ .maid
  â—ˆ .bra
  â—ˆ .nobra
  â—ˆ .bikini
  â—ˆ .whitehair
  â—ˆ .blonde
  â—ˆ .pinkhair
  â—ˆ .bed
  â—ˆ .ponytail
  â—ˆ .nude
  â—ˆ .dress
  â—ˆ .underwear
  â—ˆ .foxgirl
  â—ˆ .uniform
  â—ˆ .skirt
  â—ˆ .sex
  â—ˆ .sex2
  â—ˆ .sex3
  â—ˆ .breast
  â—ˆ .twintail
  â—ˆ .spreadpussy
  â—ˆ .tears
  â—ˆ .seethrough
  â—ˆ .breasthold
  â—ˆ .drunk
  â—ˆ .fateseries
  â—ˆ .spreadlegs
  â—ˆ .openshirt
  â—ˆ .headband
  â—ˆ .food
  â—ˆ .close
  â—ˆ .tree
  â—ˆ .nipples
  â—ˆ .erectnipples
  â—ˆ .horns
  â—ˆ .greenhair
  â—ˆ .wolfgirl
  â—ˆ .catgirl
  â—ˆ .nsfw
  â—ˆ .ass
  â—ˆ .boobs
  â—ˆ .lesbian
  â—ˆ .pussy
  â—ˆ .pack
  â—ˆ .xvid
  â—ˆ .xnxx
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹`
  
  let toolsmenu = `
  âœ¦ â”€â”€â”€ã€Ž *tools* ã€â”€â”€â”€ âš
  â—ˆ .nowa
  â—ˆ .qr <text>
  â—ˆ .qrcode <text>
  â—ˆ .style <key> <text>
  â—ˆ .weather *<place>*
  â—ˆ .dehaze
  â—ˆ .recolor
  â—ˆ .hdr
  â—ˆ .length <amount>
  â—ˆ .tinyurl <link>
  â—ˆ .shorten <link>
  â—ˆ .tempmail
  â—ˆ .shazam
  â—ˆ .cal <equation>
  â—ˆ .carbon <code>
  â—ˆ .define <word>
  â—ˆ .element
  â—ˆ .google
  â—ˆ .itunes
  â—ˆ .lyrics
  â—ˆ .imdb
  â—ˆ .course
  â—ˆ .randomcourse
  â—ˆ .readmore <text1>|<text2>
  â—ˆ .readvo
  â—ˆ .removebg
  â—ˆ .ss <url>
  â—ˆ .ssf <url>
  â—ˆ .subreddit
  â—ˆ .telesticker  â“
  â—ˆ .tourl
  â—ˆ .translate <lang> <text>
  â—ˆ .true
  â—ˆ .tts <lang> <task>
  â—ˆ .wa
  â—ˆ .wikipedia
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹`
  
  let Aimenu = `
  âœ¦ â”€â”€â”€ã€Ž *AI* ã€â”€â”€â”€ âš
  â—ˆ .bing
  â—ˆ .dalle
  â—ˆ .chatgpt
  â—ˆ .toanime
  â—ˆ .gitagpt
  â—ˆ .tocartoon
  â—ˆ .ai
  â—ˆ .bard
  â—ˆ .alexa
  â—ˆ .bingimg
  â—ˆ .gemini
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹
  `
  let religionmenu = `
  âœ¦ â”€â”€â”€ã€Ž *religion* ã€â”€â”€â”€ âš
  â—ˆ .gita [verse_number]
  â—ˆ .quran [surah_number|surah_name]
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹`
  
  let botmenu = `
  âœ¦ â”€â”€â”€ã€Ž *Bot Menu* ã€â”€â”€â”€ âš
  â—ˆ .ping
  â—ˆ .runtime
  â—ˆ .script
  â—ˆ .server
  â—ˆ .blocklist
  â—ˆ .alive
  â—ˆ .info
  â—ˆ .owner
  â—ˆ .totalfeature
  â—ˆ .list
  â—ˆ .messi
  â—ˆ .cristianoronaldo
  â—ˆ .cr7
  â—ˆ .ppcouple
  â—ˆ .ppcp
  â—ˆ .pinterest
  â—ˆ .reg <name.age>
  â—ˆ .mysn
  â—ˆ .unreg 
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹
  `
  let pluginmenu = `
  âœ¦ â”€â”€â”€ã€Ž *plugin* ã€â”€â”€â”€ âš
  â—ˆ .plugins
  â—ˆ .install <Gist URL>
  â•°â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â³¹
  `

  const handler = async (m, {
    conn,
    command,
    text,
    args,
    usedPrefix
  }) => {
    
  
   let glb = global.db.data.users
   let usrs = glb[m.sender]
   let tag = `@${m.sender.split("@")[0]}`
   let mode = global.opts["self"] ? "Private" : "Public"
   
   let {
  age,
  exp,
  limit,
  level,
  role,
  registered,
  credit
   } = glb[m.sender]
   let {
  min,
  xp,
  max
   } = xpRange(level, global.multiplier)
   let name = await conn.getName(m.sender)
   let premium = glb[m.sender].premiumTime
   let prems = `${premium > 0 ? "Premium": "Free"}`
   let platform = os.platform()
  
  
   let ucpn = `${ucapan()}`
  
   let _uptime = process.uptime() * 1000
   let _muptime
   if (process.send) {
  process.send("uptime")
  _muptime = await new Promise(resolve => {
  process.once("message", resolve)
  setTimeout(resolve, 1000)
  }) * 1000
   }
   let muptime = clockString(_muptime)
   let uptime = clockString(_uptime)
  
   
   let totalfeatures = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
   let totalreg = Object.keys(glb).length
  
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    
   
    global.fcontact = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    const infoText = `
    â•­â”à¼»ð‘ªð’€ð‘©ð‘¬ð‘¹_ð‘¾ð‘¨ð‘¹ð‘¹ð‘°ð‘¶ð‘¹à¼ºâ”â•®\n
    *${ucpn}*
    
  _á´°áµ’â¿áµ— áµâ±Ë¢áµ˜Ë¢áµ‰ áµÊ¸ áµ‡áµ’áµ— á´µá¶  Ê¸áµ’áµ˜ áµâ±Ë¢áµ˜Ë¢áµ‰ áµ‡áµ’áµ— â±áµ—Ë¢ Ê¸áµ’áµ˜Ê³ á¶ áµƒáµ˜Ë¡áµ— á´µ áµâ±áµ›áµ‰ áµ˜áµ– áµ‰áµ›áµ‰Ê³Ê¸áµ—Ê°â±â¿áµ áµ–Ë¡áµ‰áµƒË¢áµ‰ áµË¢áµ‰ á¶ áµ’Ê³ áµ–áµ’Ë¢â±áµ—â±áµ›áµ‰ áµ–áµ˜Ê³áµ–áµ’Ë¢áµ‰_
        
  â•­â”âŠ±ã€ŒWá´‡ÊŸá´„á´á´á´‡ á´›á´ á´á´‡É´á´œâŠ±â”â•®
  â”‚
  âœ« *1.* Bot Menu
  âœ« *2.* Owner Menu
  âœ« *3.* Group Menu
  âœ« *4.* Fun Menu
  âœ« *5.* Reaction Menu
  âœ« *6.* Downloader Menu
  âœ« *7.* Game Menu
  âœ« *8.* Logo Menu
  âœ« *9.* Sticker Menu
  âœ« *10.* Audio Menu
  âœ« *11.* News Menu
  âœ« *12.* Economy Menu
  âœ« *13.* Anime Menu
  âœ« *14.* NSFW Menu
  âœ« *15.* Tools Menu
  âœ« *16.* AI Menu
  âœ« *17.* Religion Menu
  âœ« *18.* Plugin Menu 
  
â”âŠ±à¼»ð‘ªð’€ð‘©ð‘¬ð‘¹_ð‘¾ð‘¨ð‘¹ð‘¹ð‘°ð‘¶ð‘¹à¼ºâŠ±â”

  ` 
;

  const { result, key, timeout } = await conn.sendMessage(m.chat, { video: { url: menuvid }, caption: infoText.trim(),  gifPlayback: true,
  gifAttribution: 0}, { quoted: fcontact })
  
  // Save the menu options to gurumenu
  conn.gurumenu[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
          delete: key
      });
      delete conn.gurumenu[m.sender];
  }, 150 * 1000),
  };
  };
  
 
  handler.before = async (m, { conn }) => {
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    if (m.isBaileys || !(m.sender in conn.gurumenu)) return;
    const { result, key, timeout } = conn.gurumenu[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    
    
  
    
    if (choice === "1") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: botmenu
      }, { quoted:fcontact });
      } else if (choice === "2") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: ownermenu
      }, { quoted:fcontact });
      } else if (choice === "3") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: groupmenu
      }, { quoted:fcontact });
      } else if (choice === "4") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: funmenu
      }, { quoted:fcontact });
      } else if (choice === "5") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: reactmenu
      }, { quoted:fcontact });
      } else if (choice === "6") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: dlmenu
      }, { quoted:fcontact });
      } else if (choice === "7") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: groupmenu
      }, { quoted:fcontact });
      } else if (choice === "8") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: logomenu
      }, { quoted:fcontact });
      } else if (choice === "9") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: stickermenu
      }, { quoted:fcontact });
      } else if (choice === "10") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: audiomenu
      }, { quoted:fcontact });
      } else if (choice === "11") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: newsmenu
      }, { quoted:fcontact });
      } else if (choice === "12") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: economy
      }, { quoted:fcontact });
      } else if (choice === "13") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: animemenu
      }, { quoted:fcontact });
      } else if (choice === "14") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: nsfwmenu
      }, { quoted:fcontact });
      } else if (choice === "15") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: toolsmenu
      }, { quoted:fcontact });
      } else if (choice === "16") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: Aimenu
      }, { quoted:fcontact });
      } else if (choice === "17") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: religionmenu
      }, { quoted:fcontact });
      } else if (choice === "18") {
        await conn.sendMessage(m.chat, { image: { url: 'https://cdn.jsdelivr.net/gh/Guru322/api@Guru/K.jpg' },
        caption: pluginmenu
      }, { quoted:fcontact });
      } else {
        m.reply('Invalid choice. Please reply with a valid number.');
      }
  
  };
  
  
  handler.help = ["play"];
  handler.tags = ["downloader"];
  handler.command = /^(menu)$/i;
  handler.limit = true;
  export default handler;
  
  
  
  
  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
   }
   
   const more = String.fromCharCode(8206)
   const readMore = more.repeat(4001)
   
   function clockString(ms) {
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [h, " H ", m, " M ", s, " S "].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function clockStringP(ms) {
    let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
    let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
    let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [ye, " *Years ðŸ—“ï¸*\n", mo, " *Month ðŸŒ™*\n", d, " *Days â˜€ï¸*\n", h, " *Hours ðŸ•*\n", m, " *Minute â°*\n", s, " *Second â±ï¸*"].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function ucapan() {
    const time = moment.tz("Asia/Kolkata").format("HH")
    let res = "Good morning â˜€ï¸"
    if (time >= 4) {
     res = "Good Morning ðŸŒ„"
    }
    if (time >= 10) {
     res = "Good Afternoon â˜€ï¸"
    }
    if (time >= 15) {
     res = "Good Afternoon ðŸŒ‡"
    }
    if (time >= 18) {
     res = "Good Night ðŸŒ™"
    }
    return res
   }
  
