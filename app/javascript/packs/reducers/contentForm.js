export default function (state = { open: false }, action) {
  switch (action.type) {
  case "OPEN_CONTENT_FORM":
    return { open: true };
  case "CLOSE_CONTENT_FORM":
    return { open: false };
  default:
    return state;
  }
}
