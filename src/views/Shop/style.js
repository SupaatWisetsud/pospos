import jss from 'react-jss';

const style = {
    container: {
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "space-between"
    },
    product: {
        width: "70%",
        height: "100%",
    },
    search: {
        display: "flex",
        justifyContent: "space-between",
        padding: 5,
        '&>div': {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            '& input, select': {
                padding: "2px 5px",
                fontSize: 18,
                border: "none",
                borderRadius: 5,
                margin: "0 5px"
            },
            '&>button': {
                marginLeft: 5
            }
        }
    },
    listProduct: {
        height: "93%",
        backgroundColor: "#F2F4F4",
        padding: 10,
        display: "grid",
        gridTemplate: " 200px / repeat(4, 1fr)",
        gridGap: 15,
        overflowX: "auto",

        '&::-webkit-scrollbar-track': {
            backgroundColor: "#F5F5F5"
        },
        '&::-webkit-scrollbar': {
            width: 10,
            backgroundColor: "#F5F5F5"
        },

        '&::-webkit-scrollbar-thumb': {
            backgroundColor: "#6AA9EE"
        }
    },
    items: {
        position: "relative",
        width: "100%",
        height: 200,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 5,
        boxShadow: "1px 2px 3px rgba(0,0,0,0.3)",
        marginBottom: 15,
    },
    outStock: {
        position: "absolute",
        width: "100%",
        height: "100%",
        margin: "-5px 0 0 -5px",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        '&>div': {
            padding: "5px 15px",
            backgroundColor: "#EC7063",
            color: "white",
            borderRadius: 5
        }
    },
    itemImg: {
        width: "100%",
        height: "70%",
        textAlign: "center"
    },
    itemDetail: {
        width: "100%",
        height: "30%",
        padding: 5,
        color: "#333333"
    },
    order: {
        width: "30%",
        height: "100%",
        padding: 5
    },
    total: {
        backgroundColor: "white",
        padding: 10,
        boxShadow: "0 0 3px rgba(0,0,0,0.3)",
        '&>div': {
            marginTop: 15,
            display: "grid",
            gridTemplateColumns: "130px 1fr",

            '&>span': {
                fontSize: 24,
                '&>select': {
                    fontSize: 14,
                    border: "none"
                },
            },
            '&>input': {
                border: "none",
                borderBottom: "1px solid #333",
                fontSize: 18,
                width: "100%"
            }
        },
        '&>button': {
            marginTop: 15
        }
    },
    listOrder: {
        backgroundColor: "#F4F6F6",
        height: "68%",
        overflowX: "auto",
        padding: 10
    },
    optionListOrder: {
        margin: "5px 0 5px 0",
        textAlign: 'end',
        '&>button': {
            marginLeft: 5,
        }
    },
    paymentNumber: {
        display: "grid",
        gridTemplate: "repeat(4, 80px) / repeat(4, 80px)",
        '&>div': {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #85C1E9",
            color: "#333333",
            fontSize: 18,
            fontWeight: "bold"
        }
    },
    itemsProduct: {
        width: "100%",
        display: "grid",
        gridTemplate: "auto / 110px 1fr 80px",
        padding: 5,
        backgroundColor: "white",
        boxShadow: "0 0 3px rgba(0,0,0,0.3)",
        marginTop: 5,
        borderRadius: 5,
        '&>div': {
            padding: 5
        }
    },
    action: {
        backgroundColor: "#FAD7A0"
    },
    titleModal: {
        display: "flex",
        justifyContent: "space-between",
        padding: 5
    },
    displayModal: {
        height: 68,
        padding: 10,
        backgroundColor: "#F4F4F4",
        textAlign: "end",
        fontSize: 24
    },
    btnModal: {
        marginTop: 10,
    },
    alert: {
        position: "absolute",
        left: -0.5,
        color: "white",
        padding: 5,
        backgroundColor: "#EC7063",
        borderRadius: "0 10px 10px 0"
    },
    '@media (max-width: 1180px)': {
        container: {
            width: "100%",
            display: "block",
            minHeight: "90vh",
        },
        product: {
            width: "100%",
        },
        order: {
            width: "100%",
        },
    },
    '@media (max-width: 960px)': {
        listProduct: {
            gridTemplateColumns: "repeat(3, 1fr)",
        }
    },
    '@media (max-width: 680px)': {
        listProduct: {
            gridTemplateColumns: "1fr 1fr",
        }
    },
    discountNumber: {
        display: "grid",
        gridTemplate: "repeat(4, 80px) / repeat(3, 100px)",
        '&>div': {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #85C1E9",
            color: "#333333",
            fontSize: 18,
            fontWeight: "bold"
        }
    },
    depositModalBody: {
        padding: 5,
        height: 252.4,
        '& table': {
            minWidth: 379,
        },
        '& thead': {
            backgroundColor: "#5D6D7E",
        },
        '& tbody': {
            '&>tr': {
                '&:hover': {
                    backgroundColor: "#A3C7EE",
                    cursor: "pointer",
                }
            }
        },
        '& th': {
            color: "white",
            padding: "5px 10px"
        },
        '& td': {
            textAlign: "center",
            color: "#333333",
            padding: "5px 10px",
        },
    },
    depositModalFooter: {
        padding: "5px 10px"
    },
    formBarcode: {
        '&>input': {
            padding: "2px 5px",
            fontSize: 18,
            border: "none",
            borderRadius: 5,
            margin: "0 10px",
        }
    },
    // print Order
    printTitle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        marginTop: 10,
        border: "2px solid #333333",
        padding: 5,
        backgroundColor: "#2E86C1",
        color: "white"
    },
    datetime: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 15,
        '&>span': {
            margin: "0 5px"
        }
    },
    orderContent: { margin: "20px 0 20px 0" },
    titleOrder: {
        display: "flex",
        justifyContent: "space-between",
        border: "2px solid #333",
        padding: "5px 10px"
    },
    itemOrder: {
        display: "flex",
        justifyContent: "space-between",
        margin: 20
    },
    sumOrder: {
        border: "2px solid #333",
        padding: 5,
        '&>div': {
            display: "flex",
            justifyContent: "space-between"
        }
    }
}

export default c => jss(style)(c);