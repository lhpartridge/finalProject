const daoCommon = require('./common/daoCommon')

const productsDao = {
    ...daoCommon,
    ...require('./api/productsDao')
}

module.exports = {
    productsDao
}