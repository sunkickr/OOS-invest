import React, { useContext } from 'react';
import '../App.css';
import MainMenu from './MainMenu';
import MainForm from './MainForm';
import MainResults from './MainResults';
import { Segment, Grid, GridColumn } from "semantic-ui-react";
import { MainContext } from "../context/MainContext";


 export default function MainView() {

    return (
        <Segment>
            <MainMenu />
            <Grid columns={2} divided>
                <Grid.Row>
                    <GridColumn>
                        <MainForm /> 
                    </GridColumn> 
                    <GridColumn>
                        <MainResults />
                    </GridColumn> 
                </Grid.Row>
            </Grid>
        </Segment>
    );
}