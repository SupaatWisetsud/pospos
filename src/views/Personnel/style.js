import jss from 'react-jss';

const style = {
    container : {
        margin : "0 auto",
        width : "70%",
        padding : 10
    },
    containerAdd : {
        margin : "0 auto",
        width : "70%",
        padding : 10
    },
    containerList : {
        padding : 5,
        backgroundColor : "#F2F4F4",
        marginTop : 5,
        minHeight : 523
    },
    table : {
        marginTop : 10,
        marginBottom : 10,
        width : "100%",
        '& th' : {
            textAlign : "center",
            padding : 5,
            backgroundColor : "#5D6D7E",
            color : "white"
        },
        "& td" : {
            textAlign : "center",
            padding : 5
        }
    },
    searchTxt : {
        padding : "2px 5px",
        fontSize : 24,
        border : "none",
        borderRadius : 5
    },
    listTitle : {
        display : "flex",
        justifyContent : "space-between"
    },
    img : {
        borderRadius:100, 
        objectFit : "cover",
        width : 50,
        height : 50
    },
    footer : {
        display : "flex",
        justifyContent : "space-between",
        alignItems : "center",
        padding : 10
    }
}

export default c=>jss(style)(c);