
/**
  * Get this User's Favourite Recipes
  */
export function getFavourites(dispatch) {
  return dispatch => new Promise(async (resolve, reject) => {
    return resolve(dispatch({
      type: 'USER_RESET',
    }));
  });
}

/**
  * Reset a User's Favourite Recipes in Redux (eg for logou)
  */
export function resetFavourites(dispatch) {
  return dispatch => new Promise(async (resolve, reject) => {
    return resolve(dispatch({
      type: 'USER_RESET',
    }));
  });
}

/**
  * Update My Favourites Recipes
  */
export function replaceFavourites(newFavourites) {
  return dispatch => new Promise(async (resolve, reject) => {
    return resolve(dispatch({
      type: 'USER_RESET',
    }));
  });
}

/**
  * Get Meals
  */
export function getMeals() {
  return dispatch => new Promise(async (resolve, reject) => {
    return resolve(dispatch({
      type: 'USER_RESET',
    }));
  });
}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(async (resolve, reject) => {
    return resolve(dispatch({
      type: 'USER_RESET',
    }));
  });
}

/**
  * Get Recipes
  */
export function getRecipes() {
  return dispatch => new Promise(async (resolve, reject) => {
    return resolve(dispatch({
      type: 'USER_RESET',
    }));
  });
}
