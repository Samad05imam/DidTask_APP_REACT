import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuid4 } from "uuid";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { TfiSave } from "react-icons/tfi";

function App() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const todoString = localStorage.getItem("todos");

        if (todoString) {
            try {
                const savedTodos = JSON.parse(todoString);
                if (Array.isArray(savedTodos)) {
                    setTodos(savedTodos);
                } else {
                    console.warn("Invalid todos format in localStorage");
                }
            } catch (err) {
                console.error("Failed to parse todos from localStorage:", err);
                setTodos([]);
            }
        }
    }, []);

    const saveToLS = (newTodos) => {
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    const handleAdd = () => {
        const newTodos = [...todos, { id: uuid4(), todo, isCompleted: false }];
        setTodos(newTodos);
        setTodo("");
        saveToLS(newTodos);
    };

    const handleEdit = (e, id) => {
        const t = todos.find((i) => i.id === id);
        if (t) setTodo(t.todo);

        const newTodos = todos.filter((item) => item.id !== id);
        setTodos(newTodos);
        saveToLS(newTodos);
    };

    const handleDelete = (e, id) => {
        const newTodos = todos.filter((item) => item.id !== id);
        setTodos(newTodos);
        saveToLS(newTodos);
    };

    const handleCheckbox = (e) => {
        const id = e.target.name;
        const index = todos.findIndex((item) => item.id === id);
        const newTodos = [...todos];

        if (index !== -1) {
            newTodos[index].isCompleted = !newTodos[index].isCompleted;
            setTodos(newTodos);
            saveToLS(newTodos);
        }
    };

    return (
        <>
            <div className="bg-emerald-300 h-screen">

                <Navbar />

                <div className="container drop-shadow-2xl visible p-4 rounded-lg w-1/2 text-black text-shadow-md min-h-[85vh] mx-auto my-5 rounded-lg p-5 bg-emerald-200">

                    <div className="addTodo my-5 text-lg">
                        <h2 className="text-lg font-bold">Add Task</h2>
                        <input
                            onChange={handleChange}
                            value={todo}
                            placeholder="Enter atleast 3 letters to save task :)"
                            type="text"
                            className="bg-white p-1 px-2 text-emerald-900 w-80 rounded-md border-1 border-emerald-600"
                        />
                        <button
                            onClick={handleAdd} disabled={todo.length < 3}
                            className="bg-emerald-800 text-white  disabled:bg-white disabled:font-bold disabled:text-emerald-800 hover:bg-emerald-900 rounded-md mx-6 text-sm py-1 px-2"
                        >
                            <TfiSave />
                        </button>
                    </div>

                    {/* <input type="checkbox" onChange={toggleFinished} checked={showFinished} />Show Finished */}

                    <h2 className="text-lg font-bold mt-7">Your Tasks</h2>

                    <div className="todos">
                        <div className="flex flex-wrap">
                            {todos.length === 0 && (
                                <div className="m-2 text-shadow-md">No Task to display</div>
                            )}

                            {todos.map((items) => {

                                return <div
                                    key={items.id}
                                    className="todo flex justify-between w-2/5 items-center bg-emerald-600 rounded-md p-2 m-3 ml-11 shadow-emerald-100"
                                >
                                    <input
                                        onChange={handleCheckbox}
                                        type="checkbox"
                                        className="w-8"
                                        name={items.id}
                                        checked={items.isCompleted}
                                    />
                                    <div className={items.isCompleted ? "line-through" : ""}>
                                        {items.todo}
                                    </div>
                                    <div className="buttons flex w-44">
                                        <button onClick={(e) => handleEdit(e, items.id)} className="bg-emerald-800 text-white hover:bg-emerald-900 rounded-md mx-3 text-sm py-1 px-2">
                                            <BiEdit />
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, items.id)}
                                            className="bg-emerald-800 text-white hover:bg-emerald-900 rounded-md mx-2 text-sm py-1 px-2"
                                        >
                                            <RiDeleteBinLine />
                                        </button>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default App;
