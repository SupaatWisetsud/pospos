import jss from 'react-jss';

const style = {
    header : {
        position : "fixed",
        top : 0,
        right : 0,
        left : 0,
        backgroundColor : "#3498DB",
        display : "grid",
        gridTemplateColumns  : "200px 1fr",
        zIndex : 99,
    },
    headerTitle : {
        width : 200,
        backgroundColor : "#2E86C1",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        
        '@global': {
            span : {
                fontSize : 25,
                fontWeight : "bold",
                color : "white"
            }
        }
    },
    profile : {
        position : "relative",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        padding : "4px 15px",
        cursor : "pointer",
        '&>img':{
            width : 40,
            height : 40,
            borderRadius : "50%",
            border : "2px solid",
            objectFit:"cover"
        },
        '&>span':{
            margin : "0 0 0 5px",
            color : "white"
        },
        '&>div' : {
            display : "none",
            position : "absolute",
            backgroundColor : "#F4F6F6",
            bottom : -165,
            right : 10,
            padding : 10,
            width : 220,
            borderRadius : 5,
            boxShadow : "1px 2px 3px rgba(0,0,0,0.3)",
            '&>p':{
                backgroundColor : "#85C1E9",
                padding : 5,
                textAlign : "center",
                color : "white"
            },
            '&>ul' : {
                listStyle : "none",
                '&>li':{
                    display : "inline-block",
                    width : "100%",
                    padding : 7,
                    '&:hover':{
                        backgroundColor : "#C7E7FE"
                    }
                },
                '&>a' : {
                    display : "inline-block",
                    width : "100%",
                    padding : 7,
                    textDecoration: "none",
                    color : "black",
                    '&:hover':{
                        backgroundColor : "#C7E7FE"
                    }
                }
            }
        }
    },
    bar : {
        fontSize : 24,
        color : "#FFF",
        display: "none",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10,
    },
    selected : {backgroundColor:"#808B96",margin : "10px 0", borderRadius : 5, boxShadow : "1px 2px 3px rgba(0,0,0,0.3)", color : "#FFF"},
    '@media (max-width: 1180px)': {
        bar : {
            display : "flex"
        },
        headerTitle : {
            display : "none"
        },
        header : {
            display : "block",
        },
    },
}

export default c => jss(style)(c);