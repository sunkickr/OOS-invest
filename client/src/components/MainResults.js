import React, { useContext, useState, useEffect } from 'react';
import InfoPopup from './popup';
import delPopup from './delpopup'
import { Table, Grid, Header, GridColumn, Button, Input, Label, Icon} from "semantic-ui-react";
import { MainContext } from "../context/MainContext";
import Chart from "./expensechart";

export default function InfoForm() {
    const { state,changeExpense, calculate } = useContext(MainContext);

    const content1 = 'Yearly return on the downpayment from cashflow only. (yearly cashflow)/(down payment)'

    const content2 = 'Yearly return on the home value from cashflow only. (yearly cashflow)/(home value)'

    const [form, setForm] = useState(state.form);

    const [form1, setForm1] = useState(state.form);

    useEffect(()=>{
        console.log(form)
        changeExpense(form)

    }, [form])

    useEffect(() => {
        calculate(form1)
    }, [form1])

    var expenses = Object.entries(state.expenses);

    const COLORS = ['blue', 'green', 'violet', 'orange', 'teal', 'red', 'purple'];

    var show = Object.values(state.show);

    const click = (expense) => {
        setForm1({...state.form,
            show:{
                expense: expense,
            }});
    }

    const rows = expenses.map ((expense, index)  => (
        <Table.Row>
            <Table.Cell><Button size='tiny' color={COLORS[index]}></Button>{`${expense[0]}: $`}
                <Input
                    style={{width: "60px"}}
                    value={parseInt(expense[1].toFixed(2))}
                    onChange={
                        e => {
                            var amount = parseInt(e.target.value)
                            if(isNaN(parseInt(e.target.value))) {
                                amount = 0
                            }
                            setForm({...state.form,
                                        input:{
                                            expense: expense[0],
                                            amount: amount
                                        }
                                })}
                    }/>

                     <Button size = 'tiny' style={
                         {display:show[index]}} icon 
                         onClick={() => click(expense[0])}><Icon name='delete' /></Button>        
            </Table.Cell>
        </Table.Row> 
    ))


    const data = expenses.map(expense => ({
        name: expense[0], value: parseInt(expense[1])
    }))

    return (
        <div className="main">
            <Header as="h2">Monthly Expenses:</Header>
                {/* <Chart data={data} /> */}
                <Grid columns={2}>
                    <Grid.Row>
                        <GridColumn>
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
                        </GridColumn>
                        <GridColumn>
                            <div className="pie">
                                <Chart data={data}/>
                            </div>
                            
                        </GridColumn>
                    </Grid.Row>
                </Grid>
                <Header as='h2'>1st Year Returns:</Header> 
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <GridColumn>
                                <Header as="h4">Monthly Cash Flow: ${parseInt(state.financials.mcashflow)}
                                    
                                </Header>
                                <Header as="h4">ROI(Down Payment): {parseInt(state.financials.dproi)}%
                                    <InfoPopup content={content1} />
                                </Header>
                            </GridColumn>
                            <GridColumn>
                                <Header as="h4">Yearly Cash Flow: ${parseInt(state.financials.ycashflow)}</Header>
                                <Header as="h4">ROI(Home Value): ${parseInt(state.financials.hvroi)}%
                                <InfoPopup content={content2} />
                               
                                </Header>
                            </GridColumn>
                        </Grid.Row>
                    </Grid>
        </div>
        
    );
}