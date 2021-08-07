import React from 'react'
import '../css/homeleft.css'
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';

const Homeleft = () => {
    return (
        <div className="homeleft">
            <HomeIcon />
            <PeopleIcon />
            <DescriptionIcon />
            <LibraryAddCheckIcon />
            <AssignmentIndIcon />
        </div>
    )
}

export default Homeleft
