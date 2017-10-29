export default function (state = [], action) {
    switch (action.type) {
    case "CONTENTS_SET":
      return (action.payload)
    default:
      return state;
    }
}
