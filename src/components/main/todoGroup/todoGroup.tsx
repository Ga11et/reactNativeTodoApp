import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { todoGroupType } from "../../../models/models"
import { Checkbox } from "../../common/checkbox"
import { CustomText } from "../../common/customText"
import { Item } from "../../todoForm/todoItem/item/item"

type TodoGroupPropsType = {
    content: todoGroupType
}


export const TodoGroup: FC<TodoGroupPropsType> = ({ content }) => {

    const { name, todos } = content

    let randomColor: string

    switch (+content.id % 6) {
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
            randomColor = '#eaeaea'
            break
        case 4:
            randomColor = '#2240e5'
            break
        case 5:
            randomColor = '#e56927'
            break
        default:
            randomColor = '#382983'
    }

    return <>
        <View style={[style.container, { backgroundColor: randomColor }]} >
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
        </View>
    </>
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