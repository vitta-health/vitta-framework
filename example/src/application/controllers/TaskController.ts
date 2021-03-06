import { GenericController, IGenericController, container } from 'attiv';
import ITaskService from '../../domain/task/services/interface/ITaskService';

import { Router, Request } from 'express';

export default class TaskController extends GenericController<ITaskService> implements IGenericController {
  constructor() {
    super('taskService');
  }

  public getRouter() {
    let router = Router();
    router = super.getRouter();
    router.get('/get', this.getAll.bind(this));
    router.get('/find/name', this.getFindTaskByTitle.bind(this));
    router.post('/new', this.createIsValid.bind(this));

    return router;
  }

  async getFindTaskByTitle(req: Request, res, nextn) {
    try {
      return res.status(200).json(await this.getService(req).getFindTaskByTitle(req.query.title));
    } catch (ex) {
      nextn(ex);
    }
  }

  async getAll(req: Request, res, nextn) {
    try {
      return res.status(200).json(await this.getService(req).getAll());
    } catch (ex) {
      nextn(ex);
    }
  }

  async createIsValid(req: Request, res, nextn) {
    try {
      return res.status(200).json(await this.getService(req).createIsValid(req.body));
    } catch (ex) {
      nextn(ex);
    }
  }
}
