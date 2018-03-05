<%@ WebHandler Language="C#" Class="front_getMusic" %>

using System;
using System.Web;
using System.Collections.Generic;
using System.Runtime.Serialization.Json;
using BLL;
using Model;

public class front_getMusic : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        List<Music> list = MusicManager.SelectAllMusic();
        DataContractJsonSerializer dc = new DataContractJsonSerializer(typeof(List<Music>));
        dc.WriteObject(context.Response.OutputStream, list);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}