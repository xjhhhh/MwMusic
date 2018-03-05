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
    public class AdminService
    {
        #region 根据管理员帐号查询帐号信息（后台登陆）
        /// <summary>
        /// 根据管理员帐号查询帐号信息（后台登陆）
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        public static Admin SelectAdminByLoginId(string loginId)
        {
            Admin a = null;
            string sql = "select * from Admin where LoginId ='" + loginId + "'";
            SqlDataReader dr = DBHelper.ExecuteReader(sql, CommandType.Text);
            if (dr.Read())
            {
                a = new Admin();
                a.Id = Convert.ToInt32(dr["Id"]);
                a.LoginId = loginId;
                a.LoginPwd = dr["LoginPwd"].ToString();
                int classId = Convert.ToInt32(dr["classId"]);
                dr.Close();
                a.Class = AdminClassService.SelectAdminClassByClassId(classId);
            }
            else
                dr.Close();
            return a;
        } 
        #endregion
    }
}
