import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

const style  = {
    borderRadius: 0,
    opacity: .7,
    padding: '2em',
}

const delPopup = (click) => (

    <Popup
        trigger={<Button icon='info' />}
        content='Click to re-estimate cost.'
        style={style}
        inverted
        onClick = {click}
    />
)

export default delPopup