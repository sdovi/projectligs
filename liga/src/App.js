import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footbalnews from './Pages/Footbalnews';
import Basketnews from './Pages/Basketnews';
import Hokeynews from './Pages/Hokeynews';
import Schedule from './Pages/Schedule';
import MatchDetails from './Pages/MatchDetails ';
import Tablelig from './Pages/Tablelig';
import Ligainfo from './Pages/Ligainfo';
import NewscommonDetail from './Pages/NewscommonDetail';
import DetailNews_basket from './Pages/DetailNews_basket';
import DetailHokey_page from './Pages/DetailHokey_page';
import ManualPage_Footbal from './Pages/ManualPage_Footbal';
import ManualPage_basket from './Pages/ManualPage_basket';
import ManualPage_hokey from './Pages/ManualPage_hokey';
import SubscriptionsPage from './Pages/SubscriptionsPage';
import Subsdetailpage from './Pages/Subsdetailpage';
import Regist from './Pages/Regist';
import Log from './Pages/log';
import TEST from './Pages/TEST';
import Raspisanie_Basket from './Pages/Raspisanie_Basket';
import MatchDetails_basket from './Pages/MatchDetails_basket';
import Raspisanie_Hokey from './Pages/Raspisanie_Hokey';
import Table_baskets from './Pages/Table_baskets';
import Tables_hokey from './Pages/Tables_hokey';
import Profile from './Pages/Profile';
import ChangePassword from './Pages/Changepassword';
import Ligs_inf_BAsket from './Pages/Ligs_inf_BAsket';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Footbalnews />} />
          <Route path='/reg' element={<Regist/>} />
          <Route path='/test' element={<TEST/>} />
          <Route path='/login' element={<Log />} />
          <Route path='/change-password' element={<ChangePassword/>} />
          <Route path='/Basket' element={<Basketnews />} />
          <Route path='/subs' element={<SubscriptionsPage/>} />
          <Route path='/hokey' element={<Hokeynews />} />
          <Route path='/ligaforms' element={<Schedule />} />
          <Route path='/table' element={<Tablelig/>} />
          <Route path='/raspis/basket' element={<Raspisanie_Basket/>} />
          <Route path='/raspis/hokey' element={<Raspisanie_Hokey/>} />
          <Route path='/table/basket' element={<Table_baskets/>} />
          <Route path='/table/hokey' element={<Tables_hokey/>} />
          <Route path='/profile' element={<Profile/>} />




          <Route path='/subs/:id' element={<SubscriptionsPage/>} />
          <Route path="/games/:id" element={<MatchDetails/>} />
          <Route path="/games/basket/:id" element={<MatchDetails_basket/>} />
          <Route path="/games/hokey/:id" element={<MatchDetails_basket/>} />
          <Route path="/table/:id" element={<Ligainfo/>} />
          <Route path="/table/bakset/:id" element={<Ligs_inf_BAsket/>} />
          <Route path="/table/hokey/:id" element={<Ligainfo/>} />
          <Route path="/news/detail/:id" element={<NewscommonDetail/>} />
          <Route path="/news/detail/subs/:id" element={<Subsdetailpage/>} />
          <Route path="/news/detail/basket/:id" element={<DetailNews_basket/>} />
          <Route path="/news/detail/hokey/:id" element={<DetailHokey_page/>} />
          <Route path="/news/manual/footbal/:id" element={<ManualPage_Footbal/>} />
          <Route path="/news/manual/basket/:id" element={<ManualPage_basket/>} />
          <Route path="/news/manual/hokey/:id" element={<ManualPage_hokey/>} />
        </Routes>
    </div>
  );
}

export default App;
