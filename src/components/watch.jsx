import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player/lazy'
import { useParams } from "react-router-dom";
import axios from "axios";

// Lazy load the YouTube player
const baseURL = "https://live-tv-api.herokuapp.com/channelapi/getOne/"

function Watch() {
     const { id } = useParams();
    const [video, setVideo] = useState();
    const [videoUrl, setVideoUrl] = useState('');
    const [play, setPlay] = useState(false)
    const [volume, setVolume] = useState(0.1)
    const playMe =()=>{
        let temp = play;
        setPlay(!play)
    }
    const full= ()=>{
        let elem = document.getElementById("myvideo");
  elem.requestFullscreen();

}
    useEffect(() => {
        axios.get(baseURL+id).then((response) => {
          setVideo(response.data);
          setVideoUrl(response.data.low);

        });
      }, []);
      const qualityControl =(x)=>{
            switch (x) {
                case '1':
                    setVideoUrl(video.low);
                    break;
                case '2':
                    setVideoUrl(video.mid);
                    break;
                case '3':
                    setVideoUrl(video.high);
                    break;
            
                default:
                    setVideoUrl('');
                    break;
            }
      }
  return (
    <div className='col-12 col-md-8 col-lg-6 mx-auto px-2 d-flex flex-column'>
        <div className=''>
            <ReactPlayer className="" width='100%' id="myvideo" url={videoUrl} volume={volume} playing={play}/>
        </div>
        <div className='d-flex justify-content-center'>
            <button onClick={playMe}>{play?(<i className="bi bi-pause border"></i>):(<i className="bi bi-play-fill border"></i>)}</button>
            <button onClick={full} ><i class="bi bi-arrows-fullscreen"></i></button>
            <div className='col-8'>
                <input type="range" onChange={e=>setVolume(e.target.value)} className="form-range col-8" min="0" max="1" step="0.1" id="customRange3"></input>
            </div>

            <select name="" id="quality" onChange={e=>qualityControl(e.target.value)}>
                <option value="1">Low</option>
                <option value="2">Mid</option>
                <option value="3">High</option>
            </select>
        </div>
        
    </div>
  )
}

export default Watch