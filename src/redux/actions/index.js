import { ADD_TODO, REMOVE_TODO, REMOVE_ALL, EDIT_TODO, } from '../actionTypes';

export const addTodo = (data) => ({
    type: ADD_TODO,
    payload: {
        id: Date.now(),
        data: data,
    },
});

export const deleteTodo = (id) => ({
    type: REMOVE_TODO,
    id,
});

export const editTodo = (id, data) => {
    return {
        type: EDIT_TODO,
        payload: { id, data },
    };
};

export const removeAll = () => ({
    type: REMOVE_ALL,
});


export const fetchData = () => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
            if (!response.ok) {
                throw new Error("Failed to fetch data.");
            }
            const data = await response.json();
            dispatch({ type: "FETCH_DATA_SUCCESS", payload: data });
        } catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
        }
    };
};
