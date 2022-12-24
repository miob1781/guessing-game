import { StyleSheet, View, Text } from "react-native"
import { Colors } from "../../consts/colors"

export function NumberContainer(props) {
    const { children } = props

    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: 24,
        margin: 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    numberText: {
        color: Colors.accent500,
        fontFamily: "open-sans-bold",
        fontSize: 36
    }
})