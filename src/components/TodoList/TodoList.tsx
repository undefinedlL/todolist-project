import { ChangeEvent, useContext, useState } from "react";
import { FilteredIsDoneValuesType } from "../../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import "./TodoList.css";
import { ThemeContext } from "../../App";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string, todoListId: string) => void;
    changeFilter: (value: FilteredIsDoneValuesType, todoListId: string) => void;
    addTask: (title: string, todoListId: string) => void;
    changeTaskStatus: (
        taskId: string,
        isDone: boolean,
        todoListId: string
    ) => void;
    filter: FilteredIsDoneValuesType;
    removeTodoList: (todoListId: string) => void;
    changeTodoListTitle: (todoListId: string, newTitle: string) => void;
    changeTaskTitle: (id: string, newValue: string, todoListId: string) => void;
};

export const TodoList = (props: PropsType) => {
    const theme = useContext(ThemeContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isAddTask, setIsAddTask] = useState(false);

    const onClickAllValuesHandler = () => props.changeFilter("all", props.id);
    const onClickActiveValuesHandler = () =>
        props.changeFilter("active", props.id);
    const onClickCompletedValuesHandler = () =>
        props.changeFilter("completed", props.id);

    const removeTodoList = () => {
        props.removeTodoList(props.id);
    };

    const addTask = (title: string) => {
        props.addTask(title, props.id);
        setIsAddTask(false);
    };
    const changeTodoListTitleHandler = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle);
    };

    const openAddingTaskBlock = () => {
        setIsAddTask(!isAddTask);
    };

    return (
        <div className={"todolist-container-" + theme}>
            <button className="todolist-delete-button" onClick={removeTodoList}>
                <svg
                    width="27"
                    height="27"
                    viewBox="0 0 37 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M27.2677 9.26772L9.59005 26.9454"
                        stroke={theme === "dark" ? "#747474" : "#381d0f"}
                        strokeWidth="2"
                    />
                    <path
                        d="M27.2677 26.9454L9.59006 9.26773"
                        stroke={theme === "dark" ? "#747474" : "#381d0f"}
                        strokeWidth="2"
                    />
                </svg>
            </button>

            <div className={"todolist-" + theme}>
                <h3 className="todolist-title">
                    {" "}
                    <EditableSpan
                        title={props.title}
                        onChange={changeTodoListTitleHandler}
                    />
                    <br />
                </h3>

                <div className="todolist-options">
                    <span
                        className={
                            isOpen
                                ? `tasks-open-button-${theme} open`
                                : `tasks-open-button-${theme} close`
                        }
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    ></span>
                </div>
            </div>

            <div
                className={
                    isOpen ? "todolist-content-" + theme + " open" : "todolist-content-" + theme
                }
            >
                <div className="todolist-content-inner">
                    <ul className="task-list">
                        {props.tasks.map((task) => {
                            const onClickRemoveHandler = () =>
                                props.removeTask(task.id, props.id);
                            const onChangeStatusHandler = (
                                e: ChangeEvent<HTMLInputElement>
                            ) => {
                                props.changeTaskStatus(
                                    task.id,
                                    e.currentTarget.checked,
                                    props.id
                                );
                            };
                            const onChangeTaskTitleHandler = (
                                newValue: string
                            ) => {
                                props.changeTaskTitle(
                                    task.id,
                                    newValue,
                                    props.id
                                );
                            };

                            return (
                                <li
                                    key={task.id}
                                    className={
                                        task.isDone ? "task-is-done" : ""
                                    }
                                >
                                    
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={onChangeStatusHandler}
                                            checked={task.isDone}
                                        />
                                        <span
                                            className={"task-checkbox-" + theme}
                                        ></span>
                                    </label>

                                    <EditableSpan
                                        title={task.title}
                                        onChange={onChangeTaskTitleHandler}
                                    />
                                    <button
                                        className="del-button"
                                        onClick={onClickRemoveHandler}
                                    >
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 17 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <line
                                                x1="0.707107"
                                                y1="1.29289"
                                                x2="15.7071"
                                                y2="16.2929"
                                                stroke={
                                                    theme === "dark"
                                                        ? "white"
                                                        : "#4a3226"
                                                }
                                                strokeWidth="2"
                                            />
                                            <line
                                                x1="15.7035"
                                                y1="1.7107"
                                                x2="0.703499"
                                                y2="16.5587"
                                                stroke={
                                                    theme === "dark"
                                                        ? "white"
                                                        : "#4a3226"
                                                }
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className={"tasks-filter-buttons-" + theme}>
                        <button
                            className={
                                props.filter === "all"
                                    ? "active-filtered-tasks"
                                    : ""
                            }
                            onClick={onClickAllValuesHandler}
                        >
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 21 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    width="9.09091"
                                    height="9.09091"
                                    rx="2"
                                    fill={theme === "dark" ? "white" : "#271a14"}
                                />
                                <rect
                                    x="0.5"
                                    y="11.4091"
                                    width="8.09091"
                                    height="8.09091"
                                    rx="1.5"
                                    stroke={theme === "dark" ? "white" : "#271a14"}
                                />
                                <rect
                                    x="11.4091"
                                    y="0.5"
                                    width="8.09091"
                                    height="8.09091"
                                    rx="1.5"
                                    stroke={theme === "dark" ? "white" : "#271a14"}
                                />
                                <rect
                                    x="11.5"
                                    y="11.5"
                                    width="8.09091"
                                    height="8.09091"
                                    rx="1.5"
                                    stroke={theme === "dark" ? "white" : "#271a14"}
                                />
                            </svg>
                        </button>
                        <button
                            className={
                                props.filter === "active"
                                    ? "active-filtered-tasks"
                                    : ""
                            }
                            onClick={onClickActiveValuesHandler}
                        >
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.0657 3.2792V11.4748C11.0657 11.5777 11.0224 11.6758 10.9465 11.7453V11.7453L6.91148 15.4349"
                                    stroke={theme === "dark" ? "white" : "#271a14"}
                                />
                                <path
                                    d="M19.3741 14.6752L18.8247 15.8808C17.4618 18.8719 14.5395 20.8484 11.2561 21V21L10.8136 20.9789C5.17256 20.71 0.87445 15.8243 1.32651 10.195L1.37171 9.6322C1.76322 4.75689 5.90035 1 10.7913 1V1C15.6034 1 19.6753 4.69308 20.0664 9.4892V9.4892"
                                    stroke={theme === "dark" ? "white" : "#271a14"}
                                />
                                <path
                                    d="M19.6143 12.396L20.0664 15.4349L20.7588 18.4739L18.2295 16.9543L15.4601 16.9543L19.6143 12.396Z"
                                    fill={theme === "dark" ? "white" : "#271a14"}
                                />
                            </svg>
                        </button>
                        <button
                            className={
                                props.filter === "completed"
                                    ? "active-filtered-tasks"
                                    : ""
                            }
                            onClick={onClickCompletedValuesHandler}
                        >
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 9V4C21 2.34315 19.6569 1 18 1H4C2.34315 1 1 2.34315 1 4V18C1 19.6569 2.34315 21 4 21H18C19.6569 21 21 19.6569 21 18V17.5"
                                    stroke={theme === "dark" ? "white" : "#271a14"}
                                />
                                <path
                                    d="M3.66667 5.66667C3.66667 4.5621 4.5621 3.66667 5.66667 3.66667H16.3333C17.4379 3.66667 18.3333 4.5621 18.3333 5.66667V16.3333C18.3333 17.4379 17.4379 18.3333 16.3333 18.3333H5.66667C4.5621 18.3333 3.66667 17.4379 3.66667 16.3333V5.66667Z"
                                    fill={theme === "dark" ? "white" : "#271a14"}
                                />
                            </svg>
                        </button>

                        <button
                            onClick={openAddingTaskBlock}
                            className={isAddTask ? "active" : ""}
                        >
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="10"
                                    cy="10"
                                    r="9.5"
                                    stroke={theme === "dark" ? "white" : "#271a14"}
                                />
                                <path
                                    d="M10.0854 2.58065L10.0854 17.4194"
                                    stroke={theme === "dark" ? "white" : "#271a14"}
                                />
                                <path
                                    d="M17.4194 10L2.75143 10"
                                    stroke={theme === "dark" ? "white" : "#271a14"}
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        className={
                            isAddTask ? "add-task-block open" : "add-task-block"
                        }
                    >
                        <div className="add-task-block-content">
                            <AddItemForm addItem={addTask} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
