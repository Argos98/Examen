using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace WebAPI.Areas.HelpPage.ModelDescriptions
{
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
    public class ParameterDescription
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
    {
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public ParameterDescription()
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
        {
            Annotations = new Collection<ParameterAnnotation>();
        }

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public Collection<ParameterAnnotation> Annotations { get; private set; }
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public string Documentation { get; set; }
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public string Name { get; set; }
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public ModelDescription TypeDescription { get; set; }
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
    }
}