import { createSlice } from "@reduxjs/toolkit"
import { Position } from "@/types/index"
import { getPositions } from "@/apis/position.api"

type InitialState = {
    data: Position[],
    status: "IDLE" | "PENDING" | "FULFILLED" | "REJECTED",
    error: string | undefined,
}

const initialState: InitialState = {
    data: [],
    status: "IDLE",
    error: undefined,
}

const positionSlice = createSlice({
    name: "position",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getPositions.pending, (state) => {
            // Cập nhật lại giá trị của state
            state.status = "PENDING"
        })
        .addCase(getPositions.fulfilled, (state, action) => {
            state.status = "FULFILLED"
            state.data = action.payload.data
        })
        .addCase(getPositions.rejected, (state, action) => {
            state.status = "REJECTED"
            state.error = action.error.message
        })
    }
})

export default positionSlice.reducer;