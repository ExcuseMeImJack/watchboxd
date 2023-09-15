import Footer from '../Navigation/Footer'
import { useHistory } from "react-router-dom"
import './HomePage.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllFilms } from '../../store/films';

const HomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [homeImg, setHomeImg] = useState('https://i.imgur.com/asAfCfy.jpg')

    // const filmsReq = useSelector(state => state.films.films)

    // useEffect(() => {
    //     dispatch(thunkGetAllFilms())
    // }, [dispatch])

    const imgArr = [
        'https://i.imgur.com/CjwCKIj.jpg',
        'https://i.imgur.com/XlP4Y8z.jpg',
        'https://i.imgur.com/5Xqh4sa.jpg',
        'https://i.imgur.com/60IYXUp.jpg',
        'https://i.imgur.com/Fu2UTqs.jpg',
        'https://i.imgur.com/3VhhB0h.jpg',
        'https://i.imgur.com/dKE9BST.jpg',
        'https://i.imgur.com/zVfQDyS.jpg',
        'https://i.imgur.com/3oqYx0D.jpg',
        'https://i.imgur.com/NVH2JYU.jpg',
        'https://i.imgur.com/b6dX15A.jpg',
        'https://i.imgur.com/lk7wjWu.jpg',
        'https://i.imgur.com/d9GmP1d.jpg',
        'https://i.imgur.com/asAfCfy.jpg',
        'https://i.imgur.com/C4c6Jhj.jpg'
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setHomeImg(randomImage())
          }, 15000);
          return () => clearInterval(interval);
    },[])

    const randomImage = () => {
        const randomNum = Math.floor(Math.random() * imgArr.length);
        const img = imgArr[randomNum]
        return img
    }

    // if(!filmsReq) return null
    // const films = Object.values(filmsReq).map(film => film.background_img_url)
    // imgArr.push(...films)

    return (
        <>
            <div className="home-page-container">
                <div className="home-page container-fluid">
                    <div className="home-img-container">
                        <img src={homeImg} id='home-img-preview'/>
                    </div>
                    <div className='home-text'>
                        <h1>Track films you've watched.</h1>
                        <h1>Save those you want to see.</h1>
                        <h1>The social network for film lovers.</h1>
                        <button className='home-button-signup change-cursor' onClick={() => history.push('/films')}>VIEW FILMS NOW</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default HomePage
