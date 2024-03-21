import './home.css'
import home_video from '../../images/mainVideo.mp4'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
const Home = () => {
    
  return (
    <div className='home'>
      <div className="video-box">
      <video className='videoTag' playsInline autoPlay loop muted>
    <source src={home_video}type='video/mp4' className='video'/>
</video>
</div>
<div className="head-text">
<img src={logo} alt="" style={{position:'absolute',top:'20px',width:'200px'}}/>
</div>
<Link to="/home" style={{textDecoration:'none',color:'white'}}>SHOP NOW</Link>
    </div>
  )
}

export default Home