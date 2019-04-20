using Entities;
using System;

namespace Exceptions
{
    public class BusinessException : Exception
    {
        public int ExceptionId;
        public ApplicationMessage AppMessage { get; set; }

        public BusinessException()
        {
            AppMessage = new ApplicationMessage
            {
                Id = 0,
                Message = ""
            };
        }

        public BusinessException(int exceptionId)
        {
            ExceptionId = exceptionId;
            AppMessage = new ApplicationMessage
            {
                Id = ExceptionId,
                Message = ""
            };
        }

        public BusinessException(int exceptionId, Exception innerException)
        {
            ExceptionId = exceptionId;
            AppMessage = new ApplicationMessage
            {
                Message = innerException.Message,
                Id = exceptionId
            };
        }
    }
}
