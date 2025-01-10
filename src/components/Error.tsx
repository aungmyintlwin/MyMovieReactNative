import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

export interface IError {
    code: number;
    message: string;
  }

  
interface IErrorProps extends PropsWithChildren<any> {
    error: IError;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        backgroundColor: 'red'
    }
});

class Error extends React.PureComponent<IErrorProps> {
    render() {
        const {error} = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>{error.message}</Text>
            </View>
        )
    }
}

export default Error;