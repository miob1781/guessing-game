import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import { NumberContainer } from "../components/game/NumberContainer";
import { Title } from "../components/ui/Title"
import { PrimaryButton } from "../components/ui/PrimaryButton"
import { Card } from "../components/ui/Card";
import { InstructionText } from "../components/ui/InstructionText";
import { GuessLogItem } from "../components/game/GuessLogItem";

let minBoundary = 1
let maxBoundary = 100

export function GameScreen(props) {
    const { userNumber, onGameOver } = props

    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    function generateRandomBetween(min, max, exclude) {
        const rndNum = Math.floor(Math.random() * (max - min)) + min;

        if (rndNum === exclude) {
            return generateRandomBetween(min, max, exclude);
        } else {
            return rndNum;
        }
    }

    function nextGuessHandler(direction) {
        if (
            (direction === "lower" && currentGuess < userNumber) ||
            (direction === "higher" && currentGuess > userNumber)
        ) {
            Alert.alert(
                "Dont't lie!",
                "You know that this is wrong.",
                [{ text: "Sorry", style: "cancel" }]
            )
            return
        }

        if (direction === "lower") {
            maxBoundary = currentGuess
        } else if (direction === "higher") {
            minBoundary = currentGuess + 1
        }
        const newGuess = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newGuess)
        setGuessRounds(prevGuessRounds => [newGuess, ...prevGuessRounds])
    }

    useEffect(() => {
        minBoundary = 1
        maxBoundary = 100
    }, [])

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length)
        }
    }, [currentGuess, userNumber, onGameOver])

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionTextExtra}>Higher or lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                            <Ionicons name="md-remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler("higher")}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    renderItem={itemData => <GuessLogItem roundNumber={guessRounds.length - itemData.index} guess={itemData.item} />}
                    keyExtractor={item => item}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
    instructionTextExtra: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})
