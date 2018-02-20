import { UPDATE_CARDS, SHOW_CARD, GET_RIGHT, GET_WRONG, SAVE_CHOICES } from '../actions/data.js';
import { LOAD_STATS } from '../actions/app.js';

const app = (state = {cards:{}, stats:{}}, action) => {
  let json, value;
  switch (action.type) {
    case UPDATE_CARDS:
      return {
        ...state,
        cards: {...state.cards, [action.hint]: action.cards},
        stats: {...state.stats, [action.hint]: {}}
      }
    case LOAD_STATS:
      return {
        ...state,
        stats: action.stats
      }
    case SHOW_CARD:
      // Save to local storage.
      const activeCard = action.card;
      json = localStorage.getItem('__learn_japanese__') || '{}';
      value = JSON.parse(json);
      value.activeCard = activeCard;
      localStorage.setItem('__learn_japanese__', JSON.stringify(value));

      return {
        ...state,
        activeCard
      }
    case GET_RIGHT:
    case GET_WRONG:
      // Save the stats to local storage. It doesn't matter that we overwrite
      // the previous state, that's the whole point of Redux :)
      const newStats = stats(state.stats, action);

      json = localStorage.getItem('__learn_japanese__') || '{}';
      value = JSON.parse(json);
      value.stats = newStats;
      value.activeCard = null;
      localStorage.setItem('__learn_japanese__', JSON.stringify(value));

      return {
        ...state,
        stats: newStats,
        activeCard: null
      }
      return state;
    case SAVE_CHOICES:
      // Save to local storage.
      const choices = action.choices;

      json = localStorage.getItem('__learn_japanese__') || '{}';
      value = JSON.parse(json);
      value.choices = choices;
      localStorage.setItem('__learn_japanese__', JSON.stringify(value));

      return {
        ...state,
        choices
      }
    default:
      return state;
  }
}

/*
* Sample stats obj:
* stats = { 'hiragana': { 1:{right:2,wrong:7}, 5:{right:1} }, 'katakana': {} }
*/
const stats = (state = {}, action) => {
  switch (action.type) {
    case GET_RIGHT:
    case GET_WRONG:
      var f = {
        ...state,
        [action.card.hint]: byHint(state[action.card.hint], action)
      };
      return f;
    default:
      return state;
  }
}

const byHint = (state = {}, action) => {
  // example: { も:{right:2,wrong:7}, に:{right:1} }
  const card = action.card;
  switch (action.type) {
    case GET_RIGHT:
    case GET_WRONG:
      return {
        ...state,
        [card.question]: question(state[card.question], action)
      };
    default:
      return state;
  }
}

const question = (state = {right: 0, wrong: 0}, action) => {
  switch (action.type) {
    case GET_RIGHT:
      return {
        'right': state.right + 1,
        'wrong': state.wrong
      }
    case GET_WRONG:
      return {
        'right': state.right,
        'wrong': state.wrong + 1
      }
    default:
      return state;
  }
}


export default app;