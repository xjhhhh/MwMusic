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
public    class SingerService
    {
        #region 获取所有歌手信息
        /// <summary>
        /// 获取所有歌手信息
        /// </summary>
        /// <returns></returns>
        public static List<Singer> SelectAllSinger()
        {
            List<Singer> list = new List<Singer>();
            string sql = "select * from Music";
            DataSet ds = DBHelper.GetDataSet(sql, CommandType.Text);
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                Singer s = new Singer();
                s.Id = Convert.ToInt32(row["Id"]);
                s.Name = row["Name"].ToString();
                s.EName = row["EName"].ToString();
                s.Style = row["Style"].ToString();
                s.Nationality = row["Nationality"].ToString();
                s.RepresentativeWorks = row["RepresentativeWorks"].ToString();
                s.Profile = row["Profile"].ToString();
                list.Add(s);
            }
            return list;
        }
        #endregion

        #region 根据风格查询歌手信息
        /// <summary>
        /// 根据风格查询歌手信息
        /// </summary>
        /// <param name="style"></param>
        /// <returns></returns>
        public static List<Singer> SelectSingerByStyle(string style)
        {
            List<Singer> list = new List<Singer>();
            string sql = "select * from Music where style in('" + style + "') ";
            DataSet ds = DBHelper.GetDataSet(sql, CommandType.Text);
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                Singer s = new Singer();
                s.Id = Convert.ToInt32(row["Id"]);
                s.Name = row["Name"].ToString();
                s.EName = row["EName"].ToString();
                s.Style = row["Style"].ToString();
                s.Nationality = row["Nationality"].ToString();
                s.RepresentativeWorks = row["RepresentativeWorks"].ToString();
                s.Profile = row["Profile"].ToString();
                list.Add(s);
            }
            return list;
        } 
        #endregion
    }
}
