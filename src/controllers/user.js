/* globals UserModel */

export let UserController = {
  create: function* () {
    let user = new UserModel(this.request.body);
    yield user.save();

    this.body = {
      data: {
        _id: user._id
      }
    };
    this.status = 201;
  },
  findOne: function* () {
    let user = yield UserModel.findById(this.params.id);
    this.body = user;

    this.status = 200;
  },
  find: function* () {
    let user = yield UserModel.find();
    this.body = user;

    this.status = 200;
  },
  remove: function* () {
    yield UserModel.removeById(this.params.id);
    this.body = {message: `Successfully removed.`};

    this.status = 200;
  }
};
