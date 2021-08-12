import { Switch, Route } from "react-router-dom";
import Error404 from "./components/errors/error.404";
import Header from "./components/header/Header";
import LinkCreator from "./components/links/link-creator/LinkCreator";
import LinkDetail from "./components/links/link-details/LinkDetails";
import LinkEditor from "./components/links/link-editor/LinkEditor";
import LinkList from "./components/links/links-list/LinkLists";

function App() {
  return (
    <div className="row">
    <LinkCreator /> 
    <Header />
   
    <Switch>
      <Route exact path="/" component={ LinkList } />
      <Route exact path="/404" component={ Error404 } />
      <Route exact path="/:id/edit" component={ LinkEditor } />
      <Route exact path="/:id" component={ LinkDetail } />
      
      
    </Switch>
    
    </div>
  );
}

export default App;
