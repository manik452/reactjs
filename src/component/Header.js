import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAddTask }) => {
    const onClick = (e) => {
        console.log('click');
    }

    return (
        <header className='header'>
            <h1>{title} </h1>
            <Button onClick={onAdd} color={showAddTask ? 'red' : 'green'} text={showAddTask ? 'Cancle': 'Add'} /> 
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.protoTypes = {
    title: PropTypes.string.isRequired,
}


const headerStyle = { color: 'red', backgroundColor: 'black' }
export default Header