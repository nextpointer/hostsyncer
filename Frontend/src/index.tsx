/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App'
import { Route, Router } from '@solidjs/router'
import { Hostnames } from './pages/Hostnames/Hostnames'
import { Settings } from './pages/Settings'
import { Analytics } from './pages/Analytics'
import { Error } from './pages/Error'

const root = document.getElementById('root')

render(() => (<Router root={App}>
    <Route path={'/'} component={Hostnames}/>
    <Route path={'/setting'} component={Settings}/>
    <Route path={'/analytics'} component={Analytics}/>
    <Route path="*paramName" component={Error} />
</Router>), root!)
