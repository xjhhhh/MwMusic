<%@ WebHandler Language="C#" Class="Login" %>

using System;
using System.Web;
using System.Web.SessionState;
using System.Web.WebSockets;
public class Login : IHttpHandler, IRequiresSessionState
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");

        if (context.Session["user"] == null)
        {
            context.Response.Write("none");
        }
        else
        {
            context.Response.Write("user");
        }

    }


    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}