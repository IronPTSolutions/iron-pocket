import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import LinksList from './components/links/links-list/LinkLists';
import LinkDetails from './components/links/link-details/LinkDetails';

function App() {
  return (
    <Router>
      <Header />
      <div className="container py-5">
        <Switch>
          <Route exact path="/" component={LinksList} />
          <Route exact path="/links/:id" component={LinkDetails} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
