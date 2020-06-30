import '../styles/style.scss';
import { routes } from './routes';

function initNavigation() {
    let route = null;
    if(location.pathname === '/') route = routes.index
    for(let item in routes){
        if(location.pathname.includes(item)) {
            route = item;
        }
    }
    document.getElementById(route).classList.add('active')
}

initNavigation()