import Footer from '../Navigation/Footer'
import { useHistory } from "react-router-dom"
import './HomePage.css'
import { useEffect, useState } from 'react';

const HomePage = () => {
    const history = useHistory();
    const [homeImg, setHomeImg] = useState('https://a.ltrbxd.com/resized/sm/upload/wi/k1/cs/mn/suzume-1200-1200-675-675-crop-000000.jpg')

    const imgArr = [
        'https://a.ltrbxd.com/resized/sm/upload/wi/k1/cs/mn/suzume-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/14/gp/oz/mm/6FF977AE-BA7A-4181-9812-73A9A676A652-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/7y/qr/v0/pu/eight-crazy-nights-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/n5/my/ok/gp/casablanca-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/ea/24/ql/ts/ghostbusters-20-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/46/5q/lm/q4/secret-life-walter-mitty-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/3t/re/cl/n0/mamma-mia-here-we-go-again-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/14/lz/74/qx/murder-on-orient-express-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/r4/0u/oq/0i/interstellar-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/hr/q4/5n/t1/jurassic-world-fallen-kingdom-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/6o/n7/l3/an/in%20the%20hieghts-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/t5/xc/w8/fo/aladdin-2019-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/hq/ob/tz/ns/uRHdkM871YJQDl3ux3ulCQw7BfV-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/1y/zu/aq/50/if-i-stay-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/vq/cs/2w/iu/october-sky-10-1200-1200-675-675-crop-000000.jpg',
        'https://a.ltrbxd.com/resized/sm/upload/ut/1u/0e/hi/whisper-of-heart-1200-1200-675-675-crop-000000.jpg'
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

    return (
        <>
            <div className="home-page-container">
                <div className="home-page">
                    <div className="home-img-container">
                        <img src={homeImg} id="home-img" />
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
