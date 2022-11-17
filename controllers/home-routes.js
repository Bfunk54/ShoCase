const router = require("express").Router();
const { Playlist, Comment, User, Anime, Favorites } = require("../models");
const withAuth = require("../utils/auth");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// get all playlists for homepage
router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    if (req.session.user_id) {
      const playlistData = await Playlist.findAll({
        include: [{ model: User }, { model: Anime }, { model: Favorites }],
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM Favorites AS favorites
                                WHERE
                                    playlist.id = playlist_id
                            )`),
              "favoritesCount",
            ],
            [
              Sequelize.literal(`(
                                SELECT COUNT(*) FROM Favorites AS checks WHERE playlist.id = playlist_id AND ${req.session.user_id} = user_id
                            )`),
              "hasFavorited",
            ],
          ],
        },
      });
      const playlistsU = playlistData.map((playlist) =>
        playlist.get({ plain: true })
      );

      const playlists = playlistsU.reverse()

      const favoritesData = await Favorites.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });

      const favorites = favoritesData.map((favorite) =>
        favorite.get({ plain: true })
      );

      const currentUser = {
        user_id: req.session.user_id,
        email: req.session.email,
        avatar: req.session.avatar,
        username: req.session.username
      }

      res.render("all-playlists", {
        currentUser,
        favorites,
        playlists,
        loggedIn: req.session.loggedIn,
      });
    } else {
      const playlistData = await Playlist.findAll({
        include: [{ model: User }, { model: Anime }, { model: Favorites }],
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM Favorites AS favorites
                            WHERE
                                playlist.id = playlist_id
                        )`),

              "favoritesCount",
            ],
          ],
        },
      });
      const playlistsU = playlistData.map((playlist) =>
        playlist.get({ plain: true })
      );

      const playlists = playlistsU.reverse()

      res.render("all-playlists", {
        playlists,
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get playlists by search
router.get("/playlists/search/:search", withAuth, async (req, res) => {
  try {
    const playlistData = await Playlist.findAll({
      where: { title: { [Op.like]: "%" + req.params.search + "%" } },
      include: [{ model: User }, { model: Anime }, { model: Favorites }],
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM Favorites AS favorites
                                WHERE
                                    playlist.id = playlist_id
                            )`),
              "favoritesCount",
            ],
            [
              Sequelize.literal(`(
                                SELECT COUNT(*) FROM Favorites AS checks WHERE playlist.id = playlist_id AND ${req.session.user_id} = user_id
                            )`),
              "hasFavorited",
            ],
          ],
        },
    });
    console.log(playlistData)
    const playlistsU = playlistData.map((playlist) =>
      playlist.get({ plain: true })
    );

    const playlists = playlistsU.reverse()

    const currentUser = {
      user_id: req.session.user_id,
      email: req.session.email,
      avatar: req.session.avatar,
      username: req.session.username
    }

    res.render("playlist-search", {
      currentUser,
      playlists,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single playlist by id
router.get('/playlist/:id', withAuth, async (req, res) => {
    try {
        const playlistData = await Playlist.findByPk(req.params.id, {
            include: [{ model: User }, { model: Anime }, { model: Favorites }, { model: Comment, include: [{ model: User }] }],
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM Favorites AS favorites
                                WHERE
                                    playlist.id = playlist_id
                            )`),
                        'favoritesCount'
                    ],
                    [
                        Sequelize.literal(`(
                                SELECT COUNT(*) FROM Favorites AS checks WHERE playlist.id = playlist_id AND ${req.session.user_id} = user_id
                            )`),
                        'hasFavorited'
                    ]
                ]
            }
        });
        const playlist = playlistData.get({ plain: true });

        const favoritesData = await Favorites.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        const favorites = favoritesData.map((favorite) => favorite.get({ plain: true }));

        const currentUser = {
          user_id: req.session.user_id,
          email: req.session.email,
          avatar: req.session.avatar,
          username: req.session.username
        }

        res.render('single-playlist', {
            currentUser,
            favorites,
            playlist,
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/create-playlists", withAuth, (req, res) => {

  const currentUser = {
    user_id: req.session.user_id,
    email: req.session.email,
    avatar: req.session.avatar,
    username: req.session.username
  }

  res.render("create-playlists", {
    currentUser,
    loggedIn: req.session.loggedIn
  });
});

router.get("/about-us", (req, res) => {

  const currentUser = {
    user_id: req.session.user_id,
    email: req.session.email,
    avatar: req.session.avatar,
    username: req.session.username
  }

  res.render("about-us", {
    currentUser,
    loggedIn: req.session.loggedIn,
  });
});
module.exports = router;
