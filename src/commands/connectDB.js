const mongoose = require('mongoose')
const userModel = require(`${__dirname}/../dbModels/userModel.js`)

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@${process.env.CLUSTER_NAME}.oqwsb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

module.exports = 
{
    name: 'connectdb',
    description: 'connects to database and sends a console log',
    guild_only: false,
    need_args: false,
    usage: '',
    async execute(message, args)
    {
        mongoose.connect(URI, { useNewUrlParser: true } )

        //Error control
        mongoose.connection.on('error', error => { console.log(error) })

        //Connection successfull
        mongoose.connection.on('open', () => 
        {
            console.log('connected')
        })

        userModel.find({}, (err, res) => {
            if(err) console.log("error in find() function")

            console.log(res)
        })
    }
}