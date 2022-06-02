import { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import { CustomText } from "../common/customText"

type HeaderPropsType = {
    
}
export const Header: FC<HeaderPropsType> = ({  }) => {
    return <>
        <View style={style.container}>
            <View style={style.textContainer}>
                <CustomText addStyle={style.text} text='Tasks' fontType="400" />
                <CustomText addStyle={style.textGrey} text=' List' fontType="400" />
            </View>
            
        </View>
    </>
}

const style = StyleSheet.create({
    container: {
        height: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        position: 'relative'
    },
    textContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -21,
        width: 250,
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 40,
        color: 'black',
    },
    textGrey: {
        fontSize: 40,
        color: 'grey',
    }
})