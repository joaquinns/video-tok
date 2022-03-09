import './App.css'
import Navbar from './components/Navbar'
import SideNavbar from './components/SideNavbar'
import MainContentContainer from './components/MainContent'
import Home from './pages/Home'
import Upload from './pages/Upload'
import { Route } from 'wouter'
import { AuthContextProvider } from './context/AuthContext'

function App() {
  return (
    <AuthContextProvider>
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

            <Route path='/upload'>
              <Upload />
            </Route>
          </MainContentContainer>
        </main>
      </div>
    </AuthContextProvider>
  )
}

export default App
