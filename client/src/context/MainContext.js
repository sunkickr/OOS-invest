import React, { useReducer, createContext } from 'react';
import MainReducer from './MainReducer';
import axios from 'axios';

const initialState = { 
    address: "",
      form:{
          purchaseprice: 100000,
          rentalincome: 1200,
          downpayment: 20000,
          interestrate: 4,
          loanterm: 30,
          mortgage: 80000,
          percentage: 20,
          toggle: "purchaseprice",
            input:{
                expense: "",
                amount: ""
            },
            show:{ 
                expense: ""
            }
      },
      expenses:{
        mortage: 381,
        taxes: 180,
        insurance: 100,
        capex: 60,
        vacancy: 36,
        repairs: 48,
        propertymanagement:120,
      },
      selected: {},
      financials:{},
      show:{
        mortage: 'none',
        taxes: 'none',
        insurance: 'none',
        capex: 'none',
        vacancy: 'none',
        repairs: 'none',
        propertymanagement:'none',
      },
};

// Create context
export const MainContext = createContext(initialState);
// Provider component
export const MainContextProvider = props => {
    const [state, dispatch] = useReducer(MainReducer, initialState);

    // Actions
    function calculate(form1) {
        console.log(form1)
        var pp = 0;
        var ri = 0;
        var la = 0;
        var ir = 0;
        var lt = 0;
        var mo = 0;
        var pr = 0;
        var dp = form1.downpayment
        if (form1.purchaseprice){
            pp = form1.purchaseprice;
        }else{

        }
        if (form1.rentalincome){
            ri = form1.rentalincome;
        }

        if (form1.toggle === "percentage") {
            dp = pp*form1.percentage/100
            la = pp - dp
            pr = form1.percentage
        }
        if (form1.toggle === "purchaseprice") {
            pr = form1.percentage
            dp = pp*pr/100
            la = pp - dp   
        }
        if (form1.toggle === "mortgage") {
            la = form1.mortgage
            dp = pp - la
            pr = dp/pp*100
        }
        if (form1.toggle === "downpayment") {
            la = pp - form1.downpayment
            dp = form1.downpayment
            pr = dp/pp*100
        }

        ir = form1.interestrate/100/12;
        lt = form1.loanterm*12;
        mo = la*((ir*(1+ir)**lt)/(((1+ir)**lt)-1));
        console.log(form1.interestrate)

        if (isNaN(form1.interestrate) || isNaN(form1.loanterm)){
            mo = 0
            dp = 0
            ir = 0
            lt = 0
            la = 0
        }

        if (form1.loanterm === 0 || form1.interestrate === 0){
            mo = 0
            dp = 0
            ir = 0
            lt = 0
            la = 0
        } ;

        var expenses = {
                mortage: mo,
                taxes: ri*.15,
                insurance: 100,
                capex: ri*.05,
                vacancy: ri*.03,
                repairs: ri*.04,
                propertymanagement:ri*.1,
        };

        console.log(expenses)

        var selected = state.selected
        
        if (form1.show.expense != ""){
            delete selected[form1.show.expense]
        }
        const show = state.show

        const keys1 = Object.keys(state.show)

        keys1.forEach((expense) => {
            if(expense == form1.show.expense){
                show[expense] = 'none'
            }
        })

        const keys = Object.keys(selected);
        var values = Object.values(selected);
       
        keys.forEach((expense,index) => {
            if(expense in expenses ){
                expenses[expense] = values[index]
            }
        });

        

        console.log(expenses)

        const et = Object
            .values(expenses)
            .reduce((acc, item) => (acc += item), 0);

        var dproi = ((ri-et)*12)/(pp-la)*100

        if (isNaN(form1.interestrate) || isNaN(form1.loanterm)){
            dproi = ((ri-et)*12)/(pp)*100
        }

        if (form1.loanterm === 0 || form1.interestrate === 0){
            dproi = ((ri-et)*12)/(pp)*100
        } ;

        const financials = {
            expensetotal : et,
            mcashflow: ri - et,
            ycashflow: 12*(ri-et),
            dproi: dproi,
            hvroi: ((ri-et)*12)/(pp)*100
        };

        const newForm = {
            purchaseprice: pp,
            rentalincome: ri,
            downpayment: dp,
            interestrate: ir*100*12,
            loanterm: lt/12,
            mortgage: la,
            percentage: pr,
            toggle: form1.toggle,
            show: {
                expense: ""
            },
        };
        console.log(newForm)
        

        dispatch({
            type: 'CALCULATE',
            payload:{
                newForm,
                expenses,
                financials,
                show,
            }
        });
    }

    function changeExpense(form) {
        
        var pp = 0;
        var ri = 0;
        var la = 0;
        var ir = 0;
        var lt = 0;
        var mo = 0;
        var dp = form.downpayment
        if (form.purchaseprice){
            pp = form.purchaseprice;
        }else{

        }
        if (form.rentalincome){
            ri = form.rentalincome;
        }
        if (form.downpayment && form.downpayment<form.purchaseprice){
            la = pp - form.downpayment;
        }else {
            la = pp;
        }
        ir = form.interestrate/100/12;
        lt = form.loanterm*12;
        mo = la*((ir*(1+ir)**lt)/(((1+ir)**lt)-1));
        console.log(form.interestrate)
        if (isNaN(form.interestrate) || isNaN(form.loanterm)){
            mo = 0
            dp = 0
        }

        if (form.loanterm === 0 || form.interestrate === 0){
            mo = 0
            dp = 0
        } ;

       var newExpenses = state.expenses;
       const keys = Object.keys(newExpenses);
       var values = Object.values(newExpenses);
       
       keys.forEach((expense,index) => {
           if(expense == form.input.expense){
               values[index] = form.input.amount
           }
           newExpenses[expense] = values[index]
       });

    var show = state.show
    var selected = state.selected

    selected[form.input.expense] = form.input.amount
    
    show[form.input.expense] = 'inline'
  
    console.log(selected)

    const et = Object
        .values(newExpenses)
        .reduce((acc, item) => (acc += item), 0);

       var dproi = ((ri-et)*12)/(pp-la)*100

        if (isNaN(form.interestrate) || isNaN(form.loanterm)){
            dproi = ((ri-et)*12)/(pp)*100
        }

        if (form.loanterm === 0 || form.interestrate === 0){
            dproi = ((ri-et)*12)/(pp)*100
        } ;

        const newFinancials = {
            expensetotal : et,
            mcashflow: ri - et,
            ycashflow: 12*(ri-et),
            dproi: dproi,
            hvroi: ((ri-et)*12)/(pp)*100
        };

        console.log(newExpenses)

        dispatch({
            type: 'CHANGEEXPENSE',
            payload: {
                newExpenses,
                newFinancials,
                selected,
                show,
            }
        });


    }

    function changeAddress(address) {
        dispatch({
            type: 'CHANGEADDRESS',
            payload:{
                address
            }
        });
    }

    function load() {
        return
    }

    function save() {
        return
    }



    return (
        <MainContext.Provider value={{
            changeExpense,
            changeAddress,
            calculate,
            load,
            save,
            state
        }}>
            {props.children}
        </MainContext.Provider>
    )
}

