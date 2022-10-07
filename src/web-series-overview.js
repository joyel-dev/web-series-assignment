import { html, css, LitElement } from "lit";
import './web-series-card.js';

class WebSeriesOverview extends LitElement {
  static get properties() {
    return {
      cards: { type: Array },
    };
  }

  constructor() {
    super();
    this.cards = [];
  }

  static get styles() {
    return css`
      .section-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        border-radius: 25px;
        background-color: #ffa8a8;
        padding: 2rem;
        margin: 1.2rem;
      }

      .card {
        display: grid;
        row-gap: 1rem;
        width: 200px;
        height: 160px;
        padding: 1.2rem 1.2rem 1.8rem 1.2rem;
        border-radius: 25px;
        background-color: #f7e7e7;

        transition: all 0.3s;
      }

      .card:hover {
        transform: scale(1.03);
      }

      .card-title {
        font-size: 3rem;
        font-weight: 600;
        text-align: center;
        color: #c92a2a;
        margin: 1.2rem 0 1.2rem;
      }

      .card-dir {
        font-weight: 500;
      }

      .card-details {
        list-style: none;
        display: grid;
        grid-template-columns: 2fr 1fr;
        margin-left: -2.5rem;
      }

      .delete-icon {
        height: 1.8rem;
        width: 1.8rem;
        color: #c92a2a;
        cursor: pointer;
      }

      .rating-icon {
        color: #c92a2a;
      }

      .platform {
        color: #c92a2a;
        font-size: 1.2rem;
        letter-spacing: 1.3px;
        font-weight: 600;
        margin-top: 0.5rem;
      }
    `;
  }

  render() {
    return html`
      <div class="section-cards">
        ${this.cards.map(
          (i) => html`
            <div class="card">
              <ion-icon
                class="delete-icon"
                id="del-icon"
                name="close"
              ></ion-icon>
              <p class="card-title">${i.title.toUpperCase()}</p>
              <ul class="card-details">
                <li class="card-rating">
                  <span>${i.stars} stars</span>
                  <ion-icon class="rating-icon" name="star-outline"></ion-icon>
                </li>
                <li class="card-dir">${i.directors}</li>
                <li class="platform">${i.platform}</li>
              </ul>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define("web-series-overview", WebSeriesOverview);
