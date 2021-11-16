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
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

const City = conn.define('cities', {
    name: {
        type: STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})
//ASSOCIATION
Player.belongsTo(Player, {as: 'teamMates'});
Team.hasMany(Player, { foreignKey: 'jerseyNumberID'});
Team.belongsTo(Team, {as: 'competitors'});

//DATA
const data = {
    players: ['Kevin_Durant', 'Lebron_James', 'Giannis_Anteokounmpo', 'Stephen_Curry', 'James_Harden', 'Joel_Embiid', 'Anthony_Davis', 'Luka_Doncic'],
    teams: ['Lakers', 'Sixers', 'Nets', 'Warriors', 'Bucks','Mavericks'],
    cities: ['Los_Angeles','Philadelphia','Dallas','San_Francisco','Milwaukee','Brooklyn']
};
const syncAndSeed = async () => {
    await conn.sync({ force: true });
    const  [Kevin_Durant, Lebron_James, Giannis_Anteokounmpo, Stephen_Curry, James_Harden, Joel_Embiid, Anthony_Davis] = await Promise.all(data.players.map((name) => Player.create({name})));
    //const [Lakers, Sixers, Nets, Warriors, Bucks];
    //const  [Los_Angeles,Philadelphia,San_Francisco,Milwaukee,Brooklyn];

    await Promise.all([
        //update
    ]);

}



module.exports = {
    syncAndSeed,
    models: {
        Player, Team, City
    }
}