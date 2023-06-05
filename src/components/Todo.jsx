import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo, removeAll, fetchData } from "../redux/actions";

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [editId, setEditId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editedValue, setEditedValue] = useState("");

    const dispatch = useDispatch();
    const list = useSelector((state) => state.todoreducer.list);

    const handleSubmit = () => {
        if (editId && editMode) {
            if (editedValue.trim() !== "") {
                dispatch(editTodo(editId, editedValue));
                setInputData("");
                setEditId(null);
                setEditMode(false);
                setEditedValue("");
                setErrorMessage("");
            } else {
                setErrorMessage("Please enter a valid todo item.");
            }
        } else {
            if (inputData.trim() !== "") {
                dispatch(addTodo(inputData));
                setInputData("");
                setErrorMessage("");
            } else {
                setErrorMessage("Please enter a valid todo item.");
            }
        }
    };

    const handleEdit = (id) => {
        const itemToEdit = list.find((elem) => elem.id === id);
        if (itemToEdit) {
            setEditedValue(itemToEdit.data);
            setEditId(id);
            setEditMode(true);
        }
    };



    useEffect(() => {
        dispatch(fetchData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div className="main-div">
            <div className="child-div">
                <h1 style={{ marginBottom: 20 }}>TaskTrackr</h1>
                <div className="addItems">
                    <input
                        type="text"
                        placeholder="add your todo items"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                    />
                    <button className="btn" onClick={handleSubmit}>
                        {editId && editMode ? "Save" : "Add"}
                    </button>
                </div>

                {errorMessage && <h1 className="error-message">{errorMessage}</h1>}

                <div className="showItems">
                    {list.map((elem) => {
                        return (
                            <div className="eachItem" key={elem.id}>
                                {editId === elem.id && editMode ? (
                                    <input
                                        type="text"
                                        value={editedValue}
                                        onChange={(e) => setEditedValue(e.target.value)}
                                    />
                                ) : (
                                    <h3>{elem.data}</h3>
                                )}
                                <div>
                                    <button className="btn" onClick={() => handleEdit(elem.id)}>
                                        Edit
                                    </button>
                                    <button
                                        className="btn"
                                        onClick={() => dispatch(deleteTodo(elem.id))}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="showItems">
                    <button className="btn" onClick={() => dispatch(removeAll())}>
                        Delete All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Todo;
