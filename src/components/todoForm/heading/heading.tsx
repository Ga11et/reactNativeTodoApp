import { FC, useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { CustomText } from "../../common/customText"

type HeadingPropsType = {
    groupName?: string
    taskCount: number
    doneTaskCount: number

    headingCallBack: (name: string) => void
}
export const Heading: FC<HeadingPropsType> = ({ doneTaskCount, taskCount, groupName, headingCallBack }) => {

    const [isInputActive, setIsInputActive] = useState<boolean>(!groupName)
    const [heading, setHeading] = useState(groupName)

    const onEndEditingHandler = () => {
        setIsInputActive(false)
        headingCallBack(heading)
    }

    return <>
        <View style={style.container}>
            <View style={style.leftBox}>

            </View>
            <View style={style.rightBox}>
                {isInputActive
                    ? <TextInput style={style.input} autoFocus onEndEditing={onEndEditingHandler}
                        onChangeText={(text) => setHeading(text)}
                    />
                    : <TouchableOpacity activeOpacity={0.7} onLongPress={() => setIsInputActive(true)} >
                        <CustomText addStyle={style.largeText} text={heading} fontType="700" />
                    </TouchableOpacity>
                }
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
    },
    input: {
        fontSize: 40,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }
})