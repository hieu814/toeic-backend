/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Result = require('../model/result');
let Word_category = require('../model/word_category');
let Word = require('../model/word');
let Group_question = require('../model/group_question');
let Exam = require('../model/exam');
let Exam_category = require('../model/exam_category');
let Article_category = require('../model/article_category');
let Article = require('../model/article');
let User = require('../model/user');
let Category = require('../model/category');
let Banner = require('../model/banner');
let UserTokens = require('../model/userTokens');
let ActivityLog = require('../model/activityLog');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteResult = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Result,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteWord_category = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Word_category,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteWord = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Word,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteGroup_question = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Group_question,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteExam = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Exam,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteExam_category = async (filter) =>{
  try {
    let exam_category = await dbService.findMany(Exam_category,filter);
    if (exam_category && exam_category.length){
      exam_category = exam_category.map((obj) => obj.id);

      const examFilter = { $or: [{ category : { $in : exam_category } }] };
      const examCnt = await dbService.deleteMany(Exam,examFilter);

      let deleted  = await dbService.deleteMany(Exam_category,filter);
      let response = { exam :examCnt, };
      return response; 
    } else {
      return {  exam_category : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteArticle_category = async (filter) =>{
  try {
    let article_category = await dbService.findMany(Article_category,filter);
    if (article_category && article_category.length){
      article_category = article_category.map((obj) => obj.id);

      const articleFilter = { $or: [{ category : { $in : article_category } }] };
      const articleCnt = await dbService.deleteMany(Article,articleFilter);

      let deleted  = await dbService.deleteMany(Article_category,filter);
      let response = { article :articleCnt, };
      return response; 
    } else {
      return {  article_category : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteArticle = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Article,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const resultFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const resultCnt = await dbService.deleteMany(Result,resultFilter);

      const word_categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const word_categoryCnt = await dbService.deleteMany(Word_category,word_categoryFilter);

      const wordFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const wordCnt = await dbService.deleteMany(Word,wordFilter);

      const group_questionFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const group_questionCnt = await dbService.deleteMany(Group_question,group_questionFilter);

      const examFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const examCnt = await dbService.deleteMany(Exam,examFilter);

      const exam_categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const exam_categoryCnt = await dbService.deleteMany(Exam_category,exam_categoryFilter);

      const article_categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const article_categoryCnt = await dbService.deleteMany(Article_category,article_categoryFilter);

      const articleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const articleCnt = await dbService.deleteMany(Article,articleFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      const categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoryCnt = await dbService.deleteMany(Category,categoryFilter);

      const bannerFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ aricleId : { $in : user } }] };
      const bannerCnt = await dbService.deleteMany(Banner,bannerFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt = await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt = await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(User,filter);
      let response = {
        result :resultCnt,
        word_category :word_categoryCnt,
        word :wordCnt,
        group_question :group_questionCnt,
        exam :examCnt,
        exam_category :exam_categoryCnt,
        article_category :article_categoryCnt,
        article :articleCnt,
        user :userCnt + deleted,
        category :categoryCnt,
        banner :bannerCnt,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCategory = async (filter) =>{
  try {
    let category = await dbService.findMany(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const categoryFilter = { $or: [{ parentCategoryId : { $in : category } }] };
      const categoryCnt = await dbService.deleteMany(Category,categoryFilter);

      let deleted  = await dbService.deleteMany(Category,filter);
      let response = { category :categoryCnt + deleted, };
      return response; 
    } else {
      return {  category : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBanner = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Banner,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteActivityLog = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(ActivityLog,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Role,filter);
      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      let deleted  = await dbService.deleteMany(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countResult = async (filter) =>{
  try {
    const resultCnt =  await dbService.count(Result,filter);
    return { result : resultCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countWord_category = async (filter) =>{
  try {
    const word_categoryCnt =  await dbService.count(Word_category,filter);
    return { word_category : word_categoryCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countWord = async (filter) =>{
  try {
    const wordCnt =  await dbService.count(Word,filter);
    return { word : wordCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countGroup_question = async (filter) =>{
  try {
    const group_questionCnt =  await dbService.count(Group_question,filter);
    return { group_question : group_questionCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countExam = async (filter) =>{
  try {
    const examCnt =  await dbService.count(Exam,filter);
    return { exam : examCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countExam_category = async (filter) =>{
  try {
    let exam_category = await dbService.findMany(Exam_category,filter);
    if (exam_category && exam_category.length){
      exam_category = exam_category.map((obj) => obj.id);

      const examFilter = { $or: [{ category : { $in : exam_category } }] };
      const examCnt =  await dbService.count(Exam,examFilter);

      let response = { exam : examCnt, };
      return response; 
    } else {
      return {  exam_category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countArticle_category = async (filter) =>{
  try {
    let article_category = await dbService.findMany(Article_category,filter);
    if (article_category && article_category.length){
      article_category = article_category.map((obj) => obj.id);

      const articleFilter = { $or: [{ category : { $in : article_category } }] };
      const articleCnt =  await dbService.count(Article,articleFilter);

      let response = { article : articleCnt, };
      return response; 
    } else {
      return {  article_category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countArticle = async (filter) =>{
  try {
    const articleCnt =  await dbService.count(Article,filter);
    return { article : articleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const resultFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const resultCnt =  await dbService.count(Result,resultFilter);

      const word_categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const word_categoryCnt =  await dbService.count(Word_category,word_categoryFilter);

      const wordFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const wordCnt =  await dbService.count(Word,wordFilter);

      const group_questionFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const group_questionCnt =  await dbService.count(Group_question,group_questionFilter);

      const examFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const examCnt =  await dbService.count(Exam,examFilter);

      const exam_categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const exam_categoryCnt =  await dbService.count(Exam_category,exam_categoryFilter);

      const article_categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const article_categoryCnt =  await dbService.count(Article_category,article_categoryFilter);

      const articleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const articleCnt =  await dbService.count(Article,articleFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoryCnt =  await dbService.count(Category,categoryFilter);

      const bannerFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ aricleId : { $in : user } }] };
      const bannerCnt =  await dbService.count(Banner,bannerFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt =  await dbService.count(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        result : resultCnt,
        word_category : word_categoryCnt,
        word : wordCnt,
        group_question : group_questionCnt,
        exam : examCnt,
        exam_category : exam_categoryCnt,
        article_category : article_categoryCnt,
        article : articleCnt,
        user : userCnt,
        category : categoryCnt,
        banner : bannerCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countCategory = async (filter) =>{
  try {
    let category = await dbService.findMany(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const categoryFilter = { $or: [{ parentCategoryId : { $in : category } }] };
      const categoryCnt =  await dbService.count(Category,categoryFilter);

      let response = { category : categoryCnt, };
      return response; 
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countBanner = async (filter) =>{
  try {
    const bannerCnt =  await dbService.count(Banner,filter);
    return { banner : bannerCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countActivityLog = async (filter) =>{
  try {
    const activityLogCnt =  await dbService.count(ActivityLog,filter);
    return { activityLog : activityLogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteResult = async (filter,updateBody) =>{  
  try {
    const resultCnt =  await dbService.updateMany(Result,filter);
    return { result : resultCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteWord_category = async (filter,updateBody) =>{  
  try {
    const word_categoryCnt =  await dbService.updateMany(Word_category,filter);
    return { word_category : word_categoryCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteWord = async (filter,updateBody) =>{  
  try {
    const wordCnt =  await dbService.updateMany(Word,filter);
    return { word : wordCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteGroup_question = async (filter,updateBody) =>{  
  try {
    const group_questionCnt =  await dbService.updateMany(Group_question,filter);
    return { group_question : group_questionCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteExam = async (filter,updateBody) =>{  
  try {
    const examCnt =  await dbService.updateMany(Exam,filter);
    return { exam : examCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteExam_category = async (filter,updateBody) =>{  
  try {
    let exam_category = await dbService.findMany(Exam_category,filter, { id:1 });
    if (exam_category.length){
      exam_category = exam_category.map((obj) => obj.id);

      const examFilter = { '$or': [{ category : { '$in' : exam_category } }] };
      const examCnt = await dbService.updateMany(Exam,examFilter,updateBody);
      let updated = await dbService.updateMany(Exam_category,filter,updateBody);

      let response = { exam :examCnt, };
      return response;
    } else {
      return {  exam_category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteArticle_category = async (filter,updateBody) =>{  
  try {
    let article_category = await dbService.findMany(Article_category,filter, { id:1 });
    if (article_category.length){
      article_category = article_category.map((obj) => obj.id);

      const articleFilter = { '$or': [{ category : { '$in' : article_category } }] };
      const articleCnt = await dbService.updateMany(Article,articleFilter,updateBody);
      let updated = await dbService.updateMany(Article_category,filter,updateBody);

      let response = { article :articleCnt, };
      return response;
    } else {
      return {  article_category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteArticle = async (filter,updateBody) =>{  
  try {
    const articleCnt =  await dbService.updateMany(Article,filter);
    return { article : articleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const resultFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const resultCnt = await dbService.updateMany(Result,resultFilter,updateBody);

      const word_categoryFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const word_categoryCnt = await dbService.updateMany(Word_category,word_categoryFilter,updateBody);

      const wordFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const wordCnt = await dbService.updateMany(Word,wordFilter,updateBody);

      const group_questionFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const group_questionCnt = await dbService.updateMany(Group_question,group_questionFilter,updateBody);

      const examFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const examCnt = await dbService.updateMany(Exam,examFilter,updateBody);

      const exam_categoryFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const exam_categoryCnt = await dbService.updateMany(Exam_category,exam_categoryFilter,updateBody);

      const article_categoryFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const article_categoryCnt = await dbService.updateMany(Article_category,article_categoryFilter,updateBody);

      const articleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const articleCnt = await dbService.updateMany(Article,articleFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);

      const categoryFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const categoryCnt = await dbService.updateMany(Category,categoryFilter,updateBody);

      const bannerFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ aricleId : { '$in' : user } }] };
      const bannerCnt = await dbService.updateMany(Banner,bannerFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(User,filter,updateBody);

      let response = {
        result :resultCnt,
        word_category :word_categoryCnt,
        word :wordCnt,
        group_question :group_questionCnt,
        exam :examCnt,
        exam_category :exam_categoryCnt,
        article_category :article_categoryCnt,
        article :articleCnt,
        user :userCnt + updated,
        category :categoryCnt,
        banner :bannerCnt,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCategory = async (filter,updateBody) =>{  
  try {
    let category = await dbService.findMany(Category,filter, { id:1 });
    if (category.length){
      category = category.map((obj) => obj.id);

      const categoryFilter = { '$or': [{ parentCategoryId : { '$in' : category } }] };
      const categoryCnt = await dbService.updateMany(Category,categoryFilter,updateBody);
      let updated = await dbService.updateMany(Category,filter,updateBody);

      let response = { category :categoryCnt + updated, };
      return response;
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBanner = async (filter,updateBody) =>{  
  try {
    const bannerCnt =  await dbService.updateMany(Banner,filter);
    return { banner : bannerCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteActivityLog = async (filter,updateBody) =>{  
  try {
    const activityLogCnt =  await dbService.updateMany(ActivityLog,filter);
    return { activityLog : activityLogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findMany(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.updateMany(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteResult,
  deleteWord_category,
  deleteWord,
  deleteGroup_question,
  deleteExam,
  deleteExam_category,
  deleteArticle_category,
  deleteArticle,
  deleteUser,
  deleteCategory,
  deleteBanner,
  deleteUserTokens,
  deleteActivityLog,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countResult,
  countWord_category,
  countWord,
  countGroup_question,
  countExam,
  countExam_category,
  countArticle_category,
  countArticle,
  countUser,
  countCategory,
  countBanner,
  countUserTokens,
  countActivityLog,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteResult,
  softDeleteWord_category,
  softDeleteWord,
  softDeleteGroup_question,
  softDeleteExam,
  softDeleteExam_category,
  softDeleteArticle_category,
  softDeleteArticle,
  softDeleteUser,
  softDeleteCategory,
  softDeleteBanner,
  softDeleteUserTokens,
  softDeleteActivityLog,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
