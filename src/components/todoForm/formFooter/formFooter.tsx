import { FC } from "react"
import { Image, StyleSheet, View } from "react-native"
import { CustomButton } from "../../common/button"

type FormFooterPropsType = {
    addTask: () => void
}
export const FormFooter: FC<FormFooterPropsType> = ({ addTask }) => {
    return <>
        <View style={style.container}>
            <Image source={require('../../../../assets/footer.jpg')} 
                style={style.image}
            />
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
    },
    image: {
        position: 'absolute',
        left: 30,
        top: 5,
        width: 200,
        height: 100
    }
})