import jss from 'react-jss';

const style = {
    containerAlert : {
        display : "block",
        position: "fixed",
        bottom: 15,
        right: 10,
        animation : '$popup .5s forwards',
        zIndex : 101
    },
    alert : {
        color : "white",
        borderRadius : 5,
        padding : 10,
    },
    close : {
        margin : "0 0 0 10px"
    },
    "@keyframes popup" : {
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