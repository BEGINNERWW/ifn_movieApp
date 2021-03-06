const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post("/favoriteNumber", (req, res) => {
    

    //mongoDB에서 favorite 숫자 가져오기
    Favorite.find({ "movieId" : req.body.movieId})
        .exec((err, info) =>{
            if(err) return res.status(400).send(err)

          // 프론트에 숫자 정보 리턴하기
            res.status(200).json({ success: true, favoriteNumber: info.length })
        })

});

router.post("/favorited", (req, res) => {
    

    //내가 좋아요 했는지 db에서 확인하기
    Favorite.find({ "movieId" : req.body.movieId, "userFrom" : req.body.userFrom })
        .exec((err, info) =>{
            if(err) return res.status(400).send(err)

          // 프론트에 숫자 정보 리턴하기

            let result = false;
            if(info.length !== 0){
                result = true
            }
            res.status(200).json({ success: true, favorited: result })
        })

});

router.post("/removeFromFavorite", (req, res) => {
    
    Favorite.findOneAndDelete({ movieId : req.body.movieId , userFrom : req.body.userFrom })
        .exec((err, doc) =>{
            if(err) return res.status(400).send(err)
            res.status(200).json({ success : true, doc })
        })

});

router.post("/addToFavorite", (req, res) => {
    

    //무비 정보 db document 만들기
    const favorite = new Favorite(req.body)
    
    favorite.save((err, doc) => {
        if(err) return res.status(400).sendStatus(err)
        return res.status(200).json({ success: true })
    })

});

router.post("/getFavoredMovie", (req, res) => {
    

    Favorite.find({ 'userFrom' : req.body.userFrom})
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true, favorites})
        })

});
/*
router.post("/removeFromFavorite", (req, res) => {
    
    Favorite.findOneAndDelete({ movieId : req.body.movieId , userFrom : req.body.userFrom })
        .exec((err, doc) =>{
            if(err) return res.status(400).send(err)
            res.status(200).json({ success : true})
        })

});
*/
module.exports = router;
