import './App.css';
import { BrowserRouter , Route, Routes} from 'react-router-dom';

import { SearchPresenter } from './Presenter/searchPresenter';
import { DetailsPresenter } from './Presenter/detailsPresenter';
import { HomePresenter } from './Presenter/homePresenter';
import { About } from './views/About';
 import Model from './js/Model';
const model = new Model(); 
function App(props) {
 return (
    <BrowserRouter> 
  
         <Routes>
					

          <Route path="/about" element={<About model={props.model} />}/>
          <Route path="/search" element={<SearchPresenter model={props.model} />}/>
          <Route path="/details" element={<DetailsPresenter model={props.model} />}/>
          <Route index path='*' element={<SearchPresenter model={props.model} />} />
      
        </Routes>
     
    </BrowserRouter>

  );
}

export default App;