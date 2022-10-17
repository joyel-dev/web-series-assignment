import { LitElement, html, css } from '@lion/core';
import { LionTabs } from '@lion/tabs';
import { webSeriesForm } from './web-series-form';
import { webSeriesOverview } from './web-series-overview';

window.customElements.define('my-tab', LionTabs);
window.customElements.define('web-series-form', webSeriesForm);
window.customElements.define('web-series-overview', webSeriesOverview);

export class MyWebSeries extends LitElement {
  static get properties() {
    return {
      card: { type: Array },
    };
  }

  constructor() {
    super();
    this.card = '';
  }
  static get styles() {
    return css`
      div.container {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.6rem;
      }
      @media (max-width: 800px) {
        div.container {
          display: grid;
          grid-template-columns: 1fr;
          box-sizing: border-box;
          gap: 1rem;
        }
      }
      my-tab {
        width: 100%;
      }
    `;
  }

  createCard(e) {
    this.card = [...this.card, e.detail];
  }

  render() {
    return html`
      <div class="container">
        <my-tab .selectedIndex=${1}>
          <button slot="tab">form</button>
          <p slot="panel">
            <web-series-form @addingcards=${this.createCard}></web-series-form>
          </p>
          <button slot="tab">Overview</button>
          <p slot="panel">
            <web-series-overview .card=${this.card}></web-series-overview>
          </p>
        </my-tab>
      </div>
    `;
  }
}
