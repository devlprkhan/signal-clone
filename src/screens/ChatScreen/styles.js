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
        backgroundColor: "#ececec",
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
    reciever: {
        padding: 15,
        backgroundColor: "#ececec",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#2868e6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white'
    },
})

export default styles