//import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import SignUp from './SignUp';
import LogIn from './LogIn';
import Profile from './Profile';

  /*eslint-disable*/

function App() {

  //const [array, setArray] = useState([]); HashRouter

  return (
    <>
      <header>
        <div className='this__header'>
          <div className='left_buttons'>
          </div>
          <div className='right_buttons'>
            <Link className='button_sign_up font' to="/sign-up">Sign up</Link>
            <Link className='button_sign_up font' to="/log-in">Log in</Link>
          </div>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </main>

    </>
  )
}

export default App
