const initialState = {
    list: [],
};

const todoreducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TODO":
            const { id, data } = action.payload;
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: id,
                        data: data,
                    },
                ],
            };

        case "REMOVE_TODO":
            const newList = state.list.filter((elem) => elem.id !== action.id);
            return {
                ...state,
                list: newList,
            };

        // case "REMOVE_TODO":
        //     const removeId = action.payload.id; 
        //     const newList = state.list.filter((elem) => elem.id !== removeId); 
        //     return {
        //         ...state,
        //         list: newList,
        //     };



        case "EDIT_TODO":
            return {
                ...state,
                list: state.list.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, data: action.payload.data }
                        : item
                ),
            };
        case "REMOVE_ALL":
            return {
                ...state,
                list: [],
            };
        // case "FETCH_DATA_SUCCESS":
        //     return {
        //         ...state,
        //         list: action.payload,
        //         error: null,
        //     };

        // case "FETCH_DATA_FAILURE":
        //     return {
        //         ...state,
        //         error: action.payload,
        //     };


        default:
            return state;
    }
};

export default todoreducer;
