import jss from 'react-jss';

const style = {
    titleReport: {
        width: "100%",
        display: "flex",
        padding: 5,
        flexWrap: "wrap",
        '&>div': {
            display: "flex",
            width: 250,
            minHeight: 80,
            cursor: "pointer",
            margin: "10px 10px 0 0",
            boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
            backgroundColor: "#F2F4F4",
            '&:hover': {
                boxShadow: "1px 2px 3px #688DBF",
            },
            '&>div': {
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 20
            }
        }
    },
    
    filter: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        display: "flex",
        justifyContent: "center",
        margin: "10px 0",
        '&>div':{
            margin : "0 10px"
        }
    },
    '@media (max-width: 549px)': {
        titleReport: {
            '&>div': {
                width: "100%",
                margin: "10px 0 ",
            }
        },
    },
}

export default c => jss(style)(c);