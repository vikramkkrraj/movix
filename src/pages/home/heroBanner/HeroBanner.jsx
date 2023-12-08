import React, { useEffect, useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {useFetch} from '../../../hooks/useFetch';
import { Img } from '../../../components/lazyLoadingImg/Img';
import { ContentWrapper } from '../../../components/contentWrapper/ContentWrapper';

export const HeroBanner = () => {

  // state for background img
  const [background, setBackground] = useState('');

  // state for searching input
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const { url } = useSelector(state=>state.home);

  const { data , loading } = useFetch("/movie/upcoming");


  const searchQueryHandler = (event)=>{
      if(event.key==="Enter" && query.length > 0){
        navigate(`/search/${query}`)
      }
  }

  useEffect(()=>{
      const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)].backdrop_path;
      setBackground(bg);
  },[data])


  return (
    <div className="heroBanner">

      {
        !loading && <div className="backdrop-img">
        <Img src={background} />
      </div>
      }

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people 
            to discover.
            Explore now.
          </span>
          <div className="searchInput">
            <input 
                type="text" 
                placeholder='search for a movie or tv show...'
                onKeyUp={searchQueryHandler}
                onChange={(e)=>setQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>

    </div>
  )
}
