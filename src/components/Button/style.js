import jss from 'react-jss';

const style = {
    btn : {
        border : "none",
        color : "white",
        borderRadius : 5,
        padding : "5px 10px",
        transition : "all .3s ease-in-out",
        '&:hover' : {
            position : "relative",
            transform: "scale(1.05)",
            boxShadow : "0px 2px 3px rgba(0,0,0,0.3)",
            cursor : "pointer"
        }
    }
}

export default c => jss(style)(c);