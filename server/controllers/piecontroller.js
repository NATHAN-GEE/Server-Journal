// const Express = require('express');
// const router = Express.Router();

const router = require('express').Router();

router.get('/', (req, res) => {
    res.send(`Main route Hit!`)
})

module.exports = router;
