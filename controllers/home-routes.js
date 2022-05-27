const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({plain: true}));
            res.render('homepage', {posts});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    //masde so if user is logged in already its gunna redirect to the homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});





module.exports = router; 
