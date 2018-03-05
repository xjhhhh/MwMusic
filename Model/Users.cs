using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    /// <summary>
    /// 用户表
    /// </summary>
    public class Users
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string LoginId { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        public string LoginPwd { get; set; }
        /// <summary>
        /// 类型
        /// </summary>
        public string TypeId { get; set; }
        public UserType UserType { get; set; }
    }
}