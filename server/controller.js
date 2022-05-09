require('dotenv').config()
const Sequelize = require('sequelize')

const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    addMushroom: (req, res) => {
        console.log(req.body)
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
    
    deleteMushroom: (req, res) => {
        sequelize.query(`
        delete from mushrooms where mushroom_id='${req.params.id}'
        `)
        .then(dbRes => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    getMushroom: (req, res) => {
        sequelize.query(`
        SELECT * FROM mushrooms
        `)
        .then((dbRes) => {
        res.status(200).send(dbRes[0])
        }).catch(err => console.log(err))
    }
}