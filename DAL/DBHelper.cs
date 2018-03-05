using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace DAL
{
    public class DBHelper
    {
        private static SqlConnection conn;
        public static SqlConnection Conn
        {
            get
            {
                //获取表示层配置文件Web.Config文件中的连接字符串
                string str = ConfigurationManager.ConnectionStrings["connStr"].ToString();
                if (conn==null)
                {
                    conn = new SqlConnection(str);
                    conn.Open();
                }
                else if (conn.State==ConnectionState.Closed)
                {
                    conn.Open();
                }
                else if (conn.State== ConnectionState.Broken)
                {
                    conn.Close();
                    conn.Open();
                }
                return conn;
            }
        }

        /// <summary>
        /// 执行Insert/Update/Delete更新语句
        /// </summary>
        /// <param name="cmdText">sql语句或存储过程</param>
        /// <param name="cmdType">命令类型</param>
        /// <param name="cmdParams">sql语句或存储过程中带的参数(params表示此参数可以不赋值)</param>
        /// <returns>返回受影响的记录数</returns>
        public static int ExecuteNonQuery(string cmdText, CommandType cmdType, params SqlParameter[] cmdParams)
        {
            SqlCommand cmd = new SqlCommand(cmdText, Conn);
            cmd.CommandType = cmdType;
            cmd.Parameters.AddRange(cmdParams);

            return cmd.ExecuteNonQuery();
        }

        /// <summary>
        /// 执行Select查询语句，返回数据读取器对象
        /// </summary>
        /// <param name="cmdType">命令类型</param>
        /// <param name="cmdText">Select查询语句或存储过程</param>
        /// <param name="cmdParams">Select查询语句或存储过程中带的参数(params表示此参数可以不赋值)</param>
        public static DataSet GetDataSet(string cmdText,CommandType cmdType,params SqlParameter[] cmdParams)
        {
            DataSet ds = new DataSet();
            SqlDataAdapter sda = new SqlDataAdapter(cmdText, Conn);
            sda.SelectCommand.CommandType = cmdType;            //设置命令类型
            sda.SelectCommand.Parameters.AddRange(cmdParams);   //添加参数
            sda.Fill(ds);
            return ds;
        }

        /// <summary>
        /// 执行Select查询语句，返回数据读取器对象
        /// </summary>
        /// <param name="cmdType">命令类型</param>
        /// <param name="cmdText">Select查询语句或存储过程</param>
        /// <param name="cmdParams">Select查询语句或存储过程中带的参数(params表示此参数可以不赋值)</param>
        /// <returns>返回数据读取器对象</returns>
        public static SqlDataReader ExecuteReader(string cmdText,CommandType cmdType,params SqlParameter[] cmdParams)
        {
            SqlCommand cmd = new SqlCommand(cmdText, Conn);
            cmd.CommandType = cmdType;              //设置命令类型
            cmd.Parameters.AddRange(cmdParams);     //添加参数
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            return dr;
        }

    }
}
