import { Link } from 'react-router-dom'

function Home() {

    document.title = 'Iron Pocket: Save it for later';

    return(
        <div className="Home">
            <img src="./img/iron-pocket.png" alt="Iron Pocket"/>
            <h1>Welcome to iron Pocket</h1>
            <hr/>
            <h2>Save it for later!</h2>
            <Link exact to="/links">Start now</Link>
        </div>
    )
}

export default Home