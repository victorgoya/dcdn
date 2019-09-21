export default function (state = null, action) {
  switch (action.type) {
    case 'SET_CURRENT_CONTENT':
    return action.payload;

    case 'CLEAR_CURRENT_CONTENT':
    return null;

    default:
    return state;
  }
}
