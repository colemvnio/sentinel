class BaseController {
    constructor(req, res, service) {
        if (new.target === BaseController) throw new TypeError('Cannot construct BaseController instances directly');

        this.req = req;
        this.res = res;
        this.body = req.body;
        if (this.req.params) this.params = this.req.params;

        this.service = service;
        this.userId = 'local';
    }

    async detail() {
        const document = await this.service.getById(this.params.id, this.userId);
        return this.handleOk(document);
    }

    async create() {
        const document = await this.service.create(this.body, this.userId);
        return this.handleOk(document, 201);
    }

    handleOk(data, statusCode = 200) {
        return this.res.status(statusCode).json(data);
    }

    handleFail(message = 'Bad Request', statusCode = 400) {
        return this.res.status(statusCode).json({ error: message });
    }
}

module.exports = BaseController;