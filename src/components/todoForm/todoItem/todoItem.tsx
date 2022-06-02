import { FC, useRef, useState } from "react"
import { Animated, PanResponder, StyleSheet, TextInput, View } from "react-native"
import { todoType } from "../../../models/models"
import { Checkbox } from "../../common/checkbox"
import { CustomText } from "../../common/customText"

type TodoItemPropsType = {
    content: todoType

    setIsChecked: (some: boolean, id: string) => void
    setTextChanged: (some: string, id: string) => void
}
export const TodoItem: FC<TodoItemPropsType> = ({ content, setIsChecked, setTextChanged }) => {

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
                />
                : <Animated.View style={[style.container, { translateX: pan.x }]}
                    {...panResponder.panHandlers}
                >
                    <View style={style.leftBox}>
                        <Checkbox isChecked={isChecked} onPress={onPressHandler} />
                    </View>
                    <View style={style.rightBox}>
                        <CustomText fontType="700" text={text} addStyle={isChecked ? style.checked : {}} />
                    </View>
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
    leftBox: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightBox: {

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
    checked: {
        color: 'red',
        textDecorationLine: 'line-through',
        textDecorationColor: 'red'
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