import { FC, useRef, useState } from "react"
import { Animated, PanResponder, StyleSheet, TextInput, View } from "react-native"
import { useDispatch } from "react-redux"
import { todoType } from "../../../models/models"
import {TodosReducer} from "../../../store/reducers/TodosReducer"
import { Checkbox } from "../../common/checkbox"
import { CustomText } from "../../common/customText"
import { Item } from "./item/item"

type TodoItemPropsType = {
    content: todoType

    setIsChecked: (some: boolean, id: string) => void
    setTextChanged: (some: string, id: string) => void
    deleteItem: (todo: todoType) => void
}
export const TodoItem: FC<TodoItemPropsType> = ({ content, setIsChecked, setTextChanged, deleteItem }) => {

    const {id, isChecked, text} = content

    const [isActive, setisActive] = useState(true)
    const [Itext, setText] = useState(content.text)

    const onPressHandler = () => {
        isChecked
            ? setIsChecked(false, id)
            : setIsChecked(true, id)
    }
    const onEndEditingHandler = () => {
        setisActive(false)
        setTextChanged(Itext, id)
    }

    const pan = useRef(new Animated.ValueXY()).current

    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            pan.setOffset({x: 0, y: 0})
        },
        onPanResponderMove: (event, state) => {
            Animated.event([
                null,
                { dx: pan.x }
            ], { useNativeDriver: false })(event, state)
        },
        onPanResponderRelease: (event, state) => {
            const dx = state.dx
            if (dx > 200) deleteItem(content) 
            Animated.spring(
                pan,
                { toValue: { x: 0, y: 0 }, useNativeDriver: true }
            ).start(({ finished }) => {
                if (dx < -200) setisActive(true) 
            })
            
        }
    })).current

    return <>
            {isActive
                ? <TextInput style={style.input} 
                    onEndEditing={onEndEditingHandler}
                    onChangeText={(text) => setText(text)}
                    value={Itext}
                    autoFocus
                />
                : <Animated.View style={[style.container, { translateX: pan.x }]}
                    {...panResponder.panHandlers}
                >
                    <Item content={content} onPressHandler={onPressHandler} />
                    <View style={style.delete}><CustomText addStyle={style.deleteText} fontType="400" text="Delete" /></View>
                    <View style={style.edit}><CustomText addStyle={style.deleteText} fontType="400" text="Edit" /></View>
                </Animated.View>
            }


    </>
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 5,
        paddingVertical: 10,
        position: 'relative'
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginHorizontal: 30,
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: 20,
        fontWeight: '700',
    },
    delete: {
        position: 'absolute',
        left: -400,
        top: 0,
        bottom: 0,
        width: 400,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 20
    },
    deleteText: {
        fontSize: 20,
        textTransform: 'uppercase',
        color: 'white'
    },
    edit: {
        position: 'absolute',
        right: -400,
        top: 0,
        bottom: 0,
        width: 400,
        backgroundColor: 'blue',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 20
    }
})