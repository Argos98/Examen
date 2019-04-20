using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Crud;
using Entities;
using Exceptions;


namespace CoreAPI
{
    public class UsuarioManager : BaseManager
    {
        private UsuarioCrudFactory crudFactory;


        public UsuarioManager()
        {
            crudFactory = new UsuarioCrudFactory();

        }

        //Esta funcion permite crear un nuevo Usuario
        public void Create(BaseEntity pojo)
        {

            try
            {
                if (pojo == null)
                    throw new BusinessException(3);

                Usuario usuario = (Usuario)pojo;

                var u = crudFactory.RetrieveAll<Usuario>().
                FirstOrDefault(x => x.nombreUsuario.ToLower() == usuario.nombreUsuario.ToLower());


                if (u != null)
                {
                    throw new BusinessException(1);
                }

                crudFactory.Create(pojo);


            }
            catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }

        }

    }
}
