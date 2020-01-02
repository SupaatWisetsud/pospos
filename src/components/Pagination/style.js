import jss from 'react-jss';


const style = {
    pagination : {
        textAlign : "end",
        '&>ul':{
            listStyle : "none",
            '&>li':{
                display : "inline-block",
                padding : 5,
                backgroundColor : "#85C1E9",
                border : "1px solid #85C1E9",
                marginRight : 5,
                borderRadius : 5,
                color : "#FFF"
            }
        }
    }
}

export default c=>jss(style)(c);