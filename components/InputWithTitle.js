import React from 'react'
import styled from 'styled-components';
import { View, TextInput } from 'react-native';
import {offBlack } from '../utils/colors';

const InputWithTitle = (props) => {
    return (
        <View>
            <BigText>{props.title}</BigText>
            <TextInput
                style={{margin: 20, width: 200, height: 40, borderBottomColor: offBlack, borderBottomWidth: 1}}
                onChangeText={props.onChangeText}
                value={props.value}
            />
        </View>
    )
}

const BigText = styled.Text`
    text-align: center;
    font-size: 30;
`

export default InputWithTitle