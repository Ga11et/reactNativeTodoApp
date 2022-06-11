import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { todoType } from "../../../../models/models"
import { Checkbox } from "../../../common/checkbox"
import { CustomText } from "../../../common/customText"

type ItemPropsType = {
    content: todoType

    onPressHandler?: () => void
}
export const Item: FC<ItemPropsType> = ({ content, onPressHandler }) => {

    const { id, isChecked, text } = content

    return <>
        <View style={style.leftBox}>
            <Checkbox isChecked={isChecked} onPress={onPressHandler} />
        </View>
        <View style={style.rightBox}>
            <CustomText fontType="700" text={text} addStyle={isChecked ? style.checked : {}} />
        </View>
    </>
}

const style = StyleSheet.create({
    leftBox: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightBox: {

    },
    checked: {
        color: 'red',
        textDecorationLine: 'line-through',
        textDecorationColor: 'red'
    },
})