import { NavLink } from "react-router-dom";

export default function LinkTo({ to, icon, caption, isShown }) {
    return <NavLink to={to}>
        {icon}
        {/* {isShown ?
            <span className="ml-3 text-xl">{caption}</span>
            : null
        } */}
            <span className={`ease-in-out duration-500 z-0 ${isShown ? 'ml-3 text-xl' : '-translate-x-80'}`}>{caption}</span>
    </NavLink>


}