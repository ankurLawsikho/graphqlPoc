const User = require('../models/users.model');
const Company = require('../models/company.model');
const Job = require('../models/job.model');



const addCompanyGraphQl = async (payload) => {
   
    try {
        const name = payload.name ? payload.name : "";
        const description = payload.description ? payload.description : "";

        let Info = await Company.create({
            name,
            description
        });
        if (!Info) {
            return {
                "message": "Some Error Occured"
            };
        }

        return {
            "message": "Company Added"
        };
    } catch (error) {
        return {
            "message":"Some Error Occured"
        };
    }
}

//------------------------------------------------------------------------------------
const addJob = async (req, res) => {
   
    try {
        const companyId = req.body.companyId ? req.body.companyId : "";
        const title = req.body.title ? req.body.title : "";
        const description = req.body.description ? req.body.description: "";

        let Info = await Job.create({
            companyId,
            title,
            description
        });
        if (!Info) {
            res.json({
                isError: true,
                message: "some error occur while adding Job"
            })
            return;
        }

        res.json({
            isError: true,
            message: "Job added",
            data: Info
        })
        return;
    } catch (error) {
        res.json({
            isError: true,
            message: "some error occur while adding Job",
            "error": error
        })
    }
}


const addUser = async (req, res) => {
   
    try {
        const companyId = req.body.companyId ? req.body.companyId : "";
        const email = req.body.email ? req.body.email : "";
        const password = req.body.password ? req.body.password: "";

        let Info = await User.create({
            companyId,
            email,
            password
        });
        if (!Info) {
            res.json({
                isError: true,
                message: "some error occur while adding User"
            })
            return;
        }

        res.json({
            isError: true,
            message: "User added",
            data: Info
        })
        return;
    } catch (error) {
        res.json({
            isError: true,
            message: "some error occur while adding User",
            "error": error
        })
    }
}

const addCompany = async (req, res) => {
   
    try {
        const name = req.body.name ? req.body.name : "";
        const description = req.body.description ? req.body.description : "";

        let Info = await Company.create({
            name,
            description
        });
        if (!Info) {
            res.json({
                isError: true,
                message: "some error occur while adding Company"
            })
            return;
        }

        res.json({
            isError: true,
            message: "Company added",
            data: Info
        })
        return;
    } catch (error) {
        res.json({
            isError: true,
            message: "some error occur while adding Company",
            "error": error
        })
    }
}

module.exports = {
    addUser,
    addCompany,
    addJob,
    addCompanyGraphQl
};