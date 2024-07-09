import { LitElement, html, css } from 'lit';
import './home.js';
import './perfil.js';
import './wall.js';

class MyApp extends LitElement {

  connectedCallback() {
    window.addEventListener('hashchange', this.route.bind(this));
    this.route(); // para manejar la carga inicial

    // Agregar eventos de clic para cerrar el sidenav
    window.addEventListener('load', () => {
      this.addCloseEvent('#home-link');
      this.addCloseEvent('#wall-link');
      this.addCloseEvent('#perfil-link');
    });

  }

  addCloseEvent(selector) {
    const link = document.querySelector(selector);
    if (link) {
      link.addEventListener('click', () => {
        const sidenav = document.querySelector('.sidenav');
        const instance = M.Sidenav.getInstance(sidenav);
        if (instance) {
          instance.close();
        }
      });
    } else {
      console.error(`No se encontró el elemento con el selector: ${selector}`);
    }
  }


  route() {
    const path = window.location.hash.replace('#', '');
    this.innerHTML = ''; // limpia el contenido anterior


    let page;
    switch (path) {
      case 'perfil':
        page = document.createElement('perfil-page');
        

        break;
      case 'wall':
        page = document.createElement('wall-page');
        
        break;
      default:
        page = document.createElement('home-page');
        

    }
    this.appendChild(page);
  }

}

if (!customElements.get('my-app')) {
  customElements.define('my-app', MyApp);
}
