import { useFonts, Montserrat_700Bold, Montserrat_400Regular } from "@expo-google-fonts/montserrat"
import { FC } from "react"
import { StyleSheet, Text, TextStyle } from "react-native"

type CustonTextPropsType = {
    text: string,
    fontType: '400' | '700'
    addStyle?: TextStyle
}
export const CustomText: FC<CustonTextPropsType> = ({ text, addStyle, fontType }) => {

    let [fontLoaded] = useFonts({ Montserrat_700Bold, Montserrat_400Regular })

    const fontFamily = `Montserrat_${fontType === '700' ? '700Bold' : '400Regular'}`

    return <>
        {fontLoaded 
            ? <Text style={[style.text, addStyle, {fontFamily: fontFamily}]}>{text}</Text>
            : <Text style={[style.text, addStyle]}>{text}</Text>
        }
        
    </>
}

const style = StyleSheet.create({
    text: {
        fontSize: 20,
    }
})