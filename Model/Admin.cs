using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    /// <summary>
    /// 管理员表
    /// </summary>
    public class Admin
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 登录名
        /// </summary>
        public string LoginId { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        public string LoginPwd { get; set; }
        /// <summary>
        /// 级别
        /// </summary>
        public AdminClass Class { get; set; }
    }
}
