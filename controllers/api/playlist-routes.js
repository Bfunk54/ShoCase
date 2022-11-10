const router = require('express').Router();
const { Playlist } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        const newPlaylist = await Playlist.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newPlaylist);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;