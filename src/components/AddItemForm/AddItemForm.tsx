import { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import "./AddItemForm.css";
import { ThemeContext } from "../../App";
export type AddingItemFormPropsType = {
    addItem: (title: string) => void;
};

export default function AddItemForm(props: AddingItemFormPropsType) {
    const [newTaskName, setNewTaskName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const theme = useContext(ThemeContext);

    const onChangeNewTaskNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskName(e.currentTarget.value);
    };
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask();
        }
    };
    const onKeyDownHandler = () => {
        if (newTaskName !== "") {
            setError(null);
        }
    };
    const addTask = () => {
        if (newTaskName.trim() !== "") {
            props.addItem(newTaskName.trim());
            setNewTaskName("");
        } else {
            setError("Field can not be empty!");
            
            setTimeout(() => {
                setError(null);
            }, 1500);
        }
    };

    return (
        <>
            <div className="add-item-input-block">
                <div
                    className={
                        error ? "input-form-block-" + theme + " error" : "input-form-block-" + theme
                    }
                >
                    <input
                        value={newTaskName}
                        onChange={onChangeNewTaskNameHandler}
                        onKeyUp={onKeyUpHandler}
                        onKeyDown={onKeyDownHandler}
                        className={
                            error ? "error " + "input-form-" + theme  : "input-form-" + theme
                        }
                        autoFocus
                        placeholder="Enter text..."
                    />
                </div>

                <button className="add-item-button" onClick={addTask}>
                    <svg
                        width="27"
                        height="26"
                        viewBox="0 0 27 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 12.75H25.1429M25.1429 12.75L14.1429 1.1125M25.1429 12.75L14.1429 24.3875"
                            stroke={theme === "dark" ? "white" : "#4c2c15fe"}
                            strokeWidth="2"
                        />
                        <path
                            d="M27 13L14.5652 25L24.1739 13L14 1L27 13Z"
                            fill={theme === "dark" ? "white" : "#4c2c15fe"}
                        />
                    </svg>
                </button>
            </div>
        </>
    );
}
