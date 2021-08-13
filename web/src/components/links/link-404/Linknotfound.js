import { Link } from 'react-router-dom';
import notImg from '../../../assets/404.png';



function Linknotfound() {
    
     return(
         <div className="d-flex container p-5">
                <div className="block">
                    <img src={notImg} style={{maxWidth: "330px"}} className="img" alt="cry"/>
                </div>
                    <div className="p-5 flex-grow-1 bd-highlight">
                        <h1>Awwww...Don't Cry</h1>
                        <h2>It's just a 404 Error!</h2>
                        <span class="p-3 mt-3 badge rounded-pill bg-dark">GO BACK TO LINKS</span>
                    </div>
                <Link to={`/links`} className="stretched-link"/>
        </div>
     )
}



export default Linknotfound;