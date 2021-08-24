import { Switch, Route } from "react-router-dom";

import LinkList from './components/links/links-list/LinkLists';

function App() {
  return (
    <div className="row">

    <Switch>
      <Route exact path='/' component={LinkList} />
      
    </Switch>

    </div>
  )
}

export default App;
