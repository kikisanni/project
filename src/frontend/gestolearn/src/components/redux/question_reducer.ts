import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const questionReducer = createSlice({
    name: 'questions',
    initialState: {
        queue: [],
        answers: [],
        trace: 0
    },
    reducers: {
        startExamAction: (state: any, action: PayloadAction<any>) => {
            
            state.queue = action.payload;
        },
        
    }
});

export const { startExamAction } = questionReducer.actions;

export default questionReducer.reducer;
