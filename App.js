import { useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font"
import AppLoading from "expo-app-loading"

import { StartGameScreen } from './screens/StartGameScreen';
import { GameScreen } from "./screens/GameScreen";
import { GameOverScreen } from "./screens/GameOverScreen";
import { Colors } from "./consts/colors";

export default function App() {
    const [userNumber, setUserNumber] = useState()
    const [gameOver, setGameOver] = useState(true)
    const [guessRounds, setGuessRounds] = useState(0)

    const [fontsLoaded] = useFonts({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }

    function pickedNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber)
        setGameOver(false)
    }

    function GameOverHandler(numberOfRounds) {
        setGameOver(true)
        setGuessRounds(numberOfRounds)
    }

    function startNewGameHandler() {
        setUserNumber(null)
        setGuessRounds(0)
    }

    let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />

    if (userNumber) {
        screen = <GameScreen userNumber={userNumber} onGameOver={GameOverHandler} />
    }

    if (userNumber && gameOver) {
        screen = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onStartNewGame={startNewGameHandler} />
    }

    return (
        <LinearGradient style={styles.rootScreen} colors={[Colors.primary700, Colors.accent500]}>
            <ImageBackground
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
                source={require("./assets/images/background-image.png")}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.screen}>
                    {screen}
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1
    },
    screen: {
        flex: 1,
        padding: 42,

    },
    backgroundImage: {
        opacity: 0.15
    },

});
