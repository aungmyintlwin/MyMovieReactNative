import React, { FC, ReactElement } from 'react';
import { SafeAreaView} from 'react-native';


interface TypeProps extends React.PropsWithChildren {
    children: ReactElement
}
const SafeArea: FC<TypeProps> = (props) => {
    return <SafeAreaView {...props}>{props.children}</SafeAreaView>
}

export default SafeArea;