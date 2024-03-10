import {createSlice} from '@reduxjs/toolkit';

export const resultReducer = createSlice({
    name: 'result',
    initialState: {
        userId: null,
        result: []
    },
    reducers : {
        setUserId: (state: any, action: any) => {
            state.userId = action.payload
        }
    }
});


export const {setUserId} = resultReducer.actions;
export default resultReducer.reducer;