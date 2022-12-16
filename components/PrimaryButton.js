import { StyleSheet, View, Text, Pressable } from "react-native"

export function PrimaryButton(props) {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
                android_ripple={{ color: "#640233" }}
            >
                <Text style={styles.buttonText}>{props.children}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden"
    },
    buttonInnerContainer: {
        backgroundColor: "#72063c",
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    },
    pressed: {
        opacity: 0.75
    }
})