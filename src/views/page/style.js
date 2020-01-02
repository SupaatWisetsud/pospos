import jss from 'react-jss';


const style = {
    login : {
        display : "flex",
        justifyContent : 'center',
        alignItems : "center",
        height : "100vh",
        background: "linear-gradient(#5DADE2, #D6EAF8)",

        '&>form':{
            backgroundColor : "white",
            padding : 10,
            borderRadius : 10,
            boxShadow : "1px 2px 5px rgba(0,0,0,0.3)",

            '&>div':{
                padding : 10,
                '&>span':{
                    fontSize : 38
                },
                '&>input':{
                    padding : "8px 10px",
                    fontSize : 24,
                    border : "1px solid #333",
                    borderRadius : 5,
                    outline : "none"
                },

            }
        }
    }
}

export default c => jss(style)(c);