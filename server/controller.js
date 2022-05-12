//translates server port and postgresSQL link to JSON so database and server can communicate
require('dotenv').config()
const Sequelize = require('sequelize')
const {DATABASE_URL} = process.env
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

//server functions
module.exports = {
    //adds mushroom info to postgresSQL database
    addMushroom: (req, res) => {
        let { image_url, mushroom_name, location, date, who, altitude, habitat, substrate, spore_print, edible, psychoactive, notes } = req.body
        sequelize.query(`
        INSERT INTO mushrooms (image_url, mushroom_name, location, date, who, altitude, habitat, substrate, spore_print, edible, psychoactive, notes)
        VALUES ('${image_url}', '${mushroom_name}', '${location}', '${date}', '${who}', ${altitude}, '${habitat}', '${substrate}', '${spore_print}', ${edible}, ${psychoactive}, '${notes}')
        `)
            .then(dbRes => {
                res.status(200).send(dbRes[0])
            })
            .catch(err => {
            res.status(501).json(err)
            console.log(err)
            })
    },
    
    //deletes mushroom from postgresSQL database
    deleteMushroom: (req, res) => {
        sequelize.query(`
        DELETE FROM mushrooms WHERE mushroom_id='${req.params.id}'
        `)
        .then(dbRes => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    //gets all mushrooms from postgresSQL database to create tables of
    getMushroom: (req, res) => {
        sequelize.query(`
        SELECT * FROM mushrooms
        ORDER BY mushroom_id DESC;
        `)
        .then((dbRes) => {
        res.status(200).send(dbRes[0])
        }).catch(err => console.log(err))
    },

    //validates user's login information
    loginUser: (req, res) => {
        let {username, password} = req.body
        sequelize.query(`
        SELECT * FROM users
        WHERE username = '${username}'
        AND password = '${password}'
        `)
        .then((dbRes) => {
        dbRes[0] == '' ?
        res.status(200).send('user not found') :
        res.status(200).send(dbRes[0]);
        }).catch(console.log(`Couldn't find user`))
    }
}