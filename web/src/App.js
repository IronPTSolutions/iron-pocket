import { Switch, Route } from 'react-router-dom';
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import LinkDetail from './components/links/link-details/LinkDetails';
import LinkList from "./components/links/links-list/LinkLists";

function App() {
  return (
    <>
    <Header/>
    <div className="container">
      <Switch>
        <Route exact path="/" component={LinkList} />
        <Route exact path="/links/:id" component={LinkDetail} />
        
        
      </Switch>
    </div>
    <Footer/>
    </>
  );
}

export default App;
