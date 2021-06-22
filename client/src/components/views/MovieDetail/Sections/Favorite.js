import Axios from 'axios'
import React, { useEffect } from 'react'

function Favorite(props) {
    console.log(props)

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.original_title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    useEffect(() => {
       
        let variables ={
            userFrom,
            movieId
        }

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success){

                }else {
                    alert('숫자 정보를 가져오는데 실패했습니다.')
                }
            })
    }, [])
    return (
        <div>
            <button> Favorite </button>

        </div>
    )
}

export default Favorite
