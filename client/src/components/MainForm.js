import React, { useState, useContext, useEffect } from 'react';
import { Form, Segment, Header, Button } from "semantic-ui-react";
import Slider from '@material-ui/core/Slider';
import { makeStyles } from "@material-ui/core/styles";
import { MainContext } from "../context/MainContext";

const useStyles = makeStyles(theme => ({
    root: {
      width: 300
    },
    margin: {
      height: theme.spacing(3)
    }
  }));
  
  const marks = [
    {
      value: 0,
      label: "$0"
    },
    {
      value: 500,
      label: "$500K"
    }
  ];
  const marks2 = [
    {
      value: 0,
      label: "$0"
    },
    {
      value: 5000,
      label: "$5000"
    }
  ];

  
  function valuetext(value) {
    return `$${value}K`;
  }
  

function MainForm() {
    const { calculate, state } = useContext(MainContext);

    const [form, setForm] = useState(state.form);

    useEffect(()=>{
        calculate(form)
    }, [form])

    const handleSubmit = e => {
        e.preventDefault();
        console.log(form)
        if ( !form ) return;
        calculate(form)
    }

    const options= [
        { key: '10', text: '10 years', value: 10},
        { key: '15', text: '15 years', value: 15},
        { key: '30', text: '30 years', value: 30},
        { key: '0', text: 'No loan', value: 0}
    ]

    const classes = useStyles();

    return(
        <div className="main">
            <Header as='h2'>Investment Information:</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <div className={classes.root}>
                    <label>Home Value: ${form.purchaseprice/1000}K</label>
                    <Slider
                        defaultValue={100}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-always"
                        step={1}
                        marks={marks}
                        min = {0}
                        max ={500}
                        valueLabelDisplay="off"
                        onChange={ (e, value) => {
                            setForm({...form,
                                purchaseprice: parseInt(value*1000)})
                            console.log(form)
                            }}/>
                    </div>
                    
                    
                </Form.Group>
                <Form.Group>
                    <div className={classes.root}>
                        <label>Rental Income: ${form.rentalincome}</label>
                        <Slider
                            defaultValue={1200}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-always"
                            step={1}
                            marks={marks2}
                            min = {0}
                            max ={5000}
                            valueLabelDisplay="off"
                            onChange={ (e, value) => {
                                setForm({...form,
                                    rentalIncome: parseInt(value)})
                                console.log(form)
                                }}/>
                    </div>
                </Form.Group>
                <Header as='h3'>Loan Information:</Header>
                <Form.Group >
                   <label>Down Payment:</label>
                    <Form.Input lable='$' type="number" placeholder="$0"
                        value={form.downpayment}
                        onChange={ e => {
                            setForm({...form,
                                downpayment: parseInt(e.target.value)})}}/>
                </Form.Group>
                <Form.Group inline >
                    <label>Interest Rate:</label>
                    <Form.Input  type="number" placeholder="3%"
                        value={form.interestrate}
                        onChange={ e => {
                            setForm({...form,
                                interestrate: parseInt(e.target.value)})
                                console.log(form)}}/>
                    <Form.Select
                        fluid
                        label='Loan Term:'
                        options={options}
                        value={form.loanterm}
                        placeholder='years'
                        onChange={ (e,{value}) => {
                            setForm({...form,
                                loanterm: value})
                                console.log(form)}}
                    />
                </Form.Group>
                <Button primary fluid type="submit" >Calculate Expenses and Profitability</Button>
            </Form>
        </div>    
    );
}

export default MainForm;