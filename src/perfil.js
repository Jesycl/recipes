import { LitElement, html, css } from 'lit';

class PerfilPage extends LitElement {
  static styles = css`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 1rem;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    input {
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border: none;
      border-radius: 5px;
      background-color: #ee6e73;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background-color: #ee6e73;
    }
    .profile {
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 5px;
      margin-top: 1rem;
    }
    .profile img {
      max-width: 100px;
      border-radius: 50%;
      margin-bottom: 1rem;
    }
      .footer {
      position: absolute;
      bottom: 1rem;
      width: 100%;
      text-align: center;
      font-size: 0.875rem;
      color: #666;
}
      h1 {
      font-family: 'italic'; 
      font-size: 2rem;
      color: white;
      text-align: center;

    }
      h2 {
      font-family: 'italic'; 
      font-size: 3rem;
    }
  `;

  static properties = {
    profile: { type: Object },
    editingProfile: { type: Boolean }
  };

  constructor() {
    super();
    this.profile = JSON.parse(localStorage.getItem('profile')) || {
      name: '',
      email: '',
      photo: ''
    };
    this.editingProfile = false;
  }

  handleInput(e) {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profile = { ...this.profile, [name]: reader.result };
      };
      reader.readAsDataURL(files[0]);
    } else {
      this.profile = { ...this.profile, [name]: value };
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('profile', JSON.stringify(this.profile));
    this.editingProfile = false;
  }

  editProfile() {
    this.editingProfile = true;
  }

  deleteProfile() {
    this.profile = { name: '', email: '', photo: '' };
    localStorage.removeItem('profile');
  }

  render() {
    return html`
      <div class="container">
        <h1>Mi Perfil</h1>
        ${this.editingProfile
          ? 
          html`
              <form @submit="${this.handleSubmit}">
              <input type="file" name="photo" accept="image/*" @input="${this.handleInput}">
                <input type="text" name="name" placeholder="Nombre" .value="${this.profile.name}" @input="${this.handleInput}" required>
                <input type="email" name="email" placeholder="Correo Electrónico" .value="${this.profile.email}" @input="${this.handleInput}" required>
                <button type="submit">Guardar</button>
              </form>
            `
          : html`
              <div class="profile">
                <h2>${this.profile.name}</h2>
                <p>${this.profile.email}</p>
                ${this.profile.photo ? html`<img src="${this.profile.photo}" alt="Foto de perfil">` : ''}
                <button @click="${this.editProfile}">Editar</button>
                <button @click="${this.deleteProfile}">Eliminar</button>
              </div>
            `}
      </div>
      <div class="footer">
          © Jessica Clemente López
        </div>
    `;
  }
}

// Chequeo antes de definir el componente
if (!customElements.get('perfil-page')) {
  customElements.define('perfil-page', PerfilPage);
}




