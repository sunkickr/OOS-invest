import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

const style  = {
    borderRadius: 0,
    opacity: 1,
    padding: '2em',
}

const InfoPopup = (content) => (
    <Popup
        trigger={<Button icon='info' />}
        content={content}
        style={style}
        inverted
    />
)

export default InfoPopup