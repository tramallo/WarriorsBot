const { prefix } = require(`${__dirname}/../default-config.json`)

module.exports = 
{
    name: 'message',
    once: false,
    execute(message, client)
    {
        //Se controla que el mensaje inicie con el prefijo y no haya sido enviado por un bot
        if(!message.content.startsWith(prefix) || message.author.bot) return

        //Se divide el mensaje segun sus espacios y se guarda el primer elemento (nombre del comando) en la variable command
        const args = message.content.slice(prefix.length).trim().split(/ +/);
	    const commandName = args.shift().toLowerCase();

        //Se controla que exista un comando registrado con dicho nombre
        if(!client.commands.has(commandName)) return

        const command = client.commands.get(commandName)

        //comprobando si el mensaje solo funciona en chats de servidores
        if(command.guild_only && message.channel.type == "dm")
        {
            return message.channel.send('Este comando solo puede ser ejecutado en servidores')
        }

        //Comprobando si el comando requiere argumentos y el usuario los ingreso
        if(command.need_args && !args.length)
        {
            let reply = 'Argumentos incorrectos'
            if(command.usage) reply += `\n${command.usage}`
            return message.channel.send(reply)
        }

        //Se ejecuta el comando
        try
        {
            command.execute(message, args)
        }catch (e)
        {
            console.error(e)
            message.reply('Ocurrio un problema durante la ejecucion del comando')
        }
    }
}