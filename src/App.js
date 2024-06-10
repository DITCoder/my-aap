import logo from './logo.svg'; 
import './App.css'; 
import ListSchedules from './ListSchedules/listschedules'
import Form from './FormComponent/FormComponent'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
const router =  createBrowserRouter([{
  path:'/',
  element :<ListSchedules/>,
  errorElement :<div>404 Not Found</div>
},
{
  path:'/addschedule/:scheduleId',
  element : <Form/>
},
{
  path:'/addschedule',
  element : <Form/>
}
]);

function App() {
  return (
    
    <div className="App">  
      <RouterProvider router={router}/>
      {/* <ListSchedules/> */}
    </div>
  );
}

export default App;
