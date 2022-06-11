export type todoType = {
    id: string
    text: string
    isChecked: boolean
    isActive: boolean
}
export type todoGroupType = {
    id: string
    name: string
    todos: todoType[]
    countDoneTodos: number
    countTodos: number
}
export type PagesTypes = 'main' | 'todoForm'