import { createContext, useState } from "react";
import "./App.css";
import { TodoList } from "./components/TodoList/TodoList";
import { v1 } from "uuid";
import { TaskType } from "./components/TodoList/TodoList";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import Modal from "./components/Modal/Modal";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";

export type FilteredIsDoneValuesType = "all" | "active" | "completed";
type TodoListType = {
    id: string;
    title: string;
    filter: FilteredIsDoneValuesType;
};

type TasksArrayType = {
    [key: string]: Array<TaskType>;
};

type ThemeContextType = "light" | "dark";

export const ThemeContext = createContext<ThemeContextType>("dark");

function App() {
    const [theme, setTheme] = useState<ThemeContextType>("light");
    const [modalActive, setModalActive] = useState(false);
    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListId1, title: "What is learned", filter: "all" },
        { id: todoListId2, title: "Todolist name", filter: "all" },
    ]);

    const [tasks, setTasks] = useState<TasksArrayType>({
        [todoListId1]: [
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "React", isDone: true },
            { id: v1(), title: "Redux", isDone: false },
            { id: v1(), title: "Next.js", isDone: false },
        ],
        [todoListId2]: [
            { id: v1(), title: 'Water flowers', isDone: false },
            { id: v1(), title: 'Walk the dog', isDone: false },
            { id: v1(), title: 'Read a book', isDone: false },
        ]
    });

    const changeFilterValue = (
        value: FilteredIsDoneValuesType,
        todoListId: string
    ) => {
        let todoList = todoLists.find((tl) => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    };

    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let filteredTasks = todoListTasks.filter((task) => task.id !== id);
        tasks[todoListId] = filteredTasks;
        setTasks({ ...tasks });
    }
    function addTask(title: string, todoListId: string) {
        let currentTasks = tasks[todoListId];
        let newTask = { id: v1(), title: title, isDone: false };
        let newTasks = [newTask, ...currentTasks];
        tasks[todoListId] = newTasks;
        setTasks({ ...tasks });
    }
    function changeTaskStatus(
        taskId: string,
        isDone: boolean,
        todoListId: string
    ) {
        let currentTasks = tasks[todoListId];
        let task = currentTasks.find((task) => task.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasks });
        }
    }
    function changeTaskTitle(
        taskId: string,
        newValue: string,
        todoListId: string
    ) {
        let currentTasks = tasks[todoListId];
        let task = currentTasks.find((task) => task.id === taskId);
        if (task) {
            task.title = newValue;
            setTasks({ ...tasks });
        }
    }

    function removeTodoList(todoListId: string) {
        let filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId);
        delete tasks[todoListId];
        setTasks(tasks);
        setTodoLists(filteredTodoList);
    }

    function addTodoList(title: string) {
        let newTodoList: TodoListType = {
            id: v1(),
            filter: "all",
            title: title,
        };
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({ [newTodoList.id]: [], ...tasks });
        setModalActive(!modalActive);
    }

    function changeTodoListTitle(todoListId: string, newTitle: string) {
        let todoList = todoLists.find((tl) => tl.id === todoListId);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }

    return (
        <ThemeContext.Provider value={theme}>
            <div className={"app-" + theme}>
                <header className="header">
                    <svg
                        width="50"
                        height="50"
                        viewBox="0 0 21 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.008 5.856C4.77333 5.86667 4.57067 5.89867 4.4 5.952C4.22933 6.00533 4.096 6.128 4 6.32C3.91467 6.50133 3.872 6.81067 3.872 7.248V11.648C3.872 12.32 3.94133 12.8747 4.08 13.312C4.22933 13.7387 4.42133 14.08 4.656 14.336C4.90133 14.5813 5.17333 14.7573 5.472 14.864C5.78133 14.9707 6.096 15.0293 6.416 15.04C7.00267 15.0613 7.504 14.9493 7.92 14.704C8.336 14.4587 8.656 14.08 8.88 13.568C9.104 13.056 9.216 12.4053 9.216 11.616V7.424C9.216 7.136 9.22133 6.85867 9.232 6.592C9.24267 6.32533 9.25867 6.12267 9.28 5.984C9.10933 5.99467 8.89067 6.00533 8.624 6.016C8.368 6.016 8.18133 6.02133 8.064 6.032V4.8H11.776V5.856C11.5413 5.86667 11.3387 5.89867 11.168 5.952C10.9973 6.00533 10.864 6.128 10.768 6.32C10.6827 6.50133 10.64 6.81067 10.64 7.248V11.248C10.64 12.1653 10.528 12.944 10.304 13.584C10.08 14.224 9.76533 14.7413 9.36 15.136C8.95467 15.5307 8.48 15.8187 7.936 16C7.392 16.1707 6.8 16.256 6.16 16.256C5.264 16.256 4.51733 16.128 3.92 15.872C3.32267 15.616 2.848 15.2587 2.496 14.8C2.15467 14.3413 1.90933 13.8133 1.76 13.216C1.62133 12.6187 1.552 11.9787 1.552 11.296V7.424C1.552 7.136 1.55733 6.85867 1.568 6.592C1.58933 6.32533 1.60533 6.12267 1.616 5.984C1.44533 5.99467 1.232 6.00533 0.976 6.016C0.72 6.016 0.533333 6.02133 0.416 6.032V4.8H5.008V5.856Z"
                            fill={
                                theme === "dark" ? "white" : "#3d3d3d"
                            }
                        />
                        <path
                            d="M11.848 18V17.296C12.2 17.2747 12.4507 17.2 12.6 17.072C12.76 16.944 12.8613 16.752 12.904 16.496C12.9467 16.24 12.968 15.9147 12.968 15.52V8.864C12.968 8.62933 12.9733 8.40533 12.984 8.192C12.9947 7.968 13.0053 7.776 13.016 7.616C12.8347 7.62667 12.6373 7.63733 12.424 7.648C12.2107 7.65867 12.0187 7.66933 11.848 7.68V6.8H15.784V7.504C15.4427 7.51467 15.192 7.58933 15.032 7.728C14.872 7.856 14.7707 8.048 14.728 8.304C14.6853 8.54933 14.664 8.87467 14.664 9.28V15.904C14.664 16.192 14.6587 16.448 14.648 16.672C14.648 16.8853 14.6373 17.0613 14.616 17.2L17.32 17.168C17.9813 17.1573 18.488 16.944 18.84 16.528C19.192 16.1013 19.368 15.4293 19.368 14.512H20.088L19.992 18H11.848Z"
                            fill={
                                theme === "dark" ? "white" : "#3d3d3d"
                            }
                        />
                    </svg>

                    <Menu>
                        <label
                            className={"toggle-" + theme}
                            htmlFor="darkmode-toggle"
                        >
                            <input
                                id="darkmode-toggle"
                                type="checkbox"
                                className={"toggle-input-" + theme}
                                checked={theme == "dark"}
                                onChange={(e) => {
                                    let currentTheme = theme;
                                    e.target.checked
                                        ? (currentTheme = "dark")
                                        : (currentTheme = "light");
                                    setTheme(currentTheme);
                                }}
                            />
                            <div className={"toggle-fill-" + theme}></div>
                        </label>

                        <button
                            className="add-todo-button"
                            onClick={() => setModalActive(!modalActive)}
                        >
                            <svg
                                width="31"
                                height="36"
                                viewBox="0 0 31 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <line
                                    x1="8"
                                    y1="12.5"
                                    x2="22"
                                    y2="12.5"
                                    stroke={
                                        theme === "dark" ? "#747474" : "#3d3d3d"
                                    }
                                />
                                <rect
                                    x="4"
                                    y="11"
                                    width="3"
                                    height="3"
                                    rx="1"
                                    fill={
                                        theme === "dark" ? "#747474" : "#3d3d3d"
                                    }
                                />
                                <line
                                    x1="8"
                                    y1="17.5"
                                    x2="22"
                                    y2="17.5"
                                    stroke={
                                        theme === "dark" ? "#747474" : "#3d3d3d"
                                    }
                                />
                                <rect
                                    x="4"
                                    y="16"
                                    width="3"
                                    height="3"
                                    rx="1"
                                    fill={
                                        theme === "dark" ? "#747474" : "#3d3d3d"
                                    }
                                />
                                <line
                                    x1="8"
                                    y1="7.5"
                                    x2="22"
                                    y2="7.5"
                                    stroke={
                                        theme === "dark" ? "#747474" : "#3d3d3d"
                                    }
                                />
                                <rect
                                    x="4"
                                    y="6"
                                    width="3"
                                    height="3"
                                    rx="1"
                                    fill={
                                        theme === "dark" ? "#747474" : "#3d3d3d"
                                    }
                                />
                                <path
                                    d="M16.5971 33H5C2.79086 33 1 31.2091 1 29V5C1 2.79086 2.79086 1 5 1H22C24.2091 1 26 2.79086 26 5V20.5"
                                    stroke={
                                        theme === "dark" ? "#747474" : "#3d3d3d"
                                    }
                                />
                                <circle
                                    cx="22.5"
                                    cy="27.5"
                                    r="8"
                                    stroke={
                                        theme === "dark" ? "#fff" : "#3d3d3d"
                                    }
                                />
                                <path
                                    d="M22.5 21.5V33.5"
                                    stroke={
                                        theme === "dark" ? "#fff" : "#3d3d3d"
                                    }
                                />
                                <path
                                    d="M28.5 27.5L16.5 27.5"
                                    stroke={
                                        theme === "dark" ? "#fff" : "#3d3d3d"
                                    }
                                />
                            </svg>
                        </button>
                    </Menu>
                </header>

                <main className="todolists">
                    {todoLists.map((tl) => {
                        let todoListTasks = tasks[tl.id];
                        if (tl.filter === "completed") {
                            todoListTasks = todoListTasks.filter(
                                (t) => t.isDone === true
                            );
                        }
                        if (tl.filter === "active") {
                            todoListTasks = todoListTasks.filter(
                                (t) => t.isDone === false
                            );
                        }

                        return (
                            <TodoList
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={todoListTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilterValue}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                filter={tl.filter}
                                removeTodoList={removeTodoList}
                                changeTaskTitle={changeTaskTitle}
                                changeTodoListTitle={changeTodoListTitle}
                            />
                        );
                    })}
                </main>
                {modalActive ? (
                    <Modal active={modalActive} setActive={setModalActive}>
                        <h2>Add new Todo</h2>
                        <AddItemForm addItem={addTodoList} />
                    </Modal>
                ) : (
                    ""
                )}
                
            </div>
            <Footer />

        </ThemeContext.Provider>
    );
}

export default App;
