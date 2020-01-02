import jss from 'react-jss';

const style = {
    dashboard : {
        marginLeft : 200,
        paddingTop : 48,
    },
    content : {
        padding : 10
    },
    '@media (max-width: 1180px)': {
        dashboard : {
            marginLeft : 0,
            paddingTop : 48,
        },
    },
}

export default c => jss(style)(c);