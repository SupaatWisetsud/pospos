import jss from 'react-jss';

const style = {
    container : {
        width : "100%",
        backgroundColor : "#E5E8E8",
        borderRadius : 5,
        padding : 5
    },
    seach : {
        padding : 5,
        display : "flex",
        justifyContent : "space-between",
        alignItems : "center",
        '& > div ': {
            display : "flex",
            justifyContent : "space-between",
            alignItems : "center",
        },
        '& > div > form':{
            display : "flex",
            justifyContent : "space-between",
            alignItems : "center",
        },
        '& input, select':{
            padding : 5,
            margin : "0 10px",
            fontSize : 16,
            borderRadius : 5,
            border : "none",
        },
        '&>span':{
            margin : "0 10px 0 0",
            fontSize : 17
        },
        '& button':{
            margin : "0 10px 0 0",
            fontSize : 17
        }
    },
    table : {
        margin : "10px 0",
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
    containerList : {
        marginTop : 5,
        minHeight : 496,
        padding : 5,
        backgroundColor : "#F2F4F4"
    },
    footer : {
        display : "flex",
        justifyContent : "space-between",
        alignItems : "center",
        padding : 10
    },
    // print Order
    printTitle : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        marginTop: 10,
        border: "2px solid #333333",
        padding: 5,
        backgroundColor : "#2E86C1",
        color : "white"
    },
    datetime : { 
        display: "flex", 
        justifyContent: "flex-end", 
        marginTop: 15,
        '&>span':{
            margin : "0 5px"
        }
    },
    order : { margin: "20px 0 20px 0" },
    titleOrder : {
        display: "flex",
        justifyContent: "space-between",
        border: "2px solid #333",
        padding: "5px 10px"
    },
    itemOrder : {
        display: "flex",
        justifyContent: "space-between",
        margin: 20
    },
    sumOrder : {
        border : "2px solid #333",
        padding : 5,
        '&>div':{
            display: "flex",
            justifyContent: "space-between"
        }
    }
}

export default c=>jss(style)(c);