import { FC, useState } from "react"
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { useAppDispatch } from "../../hooks/hooks"
import { PagesTypes, todoGroupType, todoType } from "../../models/models"
import { TodosReducer } from "../../store/reducers/TodosReducer"
import { CustomButton } from "../common/button"
import { FormFooter } from "./formFooter/formFooter"
import { Heading } from "./heading/heading"
import { TodoItem } from "./todoItem/todoItem"

type TodoFormPropsType = {
    setActivePage: (text: PagesTypes) => void

    content: todoGroupType
}
export const TodoForm: FC<TodoFormPropsType> = ({ setActivePage, content }) => {

    const { id, name, countDoneTodos, countTodos, todos } = content

    const [todos2, setTodos] = useState<todoType[]>([])
    const [taskNumber, setTaskNumber] = useState(0)
    const [doneTaskNumber, setDoneTaskNumber] = useState(0)
    const [heading, setHeading] = useState<string>()

    const dispatch = useAppDispatch()

    const checkTodoHandler = (some: boolean, id: string) => {
        setTodos(prev => {
            prev.forEach(el => {
                if (el.id === id) el.isChecked = some
            })
            return [...prev]
        })
        setDoneTaskNumber(prev => prev + 1)
    }

    const addTodoHandler = () => {
        const id = Date.now().toString()
        const text = 'new Todo'
        setTodos(prev => {
            return [
                ...prev,
                { id: id, text: text, isChecked: false }
            ]
        })
        setTaskNumber(prev => prev+1)
        dispatch(TodosReducer.actions.todoAdding({ todoGroupId: id, todo: { id: id, text: text, isChecked: false } }))
    }

    const changeTextTodoHandler = (text: string, id: string) => {
        setTodos(prev => {
            prev.forEach(el => {
                if (el.id === id) el.text = text
            })
            return prev
        })
    }
    const DeleteTodoHandler = (todo: todoType) => {
        setTodos(prev => {
            return prev.filter(el => el.id !== todo.id)
        })
        setTaskNumber(prev => prev - 1)
        if (todo.isChecked) setDoneTaskNumber(prev => prev - 1)
    }

    const exitButtonPressHandler = () => {
        setActivePage('main')
    }

    return <>
        <View style={style.contaner}>
            <View style={style.header}>
                <Image source={require('../../../assets/logo.jpg')} 
                    style={style.logo}
                />
                <CustomButton 
                    title="X" 
                    onPress={exitButtonPressHandler} 
                    addStyles={style.exitButton}
                />
            </View>
            <ScrollView>
                <Heading taskCount={taskNumber} doneTaskCount={doneTaskNumber} headingCallBack={setHeading} groupName={name} />
                <View style={style.listContainer}>
                    {todos.map(el => <TodoItem content={el} key={el.id} 
                        setIsChecked={checkTodoHandler} 
                        setTextChanged={changeTextTodoHandler}
                        deleteItem={DeleteTodoHandler}
                    />)}
                </View>
            </ScrollView>
            <FormFooter addTask={addTodoHandler} />
        </View>
    </>
}

const style= StyleSheet.create({
    contaner: {
        flex: 1,
    },
    header: {
        height: 160,
        position: 'relative',
    },
    exitButton: {
        position: 'absolute',
        top: 80,
        right: 40
    },
    listContainer: {
        
    },
    logo: {
        position: 'absolute',
        top: 70,
        left: 35,
        width: 70,
        height: 70
    }
})