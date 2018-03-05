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
    public class PlaylistService
    {
        #region 获取所有歌单信息
        /// <summary>
        /// 获取所有歌单信息
        /// </summary>
        /// <returns></returns>
        public static List<Playlist> SelectAllPlaylists()
        {
            List<Playlist> list = new List<Playlist>();
            string sql = "select * from Playlist";
            DataSet ds = DBHelper.GetDataSet(sql, CommandType.Text);
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                Playlist pl = new Playlist();
                pl.Id = Convert.ToInt32(row["Id"]);
                pl.Name = row["Name"].ToString();
                pl.User = UserService.SelectUserById(Convert.ToInt32(row["AuthorId"]));
                pl.Profile = row["Profile"].ToString();
                pl.style = row["style"].ToString();
                list.Add(pl);
            }
            return list;
        } 
        #endregion
    }
}