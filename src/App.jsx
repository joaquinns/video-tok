import './App.css'
import Navbar from './components/Navbar'
import SideNavbar from './components/SideNavbar'
import MainContentContainer from './components/MainContent'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Profile from './pages/Profile'
import { Route, Switch } from 'wouter'
import { AuthContextProvider } from './context/AuthContext'
import NotFound from './pages/404'

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
            <Switch>
              <Route path='/'>
                <Home />
              </Route>

              <Route path='/profile/:userId'>
                {(params) => <Profile userId={params.userId} />}
              </Route>

              <Route path='/upload'>
                <Upload />
              </Route>

              <Route path='/:rest*'>
                <NotFound />
              </Route>
            </Switch>
          </MainContentContainer>
        </main>
      </div>
    </AuthContextProvider>
  )
}

export default App
