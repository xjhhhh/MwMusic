using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Model;

namespace DAL
{
    public static class UserService
    {

        #region 根据用户名查询用户（登陆查询）
        /// <summary>
        /// 根据用户名查询用户（登陆查询）
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public static Users SelectUserByLoginId(string loginId)
        {
            Users u = null;
            string sql = "select * from Users where LoginId ='" + loginId + "'";
            SqlDataReader dr = DBHelper.ExecuteReader(sql, CommandType.Text);
            if (dr.Read())
            {
                u = new Users();
                u.Id = Convert.ToInt32(dr["Id"]);
                u.LoginId = dr["LoginId"].ToString();
                u.LoginPwd = dr["LoginPwd"].ToString();
                int typeId = Convert.ToInt32(dr["TypeId"]);
                dr.Close();
                u.UserType = UserTypeService.SelectUserTypeById(typeId);
            }
            else
                dr.Close();
            return u;
        }
        #endregion

        #region 根据用户编号查询用户信息
        /// <summary>
        /// 根据用户编号查询用户信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public static Users SelectUserById(int Id)
        {
            Users u = null;
            string sql = "select * from Users where Id ='" + Id + "'";
            SqlDataReader dr = DBHelper.ExecuteReader(sql, CommandType.Text);
            if (dr.Read())
            {
                u = new Users();
                u.Id = Convert.ToInt32(dr["Id"]);
                u.LoginId = dr["LoginId"].ToString();
                u.LoginPwd = dr["LoginPwd"].ToString();
                int typeId = Convert.ToInt32(dr["TypeId"]);
                dr.Close();
                u.UserType = UserTypeService.SelectUserTypeById(typeId);
            }
            else
                dr.Close();
            return u;
        } 
        #endregion

        #region 添加用户（用户注册）
        /// <summary>
        /// 添加用户（用户注册）
        /// </summary>
        /// <param name="u"></param>
        /// <returns></returns>
        public static int InsertUser(Users u)
        {
            string sql = "Insert Into Users(LoginId,LoginPwd,TypeId) Values(@LoginId,@LoginPwd,@TypeId)";
            SqlParameter[] para = new SqlParameter[]
            {
                new SqlParameter("@LoginId",u.LoginId),
                new SqlParameter("@LoginPwd",u.LoginPwd),
                new SqlParameter("@TypeId",1)
            };
            return DBHelper.ExecuteNonQuery(sql, CommandType.Text, para);
        }
        #endregion

        #region 修改密码
        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="loginPwd"></param>
        /// <returns></returns>
        public static int UpdateUserPwd(string loginPwd, string loginId)
        {
            string sql = "Update User set loginPwd='" + loginPwd + "' where LoginId='" + loginId + "'";
            return DBHelper.ExecuteNonQuery(sql, CommandType.Text);
        } 
        #endregion

        #region 修改用户级别（开通会员，会员级别增加）
        /// <summary>
        /// 修改用户级别（开通会员，会员级别增加）
        /// </summary>
        /// <param name="loginid"></param>
        /// <returns></returns>
        public static int AddUserStatu(string loginid)
        {
            string sql = "Update User set TypeId=TypeId+1 where LoginId='" + loginid + "'";
            return DBHelper.ExecuteNonQuery(sql, CommandType.Text);
        }
        #endregion

        #region 修改用户级别（会员级别增加,关闭会员）
        /// <summary>
        /// 修改用户级别（会员级别增加,关闭会员）
        /// </summary>
        /// <param name="loginid"></param>
        /// <returns></returns>
        public static int ReduceUserStatu(string loginid)
        {
            string sql = "Update User set TypeId=TypeId-1 where LoginId='" + loginid + "'";
            return DBHelper.ExecuteNonQuery(sql, CommandType.Text);
        } 
        #endregion

    }
}
