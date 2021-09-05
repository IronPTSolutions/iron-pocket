import { Switch, Route } from "react-router-dom";

import LinkList from './components/links/links-list/LinkLists';
import LinkDetail from './components/links/link-details/LinkDetails';

function App() {
  return (
    <div className="container my-5">

    <Switch>
      <Route exact path='/' component={LinkList} />
      <Route exact path='/links/:id' component={LinkDetail} />
    </Switch>

    </div>
  )
}

export default App;
