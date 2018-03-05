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
    public class MusicService
    {
        #region 获取所有音乐信息
        /// <summary>
        /// 获取所有音乐信息
        /// </summary>
        /// <returns></returns>
        public static List<Music> SelectAllMusic()
        {
            List<Music> list = new List<Music>();
            string sql = "select * from Music";
            DataSet ds = DBHelper.GetDataSet(sql, CommandType.Text);
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                Music m = new Music();
                m.Id = Convert.ToInt32(row["Id"]);
                m.Title = row["Title"].ToString();
                m.Singer = row["Singer"].ToString();
                m.WriteSong = row["WriteSong"].ToString();
                m.Value = row["Value"].ToString();
                m.Lyric = row["Lyric"].ToString();
                m.Img = row["Img"].ToString();
                m.AlbumsId = Convert.ToInt32(row["AlbumsId"]);
                m.PlaylistId = Convert.ToInt32(row["PlaylistId"]);
                m.Style = row["Style"].ToString();
                m.ReleaseTime = Convert.ToDateTime(row["ReleaseTime"]);
                m.Language = row["Language"].ToString();
                m.Click = Convert.ToInt32(row["Click"]);
                list.Add(m);
            }
            return list;
        }
        #endregion

        #region 根据专辑编号查询音乐信息
        /// <summary>
        /// 根据专辑编号查询音乐信息
        /// </summary>
        /// <param name="albumsId"></param>
        /// <returns></returns>
        public static List<Music> SelectAlbumsMusicById(int albumsId)
        {
            List<Music> list = new List<Music>();
            string sql = "select * from Music where AlbumsId ='" + albumsId + "'";
            DataSet ds = DBHelper.GetDataSet(sql, CommandType.Text);
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                Music m = new Music();
                m.Id = Convert.ToInt32(row["Id"]);
                m.Title = row["Title"].ToString();
                m.Singer = row["Singer"].ToString();
                m.WriteSong = row["WriteSong"].ToString();
                m.Value = row["Value"].ToString();
                m.Lyric = row["Lyric"].ToString();
                m.AlbumsId = Convert.ToInt32(row["AlbumsId"]);
                m.Style = row["Style"].ToString();
                m.ReleaseTime = Convert.ToDateTime(row["ReleaseTime"]);
                m.Language = row["Language"].ToString();
                m.Click = Convert.ToInt32(row["Click"]);
                list.Add(m);
            }
            return list;
        }
        #endregion

        #region 根据歌单编号查询音乐信息
        /// <summary>
        /// 根据歌单编号查询音乐信息
        /// </summary>
        /// <param name="playListId"></param>
        /// <returns></returns>
        public static List<Music> SelectPlaylistMusicById(int playListId)
        {
            List<Music> list = new List<Music>();
            string sql = "select * from Music where playListId ='" + playListId + "'";
            DataSet ds = DBHelper.GetDataSet(sql, CommandType.Text);
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                Music m = new Music();
                m.Id = Convert.ToInt32(row["Id"]);
                m.Title = row["Title"].ToString();
                m.Singer = row["Singer"].ToString();
                m.WriteSong = row["WriteSong"].ToString();
                m.Value = row["Value"].ToString();
                m.Lyric = row["Lyric"].ToString();
                m.AlbumsId = Convert.ToInt32(row["AlbumsId"]);
                m.Style = row["Style"].ToString();
                m.ReleaseTime = Convert.ToDateTime(row["ReleaseTime"]);
                m.Language = row["Language"].ToString();
                m.Click = Convert.ToInt32(row["Click"]);
                list.Add(m);
            }
            return list;
        }
        #endregion

        #region 根据音乐编号查询音乐信息
        /// <summary>
        /// 根据音乐编号查询音乐信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public static Music SelectMusicById(int Id)
        {
            Music m = null;
            string sql = "Select * from Music where Id ='" + Id + "'";
            SqlDataReader dr = DBHelper.ExecuteReader(sql, CommandType.Text);
            if (dr.Read())
            {
                m = new Music();
                m.Id = Convert.ToInt32(dr["Id"]);
                m.Title = dr["Title"].ToString();
                m.Singer = dr["Singer"].ToString();
                m.WriteSong = dr["WriteSong"].ToString();
                m.Value = dr["Value"].ToString();
                m.Lyric = dr["Lyric"].ToString();
                m.AlbumsId = Convert.ToInt32(dr["AlbumsId"]);
                m.Style = dr["Style"].ToString();
                m.ReleaseTime = Convert.ToDateTime(dr["ReleaseTime"]);
                m.Language = dr["Language"].ToString();
                m.Click = Convert.ToInt32(dr["Click"]);
            }
            dr.Close();
            return m;
        } 


        //无法连接到宽带连接
        //调制解调器（或其他连接设备）出现硬件故障

        #endregion
    }
}
