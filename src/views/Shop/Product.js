import React from 'react';
import classnames from 'classnames';

const defaultProps = {
    action: null
}

const Product = ({ classes, data, dispatch, action, basket }) => {
    return (
        <div className={classnames(classes.items, action)} onClick={e => {
            if (basket !== undefined) {
                if ((data.p_count - basket.count) !== 0)
                    dispatch({ type: "addProduct", payload: data })
            } else dispatch({ type: "addProduct", payload: data })
        }}>
            {(data.p_count < data.p_alert && data.p_count !== 0) ? <span className={classes.alert}>ใกล้หมดแล้ว</span> : null}

            {(basket !== undefined && ((data.p_count - basket.count) === 0)) &&
                <div className={classes.outStock}> <div>สินค้าหมด</div> </div>}

            <div className={classes.itemImg}>
                <img
                    src={"http://localhost:4000" + data.p_img} alt={data.p_name}
                    width={"80%"}
                    height={"100%"}
                    style={{ borderRadius: 5 }} />
            </div>
            <div className={classes.itemDetail}>
                <h4>{data.p_name}</h4>
                <h3>{data.p_sale} บาท</h3>
            </div>
        </div>
    );
}

Product.defaultProps = defaultProps;

export default Product;