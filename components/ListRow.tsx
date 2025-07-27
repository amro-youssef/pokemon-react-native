import { JSX } from "react";
import { StyleSheet, Text, View } from "react-native";

type ListRowProps = {title: string; value: string}

const ListRow = ({title, value}: ListRowProps) : JSX.Element => {
    return (
        <View style={styles.row}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.separator}/>
            <Text style={styles.title}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#ccc',
        flexWrap: 'wrap',
    },
    title: {
        width: '49%',
        fontSize: 18
    },
    value: {
        width: "49%"
    },
    separator: {
        width: 1,
        backgroundColor: '#ccc',
        height: '100%',
    }
})

export default ListRow