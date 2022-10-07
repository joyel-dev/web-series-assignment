import { html, css, LitElement } from "lit";

class WebSeriesForm extends LitElement {
  static get styles() {
    return css`
      form {
        padding: 3.2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      label {
        color: #555;
        font-size: 3rem;
        margin: 1.2rem;
      }

      select,
      input {
        font-size: 2rem;
        padding: 0.7rem;
        border-radius: 10px;
        border: 2px solid #c92a2a;
        margin: 0.6rem;
      }

      .btn {
        width: 30%;
        height: 4.8rem;
        font-size: 2.6rem;
        font-weight: 600;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        text-align: center;
        border: none;
        color: #fff;
        background-color: #c92a2a;
        border-radius: 11px;
        cursor: pointer;
        margin: 2.4rem 0 0 1.2rem;
      }

      .btn:hover {
        color: #c92a2a;
        background-color: #fff;
        border: 2px solid #c92a2a;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      director: { type: String },
      star: { type: Number },
    };
    }

    addCard(e) {
        e.preventDefault();
        const title = this.shadowRoot.getElementById('title').value;
        const director = this.shadowRoot.getElementById('director').value;
        const stars = this.shadowRoot.getElementById('stars').value;
        const streamingPlatform =this.shadowRoot.getElementById('streamingPlatform').value;
        const cardcontainer = { title, director, stars, streamingPlatform };
        this.dispatchEvent(
            new CustomEvent('addingcards', { detail: cardcontainer })
        );
        this.shadowRoot.getElementById('title').value = null;
        this.shadowRoot.getElementById('director').value = null;
        this.shadowRoot.getElementById('stars').value = null;
        this.shadowRoot.getElementById('streamingPlatform').value = null;
    }


  constructor() {
    super();
  }

  render() {
    return html`
      <form id="add-form">
        <label for="title">Title:</label>
        <input id="title" type="text" />
        <label for="directors">Directors:</label>
        <input id="directors" type="text" />
        <label for="stars">Stars:</label>
        <input id="stars" type="text" />
        <label for="select-platform">Streaming Platform:</label>
        <select id="select-platform">
          <option>Select one</option>
          <option value="amazon-prime">Amazon Prime</option>
          <option value="netflix">Netflix</option>
          <option value="hulu">Hulu</option>
          <option value="hotstar">Hotstar</option>
          <option value="voot">Voot</option>
        </select>
        <button id="button" class="btn">Add</button>
      </form>
    `;
  }
}

customElements.define("web-series-form", WebSeriesForm);
