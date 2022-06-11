import { FC } from "react"
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../hooks/hooks"
import { todoGroupType } from "../../models/models"
import { TodosReducer } from "../../store/reducers/TodosReducer"
import { CustomButton } from "../common/button"
import { CustomText } from "../common/customText"
import { Header } from "../header/header"
import { TodoGroup } from "./todoGroup/todoGroup"

type MainPropsType = {
    setActivePage: (id: string) => void
}
export const Main: FC<MainPropsType> = ({ setActivePage }) => {

    const { todoGroups } = useAppSelector(state => state.TodosReducer)
    const dispatch = useDispatch()

    const onPlusButtonHandler = () => {
        const data: todoGroupType = {
            id: Date.now().toString(),
            name: '',
            todos: [],
            countDoneTodos: 0,
            countTodos: 0
        }
        dispatch(TodosReducer.actions.todoGroupAdding(data))
        setTimeout(() => {
            console.log(todoGroups.length)
            setActivePage(data.id)
        }, 1000)
    }

    return <>
        <Header />
        <View style={style.container}>
            <View style={style.buttonContainer}>
                <CustomButton title="+"
                    onPress={onPlusButtonHandler}
                />
                <CustomText addStyle={style.buttonContainer__text} fontType='700' text="Add list" />
            </View>
            <ScrollView horizontal style={style.todoGroups} >
                {todoGroups.map(el => <TouchableOpacity key={el.id}
                        activeOpacity={0.7}
                        onPress={() => setActivePage(el.id)}
                    >
                        <TodoGroup content={el} />
                    </TouchableOpacity>)}
            </ScrollView>
        </View>
    </>
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        height: 50,
        fontSize: 30,
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30%'
    },
    buttonContainer__button: {

    },
    buttonContainer__text: {
        color: 'grey',
        paddingTop: 8,
        fontSize: 15
    },
    todoGroups: {
        marginHorizontal: 50,
        flexDirection: 'row',
        height: '100%',
    }
})