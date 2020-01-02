import jss from 'react-jss';

const style = {
    sidebar : {
        position : "fixed",
        top : 0,
        bottom : 0,
        backgroundColor : "#333333",
        width : 200,
        paddingTop : 48,
        display : "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    version : {
        backgroundColor : "#2C3E50",
        padding : 5,
        color : "white",
        textAlign : "center"
    },
    navtion :  {
        listStyle : "none",
        marginTop : 10,
        overflowY: "auto",
        height: "59vh",
        "&>li" : {
            padding : "15px 30px",
            color : "white",
            fontWeight : "bolder",
            fontSize : 18,
            cursor : "pointer",
        }
        
    },
    liAction : {
        backgroundColor : "#838383",
        borderLeft : "3px solid #4FB8FF",
    },
    bgSidebar : {
        position : "fixed", 
    },
    closeBar : {
        display : "none",
        position : "absolute", 
        right : 0, 
        margin : 5, 
        fontSize : 24, 
        color : "red"
    },
    '@media (max-width: 1180px)': {
        sidebar : {
            paddingTop : 0,
        },
        bgSidebar : {
            display : "none",
            position : "fixed", 
            top : 0, 
            bottom : 0, 
            left : 0, 
            right : 0, 
            backgroundColor : "rgba(0,0,0,0.3)",
            zIndex : 200
        },
        closeBar : {
            display : "block"
        }
    },
    
}

export default c => jss(style)(c);