import { FC, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

type CheckboxPropsType = {
    onPress: () => void
    isChecked: boolean
}
export const Checkbox: FC<CheckboxPropsType> = ({ onPress, isChecked }) => {

    return <>
        <TouchableOpacity activeOpacity={0.7}
            onPress={onPress}
        >
            {!isChecked && <View style={style.container}>

            </View>
            }

        </TouchableOpacity>

    </>
}

const style = StyleSheet.create({
    container: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 4
    },
    content: {

    }
})