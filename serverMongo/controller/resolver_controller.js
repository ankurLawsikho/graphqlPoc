const main_controller = require('./main_controller');

const getUserCtl = async (payload) => {
    const response = await main_controller.getUserGraphQl(payload);
    return response;
}

const getJobCtl = async (payload) => {
    const response = await main_controller.getJobGraphQl(payload);
    return response;
}

const getCompanyCtl = async (payload) => {
    const response = await main_controller.getCompanyGraphQl(payload);
    return response;
}

const createCompanyCtl = async (payload) => {
    const response = await main_controller.addCompanyGraphQl(payload);
    return response;
}

module.exports = {
    createCompanyCtl,
    getCompanyCtl,
    getJobCtl,
    getUserCtl
};