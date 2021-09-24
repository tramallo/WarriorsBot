const core = require('../bot-core')

module.exports = 
{
    name: 'voiceStateUpdate',
    once: false,
    execute(oldState, newState, client)
    {
        const stateIsActive = (state) => { return (state.channel && !state.deaf && !state.mute) }

        if(stateIsActive(newState))
        {
            const t = new Date()
            core.loggedInUsers.push( {user: newState.member.user.id, time: t} )
        }
        else
        {
            const i = core.loggedInUsers.findIndex(item => item.user == oldState.member.user.id)

            if(i != -1)
            {
                const item = core.loggedInUsers.splice(i, 1)[0]
                const time = Math.abs(item.time - new Date())

                console.log(`${item.user} logged out\nSession time: ${time}`)
            }
        }
    }
}