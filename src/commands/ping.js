module.exports = 
{
    name: 'ping',
    description: 'Ping!',
    guild_only: false,
    need_args: false,
    usage: '',
    execute(message, args)
    {
        message.reply("pong!")
    }
}