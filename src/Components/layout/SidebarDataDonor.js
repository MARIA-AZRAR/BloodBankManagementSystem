import React from 'react'
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"
import * as RiIcons from "react-icons/ri"
import * as ImIcons from "react-icons/im"


export const NavbarDataD = [
    {
        title: 'Donations Made',
        path: '/Donor',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    },
    {
        title: 'Blood Requests',
        path: '/Donor/Requests',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/Donor/Profile',
        icon: <ImIcons.ImProfile />,
        cName: 'nav-text'
    },
    {
        title: 'Make Donation',
        path: '/Donor/MakeDonations',
        icon: <RiIcons.RiUserSearchLine  />,
        cName: 'nav-text'
    }
]