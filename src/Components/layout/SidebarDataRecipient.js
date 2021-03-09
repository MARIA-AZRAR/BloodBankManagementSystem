import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"
import * as RiIcons from "react-icons/ri"
import * as ImIcons from "react-icons/im"


export const NavbarDataR = [
    {
        title: 'Send Request',
        path: '/Recipient/SendRequest',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    },
    {
        title: 'Search Donors',
        path: '/Recipient/SearchDonor',
        icon: <RiIcons.RiUserSearchLine />,
        cName: 'nav-text'
    },
    {
        title: 'View Requests',
        path: '/Recipient/Request',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/Recipient/Profile',
        icon: <ImIcons.ImProfile />,
        cName: 'nav-text'
    }
]