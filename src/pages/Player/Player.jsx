import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();

  const [apiData, setApiData] = useState({name: '', key: '', published_at:'', typeof: ''});
  const navigate = useNavigate();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U0MTNkYjJmOGNmYTZlZmQwNjM4NTdiZDljYjlmMSIsIm5iZiI6MTcyMzQyMTAwMS42NjU1OTQsInN1YiI6IjY2Yjk1MDZhZmZlMGM2N2IxNDlmMGUyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITtpVJuG9044AaZW-KSGvU9s66pyNsciqrb4zu-tOEc'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  }, []);
  


  return (
    <div className = 'player'>
      <img src={back_arrow_icon} alt="" onClick = {() => {navigate(-2)}}/>
      <iframe width='90%' height = '90%' src = {`https://www.youtube.com/embed/${apiData.key}`} title = 'trailer' frameBorder = '0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player