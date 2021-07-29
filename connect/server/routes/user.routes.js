let mongoose = require('mongoose')
let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken')
let posts = require('../models/post-schema')
let user = require('../models/user-schema')
let comment = require('../models/comments_schema')
let event  = require('../models/events_schema')
const {verifyAccessToken,verifyAccessTokenWithRestriction} = require('../helpers/jwt_helper');

router.route('/createpost').post((req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const info = jwt.decode(token, process.env.JWT_SECRET)

    const reqtitle = req.body.title;
    const reqcategories = req.body.categories;
    const reqcontent = req.body.content;
    const Id = info.uid;
    const name = info.uname;
    const reqtime = Date.now();



    posts.create({
        title: reqtitle,
        categories: reqcategories,
        content: reqcontent,
        time: reqtime,
        authorName: name,
        authorId: Id
    }, (err, data) => {
        if (err) {
            return next(err)
        }
        else {
            res.json(data)
        }
    })
});


router.route('/posts/:id').get((req, res) => {
    posts.find({
        authorId: req.params.id
    }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log('postsbyid')
            res.json(data)
        }
    }).sort({time:-1})
})

router.route('/createevent').post((req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    const info = jwt.decode(token, process.env.JWT_SECRET)

    const reqtitle = req.body.title;
    const reqcontent = req.body.content;
    const Id = info.uid;
    const name = info.uname;
    const reqtime = Date.now();

    event.create({
        title: reqtitle,
        content: reqcontent,
        time: reqtime,
        authorName: name,
    }, (err, data) => {
        if (err) {
            return next(err)
        }
        else {
            res.json(data)
        }
    })

})

router.route('/createcomment').post((req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const info = jwt.decode(token, process.env.JWT_SECRET)

    const content = req.body.content;
    const postId = req.body.postId
    const authorId = info.uid 
    const authorName = info.uname

    comment.create({
        postId: postId,
        content: content,
        authorName: authorName,
        authorId: authorId,
        time: Date.now()
    }, (err, data) => {
        if (err) {
            return next(err)
        }
        else {
            res.json(data)
        }
    })
})


router.route('/post').get((req, res, next) => {
    posts.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    }).sort({time:-1})
})

router.route('/event').get((req, res, next) => {
    event.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    }).sort({time:-1})
})

router.route('/comments/:id').get((req, res) => {
    comment.find({
        postId: req.params.id
    }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    }).sort({time:-1})
})

router.route('/users').get((req, res) => {
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
})


module.exports = router;