import { LitElement, html, css } from 'lit';

class WallPage extends LitElement {
  static styles = css`

  .container {
     text-align: center;
      margin-top: 2rem;
      padding: 0 1rem;
      font-family:Verdana;
      
    }
    .post {
      border: 1px solid #ccc;
      padding: 1rem;
      margin: 0.5rem 0;
      border-radius: 5px;
    }
    .post-header {
      display: flex;
      justify-content: space-between;
    }
    .post-content {
      margin-top: 0.5rem;
    }
    .post-buttons button {
      margin-right: 0.5rem;
    
    }

  input, textarea {
      width: 100%;
      max-width: 500px;
      padding: 0.1rem;
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
  `;

  static properties = {
    posts: { type: Array },
    editingPost: { type: Object }
  };

  constructor() {
    super();
    this.posts = JSON.parse(localStorage.getItem('posts')) || [];
    this.editingPost = null;
  }

  addPost(e) {
    e.preventDefault();
    const form = e.target;
    const newPost = {
      id: Date.now(),
      name: form.name.value,
      description: form.description.value,
      
    };
    this.posts = [...this.posts, newPost];
    this.updateLocalStorage();
    form.reset();
  }

  deletePost(id) {
    this.posts = this.posts.filter(post => post.id !== id);
    this.updateLocalStorage();
  }

  editPost(post) {
    this.editingPost = post;
    this.requestUpdate();
  }

  savePost(e) {
    e.preventDefault();
    const form = e.target;
    const updatedPost = {
      ...this.editingPost,
      name: form.name.value,
      description: form.description.value,
    };

    this.posts = this.posts.map(post => post.id === updatedPost.id ? updatedPost : post);
    this.updateLocalStorage();
    this.editingPost = null;
  }

  updateLocalStorage() {
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }

  render() {
    return html`
      <div class="container">
        <h1>Mis recetas</h1> 
        <form @submit="${this.editingPost ? this.savePost : this.addPost}">
          <input name="name" type="text" placeholder="Nombre de la receta" .value="${this.editingPost ? this.editingPost.name : ''}" required>
          <textarea name="description" placeholder="Ingredientes" required .value="${this.editingPost ? this.editingPost.description : ''}"></textarea>
          <button type="submit">${this.editingPost ? 'Guardar' : 'Postear'}</button>
        </form>
        <div class="post-list">
          ${this.posts.map(post => html`
            <div class="post">
              <h2>${post.name}</h2>
              <p><strong>Descripción:</strong> ${post.description}</p>
              <div class="recipe-buttons">
                <button class="edit-button" @click="${() => this.editPost(post)}">Editar</button>
                <button @click="${() => this.deletePost(post.id)}">Borrar</button>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

// Chequeo antes de definir el componente
if (!customElements.get('wall-page')) {
  customElements.define('wall-page', WallPage);
}