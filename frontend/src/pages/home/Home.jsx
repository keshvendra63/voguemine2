import './home.css'
import home_video from '../../images/home-video.mp4'
import { Link } from 'react-router-dom'
const Home = () => {
    
  return (
    <div className='home'>
      <div className="video-box">
      <video className='videoTag' autoPlay loop muted>
    <source src={home_video} type='video/mp4' className='video'/>
</video>
</div>
<div className="head-text">
<h1 style={{color:'white',fontSize:'25px',letterSpacing:'10px'}}>VOGUEMINE</h1>
<p style={{color:'white',marginTop:'-10px',fontSize:'13px',wordSpacing:'12px',width:'100%',textAlign:'center',marginLeft:'-10px'}}>THE MARQUE AT YOUR PRICE</p>
</div>
<Link to="/home" style={{textDecoration:'none',color:'white'}}>SHOP NOW</Link>
    </div>
  )
}

export default Home