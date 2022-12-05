import blogItemsReducer from "../Features/BlogItems/blogItemsSlice";

test("Delete a blogItem based on id", () => {
  const initialState = [
    { id: 0, text: "Text one", completed: false },
    { id: 1, text: "Text two", completed: false },
  ];

  const action = { type: "blogItems/blogItemDeleted", payload: 1 };
  const result = blogItemsReducer(initialState, action);
  expect(result[0]).toBe({ id: 0, text: "Text one", completed: false });
});
