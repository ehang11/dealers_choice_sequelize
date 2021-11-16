const express = require('express');

const app = express();
const { syncAndSeed , models: {Player, Team, City} } = require('./db');


//route '/'
app.get('/', async(req, res, next) => {
    try {

    }

    catch(error) {
        next(error);
    }


})

//route for models

app.get('/players', async(req, res, next) => {
    try {

    }

    catch(error) {
        next(error);
    }
});

app.get('/teams', async(req, res, next) => {
    try {

    }

    catch(error) {
        next(error);
    }
});

app.get('/cities', async(req, res, next) => {
    try {

    }

    catch(error) {
        next(error);
    }
});

//init
const init = async() => {
    try {
        await syncAndSeed();
        const PORT = process.env.PORT || 5400;
        app.listen(PORT, ()=> console.log(`listeing to port:  ${PORT} `));

    }

    catch(error) {
        console.log(error);
    }
}



init();
