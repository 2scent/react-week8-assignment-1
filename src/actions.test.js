import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import {
  loadInitialData,
  setRegions,
  setCategories,
  loadRestaurants,
  loadRestaurant,
  setRestaurants,
  setRestaurant,
  requestLogin,
  setAccessToken,
  sendReview,
} from './slice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('./services/api');

describe('actions', () => {
  let store;

  describe('loadInitialData', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs setRegions and setCategories', async () => {
      await store.dispatch(loadInitialData());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRegions([]));
      expect(actions[1]).toEqual(setCategories([]));
    });
  });

  describe('loadRestaurants', () => {
    context('with selectedRegion and selectedCategory', () => {
      beforeEach(() => {
        store = mockStore({
          selectedRegion: { id: 1, name: '서울' },
          selectedCategory: { id: 1, name: '한식' },
        });
      });

      it('runs setRestaurants', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRestaurants([]));
      });
    });

    context('without selectedRegion', () => {
      beforeEach(() => {
        store = mockStore({
          selectedCategory: { id: 1, name: '한식' },
        });
      });

      it('does\'nt run any actions', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context('without selectedCategory', () => {
      beforeEach(() => {
        store = mockStore({
          selectedRegion: { id: 1, name: '서울' },
        });
      });

      it('does\'nt run any actions', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });

  describe('loadRestaurant', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('dispatchs setRestaurant', async () => {
      await store.dispatch(loadRestaurant({ restaurantId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRestaurant({}));
    });
  });

  describe('requestLogin', () => {
    context('email, password 입력 했을 때', () => {
      beforeEach(() => {
        store = mockStore({
          loginFields: {
            email: 'test@test.com',
            password: 'test',
          },
        });
      });

      it('runs setAccessToken', async () => {
        await store.dispatch(requestLogin());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setAccessToken({
          email: 'test@test.com',
          password: 'test',
        }));
      });
    });

    context('email만 입력 했을 때', () => {
      beforeEach(() => {
        store = mockStore({
          loginFields: {
            email: 'test@test.com',
            password: '',
          },
        });
      });

      it('아무 액션도 일어나지 않는다.', async () => {
        await store.dispatch(requestLogin());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context('password만 입력 했을 때', () => {
      beforeEach(() => {
        store = mockStore({
          loginFields: {
            email: '',
            password: 'test',
          },
        });
      });

      it('아무 액션도 일어나지 않는다.', async () => {
        await store.dispatch(requestLogin());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });

  describe('sendReview', () => {
    context('score, description 입력 했을 때', () => {
      beforeEach(() => {
        store = mockStore({
          accessToken: 'ACCESS_TOKEN',
          reviewFields: {
            score: '5',
            description: '반갑다 친구들아',
          },
        });
      });

      it('runs setRestaurant', async () => {
        await store.dispatch(sendReview({ restaurantId: '1' }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRestaurant({}));
      });
    });

    context('score만 입력 했을 때', () => {
      beforeEach(() => {
        store = mockStore({
          accessToken: 'ACCESS_TOKEN',
          reviewFields: {
            score: '5',
            description: '',
          },
        });
      });

      it('아무 액션도 일어나지 않는다.', async () => {
        await store.dispatch(sendReview({ restaurantId: '1' }));

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context('description만 입력 했을 때', () => {
      beforeEach(() => {
        store = mockStore({
          accessToken: 'ACCESS_TOKEN',
          reviewFields: {
            score: '',
            description: '반갑다 친구들아',
          },
        });
      });

      it('아무 액션도 일어나지 않는다.', async () => {
        await store.dispatch(sendReview({ restaurantId: '1' }));

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });
});
