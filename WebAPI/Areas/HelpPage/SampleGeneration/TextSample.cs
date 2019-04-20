using System;

namespace WebAPI.Areas.HelpPage
{
    /// <summary>
    /// This represents a preformatted text sample on the help page. There's a display template named TextSample associated with this class.
    /// </summary>
    public class TextSample
    {
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public TextSample(string text)
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
        {
            if (text == null)
            {
                throw new ArgumentNullException("text");
            }
            Text = text;
        }

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public string Text { get; private set; }
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public override bool Equals(object obj)
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
        {
            TextSample other = obj as TextSample;
            return other != null && Text == other.Text;
        }

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public override int GetHashCode()
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
        {
            return Text.GetHashCode();
        }

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public override string ToString()
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
        {
            return Text;
        }
    }
}