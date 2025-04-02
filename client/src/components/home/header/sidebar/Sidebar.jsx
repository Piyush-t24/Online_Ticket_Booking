import React, { useRef, useState, useEffect } from "react";

// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { SidebarData } from "./SidebarData";

// STYLES
import "./Sidebar.css";
import { Link } from 'react-scroll'

export default function Sidebar() {

    const [sidebar, setSidebar] = useState(false);
    const dropdownRef = useRef(null)
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setSidebar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: "white" }}>
                {/* All the icons now are black */}
                <FaIcons.FaBars color="black" size={20} className="cursor-pointer hover:scale-110 transition-transform" onClick={showSidebar} />
                <nav ref={dropdownRef} className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items">
                        <li className="navbar-toggle">
                            <h3 className="text-2xl font-bold text-white">HeritageHub</h3>
                            <AiIcons.AiOutlineClose className="cursor-pointer hover:scale-110 transition-transform" size={20} onClick={showSidebar} />
                        </li>

                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.to} smooth={true} duration={500}>
                                        {item.icon}
                                        <span className="ml-4">{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}
