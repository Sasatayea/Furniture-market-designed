import { createSlice } from "@reduxjs/toolkit";

const counterSlice=createSlice({
    name:"counter",
    initialState:{counter:0},
    reducers:{
        incCounter:function(state,{type,payload}){
            state.counter+=1 ;
        } ,
        decCounter:function(state,{type,payload}){
            state.counter-=1
        }
        
    }
})

export const {incCounter,decCounter} = counterSlice.actions
export default counterSlice.reducer