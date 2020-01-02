import jss from 'react-jss';

const style = {
    type : {
        width : "100%",
        padding : 5,
        display : "flex",
        '&>div' : {
            width : 250,
            margin : "0 10px 0 0 ",
            backgroundColor : "#F2F4F4",
            boxShadow : "1px 2px 3px rgba(0,0,0,0.3)",
            padding : 10,
            cursor : "pointer",
            '&>h3':{
                color : "#333333",
                fontSize : 40
            },
            '&:hover':{ 
                boxShadow : "1px 2px 5px #85C1E9",
            }
        }
    },
    tableProduct : {
        marginTop : 5,
        width : "100%",
        '&>thead':{
            backgroundColor : "#5D6D7E",
        },
        '& th':{
            color : "white",
            padding : 5
        },
        '& td':{
            textAlign : "center",
            color : "#333333",
            padding : 5
        }
    },
    containerAdd : {marginTop : 10, width : "31.5%"},
    titleAdd : {display:"flex", justifyContent : "space-between"},
    mainAdd : {
        padding : 5,
        backgroundColor : "#F2F4F4",
        marginTop : 5,
        '&>div':{
            padding : 5
        },
        '& input, select':{
            width : "100%",
            padding : 5,
            fontSize : 20,
            border : "1px solid #333",
            borderRadius : 5,
            marginTop : 5
        },
        '& p':{
            fontSize : 20
        },
    },
    subAdd:{
        padding : 5,
        backgroundColor : "#F2F4F4",
        marginTop : 5,
        '&>div':{
            padding : 5
        },
        '& input, select':{
            width : "100%",
            padding : 5,
            fontSize : 20,
            border : "1px solid #333",
            borderRadius : 5,
            marginTop : 5
        },
        '& p':{
            fontSize : 20
        },
    },
    containerList : {
        padding : 5,
        backgroundColor : "#F2F4F4",
        marginTop : 5,
        minHeight : 454.6
    },
    searchProduct : {
        display : "flex",
        justifyContent : "space-between",

        '&>div':{
            display : "flex",
            justifyContent : "center",
            alignItems : "center",
            '&>p':{
                marginRight : 5
            }
        }
    },
    searchCategory : {
        padding : 5,
        borderRadius : 5,
        fontSize : 15
    },
    searchTxt : {
        padding : 5,
        border : "none",
        borderRadius : 5,
        marginRight : 10,
        fontSize : 18
    },
    category : {
        padding : 5,
        borderRadius : 5
    },
    footer : {
        display : "flex",
        justifyContent : "space-between",
        alignItems : "center",
        padding : 10
    },
    titleComponent : {
        fontSize : 20
    }
}

export default c => jss(style)(c);