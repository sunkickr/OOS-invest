
export default (state, action) => {
    switch (action.type) {
        case 'CALCULATE':
            return {
                ...state,
               form: action.payload.newForm,
               expenses: action.payload.expenses,
               financials: action.payload.financials,
               show: action.payload.show,
            }
        case 'CHANGEADDRESS':
            return {
                ...state,
                address: action.payload
            }
        case 'CHANGEEXPENSE':
            return {
                ...state,
                expenses: action.payload.newExpenses,
                financials: action.payload.newFinancials,
                selected: action.payload.selected,
                show: action.payload.show,
                
            }
        default:
            return state
    }
}