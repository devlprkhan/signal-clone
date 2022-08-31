import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: { 
        flex: 1
     },
    topIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 80,
    },
    input: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ececec",
        borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 30
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
})

export default styles