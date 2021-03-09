import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"
import * as RiIcons from "react-icons/ri"
import * as ImIcons from "react-icons/im"


export const NavbarDataB = [
    {
        title: 'Home',
        path: '/BloodBank',
         icon: <FaIcons.FaHome />,
        cName: 'nav-text'
    },
    {
        title: 'Manage Blood Stock',
        path: '/BloodBank/Stock',
        icon: <RiIcons.RiUserSearchLine />,
        cName: 'nav-text'
    },
    {
        title: 'View Requests',
        path: '/BloodBank/Request',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Manage Donors',
        path: '/BloodBank/Donor',
        icon: <ImIcons.ImProfile />,
        cName: 'nav-text'
    },
    {
        title: 'Manage Reciever',
        path: '/BloodBank/Reciever',
        icon: <ImIcons.ImProfile />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/BloodBank/Profile',
        icon: <ImIcons.ImProfile />,
        cName: 'nav-text'
    }
]