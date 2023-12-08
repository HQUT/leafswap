import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchPresenter } from './Presenter/searchPresenter';
import { DetailsPresenter } from './Presenter/detailsPresenter';
import { HomePresenter } from './Presenter/homePresenter';
import { About } from './views/About';
import SidebarComp  from './js/Sidebar';
import { LoginPresenter } from './Presenter/loginPresenter';
 
function App(props) {
  return (
    <BrowserRouter>
      <div className="container-fluid" >
        <div className="row">
          <div className="col-md-3">
            <SidebarComp /> 
          </div>
          <div className="col-md-9">
            <Routes>
            <Route path = "/login" element={<LoginPresenter />} />
              <Route path = "/home" element={<HomePresenter />} />
              <Route path="/about" element={<About model={props.model} />} />
              <Route path="/search" element={<SearchPresenter model={props.model} />} />
              <Route path="/details/:id" element={<DetailsPresenter model={props.model} />} />
              <Route index path='*' element={<HomePresenter model={props.model} />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;