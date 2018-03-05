using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    /// <summary>
    /// 歌曲表
    /// </summary>
    public class Music
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 歌名
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// 歌手
        /// </summary>
        public string Singer { get; set; }
        /// <summary>
        /// 作词
        /// </summary>
        public string WriteSong { get; set; }
        /// <summary>
        /// 源
        /// </summary>
        public string Value { get; set; }
        /// <summary>
        /// 歌词
        /// </summary>
        public string Lyric { get; set; }
        /// <summary>
        /// 图片
        /// </summary>
        public string Img { get; set; }
        /// <summary>
        /// 专辑
        /// </summary>
        public int AlbumsId { get; set; }
        /// <summary>
        /// 歌单
        /// </summary>
        public int PlaylistId { get; set; }
        /// <summary>
        /// 风格
        /// </summary>
        public string Style { get; set; }
        /// <summary>
        /// 发行时间
        /// </summary>
        public DateTime ReleaseTime { get; set; }
        /// <summary>
        /// 语种
        /// </summary>
        public string Language { get; set; }
        
        /// <summary>
        /// 播放次数
        /// </summary>
        public int Click { get; set; }

    }
}
