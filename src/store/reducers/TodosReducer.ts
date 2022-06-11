import { todoGroupType, todoType } from './../../models/models';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    todoGroups: [
        { id: '1', name: 'First todo', todos: [{id: '11', isChecked: false, text: 'first'}, {id: '12', isChecked: true, text: 'second'}, {id: '13', isChecked: false, text: 'third'}] },
        { id: '2', name: 'Second todo', todos: [] },
        { id: '3', name: 'Third todo', todos: [] },
    ] as todoGroupType[]
}

export const TodosReducer = createSlice({
    name: 'todosReducer',
    initialState,
    reducers: {
        todoGroupAdding(state, action: PayloadAction<todoGroupType>) {
            state.todoGroups = [
                ...state.todoGroups,
                action.payload
            ]
        },
        todoAdding(state, action: PayloadAction<{todo: todoType, todoGroupId: string}>) {
            const index = state.todoGroups.find(el => el.id === action.payload.todoGroupId)
            // console.log(state.todoGroups[index])
            console.log(action.payload.todoGroupId)
        }
    }
})

export default TodosReducer.reducer