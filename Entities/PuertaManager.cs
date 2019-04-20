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
    public class PuertaManager : BaseManager
    {
        private PuertaCrudFactory crudFactory;

        public PuertaManager()
        {
            crudFactory = new PuertaCrudFactory();
        }

        //crear
        public void Create(BaseEntity pojo)
        {
            try
            {
                var p = crudFactory.Retrieve<Puerta>(pojo);

                if (p != null)
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

        //Retorna todas las puertas
        public List<Puerta> RetrieveAll()
        {
            return crudFactory.RetrieveAll<Puerta>();
        }

        public List<Puerta> RetrieveByCodigoAeropuerto(BaseEntity pojo)
        {
            return crudFactory.RetrieveAllByCodigoAeropuerto<Puerta>(pojo);
        }

        //busca uno en especifico 
        public Puerta RetrieveById(BaseEntity pojo)
        {
            return crudFactory.Retrieve<Puerta>(pojo);
        }

        //acuatiliza
        public void Update(BaseEntity pojo)
        {
            crudFactory.Update(pojo);
        }

        //cambia el estado falso
        public void Delete(BaseEntity pojo)
        {
            var puerta = (Puerta)pojo;
            puerta.Estado = false;
            crudFactory.Update(pojo);
        }
        //cambia el estado verdadero
        public void Enable(BaseEntity pojo)
        {
            var puerta = (Puerta)pojo;
            puerta.Estado = true;
            crudFactory.Update(pojo);
        }

    }
}
