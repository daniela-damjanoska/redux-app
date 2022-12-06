const initialState = {
  blogItems: [
    {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
    {
      userId: 1,
      id: 3,
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    },
    {
      userId: 1,
      id: 4,
      title: "eum et est occaecati",
      body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    },
  ],
  filteredBlogItems: [
    {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
    {
      userId: 1,
      id: 3,
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    },
    {
      userId: 1,
      id: 4,
      title: "eum et est occaecati",
      body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
    },
  ],
};

export default function blogItemsReducer(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case "blogItems/filteredByQuery": {
      return {
        ...state,
        filteredBlogItems: state.filteredBlogItems.filter(
          (item) =>
            item.title.includes(action.payload) ||
            item.body.includes(action.payload)
        ),
      };
    }
    case "blogItems/filteredById": {
      return {
        ...state,
        filteredBlogItems: state.blogItems.filter(
          (item) => item.id === action.payload
        ),
      };
    }
    case "blogItems/allItemsShown": {
      return {
        ...state,
        filteredBlogItems: state.blogItems,
      };
    }
    case "blogItems/blogItemDeleted": {
      return {
        blogItems: state.blogItems.filter((item) => item.id !== action.payload),
        filteredBlogItems: state.blogItems.filter(
          (item) => item.id !== action.payload
        ),
      };
    }
    default:
      return state;
  }
}

//actions
export const blogItemsFilteredByQuery = (query: string) => ({
  type: "blogItems/filteredByQuery",
  payload: query,
});

export const blogItemsFilterById = (blogId: number) => ({
  type: "blogItems/filteredById",
  payload: blogId,
});

export const allblogItemsShown = () => ({
  type: "blogItems/allItemsShown",
});

export const blogItemDeleted = (blogId: number) => ({
  type: "blogItems/blogItemDeleted",
  payload: blogId,
});
