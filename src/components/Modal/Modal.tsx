import "./Modal.css";
import { ThemeContext } from "../../App";
import { useContext } from "react";

type ModalType = {
    active: boolean
    setActive: (value: boolean) => void;
    children: React.ReactNode;
};

const Modal = (props: ModalType) => {
    const theme = useContext(ThemeContext);

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            props.setActive(false);
        }
    };

    return (
        <div
            className={"modal-" + theme}
            onKeyDown={onKeyDownHandler}
            onClick={() => props.setActive(false)}
        >
            <div
                className={"modal-content-" + theme}
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                type="button" 
                className="close-modal-button"
                onClick={() => props.setActive(false)}>
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
                            stroke={theme === "dark" ? "white" : "#4c2c15fe"}
                            stroke-width="2"
                        />
                        <line
                            x1="15.7035"
                            y1="1.7107"
                            x2="0.703499"
                            y2="16.5587"
                            stroke={theme === "dark" ? "white" : "#4c2c15fe"}
                            stroke-width="2"
                        />
                    </svg>
                </button>

                {props.children}
            </div>
        </div>
    );
};

export default Modal;
