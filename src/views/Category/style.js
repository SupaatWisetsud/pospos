import jss from 'react-jss';

const style = {
    container : {
        padding : 5,
        maxWidth : 580,
        margin : "0 auto",
    },
    heading : {
        display : "flex",
        alignItems : "center",
        '&>button':{
            margin : "0 10px 0 0"
        }
    },
    formadd : {
        backgroundColor : "white",
        borderRadius : 5,
        padding : 5,
        boxShadow : "1px 2px 3px rgba(0,0,0,0.3)",
        '&>input':{
            padding : "2px 5px",
            margin : "0 5px 0 0",
            fontSize : 18,
            border : "1px solid rgba(0,0,0,0.3)",
            borderRadius : 5,
        }
    },
    listcategory : {
        backgroundColor : "white",
        marginTop : 8,
        padding : 5,
        borderRadius : 5,
        boxShadow : "1px 2px 3px rgba(0,0,0,0.3)",
        minHeight : 500
    },
    table : {
        width : "100%",
        '& th' : {
            textAlign : "center",
            backgroundColor : "#5D6D7E",
            padding : 5,
            color : "white"
        },
        '& td' : {
            textAlign : "center",
            padding : 5
        }
    },
}

export default c=>jss(style)(c);