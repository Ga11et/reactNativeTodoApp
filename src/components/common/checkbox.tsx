import { FC, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

type CheckboxPropsType = {
    onPress: () => void
    isChecked: boolean

    color?: string
}
export const Checkbox: FC<CheckboxPropsType> = ({ onPress, isChecked, color = 'grey' }) => {

    return <>
        <TouchableOpacity activeOpacity={0.7}
            onPress={onPress}
        >
            {!isChecked && <View style={[style.container, { borderColor: color }]}>

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
        borderRadius: 4
    },
    content: {

    }
})