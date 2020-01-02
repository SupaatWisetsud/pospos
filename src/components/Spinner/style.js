import jss from 'react-jss';

const style = {
    containerSpinner : {
        position : "fixed",
        top : 0,
        right : 0,
        left : 0,
        bottom : 0,
        backgroundColor : "rgba(0,0,0,0.3)",
        zIndex : 999,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        fontSize : 68,
        color : "#888888",

        '&>i' : {
            animation : '$spinner 2s infinite '
        }
    },

    "@keyframes spinner" : {
        from: {
            transform: "rotate(0deg)"
        },
        to: {
            transform: "rotate(360deg)"
        }
    }
}

export default c=>jss(style)(c);