module.exports = 
{
    name: 'ready',
    once: true,
    async execute(client)
    {
        console.log('Bot Ready!')
        client.user.setStatus('invisible')
    }
}