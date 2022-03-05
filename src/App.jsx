import './App.css'
import Navbar from './components/Navbar'
import SideNavbar from './components/SideNavbar'
import MainContentContainer from './components/MainContent'
import Home from './pages/Home'
import { Route } from 'wouter'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Navbar />
      </header>

      <main>
        <SideNavbar />
        <MainContentContainer>
          <Route path='/'>
            <Home />
          </Route>

          <Route path='/login'>
            <h1>Login :D</h1>
          </Route>
        </MainContentContainer>
      </main>
    </div>
  )
}

export default App
