import { todoGroupType, todoType } from './../../models/models';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    todoGroups: [
        { id: '1', name: 'First todo', countDoneTodos: 1, countTodos: 3,  todos: [{id: '11', isChecked: false, text: 'first', isActive: false}, {id: '12', isChecked: true, text: 'second', isActive: false}, {id: '13', isChecked: false, text: 'third', isActive: false}] },
        { id: '2', name: 'Second todo', countDoneTodos: 0, countTodos: 0, todos: [] },
        { id: '3', name: 'Third todo', countDoneTodos: 0, countTodos: 0, todos: [] },
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
        todoGroupUpdating(state, action: PayloadAction<todoGroupType>) {
            state.todoGroups.find( el => el.id === action.payload.id)
                .name = action.payload.name
        },
        todoAdding(state, action: PayloadAction<{todo: todoType, todoGroupId: string}>) {
            state.todoGroups.find(el => el.id === action.payload.todoGroupId).todos = [
                ...state.todoGroups.find(el => el.id === action.payload.todoGroupId).todos,
                action.payload.todo
            ]
            state.todoGroups.find(el => el.id === action.payload.todoGroupId).countTodos++
        },
        todoUpdating(state, action: PayloadAction<{todo: todoType, todoId: string, todoGroupId: string}>) {
            let todo = state.todoGroups.find(el => el.id === action.payload.todoGroupId).todos
                .find( el => el.id === action.payload.todoId) 
            todo.text = action.payload.todo.text
            todo.isActive = action.payload.todo.isActive
            if (action.payload.todo.isChecked !== todo.isChecked) {
                todo.isChecked = action.payload.todo.isChecked
                state.todoGroups.find(el => el.id === action.payload.todoGroupId).countDoneTodos++
            }
        },
        todoDeleting(state, action: PayloadAction<{todo: todoType, todoGroupId: string}>) {
            const isChecked = state.todoGroups.find( el => el.id === action.payload.todoGroupId).todos
                .find( el => el.id === action.payload.todo.id).id
            state.todoGroups.find( el => el.id === action.payload.todoGroupId)
                .todos = [
                    ...state.todoGroups.find( el => el.id === action.payload.todoGroupId).todos
                        .filter( el => el.id != action.payload.todo.id)
                ]
            state.todoGroups.find(el => el.id === action.payload.todoGroupId).countTodos--
            
            if (isChecked) {
                state.todoGroups.find(el => el.id === action.payload.todoGroupId).countDoneTodos--
            }
        }
    }
})

export default TodosReducer.reducer