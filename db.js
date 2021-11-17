const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_db');
const { STRING, UUID, UUIDV4 } = Sequelize.DataTypes;


//Models [Basketball]:  Players, Teams, Cities
const Player = conn.define('players', {
    name: {
        type: STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },

});

const Team = conn.define('teams', {
    name: {
        type: STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }

});

const City = conn.define('cities', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }

    }

});

//ASSOCIATION
Player.belongsTo(Player, {as: 'teammates'});

Team.hasMany(Player);
Player.belongsTo(Team);

//DATA
const data = {
    players: ['Kevin_Durant', 'Lebron_James', 'Giannis_Anteokounmpo', 'Stephen_Curry', 'James_Harden', 'Joel_Embiid', 'Anthony_Davis'],
    teams: ['Lakers', 'Sixers', 'Nets', 'Warriors', 'Bucks'],
    cities: ['Los_Angeles','Philadelphia','San_Francisco','Milwaukee','Brooklyn'],
}


const syncAndSeed = async () => {
    await conn.sync({ force: true });

    const  [Kevin_Durant, Lebron_James, Giannis_Anteokounmpo, Stephen_Curry, James_Harden, Joel_Embiid, Anthony_Davis] = await Promise.all(
        data.players.map((name) => Player.create({name})));
    const [Lakers, Sixers, Nets, Warriors, Bucks] = await Promise.all(
        data.teams.map((name) => Team.create({name})));
    const  [Los_Angeles, Philadelphia, San_Francisco, Milwaukee, Brooklyn] = await Promise.all(
        data.cities.map((name) => City.create({name})));

    

    

};



module.exports = {
    syncAndSeed,
    models: {
        Player, Team, City
    }
}