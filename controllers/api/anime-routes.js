const router = require('express').Router();
const { Anime } = require('../../models/');
const withAuth = require('../../utils/auth');

//get single anime
router.get('/:id', withAuth, async (req, res) => {
    try {
        const animeData = await Anime.findByPk({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(animeData)
    } catch (err) {
        res.status(500).json(err)
    }
});

//add anime to anime table
router.post('/', withAuth, async (req, res) => {
    try{
        const newData = await Anime.create(req.body);
        res.status(200).json(newData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;