import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { equal } from './utils';

import {
  fetchRegions,
  fetchCategories,
  fetchRestaurants,
  fetchRestaurant,
  postLogin,
  postReview,
} from './services/api';

import { saveItem } from './services/storage';

const initialReviewFields = {
  score: '',
  description: '',
};

export const loadInitialData = createAsyncThunk(
  'application/loadInitialData',
  async (result, thunkAPI) => {
    try {
      const regions = await fetchRegions();
      const categories = await fetchCategories();
      return {
        regions,
        categories,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    regions: [],
    categories: [],
    restaurants: [],
    restaurant: null,
    selectedRegion: null,
    selectedCategory: null,
    loginFields: {
      email: '',
      password: '',
    },
    accessToken: '',
    reviewFields: {
      ...initialReviewFields,
    },
  },
  reducers: {
    setRegions(state, { payload: regions }) {
      return {
        ...state,
        regions,
      };
    },

    setCategories(state, { payload: categories }) {
      return {
        ...state,
        categories,
      };
    },

    setRestaurants(state, { payload: restaurants }) {
      return {
        ...state,
        restaurants,
      };
    },

    setRestaurant(state, { payload: restaurant }) {
      return {
        ...state,
        restaurant,
      };
    },

    selectRegion(state, { payload: regionId }) {
      const { regions } = state;
      return {
        ...state,
        selectedRegion: regions.find(equal('id', regionId)),
      };
    },

    selectCategory(state, { payload: categoryId }) {
      const { categories } = state;
      return {
        ...state,
        selectedCategory: categories.find(equal('id', categoryId)),
      };
    },

    changeLoginField(state, { payload: { name, value } }) {
      return {
        ...state,
        loginFields: {
          ...state.loginFields,
          [name]: value,
        },
      };
    },

    setAccessToken(state, { payload: accessToken }) {
      return {
        ...state,
        accessToken,
      };
    },

    logout(state) {
      return {
        ...state,
        accessToken: '',
      };
    },

    changeReviewField(state, { payload: { name, value } }) {
      return {
        ...state,
        reviewFields: {
          ...state.reviewFields,
          [name]: value,
        },
      };
    },

    clearReviewFields(state) {
      return {
        ...state,
        reviewFields: {
          ...initialReviewFields,
        },
      };
    },

    setReviews(state, { payload: reviews }) {
      const { restaurant } = state;

      return {
        ...state,
        restaurant: {
          ...restaurant,
          reviews,
        },
      };
    },
  },
  extraReducers: {
    [loadInitialData.fulfilled]: (state, action) => {
      state.regions = action.payload.regions;
      state.categories = action.payload.categories;
    },
  },
});

export const {
  setRegions,
  setCategories,
  setRestaurants,
  setRestaurant,
  selectRegion,
  selectCategory,
  changeLoginField,
  setAccessToken,
  logout,
  changeReviewField,
  clearReviewFields,
  setReviews,
} = actions;

export function loadRestaurants() {
  return async (dispatch, getState) => {
    const { selectedRegion: region, selectedCategory: category } = getState();

    if (!region || !category) {
      return;
    }

    const restaurants = await fetchRestaurants({
      regionName: region.name,
      categoryId: category.id,
    });
    dispatch(setRestaurants(restaurants));
  };
}

export function loadRestaurant({ restaurantId }) {
  return async (dispatch) => {
    dispatch(setRestaurant(null));

    const restaurant = await fetchRestaurant({ restaurantId });

    dispatch(setRestaurant(restaurant));
  };
}

export function requestLogin() {
  return async (dispatch, getState) => {
    const {
      loginFields: { email, password },
    } = getState();

    const accessToken = await postLogin({ email, password });

    saveItem('accessToken', accessToken);

    dispatch(setAccessToken(accessToken));
  };
}

export function loadReview({ restaurantId }) {
  return async (dispatch) => {
    const restaurant = await fetchRestaurant({ restaurantId });

    dispatch(setReviews(restaurant.reviews));
  };
}

export function sendReview({ restaurantId }) {
  return async (dispatch, getState) => {
    const {
      accessToken,
      reviewFields: { score, description },
    } = getState();

    await postReview({
      accessToken,
      restaurantId,
      score,
      description,
    });

    dispatch(loadReview({ restaurantId }));
    dispatch(clearReviewFields());
  };
}

export default reducer;
