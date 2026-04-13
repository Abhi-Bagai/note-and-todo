// Interface contract for all repositories.
// JS has no native interfaces, so we use a base class that throws on every
// method — subclasses that forget to implement a method fail loudly at runtime.
export class IRepository {
  // eslint-disable-next-line no-unused-vars
  get(id)          { throw new Error(`${this.constructor.name}.get() not implemented`); }
  getAll()         { throw new Error(`${this.constructor.name}.getAll() not implemented`); }
  // eslint-disable-next-line no-unused-vars
  create(data)     { throw new Error(`${this.constructor.name}.create() not implemented`); }
  // eslint-disable-next-line no-unused-vars
  update(id, data) { throw new Error(`${this.constructor.name}.update() not implemented`); }
  // eslint-disable-next-line no-unused-vars
  delete(id)       { throw new Error(`${this.constructor.name}.delete() not implemented`); }
}
