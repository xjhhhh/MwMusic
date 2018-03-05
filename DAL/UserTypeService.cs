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
    public class UserTypeService
    {
        /// <summary>
        /// 根据类型编号获取用户类型信息
        /// </summary>
        /// <param name="typeId"></param>
        /// <returns></returns>
        public static UserType SelectUserTypeById(int typeId)
        {
            UserType u = null;
            string sql = "select * from USerType where id='" + typeId + "'";
            SqlDataReader dr = DBHelper.ExecuteReader(sql, CommandType.Text);
            if (dr.Read())
            {
                u = new UserType();
                u.Id = Convert.ToInt32(dr["Id"]);
                u.Type = dr["Type"].ToString();
            }
            dr.Close();
            return u;
        }
    }
}
