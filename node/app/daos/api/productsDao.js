const con = require('../../config/dbconfig')
const productsDao = {
    table: 'products',
    create: (req, res) => {
        if(Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No fields to create."
            })
        } else { 
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)
            con.execute(
                `INSERT INTO products SET ${fields.join(' = ?, /')} = ?`,
                values,
                (error, dbres) => {
                    if(!error) {
                        res.send(`Last id: ${dbres.insertId}`)
                    } else {
                        console.log('DAO ERROR', error)
                        res.send('Error creating record')
                    }
                }
            )
        }
    },

    update: (req, res) => {
        if(isNaN(req.params.id)) {
            res.json({
                "error": true,
                "message": "Id must be a number."
            })
        } else if(Object.keys(req.body) === 0) {
            req.json({
                "error": true,
                "message": "No fields to update"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.execute(
                `UPDATE products SET ${fields.join(' = ?, ')} = ? WHERE products_id = ?`,
                [...values, req.params.id],
                (error, dbres) => {
                    if(!error) {
                        res.send(`Changed ${dbres.changedRows} row(s)`)
                    } else {
                        console.log('DAO ERROR', error)
                        res.send('Error updating record')
                    }
                }
            )
        }
    },

    findByCategory: (res, category) => {
        con.execute(
            `SELECT * FROM products WHERE category = ?`,
            [category],
            (error, rows) => {
                if(!error) {
                    if(rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('DAO ERROR', error)
                }
            }
        )
    },

    sort: (req, res) => {
        con.execute(
            'SELECT * FROM products ORDER BY name',
            [req.body],
            (error, rows) => {
                if(!error) {
                    if(rows.length === 1) {
                        res.json(...rows)
                        console.log(req.body)
                    } else {
                        res.json(rows)
                    } 
                } else {
                    console.log('DAO SORT ERROR', error)
                }
            }
        )
    }

}

module.exports = productsDao