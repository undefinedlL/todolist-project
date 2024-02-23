import { ChangeEvent, useContext, useState } from "react";
import "./EditableSpan.css";
import { ThemeContext } from "../../App";

type EditableSpanType = {
    title: string;
    onChange: (newValue: string) => void;
};

const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [error, setError] = useState(false);
    const theme = useContext(ThemeContext);

    const activateEditMode = () => setEditMode(true);
    const exitEditMode = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length != 0) {
                setEditMode(false);
                props.onChange(title);
        } else {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 1500);
        }
    };
    const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length != 0) {
            setError(false);
            if (e.code === "Enter") {
                setEditMode(false);
                props.onChange(title);
            }
        } else {
            setError(true);
        }
    };

    return editMode ? (
        <>
            <input
                className={error ? "editable-span-" + theme + " error-input" : "editable-span-" + theme}
                value={title}
                onBlur={exitEditMode}
                onKeyUp={onKeyUpHandler}
                onChange={onChangeTaskTitleHandler}
                autoFocus
            />
            <button className="editable-span-button">
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 6.04L6.16129 15L17 1"
                        stroke={theme === "dark" ? "white" : "#381d0f"}
                        stroke-width="2"
                    />
                </svg>
            </button>
        </>
    ) : (
        <span className="item-title-span" onDoubleClick={activateEditMode}>
            {props.title}
            <button className="span-edition-button" onClick={activateEditMode}>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.07965 11.8257L5.6525 13.2528M5.6525 13.2528L0.972114 14.8519L2.57123 10.1716M5.6525 13.2528L2.57123 10.1716M2.57123 10.1716L11.705 1.03775L14.7863 4.11901L10.2194 8.68592"
                        stroke={theme === "dark" ? "#fff" : "#26130a"}
                    />
                </svg>
            </button>
        </span>
    );
};

export default EditableSpan;
