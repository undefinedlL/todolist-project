import './Menu.css';

type MenuType = {
    children: React.ReactNode;
}

const Menu = (props: MenuType) => {

    return (
        <div className="menu">
            {props.children}
        </div>
    )
}

export default Menu;