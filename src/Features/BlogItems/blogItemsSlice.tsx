import axios from "axios";
import store from "../../store";

enum fetchData {
  request = "FETCH_DATA_REQUEST",
  success = "FETCH_DATA_SUCCESS",
  error = "FETCH_DATA_ERROR",
}

const initialState = {
  loading: false,
  blogItems: [] as {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[],
  filteredBlogItems: [] as {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[],
  error: null,
};

export default function blogItemsReducer(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case fetchData.request:
      return {
        ...state,
        loading: true,
      };
    case fetchData.success:
      return {
        ...state,
        loading: false,
        blogItems: action.payload,
      };
    case fetchData.error:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "blogItems/filteredByQuery": {
      return {
        ...state,
        filteredBlogItems: state.blogItems.filter(
          (item) =>
            item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
            item.body.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    }
    case "blogItems/filteredItemsNull": {
      return {
        ...state,
        filteredBlogItems: [],
      };
    }
    case "blogItems/blogItemDeleted": {
      return {
        ...state,
        blogItems: state.blogItems.filter((item) => item.id !== action.payload),
      };
    }
    default:
      return state;
  }
}

//action creators:
export const fetchDataRequest = () => ({ type: fetchData.request });

export const fetchDataSuccess = (data: []) => ({
  type: fetchData.success,
  payload: data,
});

export const fetchDataError = () => ({ type: fetchData.error });

export const blogItemsFilteredByQuery = (query: string) => ({
  type: "blogItems/filteredByQuery",
  payload: query,
});

export const filteredItemsNull = () => ({
  type: "blogItems/filteredItemsNull",
});

export const blogItemDeleted = (blogId: number) => ({
  type: "blogItems/blogItemDeleted",
  payload: blogId,
});

// Thunk functions
export const fetchBlogItems = () => async (dispatch: any) => {
  dispatch(fetchDataRequest());
  try {
    const response = await axios.get(
      "http://jsonplaceholder.typicode.com/posts/?_limit=20"
    );
    dispatch(fetchDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchDataError());
  }
};

// Sending the id to the server in order to delete the blogItem that is clicked ?????
export const deleteBlogItem = (blogId: number) => async (dispatch: any) => {
  await axios.delete(`url/${blogId}`);

  dispatch(fetchDataRequest());

  //@ts-ignore
  store.dispatch(fetchBlogItems());
  // try {
  //   const response = await axios.get("url");
  //   dispatch(fetchDataSuccess(response.data));
  // } catch (error) {
  //   dispatch(fetchDataError());
  // }
};
