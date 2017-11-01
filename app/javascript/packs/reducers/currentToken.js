export default function (state = null, action) {
  switch (action.type) {
    case 'SET_CURRENT_TOKEN':
    return action.accessToken;

    case 'CLEAR_TOKEN':
    return null;

    default:
    return state;
  }
}
