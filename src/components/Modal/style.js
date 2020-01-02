import jss from 'react-jss';

const style = {
    containerModal : {
        position : "fixed",
        top : 0,
        left : 0,
        bottom : 0,
        right : 0,
        backgroundColor : "rgba(0,0,0,0.3)",
        zIndex : 100,
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    },
    modal : {
        position : 'relative',
        backgroundColor : "white",
        padding : 10,
        borderRadius : 5,
        maxWidth : 550,
        maxHeight : 700,
        animation : '$inModal .5s forwards'
    },
    close : {
        position : 'absolute',
        right : -15,
        top : -15,
        backgroundColor : "red",
        color : "white",
        borderRadius : 10,
        width : 30,
        height : 30,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        cursor : "pointer"
    },
    "@keyframes inModal" : {
        from: {
            opacity: 0,
            bottom: 0,
        },
        to: {
            opacity: 1,
            bottom: 15,
        }
    }
}

export default c => jss(style)(c);