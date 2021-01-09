import { UPDATE_MAPPING } from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const updateMapping = (key, value) => ({
  type: UPDATE_MAPPING,
  payload: {
    key,
    value,
  },
});
