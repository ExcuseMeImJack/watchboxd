import Footer from '../Navigation/Footer'
import { useHistory } from "react-router-dom"
import './HomePage.css'

const HomePage = () => {
    const history = useHistory();
    const homeImg = 'https://a.ltrbxd.com/resized/sm/upload/wi/k1/cs/mn/suzume-1200-1200-675-675-crop-000000.jpg'

    return (
        <>
            <div className="home-page-container">
                <div className="home-page">
                    <div className="home-img-container faded faded-all">
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
