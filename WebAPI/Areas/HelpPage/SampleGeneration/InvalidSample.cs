using System;

namespace WebAPI.Areas.HelpPage
{
    /// <summary>
    /// This represents an invalid sample on the help page. There's a display template named InvalidSample associated with this class.
    /// </summary>
    public class InvalidSample
    {
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public InvalidSample(string errorMessage)
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
        {
            if (errorMessage == null)
            {
                throw new ArgumentNullException("errorMessage");
            }
            ErrorMessage = errorMessage;
        }

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public string ErrorMessage { get; private set; }
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public override bool Equals(object obj)
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
        {
            InvalidSample other = obj as InvalidSample;
            return other != null && ErrorMessage == other.ErrorMessage;
        }

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public override int GetHashCode()
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
        {
            return ErrorMessage.GetHashCode();
        }

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public override string ToString()
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
        {
            return ErrorMessage;
        }
    }
}