import { Switch, Route } from "react-router-dom";
import Error400 from "./components/errors/error.400";
import Error404 from "./components/errors/error.404";
import Error500 from "./components/errors/error.500";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import LinkDetail from "./components/links/link-details/LinkDetails";
import LinkEditor from "./components/links/link-editor/LinkEditor";
import LinkList from "./components/links/links-list/LinkLists";

function App() {
  return (
    <div className="row">
    <Switch>
    <Route exact path="/" component={ Home } />
    <Header />   
    </Switch>
    
    <Switch>
      <Route exact path="/links" component={ LinkList } />
      <Route exact path="/404" component={ Error404 } />
      <Route exact path="/400" component={ Error400 } />
      <Route exact path="/500" component={ Error500 } />
      <Route exact path="/:id/edit" component={ LinkEditor } />
      <Route exact path="/:id" component={ LinkDetail } />       
    </Switch>
    
    <Footer />
    
    </div>
  );
}

export default App;
