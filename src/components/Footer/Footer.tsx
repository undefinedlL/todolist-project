import { useContext } from "react";
import { ThemeContext } from "../../App";
import "./Footer.css"

const Footer = () => {
    const theme = useContext(ThemeContext);

    return (
        <footer className={"footer-" + theme}>
            
            <div className="withMail">
                <h3>created by Undefined_L</h3>
                <a href="mailto:anastasiasur@icloud.com">
                        anastasiasur@icloud.com
                </a>
            </div>
            

            <nav>
                <a href="https://github.com/Speedwagon10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="45"
                        height="45"
                        viewBox="0,0,256,256"
                    >
                        <g
                            fill={theme === "dark" ? "#ffffff" : "#3d3d3d"}
                            
                        >
                            <g transform="scale(10.66667,10.66667)">
                                <path d="M10.9,2.1c-4.6,0.5 -8.3,4.2 -8.8,8.7c-0.6,5 2.5,9.3 6.9,10.7v-2.3c0,0 -0.4,0.1 -0.9,0.1c-1.4,0 -2,-1.2 -2.1,-1.9c-0.1,-0.4 -0.3,-0.7 -0.6,-1c-0.3,-0.1 -0.4,-0.1 -0.4,-0.2c0,-0.2 0.3,-0.2 0.4,-0.2c0.6,0 1.1,0.7 1.3,1c0.5,0.8 1.1,1 1.4,1c0.4,0 0.7,-0.1 0.9,-0.2c0.1,-0.7 0.4,-1.4 1,-1.8c-2.3,-0.5 -4,-1.8 -4,-4c0,-1.1 0.5,-2.2 1.2,-3c-0.1,-0.2 -0.2,-0.7 -0.2,-1.4c0,-0.4 0,-1 0.3,-1.6c0,0 1.4,0 2.8,1.3c0.5,-0.2 1.2,-0.3 1.9,-0.3c0.7,0 1.4,0.1 2,0.3c1.3,-1.3 2.8,-1.3 2.8,-1.3c0.2,0.6 0.2,1.2 0.2,1.6c0,0.8 -0.1,1.2 -0.2,1.4c0.7,0.8 1.2,1.8 1.2,3c0,2.2 -1.7,3.5 -4,4c0.6,0.5 1,1.4 1,2.3v3.3c4.1,-1.3 7,-5.1 7,-9.5c0,-6 -5.1,-10.7 -11.1,-10z"></path>
                            </g>
                        </g>
                    </svg>
                </a>
                <a href="https://t.me/undefinedl_l">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="40"
                        height="40"
                        viewBox="0,0,256,256"
                    >
                        <g
                            fill={theme === "dark" ? "#ffffff" : "#3d3d3d"}
                            
                        >
                            <g transform="scale(5.12,5.12)">
                                <path d="M25,2c12.703,0 23,10.297 23,23c0,12.703 -10.297,23 -23,23c-12.703,0 -23,-10.297 -23,-23c0,-12.703 10.297,-23 23,-23zM32.934,34.375c0.423,-1.298 2.405,-14.234 2.65,-16.783c0.074,-0.772 -0.17,-1.285 -0.648,-1.514c-0.578,-0.278 -1.434,-0.139 -2.427,0.219c-1.362,0.491 -18.774,7.884 -19.78,8.312c-0.954,0.405 -1.856,0.847 -1.856,1.487c0,0.45 0.267,0.703 1.003,0.966c0.766,0.273 2.695,0.858 3.834,1.172c1.097,0.303 2.346,0.04 3.046,-0.395c0.742,-0.461 9.305,-6.191 9.92,-6.693c0.614,-0.502 1.104,0.141 0.602,0.644c-0.502,0.502 -6.38,6.207 -7.155,6.997c-0.941,0.959 -0.273,1.953 0.358,2.351c0.721,0.454 5.906,3.932 6.687,4.49c0.781,0.558 1.573,0.811 2.298,0.811c0.725,0 1.107,-0.955 1.468,-2.064z"></path>
                            </g>
                        </g>
                    </svg>
                </a>
                
            </nav>
        </footer>
    );
}

export default Footer;