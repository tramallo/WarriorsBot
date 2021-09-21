require('dotenv').config()

const fs = require('fs')
const Discord = require('discord.js')
const { prefix } = require('./default-config.json')

const client = new Discord.Client()
client.commands = new Discord.Collection()

//Se leen todos los archivos de 'commands' y se los agrega a la coleccion client.commands
fs.readdir(`${__dirname}/commands`, (err, files) => 
{
    //Control de errores
    if(err) { return console.error(err) }

    //se filtra los que no sean archivos .js
    files.filter(file => file.endsWith('.js')).forEach(file =>
        {
            const command = require(`${__dirname}/commands/${file}`)

            client.commands.set(command.name, command)
        })
})

//Se leen todos los archivos de 'events' y se los registra en client
fs.readdir(`${__dirname}/events`, (err, files) =>
{
    //Control errores
    if(err) { return console.error(err) }

    //se filtran los archivos que no son .js
    files.filter(file => file.endsWith('.js')).forEach(file =>
        {
            const event = require(`${__dirname}/events/${file}`)

            //se registran los eventos segun deban ejecutarse una sola vez o muchas
            if(event.once) client.once(event.name, (...args) => event.execute(...args, client))
            else client.on(event.name, (...args) => event.execute(...args, client))
        })
})

client.login(process.env.BOT_TOKEN)