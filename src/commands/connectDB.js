const { MongoClient } = require('mongodb')

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWD}@warriorsbotdb.oqwsb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

module.exports = 
{
    name: 'connectdb',
    description: 'connects to database and sends a console log',
    guild_only: false,
    need_args: false,
    usage: '',
    async execute(message, args)
    {
        const db = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true })

        try
        {
            await db.connect()
            const dbList = await db.db().admin().listDatabases()

            let reply = 'Databases:'
            dbList.databases.forEach(db => reply += `\n- ${db.name}`)

            message.channel.send(reply)
        }
        catch (e)
        {
            console.error(e)
        }
        finally
        {
            await db.close()
        }
    }
}