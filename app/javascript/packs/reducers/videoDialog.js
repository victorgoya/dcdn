export default function (state = { open: false }, action) {
  switch (action.type) {
  case "OPEN_VIDEO_DIALOG":
    return { open: true };
  case "CLOSE_VIDEO_DIALOG":
    return { open: false };
  default:
    return state;
  }
}
