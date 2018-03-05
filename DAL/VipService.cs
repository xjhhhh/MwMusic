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
    public class VipService
    {

        #region 根据用户编号查询会员信息
        /// <summary>
        /// 根据用户编号查询会员信息
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static Vip SelectVipByUserId(int userId)
        {
            Vip v = null;
            string sql = "select * from vip where UserId='" + userId + "'";
            SqlDataReader dr = DBHelper.ExecuteReader(sql, CommandType.Text);
            if (dr.Read())
            {
                v = new Vip();
                v.Id = Convert.ToInt32(dr["Id"]);
                v.GrowthValue = Convert.ToInt32(dr["GrowthValue"]);
                v.UserId = userId;
            }
            dr.Close();
            return v;
        } 
        #endregion
    }
}