const { AppDataSource } = require('../data-source');
const UserRepo = AppDataSource.getRepository('User');

exports.signup = async (userData) => {
  const existing = await UserRepo.findOneBy({ email: userData.email });
  if (existing) {
    throw new Error('Email already registered');
  }
  const user = UserRepo.create(userData);
  await UserRepo.save(user);
};

exports.login = async (email, password) => {
  const user = await UserRepo.findOneBy({ email, password });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  return {
    id: user.userId,
    name: user.name,
    email: user.email,
    profilePic: user.profilePic,
    role: user.email === 'admin@example.com' ? 'admin' : 'user',
  };
};

exports.getAll = () => UserRepo.find();

exports.getById = (id) => UserRepo.findOneBy({ userId: id });

exports.update = async (id, data) => {
  await UserRepo.update({ userId: id }, data);
};

exports.remove = async (id) => {
  await UserRepo.delete({ userId: id });
};
