import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addGroupTh, fetchAllGroups, updateGroupTh } from "../thunks/thunks";
import { GroupStateType, GroupType } from "../types/types";


const persistedState = localStorage.getItem('groups')
  ? JSON.parse(localStorage.getItem('groups')!)
  : undefined;


const initialState: GroupStateType = {
  isLoading: false,
  error: undefined,
  groups: persistedState ?? [],
};




const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    getGroups(state, action: PayloadAction<GroupType[]>) {
      state.groups = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGroups.pending, (state) => {
        state.isLoading = true;
     //   console.log("pending");
      })
      .addCase(fetchAllGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = action.payload;
     //   console.log(action.payload);
      })
      .addCase(fetchAllGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      //  console.log(action.payload, "error");
      })
      .addCase(addGroupTh.pending, (state) => {
        debugger
        state.isLoading = true;
        debugger
      //  console.log("pending");
  })
  .addCase(addGroupTh.fulfilled, (state, action) => {
    debugger
    state.isLoading = false;
    state.error = undefined;
    state.groups = [...state.groups, action.payload]
    debugger
   // console.log(action, 'slice')

  })
  .addCase(addGroupTh.rejected, (state, action) => {
    debugger
    state.isLoading = false;
    state.error = action.payload;
    debugger
 //   console.log(action.payload, "error");
  })  
  .addCase(updateGroupTh.pending, (state) => {
    debugger
    state.isLoading = true;
    debugger
  //  console.log("pending");
})
.addCase(updateGroupTh.fulfilled, (state, action) => {
  debugger
  state.isLoading = false;
  state.error = undefined;
debugger
  // Находим индекс группы, которую нужно обновить
  const index = state.groups.findIndex(group => group._id === action.payload._id);
 debugger
  if (index !== -1) {
    debugger
    // Обновляем существующую группу
    state.groups[index] = {...state.groups[index], ...action.payload.updatedGroup};
  } else {
    debugger
    // Если группа не найдена, добавляем новую (по необходимости)
    state.groups = [...state.groups, {...action.payload.updatedGroup, _id: action.payload._id, }]
  }
})
.addCase(updateGroupTh.rejected, (state, action) => {
debugger
state.isLoading = false;
state.error = action.payload;
debugger
//   console.log(action.payload, "error");
})
  },
});

export const { getGroups } = groupsSlice.actions;
export default groupsSlice.reducer;
