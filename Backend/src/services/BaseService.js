import AppError from '../utils/error.utils.js';

export default class BaseService {
  async findAllWithPagination(Model, options = {}) {
    const {
      page = 1,
      pageSize = 10,
      search = '',
      searchFields = [],
      order = [['id', 'ASC']],
      include = []
    } = options;

    const where = {};
    if (search && searchFields.length) {
      where[Op.or] = searchFields.map(field => ({
        [field]: { [Op.iLike]: `%${search}%` }
      }));
    }

    const offset = (page - 1) * pageSize;
    const result = await Model.findAndCountAll({
      where,
      include,
      limit: pageSize,
      offset,
      order
    });
    return {
      rows: result.rows,
      total: result.count,
      page,
      pageSize,
      totalPages: Math.ceil(result.count / pageSize)
    };
  }

  async findById(Model, id, include = []) {
    const element = await Model.findByPk(id, { include });
    if (!element) throw new AppError(`${Model.name} not found`, 404);
    return element;
  }
}
