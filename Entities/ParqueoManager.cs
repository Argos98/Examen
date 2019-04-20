using DataAccess.Crud;
using Entities;
using Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreAPI
{
   public class ParqueoManager : BaseManager
    {
        private ParqueoCrudFactory crudFactory;

    

        public ParqueoManager()
        {
            crudFactory = new ParqueoCrudFactory();
        }

        public void Create(BaseEntity pojo)
        {
            try
            {

                var p = crudFactory.Retrieve<Parqueo>(pojo);

                if(p != null)
                {
                    throw new BusinessException(1);
                }
                crudFactory.Create(pojo);

            }catch (Exception ex)
            {
                ExceptionManager.GetInstance().Process(ex);
            }
                                           
        }

        public List<Parqueo> RetrieveAll()
        {
            return crudFactory.RetrieveAll<Parqueo>();
        }

        public List<Parqueo> RetrieveByCodigoAeropuerto(BaseEntity pojo)
        {
            return crudFactory.RetrieveAllByCodigoAeropuerto<Parqueo>(pojo);
        }

        public Parqueo RetrieveById(BaseEntity pojo)
        {
            return crudFactory.Retrieve<Parqueo>(pojo);
        }

        public void Update(Parqueo pojo)
        {
            crudFactory.Update(pojo);
        }

        public void Delete(Parqueo pojo)
        {
            var parqueo = (Parqueo)pojo;
            parqueo.Estado = false;
            crudFactory.Update(pojo);
        }

        public void Enable(BaseEntity pojo)
        {
            var parqueo = (Parqueo)pojo;
            parqueo.Estado = true;
            crudFactory.Update(pojo);
        }

    }
}
