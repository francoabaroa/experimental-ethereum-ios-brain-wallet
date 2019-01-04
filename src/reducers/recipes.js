import Store from '../store/recipes';

export const initialState = Store;

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: [],
      };
    }
    case 'MEALS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        meals: [],
      };
    }
    case 'RECIPES_ERROR': {
      return {
        ...state,
        error: [],
      };
    }
    case 'RECIPES_REPLACE': {
      let recipes = [];

      return {
        ...state,
        error: null,
        loading: false,
        recipes: [],
      };
    }
    default:
      return state;
  }
}
