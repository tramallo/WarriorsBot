const core = require('../bot-core')

module.exports = 
{
    name: 'voiceStateUpdate',
    once: false,
    execute(oldState, newState, client)
    {
        //Check if the state is active (active state is connected to a voice channel and not deafned or muted)
        const stateIsActive = (state) => { return (state.channel && !state.deaf && !state.mute) }

        //if the state entered is active
        if(stateIsActive(newState))
        {
            //register the entered user and the time
            const t = new Date()
            core.loggedInUsers.push( {user: newState.member.user.id, time: t} )
        }
        else
        {
            //if the state is inactive and the user was registered as active previously,
            //the register of active user is deleted and the total active time is calculated
            const i = core.loggedInUsers.findIndex(item => item.user == oldState.member.user.id)

            if(i != -1)
            {
                const item = core.loggedInUsers.splice(i, 1)[0]
                const time = Math.abs(item.time - new Date())

                //just for testing the time is showed on console
                console.log(`${item.user} logged out\nSession time: ${time}`)
            }
        }
    }
}