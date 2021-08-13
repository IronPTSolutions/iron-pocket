import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Header from  './components/header/Header';
import Footer from './components/footer/Footer';
import LinkLists from './components/links/links-list/LinkLists';
import LinkDetails from './components/links/link-details/LinkDetails';
import Linknotfound from './components/links/link-404/Linknotfound';

function App() {
  return (
    <div>
    <Header/>
      <Switch>
        <Route exact path='/links' component={LinkLists}/>
        <Route exact path='/links/:id' component={LinkDetails} />
        <Route exact path='/404' component={Linknotfound} />
      </Switch>
    <Footer/>   
    </div>
    
  );
}

export default App;
