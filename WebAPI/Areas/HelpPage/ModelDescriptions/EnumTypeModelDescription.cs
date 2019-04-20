using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace WebAPI.Areas.HelpPage.ModelDescriptions
{
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
    public class EnumTypeModelDescription : ModelDescription
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
    {
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public EnumTypeModelDescription()
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
        {
            Values = new Collection<EnumValueDescription>();
        }

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public Collection<EnumValueDescription> Values { get; private set; }
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
    }
}