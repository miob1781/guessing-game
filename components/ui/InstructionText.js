import { StyleSheet, Text } from "react-native"
import { Colors } from "../../consts/colors"

export function InstructionText(props) {
    const { children, style } = props

    return <Text style={[styles.instructionText, style]}>{children}</Text>
}

const styles = StyleSheet.create({
    instructionText: {
        color: Colors.accent500,
        fontFamily: "open-sans",
        fontSize: 24
    }
})