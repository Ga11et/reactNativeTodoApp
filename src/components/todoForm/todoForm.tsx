import { FC, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { todoType } from "../../models/models"
import { CustomButton } from "../common/button"
import { FormFooter } from "./formFooter/formFooter"
import { Heading } from "./heading/heading"
import { TodoItem } from "./todoItem/todoItem"

type TodoFormPropsType = {
    setActivePage: (text: string) => void
}
export const TodoForm: FC<TodoFormPropsType> = ({ setActivePage }) => {

    const [todos, setTodos] = useState<todoType[]>([])
    const [taskNumber, setTaskNumber] = useState(0)
    const [doneTaskNumber, setDoneTaskNumber] = useState(0)

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
        const text = ' s'
        setTodos(prev => {
            return [
                ...prev,
                { id: id, text: text, isChecked: false }
            ]
        })
        setTaskNumber(prev => prev+1)
    }

    const changeTextTodoHandler = (text: string, id: string) => {
        setTodos(prev => {
            prev.forEach(el => {
                if (el.id === id) el.text = text
            })
            return prev
        })
    }

    return <>
        <View style={style.contaner}>
            <View style={style.header}>
                <CustomButton 
                    title="X" 
                    onPress={() => setActivePage('main')} 
                    addStyles={style.exitButton}
                />
            </View>
            <ScrollView>
                <Heading taskCount={taskNumber} doneTaskCount={doneTaskNumber} />
                <View style={style.listContainer}>
                    {todos.map(el => <TodoItem content={el} key={el.id} 
                        setIsChecked={checkTodoHandler} 
                        setTextChanged={changeTextTodoHandler}
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
        height: 200,
        position: 'relative',
    },
    exitButton: {
        position: 'absolute',
        top: 80,
        right: 40
    },
    listContainer: {
        
    }
})