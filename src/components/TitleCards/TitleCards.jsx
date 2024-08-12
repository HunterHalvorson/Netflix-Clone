import React, { useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useRef } from 'react'
import { Link } from 'react-router-dom'


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U0MTNkYjJmOGNmYTZlZmQwNjM4NTdiZDljYjlmMSIsIm5iZiI6MTcyMzQyMTAwMS42NjU1OTQsInN1YiI6IjY2Yjk1MDZhZmZlMGM2N2IxNDlmMGUyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITtpVJuG9044AaZW-KSGvU9s66pyNsciqrb4zu-tOEc'
    }
  };
  


  const handleWheel = (event) => {
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className = 'title-cards' ref = {cardsRef}>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className = 'card-list'>
        {apiData.map((card, index) => {
          return <Link to = {`/player/${card.id}`} className="card" key = {index}>
            <img src={`https://image.tmdb.org/t/p/w500` +card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards