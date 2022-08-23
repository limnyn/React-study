//api https://yts.mx/api/v2/movie_details.json?movie_id=43856 //api 사이트
import { useEffect ,useState } from "react";
import {useParams} from "react-router-dom";
import styles from "./Detail.module.css";

function Detail(){
    const {id} = useParams();
    const [movie, setMovie] = useState();
    const [loading, setLoading] = useState(true);
    const getMovie = async () =>{
        const json=await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
            )).json();
        setMovie(json.data.movie);
        setLoading(false);
    }
    useEffect(()=>{
        getMovie();
    }, []);    
    return (loading ? (<div className={styles.loader}><span>Loading...</span></div>) : (<div>
        <h1>
            <img src={movie.medium_cover_image} alt=""></img><br></br>
            {movie.title_long}
        </h1>
        <hr></hr>
        <h4>
            Language : {movie.language} &nbsp; &nbsp; &nbsp; &nbsp;
            Rating : {movie.rating} &nbsp; &nbsp; &nbsp; &nbsp;
            Download_count : {movie.download_count} &nbsp; &nbsp; &nbsp; &nbsp;
            Like_count : {movie.like_count} &nbsp; &nbsp; &nbsp; &nbsp;
        </h4>
        <hr></hr>
        <h4>
            Download(1080p) : <a href={movie.torrents[1].url}>Torrent file</a> : {movie.torrents[1].size}<br></br>
            Download(720p) : <a href={movie.torrents[0].url}>Torrent file</a> : {movie.torrents[0].size}<br></br>
        </h4>
        <h6>data uploaded at : {movie.date_uploaded}</h6>
        <hr></hr>
        <h3> genres : {
            movie.genres.map(g=> (
                <li key={g}>{g}</li>
                ))}
        </h3>
        <hr>
        </hr>
        <h2>
            Description<br></br>
        </h2>
        <h3>
            <p className={styles.hi02}>{movie.description_full}</p>
        </h3>
    
    </div>))
}
export default Detail;



