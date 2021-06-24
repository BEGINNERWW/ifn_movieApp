import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

function Favorite(props) {
    console.log(props)

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.original_title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables ={
        userFrom : userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    useEffect(() => {
           

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                setFavoriteNumber(response.data.favoriteNumber)

                if(response.data.success){
                }else {
                    alert('숫자 정보를 가져오는데 실패했습니다.')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
            setFavorited(response.data.favorited)

            if(response.data.success){
            }else {
                alert('정보를 가져오는데 실패했습니다.')
            }
        })

    }, [])

    const onClickFavorite = ()=>{
        
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    console.log("클릭 삭제")
                    console.log(response.data)
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber - 1 )
                        setFavorited(!Favorited)
                    }else{
                        alert('Favorite Cancle에 실패했습니다.')
                    }
                })
            
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    console.log("클릭 add")
                    console.log(response.data)
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber + 1 )
                        setFavorited(!Favorited)
                    }else{
                        alert('Favorite Add에 실패했습니다.')
                    }
                })
        }
    }

     return (
        <div>
            <Button onClick={ onClickFavorite }> { Favorited ? "Not Favorite" : "Add to Favorite" } {FavoriteNumber}  </Button>

        </div>
    )
}

export default Favorite
