import React, { useReducer, createContext } from 'react';
import MainReducer from './MainReducer';
import axios from 'axios';
// Intial state of application
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
    // Calculate the expenses and Results 
    function calculate(form1) {
        console.log(form1)
        // varibles start at 0 becasue certain options default the varibles to 0
        var pp = 0; // purchaseprice
        var ri = 0; // rental income 
        var la = 0; // full mortgage amount pp - dp
        var ir = 0; // interest rate 
        var lt = 0; // loan term 
        var mo = 0; // mortage
        var pr = 0; // downpayment percentage 
        var dp = form1.downpayment // downpayment

        // conditionals on purchase price and reantal income 
        if (form1.purchaseprice){
            pp = form1.purchaseprice;
        }else{

        }
        if (form1.rentalincome){
            ri = form1.rentalincome;
        }

        // Condtionals on loan information
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

        // Calcualte mortage 

        ir = form1.interestrate/100/12;
        lt = form1.loanterm*12;
        mo = la*((ir*(1+ir)**lt)/(((1+ir)**lt)-1));
        console.log(form1.interestrate)

        // Condtionals for loan information

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

        //Calcualte expenses

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

        // Remove selected expenses from expense state and show state 

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

        // Calculate Results

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

        //new form

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
        
        // dispatch to the the payload to the reducer 

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

    // Change expense to custom expense

    function changeExpense(form) {
    
        // varibles start at 0 becasue certain options default the varibles to 0
        var pp = 0; // purchaseprice
        var ri = 0; // rental income 
        var la = 0; // full mortgage amount pp - dp
        var ir = 0; // interest rate 
        var lt = 0; // loan term 
        var mo = 0; // mortage
        var dp = form.downpayment // downpayment

        // Form condtionals 
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

        // Calculate mortage 

        ir = form.interestrate/100/12;
        lt = form.loanterm*12;
        mo = la*((ir*(1+ir)**lt)/(((1+ir)**lt)-1));
        console.log(form.interestrate)

        // Loan condtionals 

        if (isNaN(form.interestrate) || isNaN(form.loanterm)){
            mo = 0
            dp = 0
        }

        if (form.loanterm === 0 || form.interestrate === 0){
            mo = 0
            dp = 0
        } ;

        // Add custom expense into expenses list 

       var newExpenses = state.expenses;
       const keys = Object.keys(newExpenses);
       var values = Object.values(newExpenses);
       
       keys.forEach((expense,index) => {
           if(expense == form.input.expense){
               values[index] = form.input.amount
           }
           newExpenses[expense] = values[index]
       });

       // updated list of expenses that show delete button 

        var show = state.show
        var selected = state.selected

        selected[form.input.expense] = form.input.amount
        
        show[form.input.expense] = 'inline'
    
        console.log(selected)

        // Calculate results

        const et = Object
            .values(newExpenses)
            .reduce((acc, item) => (acc += item), 0);

       var dproi = ((ri-et)*12)/(pp-la)*100

            // Results condtionals

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

        //Dispatch payload to Reducer

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

    // Change Address 

    function changeAddress(address) {
        dispatch({
            type: 'CHANGEADDRESS',
            payload:{
                address
            }
        });
    }

    // load 

    function load() {
        return
    }

    // save 

    function save() {
        return
    }

    // MainContext provider 

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

