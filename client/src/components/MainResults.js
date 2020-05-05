import React, { useContext } from 'react';
import { Table, Grid, Header, GridColumn } from "semantic-ui-react";
import { MainContext } from "../context/MainContext";

export default function InfoForm() {
    const { state } = useContext(MainContext);

    var expenses = Object.entries(state.expenses);

    const rows = expenses.map(expense => (
        <Table.Row>
            <Table.Cell>{`${expense[0]}: $${parseInt(expense[1].toFixed(2))}`}</Table.Cell>
        </Table.Row>
    ))



    return (
        <div className="main">
            <Header as="h2">Monthly Expenses:</Header>
                <Table>
                    <Table.Body>
                        {rows}
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell>
                                Total:${parseInt(state.financials.expensetotal)}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <Header as='h2'>Results:</Header>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <GridColumn>
                                <Header as="h4">Monthly Cash Flow: ${parseInt(state.financials.mcashflow)}</Header>
                                <Header as="h4">ROI(Down Payment): {parseInt(state.financials.dproi)}%</Header>
                            </GridColumn>
                            <GridColumn>
                                <Header as="h4">Yearly Cash Flow: ${parseInt(state.financials.ycashflow)}</Header>
                                <Header as="h4">ROI(Home Value): ${parseInt(state.financials.hvroi)}%</Header>
                            </GridColumn>
                        </Grid.Row>
                    </Grid>
        </div>
        
    );
}