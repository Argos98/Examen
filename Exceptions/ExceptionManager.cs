using DataAccess.Crud;
using Entities;
using System;
using System.Collections.Generic;
using System.IO;

namespace Exceptions
{
    public class ExceptionManager
    {

        public string PATH = @"C:\_temp\logs\";

        private static ExceptionManager instance;

        private static Dictionary<int, ApplicationMessage> messages = new Dictionary<int, ApplicationMessage>();

        private ExceptionManager()
        {
            LoadMessages();
        }

        public static ExceptionManager GetInstance()
        {
            if (instance == null)
                instance = new ExceptionManager();
            return instance;
        }

        public void Process(Exception ex)
        {
            var bex = new BusinessException();

            if (ex.GetType() == typeof(BusinessException))
                bex = (BusinessException)ex;
            else
                bex = new BusinessException(0, ex);

            ProcessBussinesException(bex);
        }

        private void ProcessBussinesException(BusinessException bex)
        {
            DirectoryInfo folder = new DirectoryInfo(PATH);
            if (!folder.Exists)
                folder.Create();

            var today = DateTime.Now.ToString("yyyyMMdd_hh");
            var logName = PATH + today + "_" + "log.txt";

            var message = bex.Message + "\n" + bex.StackTrace + "\n";            

            if (bex.InnerException != null)
                message += bex.InnerException.Message + "\n" + bex.InnerException.StackTrace;

            message += "  InternalMessage: " + bex.AppMessage.Message + "\n";

            bex.AppMessage = GetMessage(bex);

            message += "  AppMessage: " + bex.AppMessage.Message + "\n";

            using (StreamWriter w = File.AppendText(logName))
            {
                Log(message, w);
            }

            throw bex;

        }

        public ApplicationMessage GetMessage(BusinessException bex)
        {
            var appMessage = new ApplicationMessage { Message = "Message not found!" };
            if (messages.ContainsKey(bex.ExceptionId)) appMessage = messages[bex.ExceptionId];
            return appMessage;
        }

        private void LoadMessages()
        {
            var crudMessages = new ApplicationMessageCrudFactory();
            var lstMessages = crudMessages.RetrieveAll<ApplicationMessage>();
            foreach (var appMessage in lstMessages) { messages.Add(appMessage.Id, appMessage); }
        }

        private void Log(string logMessage, TextWriter w)
        {
            w.Write("\r\nLog Entry : ");
            w.WriteLine("{0} {1}", DateTime.Now.ToLongTimeString(),
                DateTime.Now.ToLongDateString());
            w.WriteLine("  :");
            w.WriteLine("  :{0}", logMessage);
            w.WriteLine("-------------------------------");
        }

    }
}
