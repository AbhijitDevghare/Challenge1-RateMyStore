import { Admin } from "../models/index.js";
import BaseService from "./BaseService.js";

class AdminService extends BaseService {
  async getAll(queryParams) {
    return this.findAllWithPagination(Admin, {
      ...queryParams,
      searchFields: ['username', 'name', 'email']
    });
  }

  async getById(id) {
    return this.findById(Admin, id);
  }

  async update(id, data) {
    const admin = await this.getById(id);
    return admin.update(data);
  }

  async delete(id) {
    const admin = await this.getById(id);
    return admin.destroy();
  }
}

export default new AdminService();
