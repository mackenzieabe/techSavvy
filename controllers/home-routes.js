const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment } = require('../models'); 

router.get('/', (req, res) => {
    console.log ('===============');
    Post.findAll({
        attributes: [
            'id',
            'post_text', 
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }, 
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get ({ plain: true}));

        res.render('all-posts', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return
    }
    res.render('login')
})

router.get('/post/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User]
            }
        ]
    }).then(dbData => {
        let post = dbData.get({plain: true})
        console.log(post)
        res.render("single-post", {post})
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router;