import React, { Component } from "react";
import { Animated, Text, View } from "react-native";
import { DrawerLayoutAndroid } from "react-native-gesture-handler";

// This FadeView is inspired by react-native's animation documentation
class FadeView extends React.Component {
    state = {
        fadeState: new Animated.Value(1),
        lastFadingValue: false
    };
    componentDidMount() {}
    componentDidUpdate() {
        let fading = this.props.fading;
        let fadingIn = this.props.fadingIn;
        if (this.state.lastFadingValue !== fading) {
            fading
                ? Animated.timing(this.state.fadeState, {
                      toValue: fadingIn ? 1 : 0,
                      duration: 300
                  }).start(() => {})
                : fadingIn
                ? this.setState({ fadeState: new Animated.Value(0) })
                : this.setState({ fadeState: new Animated.Value(1) });
            this.setState({ lastFadingValue: fading });
        }
    }
    render() {
        let { fadeState } = this.state;
        return (
            <Animated.View
                style={{
                    ...this.props.style,
                    opacity: fadeState
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default FadeView;
