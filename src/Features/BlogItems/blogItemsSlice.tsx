const initialState = [
  { id: 0, text: "Learn React", completed: true },
  { id: 1, text: "Learn Redux", completed: false },
  { id: 2, text: "Build something fun!", completed: false },
];

export default function blogItemsReducer(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case "blogItems/filteredByQuery": {
      return state.filter(
        (item) =>
          item.text.includes(action.payload) ||
          item.text.includes(action.payload) //this should be changed according to my data in title and body
      );
    }
    case "blogItems/blogItemDeleted": {
      return state.filter((item) => item.id !== action.payload);
    }
    default:
      return state;
  }
}
