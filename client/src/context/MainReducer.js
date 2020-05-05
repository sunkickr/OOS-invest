
export default (state, action) => {
    switch (action.type) {
        case 'CALCULATE':
            return {
                ...state,
               form: action.payload.newForm,
               expenses: action.payload.expenses,
               financials: action.payload.financials
            }
        case 'CHANGEADDRESS':
            return {
                ...state,
                address: action.payload
            }
        default:
            return state
    }
}