import { Montserrat_300Light } from "@expo-google-fonts/montserrat"
import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { todoType } from "../../../models/models"
import { CustomButton } from "../../common/button"

type FormFooterPropsType = {
    addTask: () => void
}
export const FormFooter: FC<FormFooterPropsType> = ({ addTask }) => {
    return <>
        <View style={style.container}>
            <CustomButton title="+"
                onPress={() => addTask()}
                addStyles={style.button}
                addStylesText={style.text}
            />
        </View>
    </>
}

const style = StyleSheet.create({
    container: {
        height: 110,
        position: 'relative',
    },
    button: {
        position: 'absolute',
        top: 30,
        right: 30,
        backgroundColor: '#E03535',
        borderWidth: 0
    },
    text: {
        color: 'white',
        fontSize: 30,
    }
})