import { LitElement, html, css } from 'lit';

class HomePage extends LitElement {
  static styles = css`
  :host {
  display: block;
}

    }
    nav {
      background: #fff;
    }
    .nav-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sidenav {
      width: 250px;
    }
     @media (max-width: 768px) {
  .img-container img {
    max-width: 100%;
      }
      
     .img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-container img {
  max-width: 100%; /* Ensure image scales within its container */
  height: auto; /* Maintain aspect ratio */
  border-radius: 10px;
}
  `;
  render() {
return html`
      <div class="img-container">
<img class="img-container" src="/img/img_home.png" alt="Recetas">

`; 

  }
}

if (!customElements.get('home-page')) 
  customElements.define('home-page', HomePage);