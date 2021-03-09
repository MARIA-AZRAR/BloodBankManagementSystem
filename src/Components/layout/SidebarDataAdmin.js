import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"
import * as RiIcons from "react-icons/ri"
import * as ImIcons from "react-icons/im"
import { GrUserManager } from "react-icons/gr";
import { FcManager } from "react-icons/fc";



export const NavbarDataA = [
    {
        title: 'Home',
        path: '/Admin',
        icon: <FaIcons.FaHome />,
        cName: 'nav-text'
    },
    {
        title: 'Manage Blood Stock',
        path: '/Admin/Stock',
        icon: <RiIcons.RiUserSearchLine />,
        cName: 'nav-text'
    },
    {
        title: 'View Requests',
        path: '/Admin/Request',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'View Donations',
        path: '/Admin/Donation',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Manage Users',
        path: '/Admin/User',
        // icon: <ImIcons.ImProfile />,
        icon: <FcManager />,
        cName: 'nav-text'
    },
    {
        title: 'Manage BloodBanks',
        path: '/Admin/BloodBank',
        icon: <ImIcons.ImProfile />,
        cName: 'nav-text'
    }
]