using DataAccess.Dao;
using DataAccess.Mapper;
using Entities;
using System;
using System.Collections.Generic;

namespace DataAccess.Crud
{
    public class ApplicationMessageCrudFactory : CrudFactory
    {
        ApplicationMessageMapper mapper;

        public ApplicationMessageCrudFactory() : base()
        {
            mapper = new ApplicationMessageMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entity)
        {
            dao.ExecuteProcedure(mapper.GetCreateStatement(entity));
        }

        public override void Delete(BaseEntity entity)
        {
            dao.ExecuteProcedure(mapper.GetDeleteStatement(entity));
        }

        public override T Retrieve<T>(BaseEntity entity)
        {
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveStatement(entity));
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0)
            {
                dic = lstResult[0];
                var obj = mapper.BuildObject(dic);
                return (T)Convert.ChangeType(obj, typeof(T));
            }

            return default(T);
        }

        public override List<T> RetrieveAll<T>()
        {
            var lstResults = new List<T>();
            var lstResult = dao.ExecuteQueryProcedure(mapper.GetRetriveAllStatement());
            var dic = new Dictionary<string, object>();

            if (lstResult.Count > 0)
            {
                var objs = mapper.BuildObjects(lstResult);
                foreach (var item in objs)
                {
                    lstResults.Add((T)Convert.ChangeType(item, typeof(T)));
                }
            }

            return lstResults;
        }

        public override void Update(BaseEntity entity)
        {
            dao.ExecuteProcedure(mapper.GetUpdateStatement(entity));
        }
    }
}
