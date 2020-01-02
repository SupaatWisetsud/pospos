import jss from 'react-jss';

const style = {
    container: {
        padding: 5,
        maxWidth: 500,
        margin: "0 auto",

        '&>form>p': {
            fontSize: 24,
            marginLeft: 5,
            padding: 2
        },

        '&>form>div': {
            backgroundColor: "#FFF",
            marginBottom: 20,
            padding: 10,
            borderRadius: 5,
            boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",

            '& input': {
                width: "100%",
                padding: "5px 10px",
                borderRadius: 5,
                border: "1px solid #333",
                fontSize: 20
            },

            '& > div': {
                marginTop: 10
            }
        }
    }
}

export default c => jss(style)(c);