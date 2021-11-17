const express = require('express');
const app = express();
const path = require('path');

const { syncAndSeed , models: {Player, Team, City}, } = require('./db');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//route '/'
app.get('/', async (req, res, next) => {
    try {
        const [players, teams, cities] = await Promise.all([
            Player.findAll(),
            Team.findAll(),
            City.findAll(),
        ]);

        

        res.send(`
            <html>
                <head>
                    <title> NBA PLAYER PAGE </title>
                    <link rel="stylesheet" href="/style.css" />
                </head>
                
                <nav>
                    <div class = "navMenu">
                        <a href='/players'> Players </a>
                    </div>

                    <div class = "navMenu">
                        <a href='/teams'> Teams </a>
                    </div>
                    <div class = "navMenu">
                        <a href='/cities'> Cities </a>
                    </div>
                </nav>
                <div class = "player-list">
               
                    <ul>
                    ${
                        players.map(player => {
                            return `
                            <li>
                             
                                ${player.name}
                            </li>
                            `;
                    }).join('').replace(/_/g, ' ')
                    }
                    </ul>
                </div>
                
            </html>
        `);
        
        }
    catch(error) {
        next(error);
    }


});

//route for models

app.get('/players', async (req, res, next) => {
    try {
        const players = await Player.findAll()

        res.send(`
            <html>
                <head>
                    <title> NBA PLAYER PAGE </title>
                    <link rel="stylesheet" href="/style.css" />
                </head>
                
                <nav>
                    <div class = "navMenu">
                        <a href='/players'> Players </a>
                    </div>

                    <div class = "navMenu">
                        <a href='/teams'> Teams </a>
                    </div>
                    <div class = "navMenu">
                        <a href='/cities'> Cities </a>
                    </div>
                </nav>
                <div class = "player-list">
                LIST OF PLAYERS
                    <ul>
                    ${
                        players.map(player => {
                            return `
                            <li>
                             
                                ${player.name}
                            </li>
                            `;
                    }).join('').replace(/_/g, ' ')
                    }
                    </ul>
                </div>
                
            </html>
        `);
    }

    catch(error) {
        next(error);
    }
});

app.get('/teams', async (req, res, next) => {
    try {
        const teams = await Team.findAll();


        res.send(`
            <html>
                <head>
                    <title> NBA PLAYER PAGE </title>
                    <link rel="stylesheet" href="/style.css" />
                </head>
                
                <nav>
                    <div class = "navMenu">
                        <a href='/players'> Players </a>
                    </div>

                    <div class = "navMenu">
                        <a href='/teams'> Teams </a>
                    </div>
                    <div class = "navMenu">
                        <a href='/cities'> Cities </a>
                    </div>
                </nav>
                <div class = "player-list">
                LIST OF TEAMS
                    <ul>
                    ${
                        teams.map(team => {
                            return `
                            <li>
                             
                                ${team.name}
                            </li>
                            `;
                    }).join('')
                    }
                    </ul>
                </div>
                
            </html>
        `);
    }

    catch(error) {
        next(error);
    }
});

app.get('/cities', async (req, res, next) => {
    try {
        const cities = await City.findAll();


        res.send(`
            <html>
                <head>
                    <title> NBA PLAYER PAGE </title>
                    <link rel="stylesheet" href="/style.css" />
                </head>
                
                <nav>
                    <div class = "navMenu">
                        <a href='/players'> Players </a>
                    </div>

                    <div class = "navMenu">
                        <a href='/teams'> Teams </a>
                    </div>
                    <div class = "navMenu">
                        <a href='/cities'> Cities </a>
                    </div>
                </nav>
                <div class = "player-list">
               LIST OF CITIES
                    <ul>
                    ${
                        cities.map(city => {
                            return `
                            <li>
                             
                                ${city.name}
                            </li>
                            `;
                    }).join('').replace(/_/g, ' ')
                    }
                    </ul>
                </div>
                
            </html>
        `);
    }

    catch(error) {
        next(error);
    }
});

//init
const init = async()=> {
    try {
      await syncAndSeed();
      const port = process.env.PORT || 3000;
      app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
      console.log(ex);
    }
  };



init();
