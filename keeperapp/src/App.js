
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

import AddKeeper from './components/addkeeper';
import Header from './components/header';
import ShowKeeper from './components/showkeeper';

function App() {
  const [keeperList, setKeeperList] =  useState([])
  useEffect(()=>{
    axios.get("http://localhost:9000/api/getAll").then((res)=>{setKeeperList(res.data)}).catch((e)=>{console.log(e)})
  })
  return (
    <div className="App">
      <Header></Header>
      <AddKeeper keeperList={keeperList} setKeeperList={setKeeperList}></AddKeeper>
      <ShowKeeper keeperList={keeperList} setKeeperList={setKeeperList}></ShowKeeper>
    </div>
  );
}

export default App;
