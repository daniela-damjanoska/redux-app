import axios from "axios";

export enum fetchBlogItems {
  idle = "idle",
  loading = "loading",
  success = "succeeded",
  error = "failed",
}

const initialState = {
  status: fetchBlogItems.idle,
  entities: [] as {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[],
};

export default function blogItemsReducer(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case fetchBlogItems.loading:
      return {
        ...state,
        status: fetchBlogItems.loading,
      };
    case fetchBlogItems.success:
      return {
        ...state,
        status: fetchBlogItems.idle,
        entities: action.payload,
      };
    case fetchBlogItems.error:
      return {
        ...state,
        status: fetchBlogItems.idle,
        payload: new Error(),
        error: true,
      };
    case "blogItems/initalState": {
      return state;
    }
    case "blogItems/blogItemDeleted": {
      return {
        ...state,
        entities: state.entities.filter((item) => item.id !== action.payload),
      };
    }
    default:
      return state;
  }
}

//action creators:
export const blogItemsLoading = () => ({ type: fetchBlogItems.loading });

export const blogItemsLoaded = (data: []) => ({
  type: fetchBlogItems.success,
  payload: data,
});

export const blogItemsFetchingError = () => ({ type: fetchBlogItems.error });

export const blogItemsFilteredByQuery = (query: string) => ({
  type: "blogItems/filteredByQuery",
  payload: query,
});

export const blogItemsInitial = () => ({ type: "blogItems/initalState" });

export const blogItemDeleted = (blogId: number) => ({
  type: "blogItems/blogItemDeleted",
  payload: blogId,
});

// Thunk functions
export const blogItemsFetching = () => async (dispatch: any) => {
  dispatch(blogItemsLoading());

  try {
    const response = await axios.get(
      "http://jsonplaceholder.typicode.com/posts/?_limit=20"
    );
    dispatch(blogItemsLoaded(response.data));
  } catch (error) {
    dispatch(blogItemsFetchingError());
  }
};

// Sending the id to the server in order to delete the blogItem that is clicked ?????
export const deleteBlogItem = (blogId: number) => async (dispatch: any) => {
  await axios.delete(`url/${blogId}`);

  dispatch(blogItemsLoading());

  try {
    const response = await axios.get("url");
    dispatch(blogItemsLoaded(response.data));
  } catch (error) {
    dispatch(blogItemsFetchingError());
  }
};
