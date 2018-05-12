define(["exports","./my-app.js"],function(_exports,_myApp){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.FlashCards=_exports.audioIcon=_exports.settingsIcon=_exports.$playPage=_exports.$myIcons=void 0;const settingsIcon=_myApp.html`<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></svg>`;_exports.settingsIcon=settingsIcon;const audioIcon=_myApp.html`
<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;_exports.audioIcon=audioIcon;_exports.$myIcons={settingsIcon:settingsIcon,audioIcon:audioIcon};class ACard extends _myApp.LitElement{_render(props){(0,_myApp.renderAttributes)(this,{correct:props._isAnswered&&props._correct,incorrect:props._isAnswered&&!props._correct});return _myApp.html`
    <style>
      :host {
        display: block;
        min-height: 300px;
        text-align: center;
        border-radius: 3px;
        background: white;
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
           0 1px 8px 0 rgba(0, 0, 0, 0.12),
           0 3px 3px -2px rgba(0, 0, 0, 0.4);
        padding: 20px;
       }
       .question {
         font-size: 4.5em;
         font-weight: bold;
         xfont-family: "Noto Sans Japanese";
       }
       .hint {
         font-size: 1em;
         color: #1976D2;
       }
       input {
         font-size: 3rem;
         background: none;
         color: black;
         box-shadow: none;
         border: 0;
         padding: 0;
         border-bottom: 2px solid #E4E4E4;
         width: 100%;
         text-align: center;
       }
       button {
         box-shadow: none;
         border: none;
         cursor: pointer;
       }
       button.green {
         background: #8BC34A;
         color: black;
         font-size: 1em;
         text-transform: uppercase;
         font-weight: bold;
         letter-spacing: 1px;
         padding: 8px 18px;
         margin: 36px 0;
         border-radius: 4px;
       }
       button.say {
         background: transparent;
         vertical-align: middle;
       }
       :host([correct]) {
        outline: 20px solid #64D989;
        outline-offset: -20px;
       }
       :host([incorrect]) {
        outline: 20px solid #FF0000;
        outline-offset: -20px;
       }
     </style>

     <div class="question">${props.question}</div>
     <input autofocus
        title="your answer"
        autocomplete="off" spellcheck="false"
        autocorrect="off" autocapitalize="none"
        placeholder="${props.showAnswer?props.answer:"answer"}"
        on-keypress="${e=>this._inputKeypress(e)}"
        value="${props._inputValue}">
     <div class="hint">
       ${props.hint}
       <button class="say"
          hidden?="${!props._hasSpeechSynthesis}"
          on-click="${()=>this._say()}">
          ${audioIcon}
      </button>
     </div>
     <button class="green" on-click="${()=>this.submit()}">${props._isAnswered?"next":"submit"}</button>
    `}static get properties(){return{question:String,hint:String,answer:String,_isAnswered:String,_correct:Boolean,showAnswer:Boolean,saySettings:String,_hasSpeechSynthesis:Boolean,_inputValue:String}}constructor(){super();this._isAnswered=!1}_firstRendered(){this._button=this.shadowRoot.querySelector("button.green");this._input=this.shadowRoot.querySelector("input");if(!"speechSynthesis"in window){this._hasSpeechSynthesis=!1}else{speechSynthesis.onvoiceschanged=()=>{this._voice=this._getVoice(speechSynthesis.getVoices())};this._voice=this._getVoice(speechSynthesis.getVoices())}}_didRender(properties,changeList){if("question"in changeList&&"start"===this.saySettings){this._say()}}_getVoice(){this._hasSpeechSynthesis=!0;let voice=speechSynthesis.getVoices().filter(voice=>"Google \u65E5\u672C\u8A9E"===voice.name)[0];if(voice)return voice;voice=speechSynthesis.getVoices().filter(voice=>"Kyoko"===voice.name)[0];if(voice)return voice;this._hasSpeechSynthesis=!1}submit(){if(this._isAnswered){this._inputValue="";this._input.focus();this.dispatchEvent(new CustomEvent("next-question",{bubbles:!0,composed:!0}))}else{this._correct=this._input.value===this.answer;this._inputValue=this.answer;this._button.focus();if("end"===this.saySettings){this._say()}this.dispatchEvent(new CustomEvent("answered",{bubbles:!0,composed:!0,detail:{correct:this._correct}}))}this._isAnswered=!this._isAnswered}_say(){if(!this._voice){return}var msg=new SpeechSynthesisUtterance;msg.text=this.question;msg.lang="jp";msg.voice=this._voice;window.speechSynthesis.speak(msg)}_inputKeypress(e){if(13==e.keyCode){this.submit()}}}window.customElements.define("a-card",ACard);class CheckBox extends _myApp.LitElement{_render({label,checked}){return _myApp.html`
      <style>
        :host {
          display: inline-block;
          position: relative;
          padding-left: 30px;
          margin-bottom: 12px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        /* Hide the browser's default checkbox */
        .container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        /* Create a custom checkbox */
        .checkmark {
          cursor: pointer;
          position: absolute;
          top: 0;
          left: 0;
          height: 20px;
          width: 20px;
          background-color: transparent;
          border: 2px solid black;
        }

        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }

        /* Show the checkmark when checked */
        .container input:checked ~ .checkmark:after {
          display: block;
        }

        /* Style the checkmark/indicator */
        .container .checkmark:after {
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid black;
          border-width: 0 3px 3px 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
      </style>
      <label class="container">${label}
        <input type="checkbox" checked="${checked}" on-change="${e=>this._checkedChanged(e)}">
        <span class="checkmark"></span>
      </label>
    `}static get properties(){return{label:String,checked:Boolean}}constructor(){super();this.checked=!1}_checkedChanged(event){this.checked=event.currentTarget.checked;this.dispatchEvent(new CustomEvent("checked-changed",{bubbles:!0,composed:!0}))}}window.customElements.define("check-box",CheckBox);class FlashCards extends(0,_myApp.connect)(_myApp.store)(_myApp.PageViewElement){static get properties(){return{_cards:Object,_card:Object,_showAnswer:Boolean,_showSettings:String,_saySettings:String,_categories:Array,_showSettingsPage:Boolean}}_render({_card,_cards,_showAnswer,_showSettings,_saySettings,_categories,_showSettingsPage}){return _myApp.html`
      ${_myApp.SharedStyles}
      <style>
      :host {
        display: block;
        box-sizing: border-box;
        position: relative;
        /* Override shared styles */
        margin: 60px 40px !important;
        padding: 0!important;
      }

      [hidden] {
        display: none !important;
      }

      .settings-btn {
        position: absolute;
        right: -20px;
        top: -20px;
        background-color: #FAE1D6;
        text-align: center;
        border-radius: 50%;
        padding: 6px;
        border: 6px solid #fff;
        cursor: pointer;
        z-index: 1;
      }
      #settings {
        min-height: 540px;
        border-radius: 3px;
        background: white;
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
           0 1px 8px 0 rgba(0, 0, 0, 0.12),
           0 3px 3px -2px rgba(0, 0, 0, 0.4);
        padding: 20px;
      }
      a-card, #settings {
        box-sizing: border-box;
        max-width: 400px;
        width: 100%;
      }
      h4 {
        line-height: 1;
      }
      </style>
      <button class="settings-btn"
          title="settings"
          on-click=${()=>this._toggleShowSettings()}">
        ${settingsIcon}
      </button>

      <div id="settings" hidden?="${!_showSettingsPage}">
        <check-box id="answer" label="show answer" checked="${_showAnswer}"></check-box>

        <h4>Pick from</h4>
        ${(0,_myApp.repeat)(Object.keys(_cards),kind=>_myApp.html`
            <check-box label="${kind}" checked="${-1!==_categories.indexOf(kind)}" class="categories"></check-box>
          `)}

        <h4>Ask me...</h4>
        <check-box id="all" class="show-settings"
            label="all cards"
            checked="${"all"==_showSettings}">
        </check-box><br>
        <check-box id="onlyNew" class="show-settings"
            label="only cards I haven't seen"
            checked="${"onlyNew"==_showSettings}">
        </check-box><br>
        <check-box id="mostlyWrong" class="show-settings"
            label="only cards I've gotten mostly wrong"
            checked="${"mostlyWrong"==_showSettings}">
        </check-box><br>
        <check-box id="mostlyRight" class="show-settings"
            label="only cards I've gotten mostly right"
            checked="${"mostlyRight"==_showSettings}">
        </check-box>

        <h4>Read answer...</h4>
        <check-box id="start" class="say-settings"
            label="when card is shown"
            checked="${"start"==_saySettings}">
        </check-box><br>
        <check-box id="end" class="say-settings"
            label="before next card is shown"
            checked="${"end"==_saySettings}">
        </check-box><br>
        <check-box id="demand" class="say-settings"
            label="only when I want to"
            checked="${"demand"==_saySettings}">
      </div>

      <a-card hidden?="${_showSettingsPage}"
        question="${_card.question}"
        answer="${_card.answer}"
        hint="${_card.hint}"
        showAnswer="${_showAnswer}"
        saySettings="${_saySettings}">
      </a-card>
    `}constructor(){super();this._card={question:"",answer:"",hint:""};this._showSettingsPage=!1}_firstRendered(){this.addEventListener("checked-changed",e=>this._checkedChanged(e.composedPath()[0]));this.addEventListener("next-question",()=>_myApp.store.dispatch((0,_myApp.showNewCard)()));this.addEventListener("answered",e=>{_myApp.store.dispatch(e.detail.correct?(0,_myApp.getRight)(this._card):(0,_myApp.getWrong)(this._card))})}_stateChanged(state){this._showAnswer=state.app.showAnswer;this._cards=state.data.cards;this._categories=state.data.categories;this._showSettings=state.app.showSettings;this._saySettings=state.app.saySettings;let activeCard;if("#test"===window.location.hash){activeCard={hint:"hiragana",index:0}}else{activeCard=state.data.activeCard}if(activeCard&&activeCard.index!==void 0){if(!this._cards[activeCard.hint]){_myApp.store.dispatch((0,_myApp.showNewCard)());return}const activeCardData=this._cards[activeCard.hint][activeCard.index];this._card={question:activeCardData.jp,answer:activeCardData.en,hint:activeCard.hint}}}_checkedChanged(target){if("answer"===target.id){_myApp.store.dispatch((0,_myApp.saveShowAnswer)(target.checked))}if(target.classList.contains("show-settings")){_myApp.store.dispatch((0,_myApp.saveShowSettings)(target.id,target.checked))}if(target.classList.contains("say-settings")){_myApp.store.dispatch((0,_myApp.saveSaySettings)(target.id,target.checked))}else{let categories=[];const checkboxes=this.shadowRoot.querySelectorAll(".categories");for(let i=0;i<checkboxes.length;i++){if(checkboxes[i].checked){categories.push(checkboxes[i].label)}}_myApp.store.dispatch((0,_myApp.saveAvailableTypes)(categories))}}_toggleShowSettings(){this._showSettingsPage=!this._showSettingsPage}}_exports.FlashCards=FlashCards;window.customElements.define("play-page",FlashCards);_exports.$playPage={FlashCards:FlashCards}});