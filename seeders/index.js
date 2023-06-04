/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const dbService = require('../utils/dbService');

/* seeds default users */
async function seedUser() {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password': 'User@1234',
      'isDeleted': false,
      'username': 'User',
      'email': 'hieuvm811@gmail.com',
      'isActive': true,
      'userType': authConstant.USER_TYPES.Moderator
    };
    userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(User, { 'username': 'User' }, userToBeInserted, { upsert: true });
    userToBeInserted = {

      'password': 'Admin@1234',
      'isDeleted': false,
      'username': 'Admin',
      'email': 'hieuvu8118@gmail.com',
      'isActive': true,
      'userType': authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'username': 'Admin' }, userToBeInserted, { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error) {
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole() {
  try {
    const roles = ['Admin','System_User'];
    const insertedRoles = await dbService.findMany(Role, { code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.create(Role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes(routes) {
  try {
    if (routes && routes.length) {
      let routeName = '';
      const dbRoutes = await dbService.findMany(ProjectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.create(ProjectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole() {
  try {
    const routeRoles = [
      {
        route: '/admin/banner/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/banner/create',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/admin/banner/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/banner/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/banner/addbulk',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/admin/banner/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/banner/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/banner/list',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/admin/banner/list',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/admin/banner/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/banner/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/banner/:id',
        role: 'Seller',
        method: 'GET'
      },
      {
        route: '/admin/banner/:id',
        role: 'Customer',
        method: 'GET'
      },
      {
        route: '/admin/banner/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/banner/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/banner/count',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/admin/banner/count',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/admin/banner/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/banner/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/banner/update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/admin/banner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/banner/partial-update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/admin/banner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/banner/updatebulk',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/admin/banner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/banner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/banner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/banner/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/banner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/banner/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/banner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/category/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/category/create',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/admin/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/category/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/category/addbulk',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/admin/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/category/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/category/list',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/admin/category/list',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/admin/category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/category/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/category/:id',
        role: 'Seller',
        method: 'GET'
      },
      {
        route: '/admin/category/:id',
        role: 'Customer',
        method: 'GET'
      },
      {
        route: '/admin/category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/category/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/category/count',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/admin/category/count',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/admin/category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/category/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/category/update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/admin/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/category/partial-update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/admin/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/category/updatebulk',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/admin/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/category/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/category/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user/addbulk',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/admin/user/addbulk',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user/list',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/admin/user/list',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/user/:id',
        role: 'Seller',
        method: 'GET'
      },
      {
        route: '/admin/user/:id',
        role: 'Customer',
        method: 'GET'
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user/count',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/admin/user/count',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/admin/user/update/:id',
        role: 'Customer',
        method: 'PUT'
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Customer',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Customer',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/result/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/result/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/result/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/result/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/result/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/result/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/result/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/result/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/result/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/result/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/result/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/result/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/word_category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/word_category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/word_category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/word_category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/word_category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/word_category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/word_category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/word_category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/word_category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/word_category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/word_category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/word_category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/word/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/word/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/word/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/word/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/word/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/word/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/word/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/word/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/word/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/word/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/word/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/word/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/group_question/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/group_question/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/group_question/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/group_question/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/group_question/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/group_question/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/group_question/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/group_question/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/group_question/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/group_question/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/group_question/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/group_question/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/exam/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/exam/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/exam/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/exam/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/exam/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/exam/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/exam/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/exam/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/exam/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/exam/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/exam/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/exam/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/exam_category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/exam_category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/exam_category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/exam_category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/exam_category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/exam_category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/exam_category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/exam_category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/exam_category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/exam_category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/exam_category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/exam_category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/article_category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/article_category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/article_category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/article_category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/article_category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/article_category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/article_category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/article_category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/article_category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/article_category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/article_category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/article_category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/article/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/article/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/article/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/article/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/article/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/article/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/article/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/article/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/article/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/article/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/article/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/article/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/create',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/addbulk',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/list',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/list',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/banner/:id',
        role: 'Seller',
        method: 'GET'
      },
      {
        route: '/device/api/v1/banner/:id',
        role: 'Customer',
        method: 'GET'
      },
      {
        route: '/device/api/v1/banner/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/banner/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/count',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/count',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/partial-update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/updatebulk',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/banner/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/banner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/banner/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/banner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/create',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/addbulk',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/list',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/list',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'Seller',
        method: 'GET'
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'Customer',
        method: 'GET'
      },
      {
        route: '/device/api/v1/category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/partial-update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/updatebulk',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/category/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/category/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Seller',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Customer',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Customer',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Customer',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Customer',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/result/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/result/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/result/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/result/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/result/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/result/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/result/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/result/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/result/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/result/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/result/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/result/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/word_category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/word_category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/word_category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/word_category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/word_category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/word_category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/word_category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/word_category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/word_category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/word_category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/word_category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/word_category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/word/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/word/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/word/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/word/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/word/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/word/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/word/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/word/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/word/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/word/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/word/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/word/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/group_question/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/group_question/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/group_question/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/group_question/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/group_question/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/group_question/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/group_question/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/group_question/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/group_question/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/group_question/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/group_question/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/group_question/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/exam/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/exam/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/exam/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/exam/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/exam/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/exam/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/exam/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/exam/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/exam/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/exam/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/exam/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/exam/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/exam_category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/exam_category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/exam_category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/exam_category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/exam_category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/exam_category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/exam_category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/exam_category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/exam_category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/exam_category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/exam_category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/exam_category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article_category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article_category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article_category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article_category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/article_category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article_category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article_category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article_category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article_category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article_category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article_category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/article_category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/article/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/article/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/article/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/article/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/create',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/addbulk',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/list',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/list',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/banner/:id',
        role: 'Seller',
        method: 'GET'
      },
      {
        route: '/client/api/v1/banner/:id',
        role: 'Customer',
        method: 'GET'
      },
      {
        route: '/client/api/v1/banner/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/banner/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/count',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/count',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/partial-update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/updatebulk',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/banner/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/banner/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/banner/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/banner/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/create',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/addbulk',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'Seller',
        method: 'GET'
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'Customer',
        method: 'GET'
      },
      {
        route: '/client/api/v1/category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/partial-update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/updatebulk',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/category/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/category/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Seller',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Customer',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Seller',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Customer',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Customer',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Customer',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Seller',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Customer',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/result/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/result/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/result/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/result/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/result/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/result/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/result/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/result/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/result/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/result/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/result/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/result/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/word_category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/word_category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/word_category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/word_category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/word_category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/word_category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/word_category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/word_category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/word_category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/word_category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/word_category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/word_category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/word/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/word/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/word/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/word/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/word/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/word/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/word/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/word/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/word/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/word/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/word/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/word/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/group_question/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/group_question/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/group_question/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/group_question/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/group_question/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/group_question/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/group_question/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/group_question/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/group_question/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/group_question/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/group_question/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/group_question/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/exam/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/exam/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/exam/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/exam/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/exam/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/exam/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/exam/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/exam/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/exam/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/exam/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/exam/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/exam/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/exam_category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/exam_category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/exam_category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/exam_category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/exam_category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/exam_category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/exam_category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/exam_category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/exam_category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/exam_category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/exam_category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/exam_category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article_category/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article_category/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article_category/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article_category/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/article_category/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article_category/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article_category/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article_category/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article_category/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article_category/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article_category/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/article_category/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/article/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/article/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/article/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/article/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = ['Admin', 'Seller', 'System_User', 'Customer'];
      const insertedProjectRoute = await dbService.findMany(ProjectRoute, {
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findMany(Role, {
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(RouteRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(RouteRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole() {
  try {
    const userRoles = [{
      'username': 'Admin',
      'password': 'Admin@1234'
    }, {
      'username': 'User',
      'password': 'User@1234'
    }];
    const defaultRoles = await dbService.findMany(Role);
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin) {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'ADMIN').id
          });
        } else if (user.userType === authConstant.USER_TYPES.Moderator) {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'USER').id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d) => d.code === 'SYSTEM_USER').id
          });
        }
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(UserRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.create(UserRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

async function seedData(allRegisterRoutes) {
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();

};
module.exports = seedData;