const { 
  GraphQLString,
  GraphQLID 
} = require('graphql');
const UserType = require('../../types/user');
//const socket = require('../../socket');

module.exports = {
  type: UserType,
  description: 'Email, token or id is required.',
  args: {
    id: {
      name: 'id',
      type: GraphQLID,
      description: 'Email, token or id is required.'
    },
    email: {
      name: 'email',
      type: GraphQLString,
      description: 'Email, token or id is required.'
    },
    token: {
      name: 'token',
      type: GraphQLString,
      description: 'Email, token or id is required.'
    }
  },
  resolve: (root, args, {req: {app: {db: {Users}}}}) => {
    return new Promise((resolve, reject) => {
      Users.findOne({where: args})
        .then((user) => {
          user.tokenExpire();
          resolve(user.dataValues);
        })
        .catch(errors => reject(errors))
    })
  }
};