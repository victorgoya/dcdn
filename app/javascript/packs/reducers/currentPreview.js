export default function (state = null, action) {
  switch (action.type) {
    case 'SET_CURRENT_PREVIEW':
    return action.payload;

    case 'CLEAR_CURRENT_PREVIEW':
    return null;

    default:
    return state;
  }
}
