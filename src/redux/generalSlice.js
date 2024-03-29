import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    showLoader:false
}

const generalSlice = createSlice({
    name:'general',
    initialState:INITIAL_STATE,
    reducers:{
        showHideLoader:(state,action)=>{
            state.showLoader=action.payload
        },
    }
})

export const {showHideLoader} = generalSlice.actions
export default generalSlice.reducer