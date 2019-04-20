using System;
using System.Reflection;

namespace WebAPI.Areas.HelpPage.ModelDescriptions
{
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
    public interface IModelDocumentationProvider
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
    {
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        string GetDocumentation(MemberInfo member);
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        string GetDocumentation(Type type);
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
    }
}