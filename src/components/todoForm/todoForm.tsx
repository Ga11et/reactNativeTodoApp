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

    const dispatch = useAppDispatch()

    const addTodoHandler = () => {
        const todoId = Date.now().toString()
        dispatch(TodosReducer.actions.todoAdding({ todoGroupId: id, todo: { id: todoId, text: 'new Todo', isChecked: false, isActive: true } }))
    }
    const setHeading = (newHeading: string) => {
        dispatch(TodosReducer.actions.todoGroupUpdating({
            countDoneTodos, countTodos, id, todos, name: newHeading
        }))
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
                <Heading taskCount={countTodos} doneTaskCount={countDoneTodos} headingCallBack={setHeading} groupName={name} />
                <View style={style.listContainer}>
                    {todos.map(el => <TodoItem content={el} key={el.id}
                        todoGroupId={id}
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