import React, { useContext, useState } from 'react';
import { Menu, Input, Button, Header } from "semantic-ui-react";
import { MainContext } from "../context/MainContext";

export default function MainMenu(){
    const { changeAddress, load, save } = useContext(MainContext);

    const [id, setId] = useState();

    const handleLoad= e => {
        e.preventDefault();
        if (!id) return;
        load(id);
    }  

    const handleSave= e => {
        e.preventDefault();
        if (!id) return;
        save(id);
    }

    return(
        <div>
            <Menu pointing secondary>
                <Menu.Item
                    name='home'>
                    <Input size='large' placeholder='Address'
                        onChange={e => {
                            changeAddress(e.target.value)
                        }}/>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input label='ID' icon='search'
                         placeholder="My Property's ID"
                         onChange={e => {
                             setId(e.target.value)
                         }} />
                    </Menu.Item>
                    <Menu.Item>
                        <Button color="blue" submit={handleLoad}>Load</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button color="red" submit={handleSave} >Save</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    );
}