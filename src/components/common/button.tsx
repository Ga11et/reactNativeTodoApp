import { FC } from "react"
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { todoType } from "../../models/models"
import { CustomText } from "./customText"

type CustomButtonPropsType = {
    title: string,
    addStyles?: ViewStyle
    addStylesText?: TextStyle

    onPress: () => void
}
export const CustomButton: FC<CustomButtonPropsType> = ({ title, onPress, addStyles, addStylesText }) => {
    return <>
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
            <View style={[style.container, addStyles]}>
                <CustomText
                    text={title}
                    fontType="400"
                    addStyle={addStylesText}
                />
            </View>
        </TouchableOpacity>

    </>
}

const style = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {

    }
})