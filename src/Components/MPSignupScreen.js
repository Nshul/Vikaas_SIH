import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Picker,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';

export default class MPSignUpView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            Phone: '',
            State: '',
            City: '',
            Constituency: '',
            State: '',
            address: '',
            officeAddress : '',
        }
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed " + viewId);
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.headingText}>Sign Up</Text>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Name"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(fullName) => this.setState({ fullName })} />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/phone/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        underlineColorAndroid='transparent'
                        onChangeText={(Phone) => this.setState({ Phone })} />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/city/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Address"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(address) => this.setState({ address })} />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/city/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Office Address"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(address) => this.setState({ officeAddress })} />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/city/ultraviolet/50/3498db' }} />
                    <Picker style={{ flex: 1 }}
                        selectedValue={this.state.City}
                        onValueChange={(itemValue, index) => this.setState({ City: itemValue })}>
                        
                        <Picker.Item label="Delhi" value="Delhi" />
                        <Picker.Item label="Guwahati" value="Guwahati" />
                        <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
                    </Picker>
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/city/ultraviolet/50/3498db' }} />
                    <Picker style={{ flex: 1 }}
                        selectedValue={this.state.Constituency}
                        onValueChange={(itemValue, index) => this.setState({ Constituency: itemValue })}>
                        <Picker.Item label="Delhi" value="Delhi" />
                        <Picker.Item label="Guwahati" value="Guwahati" />
                        <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
                    </Picker>
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/city/ultraviolet/50/3498db' }} />
                    <Picker style={{ flex: 1 }}
                        selectedValue={this.state.State}
                        onValueChange={(itemValue, index) => this.setState({ State: itemValue })}>
                        <Picker.Item label="Delhi" value="Delhi" />
                        <Picker.Item label="Guwahati" value="Guwahati" />
                        <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
                    </Picker>
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('sign_up')}>
                    <Text style={styles.signUpText}>Sign up</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00b5ec',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dropdownContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#ffffff',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    signupButton: {
        backgroundColor: "#FF4DFF",
    },
    signUpText: {
        color: 'white',
    },
    headingText: {
        color: "white",
        fontSize: 30,
    },
});