import { FC, useRef } from "react"
import { Animated, PanResponder, StyleSheet, TouchableOpacity, View } from "react-native"
import { useAppDispatch } from "../../../hooks/hooks"
import { todoGroupType } from "../../../models/models"
import { TodosReducer } from "../../../store/reducers/TodosReducer"
import { Checkbox } from "../../common/checkbox"
import { CustomText } from "../../common/customText"

type TodoGroupPropsType = {
    content: todoGroupType

    activePageHandler: (index: string) => void
}


export const TodoGroup: FC<TodoGroupPropsType> = ({ content, activePageHandler }) => {

    const { name, todos } = content
    const dispatch = useAppDispatch()

    let randomColor: string

    switch (+content.id % 5) {
        case 0:
            randomColor = '#382983'
            break
        case 1:
            randomColor = '#de2a2a'
            break
        case 2:
            randomColor = '#d5b38c'
            break
        case 3:
            randomColor = '#e56927'
            break
        case 4:
            randomColor = '#2240e5'
            break
        default:
            randomColor = '#382983'
    }

    const pan = useRef(new Animated.ValueXY()).current

    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event, state) => {
            pan.setOffset({x: 0, y: 0})
        },
        onPanResponderMove: (event, state) => {
            if (state.dy > 0) {
                Animated.event([
                    null,
                    { dy: pan.y }
                ], { useNativeDriver: false })(event, state)
            }
            
        },
        onPanResponderRelease: (event, state) => {
            const dy = state.dy
            if (dy > 200) {
                dispatch(TodosReducer.actions.todoGroupDeleting(content.id))
            }
            Animated.spring(
                pan,
                { toValue: { x: 0, y: 0 }, useNativeDriver: true }
            ).start(({ finished }) => {
                
            })
        }
    })).current

    return <View style={{ position: 'relative' }}>
        <View style={{ position: 'absolute', zIndex: -1000, alignItems: 'center', justifyContent: 'center', height: 100, width: 160 }}>
            <CustomText fontType="700" text="DELETE" addStyle={{ textAlign: 'center' }} />
        </View>
        <Animated.View style={[style.container, { backgroundColor: randomColor, translateY: pan.y }]} 
            {...panResponder.panHandlers}
        >
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => activePageHandler(content.id)}
            >
            <CustomText fontType="700" text={name} addStyle={style.name} />
            <View style={{ paddingVertical: 20 }}>
                {todos.map(el => <View style={{ flexDirection: 'row' }} key={el.id}>
                    <View style={style.leftBox}>
                        <Checkbox isChecked={el.isChecked} onPress={() => null} color="white" />
                    </View>
                    <View style={style.rightBox}>
                        <CustomText fontType="400" text={el.text} addStyle={el.isChecked ? style.todoItem_checked : style.todoItem} />
                    </View>
                </View>)}
            </View>
            </TouchableOpacity>
        </Animated.View>
    </View>
}

const style = StyleSheet.create({
    container: {
        width: 160,
        height: '90%',
        borderRadius: 6,
        paddingLeft: 20,
        paddingVertical: 40,
        marginRight: 15
    },
    name: {
        color: 'white',
        borderBottomColor: '#ffffff66',
        borderBottomWidth: 1,
        paddingBottom: 20
    },
    leftBox: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 35
    },
    rightBox: {

    },
    todoItem: {
        color: 'white',
        paddingVertical: 3,
    },
    todoItem_checked: {
        color: 'white',
        paddingVertical: 3,
        textDecorationLine: "line-through",
    }
})