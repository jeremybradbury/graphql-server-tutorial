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
  resolve: (root, { data }, {req: {app: {db: {User}}}}) => {
    return new Promise((resolve, reject) => {
      let status = data.status; // save this for setting
      delete data.status; // remove from the query
      User.findOne({where: data})
        .then((user) => {
          let expires = user.disable();
          if(status){
            expires = user.enable(status);
          }
          let result = user.dataValues;
          return Object.assign(result,expires);
        })
        .then((user)=>{
          resolve(user);
        })
        .catch(errors => reject(errors))
    })
  }
};