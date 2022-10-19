import { LitElement, html, css } from '@lion/core';
import '@lion/button/define';
import '@lion/select/define';
import '@lion/form/define';
import '@lion/input/define';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import { Required, IsString } from '@lion/form-core';
import { ajax } from '@lion/ajax';
import { localize, LocalizeMixin } from '@lion/localize';

export class WebSeriesForm extends LocalizeMixin(LitElement) {
  static get properties() {
    return {
      title: { type: String },
      stars: { type: String },
      director: { type: String },
      streamingPlatform: { type: String },
    };
  }
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
        this.shadowRoot.getElementById('title').value = '';
      this.shadowRoot.getElementById('director').value = '';
      this.shadowRoot.getElementById('stars').value = '';
      this.shadowRoot.getElementById('streamingPlatform').value = '';
    }

  static get localizeNamespaces() {
    return [
      { 'my-web-series': locale => import(`../src/translations/${locale}.js`) },
      ...super.localizeNamespaces,
    ];
  }


  constructor() {
    super();
  }

  render() {
    loadDefaultFeedbackMessages();
    Required.getMessage = () => '*All fields are mandatory';
    IsString.getMessage = () => 'Numeric characters is not allowed';
    const fetchHandler = name => {
      ajax
        .fetch(`${name}.json`)
        .then(cards => cards.json())
        .then(result => {
          console.log(result.cards);
        });
    };

    return html`
      <lion-form>
        <form name="WebSeriesForm" id="web-series-form" class="container1">
          <lion-fieldset name="lion-form">
            <h4>
            <label slot="label">${localize.msg('my-web-series:title')}</label> 
            <lion-input
              id="title"
              type="text"
              name="title name"
              value=""
              placeholder="Title Name"           
              
              .parser="${viewValue => String(viewValue) || undefined}"
              .validators="${[new Required(), new IsString()]}"
              .modelValue=${''}
              
            ></lion-input>
  </h4>
            <h4>
            <label slot="label">${localize.msg(
              'my-web-series:director'
            )}</label> 
            <lion-input
              id="director"
              type="text"
              name="director name"
              value=""
              placeholder="Directors Name"
              
              .validators="${[new Required()]}"
            ></lion-input>
  </h4>
  <h4>
  <label slot="label">${localize.msg('my-web-series:stars')}</label> 
            <lion-input
              id="stars"
              type="text"
              name="stars name"
              value=""
              placeholder="Stars Name"
             
              .validators="${[new Required()]}"
            ></lion-input>
  </h4>
          </lion-fieldset>
          <h4>
          <label slot="label">${localize.msg(
              'my-web-series:streamingPlatform'
            )}</label> 
          <lion-select
            
            id="streamingPlatform"
            name="streamingPlatformDropdown"
            .validators="${[new Required()]}"
           >
            <select slot="input">
              <option value="Netflix">Netflix</option>
              <option value="Prime">Prime</option>
              <option value="Hulu">Hulu</option>
              <option value="Hotstar">Hotstar</option>
              .validators="${[new Required()]}"
            </select>
          </lion-select>
          </h4>
          <div class: "submit">
         
          <lion-button-submit
          
            type="submit"
            id="name"
            
            @click=${() => fetchHandler('db')}
            
          >
          ${localize.msg('my-web-series:name')}
          </lion-button-submit>
          </div>
        </form>
      </lion-form>
      <button class="button" id="id1" @click="${this.first}" >ENGLISH</button>
      <button class="button" id="id2" @click="${this.second}" >FRENCH</button>
      <button class="button" id="id3" @click="${this.third}" >JAPANESE</button>
    `;
  }
  first = () => {
    localize.locale = 'en';
    console.log('ENGLISH');
  };

  second = () => {
    localize.locale = 'fr';
    console.log('FRENCH');
  };

  third = () => {
    localize.locale = 'jp';
    console.log('JAPANESE');
  };
}

