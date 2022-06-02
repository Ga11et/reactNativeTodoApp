import { FC, useRef } from "react"
import { Animated, PanResponder, StyleSheet, View } from "react-native"
import { CustomButton } from "../common/button"
import { CustomText } from "../common/customText"
import { Header } from "../header/header"

type MainPropsType = {
    setActivePage: (text: string) => void
}
export const Main: FC<MainPropsType> = ({ setActivePage }) => {

    const pan = useRef(new Animated.ValueXY()).current

    let panCorrd = {x: 0, y: 0}

    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: () => {
            return true
        },
        onPanResponderGrant: (event, state) => {
            pan.setOffset(panCorrd)
        },
        onPanResponderMove: (event, state) => {
            Animated.event([
                null,
                { dx: pan.x, dy: pan.y } 
            ],
                { useNativeDriver: false }
            )(event, state)
        },
        onPanResponderRelease: (event, state) => {
            panCorrd = {
                x: panCorrd.x + state.dx,
                y: panCorrd.y + state.dy
            }
            pan.flattenOffset()
        }

    })).current
    return <>
        <Header />
        <View style={style.container}>
            <View style={style.buttonContainer}>
                <CustomButton title="+"
                    onPress={() => setActivePage('todoForm')}
                />
                <CustomText addStyle={style.buttonContainer__text} fontType='700' text="Add list" />
            </View>
            <Animated.View
                style={[{ translateX: pan.x, translateY: pan.y }]}
                {...panResponder.panHandlers}
            >
                <View style={style.box}></View>
            </Animated.View>
            {/* <CustomText fontType="700" text="123" /> */}
        </View>
    </>
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        height: 50,
        fontSize: 30,
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30%'
    },
    buttonContainer__button: {

    },
    buttonContainer__text: {
        color: 'grey',
        paddingTop: 8,
        fontSize: 15
    },
    box: {
        width: 200,
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 9
    }
})