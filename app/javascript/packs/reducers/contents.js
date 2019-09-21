export default function (state = [], action) {
    switch (action.type) {
    case "SET_CONTENTS":
      return (action.payload)
    default:
      return state;
    }
}
