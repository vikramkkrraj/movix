import React, { useRef, useState } from 'react';
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs'; // to formate the data

import { ContentWrapper } from '../contentWrapper/ContentWrapper';
import { Img } from '../lazyLoadingImg/Img';
import PosterFallback from '../../assets/no-poster.png';
import { CircleRating } from '../circleRating/CircleRating'

import './style.scss';
import { Genres } from '../genres/Genres';

export const Carousel = ({ data , loading, endpoint, title}) => {

    const carouselContainer = useRef();
    const { url } = useSelector(state=>state.home);
    const navigate = useNavigate();

    const navigation = (dir) =>{
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)  // 20 is for extra space like padding
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    }

    const skItem = ()=>{
        <div className='skeletonItem'>
            <div className="posterBlock skeleton">
                <div className="title skeleton"></div>
                <div className="data skeleton"></div>
            </div>
        </div>
    }
    // console.log(data);

  return (
    <div className='carousel'>
        <ContentWrapper>
            {
                title && <div className="carouselTitle">
                    {title}
                </div>
            }
            <BsFillArrowLeftCircleFill 
                className='carouselLeftNav arrow'
                onClick={()=>navigation('left')} />
            <BsFillArrowRightCircleFill 
                className='carouselRighttNav arrow'
                onClick={()=>navigation('right')} />

                {
                   !loading ? 
                        <div className="carouselItems" ref={carouselContainer}>
                            {
                                data?.map((item)=>{
                                    const posterUrl = item.poster_path ?
                                     url.poster + item.poster_path : PosterFallback
                                    return(
                                        <div className="carouselItem"
                                        key={item.id} 
                                        onClick={()=>navigate(`/${item.media_type || endpoint }/${item.id}`)}
                                        >
                                            <div className="posterBlock">
                                                <Img src={posterUrl} />
                                                <CircleRating 
                                                rating={item.vote_average.toFixed(1)} />
                                                <Genres data={item.genre_ids.slice(0,2)} />
                                            </div>
                                            <div className="textBlock">
                                                <span className="title">
                                                    {/* title to movie and name for tv shows */}
                                                    {item.title || item.name}
                                                </span>
                                                <span className="data">
                                                {dayjs(item.release_date || item.first_air_date).format(
                                                "MMM D, YYYY"
                                                )}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                   : 
                //    <span>laoding...</span>
                <div className="loadingSkeleton">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                </div>
                };
        </ContentWrapper>
    </div>
  )
}
