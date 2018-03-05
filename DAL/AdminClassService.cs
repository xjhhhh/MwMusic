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
    public class AdminClassService
    {
        #region 根据类别编号查询类别
        /// <summary>
        /// 根据类别编号查询类别
        /// </summary>
        /// <param name="classId"></param>
        /// <returns></returns>
        public static AdminClass SelectAdminClassByClassId(int classId)
        {
            AdminClass c = null;
            string sql = "select * from AdminClass where Id ='" + classId + "'";
            SqlDataReader dr = DBHelper.ExecuteReader(sql, CommandType.Text);
            if (dr.Read())
            {
                c = new AdminClass();
                c.Id = classId;
                c.Name = dr["Name"].ToString();
            }
            dr.Close();
            return c;
        }
        #endregion
    }
}
