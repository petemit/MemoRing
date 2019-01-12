import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { black, secondary_light } from "../utils/colors";
/**
 * This class was inspired by the UdaciFitness app's Textbutton
 */
export default function TextButton({ enabled = true, input, onPress, style = {} }) {
    return (
        <TouchableOpacity disabled={!enabled} onPress={onPress} style={[styles.container, style]}>
            <Text style={[styles.addNew]}>{input}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: secondary_light,
        borderRadius: 10,
        justifyContent: "center", 
    },
    addNew: {
        color: black,
        fontSize: 18
    }
});
