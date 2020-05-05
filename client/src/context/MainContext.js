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
          loanterm: 30
      },
      expenses:{},
      financials:{}
};

// Create context
export const MainContext = createContext(initialState);
// Provider component
export const MainContextProvider = props => {
    const [state, dispatch] = useReducer(MainReducer, initialState);

    // Actions
    function calculate(form) {
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
        const expenses = {
                mortage: mo,
                taxes: ri*.15,
                insurance: ri*.03,
                capex: ri*.05,
                vacancy: ri*.03,
                repairs: ri*.04,
                propertymanagement:ri*.1,
        };
        const et = Object
            .values(expenses)
            .reduce((acc, item) => (acc += item), 0);

        const financials = {
            expensetotal : et,
            mcashflow: ri - et,
            ycashflow: 12*(ri-et),
            dproi: ((ri-et)*12)/(pp-la)*100,
            hvroi: ((ri-et)*12)/(pp)*100
        };

        dispatch({
            type: 'CALCULATE',
            payload:{
                expenses,
                financials,
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

