const router = require('express').Router();
const { Favorites } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {

       const found = await Favorites.findOne({
            where: {
                user_id: req.session.user_id,
                playlist_id: req.body.playlist_id
            }
        })

        if (!found) {
            const newFavorite = await Favorites.create({
                user_id: req.session.user_id,
                playlist_id: req.body.playlist_id
            });
            return res.json(newFavorite);
        }
        res.json(found);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/', withAuth, async (req, res) => {

});





module.exports = router;