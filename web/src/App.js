import { Route, Switch } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import LinksList from "./components/links/links-list/LinksList";

function App() {
  return (
    <>
        <Header />
      <div className="container py-5">
        <Switch>
          <Route exact path='/links' component={LinksList} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
