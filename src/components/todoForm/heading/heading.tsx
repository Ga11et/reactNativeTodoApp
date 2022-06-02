import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { CustomText } from "../../common/customText"

type HeadingPropsType = {
    taskCount: number
    doneTaskCount: number
}
export const Heading: FC<HeadingPropsType> = ({ doneTaskCount, taskCount }) => {
    return <>
        <View style={style.container}>
            <View style={style.leftBox}>

            </View>
            <View style={style.rightBox}>
                <CustomText addStyle={style.largeText} text="My tasks" fontType="700" />
                <CustomText addStyle={style.smallText} text={`${doneTaskCount} of ${taskCount} tasks`} fontType="700" />
            </View>
        </View>
    </>
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 100
    },
    leftBox: {
        width: 100
    },
    rightBox: {
        flex: 1,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    largeText: {
        fontSize: 40,
        color: 'black'
    },
    smallText: {
        color: 'grey',
        paddingLeft: 2
    }
})