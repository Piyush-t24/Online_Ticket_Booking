import React from "react";

//Now i get access to all the icons
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md";
import Events from "../../Events";
import Faq from "../../faqs/Faq";
import Find from "../../Find";
import Categories from "../../Categories";
import FeaturedEvents from "../../FeaturedEvents";

export const SidebarData = [
    {
        title: "Adventures",
        to: "events",
        element: <Events />,
        icon: <FaIcons.FaCalendarAlt />,
        cName: "nav-text"
    },
    {
        title: "Featured",
        to: "featured",
        element: <FeaturedEvents />,
        icon: <AiIcons.AiFillStar />,
        cName: "nav-text"
    },
    {
        title: "Categories",
        to: "categories",
        element: <Categories />,
        icon: <BiIcons.BiCategoryAlt />,
        cName: "nav-text"
    },
    {
        title: "Find",
        to: "find",
        element: <Find />,
        icon: <FaIcons.FaSearch />,
        cName: "nav-text"
    },
    {
        title: "FAQs",
        to: "faq",
        element: <Faq />,
        icon: <MdIcons.MdHelpOutline />,
        cName: "nav-text"
    }
];