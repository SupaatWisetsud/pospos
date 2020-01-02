const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { unlink } = require('fs');
const path = require('path');

const SECRET = "asldo12rogir-rkfg[bfdig01-3rdfjsozvnkqkeodwpamvl;asek2";

function authenticationMiddleware(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (authorization && authorization !== '') {
            const decoded = jwt.verify(authorization, SECRET)
            next();
        } else { res.json({ status: 401 }) }
    } catch (err) {
        res.json({ status: err });
    }
}

module.exports = (app, mysql) => {

    app.route('/api/auth')
        .post((req, res) => {
            const { username, password } = req.body;
            const sql = `SELECT p_id, p_name, p_email, p_status, p_img, p_phone FROM tb_personnel
            WHERE p_email = '${username}' AND p_password = '${md5(password)}' `;
            mysql.query(sql, (err, row) => {
                if (err) throw err;
                if (row[0] !== undefined) {
                    const token = jwt.sign({ ...row }, SECRET);
                    res.json({
                        result: true,
                        token
                    });
                } else {
                    res.json({
                        result: false
                    })
                }
            })
        })

    app.route('/api/user')
        .get(authenticationMiddleware, (req, res) => {
            const sql = `SELECT p_id, p_name, p_email, p_status, p_img, p_phone FROM tb_personnel`;
            mysql.query(sql, (err, row) => {
                if (err) throw err;
                res.json({ status: 200, row });
            });
        })
        .post(authenticationMiddleware, async (req, res) => {
            const { p_name, p_email, p_password, p_status, p_phone } = req.body;
            let sql;
            if (req.files !== null) {
                const upload = req.files.p_img;
                await upload.mv("./Backend/image/user/" + upload.name, err => {
                    if (err) throw err;
                });
                sql = `INSERT INTO tb_personnel (p_name, p_email, p_password, p_status, p_phone, p_img)
                        VALUES ('${p_name}', '${p_email}', '${md5(p_password)}', '${p_status}', '${p_phone}', '/img/user/${upload.name}') `;
            } else {
                sql = `INSERT INTO tb_personnel (p_name, p_email, p_password, p_status, p_phone)
                        VALUES ('${p_name}', '${p_email}', '${md5(p_password)}', '${p_status}', '${p_phone}') `;
            }
            mysql.query(sql, (err, row) => {
                if (err) throw err;
                res.json({ status: 200, row });
            });
        })
        .delete(authenticationMiddleware, (req, res) => {
            const { id } = req.body;
            mysql.query(`SELECT * FROM tb_personnel WHERE p_id = ${id} `, (err, row) => {
                if (err) throw err;
                const { p_img } = row[0];

                const sql = `DELETE FROM tb_personnel WHERE p_id = ${id}`;

                mysql.query(sql, async (err, row) => {
                    if (err) throw err;

                    if (p_img.split("system").length == 1) {
                        await unlink(path.join(__dirname, '/image' + p_img.split('/img')[1]), err => {
                            if (err) throw err;
                        });
                    }

                    res.json({ status: 200, row });
                });
            });

        })

    app.route('/api/user/:id')
        .get(authenticationMiddleware, (req, res) => {

            let sql = `SELECT * FROM tb_personnel WHERE p_id = '${req.params.id}' `;

            mysql.query(sql, (err, row) => {
                if (err) throw err;
                res.json({ status: 200, row });
            })
        })
        .post(authenticationMiddleware, async (req, res) => {

            if (req.body.p_password !== undefined) {

                mysql.query(`SELECT * FROM tb_personnel WHERE p_password = '${md5(req.body.old)}' AND p_id = ${req.params.id} `, (err, row) => {
                    if (err) throw err;

                    if (row[0] !== undefined) {
                        mysql.query(`UPDATE tb_personnel SET p_password = '${md5(req.body.p_password)}' WHERE p_id = ${req.params.id} `, err => {
                            if (err) throw err;
                            res.json({ status: 200, success: true, message: "" });
                        })
                    } else {
                        res.json({ status: 200, success: false, message: "รหัสเดิมของท่านไม่ถูกต้อง.." });
                    }
                })
            } else {
                Object.keys(req.body).forEach((n, i) => {
                    str += `${n} = '${req.body[n]}'`;
                    if ((i + 1) < Object.keys(req.body).length) str += ", ";
                    else {
                        if (req.files !== null) str += ", "
                        else str += " "
                    }
                })

                if (req.files !== null) {
                    const upload = req.files.p_file;
                    await upload.mv("./Backend/image/user/" + upload.name, err => {
                        if (err) throw err;
                    });
                    str += `p_img = '/img/user/${upload.name}' `;
                };

                let sql = 'UPDATE tb_personnel SET ' + str + 'WHERE p_id = ' + req.params.id;

                mysql.query(sql, (err, row) => {
                    if (err) throw err;
                    res.json({ status: 200, row });
                });
            }

        })

    app.route('/api/product')
        .get(authenticationMiddleware, (req, res) => {
            const sql = `SELECT * FROM tb_product INNER JOIN tb_category ON tb_product.p_category = tb_category.c_id`;
            mysql.query(sql, (err, row) => {
                if (err) throw err;
                res.json({ status: 200, row });
            });
        })
        .post(authenticationMiddleware, async (req, res) => {
            const { p_name, p_cost, p_sale, p_category, p_count, p_alert, p_type, p_barcode } = req.body;
            let sql;
            if (req.files !== null) {
                const upload = req.files.p_img;
                await upload.mv("./Backend/image/product/" + upload.name, err => {
                    if (err) throw err;
                });
                sql = `INSERT INTO tb_product(p_name, p_cost, p_sale, p_category, p_type, p_count, p_alert, p_img, p_barcode) 
                VALUES ('${p_name}', ${p_cost}, ${p_sale}, ${p_category}, '${p_type}', ${p_count}, ${p_alert}, '/img/product/${upload.name}', '${p_barcode}')`
            } else {
                sql = `INSERT INTO tb_product(p_name, p_cost, p_sale, p_category, p_type, p_count, p_alert, p_barcode) 
                VALUES ('${p_name}', ${p_cost}, ${p_sale}, ${p_category}, '${p_type}', ${p_count}, ${p_alert}, '${p_barcode}')`;
            }

            mysql.query(sql, (err, row) => {
                if (err) throw err;
                res.json({ status: 200, row });
            })
        })
        .put(authenticationMiddleware, async (req, res) => {
            const { id, p_name, p_cost, p_sale, p_category, p_count, p_alert, p_type } = req.body;
            let sql = '';
            if (req.files !== null) {
                const upload = req.files.p_img;
                await upload.mv("./Backend/image/product/" + upload.name, err => {
                    if (err) throw err;
                });
                sql = `UPDATE  tb_product  SET  p_name = '${p_name}',
                p_cost = '${p_cost}', p_sale = '${p_sale}', p_category = '${p_category}', p_type = '${p_type}',
                p_count = '${p_count}', p_alert = '${p_alert}', p_img = '/img/product/${upload.name}' WHERE p_id = ${id}`;

            } else {
                sql = `UPDATE  tb_product  SET  p_name = '${p_name}',
                p_cost = '${p_cost}', p_sale = '${p_sale}', p_category = '${p_category}', p_type = '${p_type}',
                p_count = '${p_count}', p_alert = '${p_alert}' WHERE p_id = ${id}`;
            }
            mysql.query(sql, (err, row) => {
                if (err) throw err;
                res.json({ status: 200, row });
            })
        })
        .delete(authenticationMiddleware, (req, res) => {

            const { p_id } = req.body;
            mysql.query(`SELECT * FROM tb_product WHERE p_id = ${p_id} `, (err, row) => {
                if (err) throw err;
                const { p_img } = row[0];

                const sql = `DELETE FROM tb_product WHERE p_id = ${p_id}`;

                mysql.query(sql, async (err, row) => {
                    if (err) throw err;

                    if (p_img.split("system").length == 1) {
                        await unlink(path.join(__dirname, '/image' + p_img.split('/img')[1]), err => {
                            if (err) throw err;
                        });
                    }
                    res.json({ status: 200, row });
                });
            });

        })

    app.route('/api/payment')
        .get(authenticationMiddleware, (req, res) => {
            const sql = `SELECT * FROM tb_payment ORDER BY p_bill DESC`;
            mysql.query(sql, (err, row) => {
                if (err) throw err;
                res.json({ status: 200, row });
            })
        })
        .post(authenticationMiddleware, (req, res) => {
            const { total, basket, discount, discountType, defaultTotal } = req.body;
            let order = JSON.stringify({ order: basket });

            let sql = `INSERT INTO tb_payment(p_order, p_total, p_discount, p_typediscount, p_sumtotal) VALUES ('${order}', '${total}', '${discount}', '${discountType}', '${defaultTotal}')`;

            mysql.query(sql, err => {
                if (err) throw err;

                sql = '';
                for (let n of basket) {
                    sql = `UPDATE tb_product SET p_count = p_count - ${n.count} WHERE p_id = ${n.p_id};\n`;
                    mysql.query(sql, err => { if (err) throw err })
                }
                res.json({ status: 200, result: "success" });
            })
        })

    app.get('/api/bill', authenticationMiddleware, (req, res) => {
        const sql = `SELECT * FROM tb_payment ORDER BY p_bill DESC LIMIT 1;`;
        mysql.query(sql, (err, row) => {
            if (err) throw err;
            res.json({ status: 200, row });
        })
    });

    app.get('/api/report', authenticationMiddleware, (req, res) => {
        const sql = `SELECT * FROM tb_payment`;
        mysql.query(sql, (err, row) => {
            if (err) throw err;
            res.json({ status: 200, row });
        })
    });

    app.route('/api/category')
        .get(authenticationMiddleware, (req, res) => {
            const sql = `SELECT * FROM tb_category`;
            mysql.query(sql, (err, row) => {
                if (err) throw err;
                res.json({ status: 200, row });
            });
        })
        .post(authenticationMiddleware, (req, res) => {
            const { category } = req.body;
            let sql = `INSERT INTO tb_category(c_name) VALUES ('${category}')`;
            mysql.query(sql, (err, row) => {
                if (err) throw err;
                sql = `SELECT * FROM tb_category`;
                mysql.query(sql, (err, row) => {
                    if (err) throw err;
                    res.json({ status: 200, row });
                });
            });
        })
        .delete(authenticationMiddleware, (req, res) => {
            const { id } = req.body;
            let sql = `DELETE FROM tb_category WHERE c_id = '${id}' `;
            mysql.query(sql, (err, row) => {
                if (err) throw err;
                sql = `SELECT * FROM tb_category`;
                mysql.query(sql, (err, row) => {
                    if (err) throw err;
                    res.json({ status: 200, row });
                });
            });
        })
}