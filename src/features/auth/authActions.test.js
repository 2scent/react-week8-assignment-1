import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import {
  setAccessToken,
  login,
} from './authActions';

import { authorize } from './authApi';

import { setError } from '../../apps/store/actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('./authApi');
jest.mock('../region/regionApi');

describe('authActions', () => {
  let store;

  describe('login', () => {
    context('with valid credentials', () => {
      beforeEach(() => {
        store = mockStore({
          loginFields: {
            email: 'tester@example.com',
            password: 'test',
          },
        });
        authorize.mockResolvedValue({
          accessToken: 'accessToken',
        });
      });

      it('runs setAccessToken', async () => {
        await store.dispatch(login());

        const actions = store.getActions();

        expect(actions[1]).toEqual(setAccessToken('accessToken'));
      });
    });

    context('with error', () => {
      beforeEach(() => {
        store = mockStore({
          loginFields: {
            email: 'tester@example.com',
            password: 'test',
          },
        });
        authorize.mockRejectedValue(new Error('error'));
      });

      it('runs setError', async () => {
        await store.dispatch(login());

        const actions = store.getActions();

        expect(actions[1]).toEqual(setError('auth', 'error'));
      });
    });
  });
});
