using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Model;


namespace BLL
{
    public class MusicManager
    {
        /// <summary>
        /// 获取所有音乐信息
        /// </summary>
        /// <returns></returns>
        public static List<Music> SelectAllMusic()
        {
            return MusicService.SelectAllMusic();
        }
    }
}
