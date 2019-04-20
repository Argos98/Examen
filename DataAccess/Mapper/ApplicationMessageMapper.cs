using DataAccess.Dao;
using Entities;
using System.Collections.Generic;

namespace DataAccess.Mapper
{
    public class ApplicationMessageMapper : EntityMapper, ISqlStaments, IObjectMapper
    {
        private const string DB_COL_Id = "Id";
        private const string DB_COL_Mensaje = "Mensaje";


        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var pojo = new ApplicationMessage
            {
                Id= GetIntValue(row, DB_COL_Id),
                Message = GetStringValue(row, DB_COL_Mensaje)
            };
            return pojo;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var pojo = BuildObject(row);
                lstResults.Add(pojo);
            }
            return lstResults;
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var pojo = (ApplicationMessage)entity;

            var operation = new SqlOperation
            {
                ProcedureName = "ApplicationMessage_CRE"
            };

            operation.AddIntParam(DB_COL_Id, pojo.Id);
            operation.AddVarcharParam(DB_COL_Mensaje, pojo.Message);

            return operation;

        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ApplicationMessage_DEL" };
            var pojo = (ApplicationMessage)entity;

            operation.AddBigIntParam(DB_COL_Id, pojo.Id);

            return operation;
        }

        public SqlOperation GetRetriveAllStatement()
        {
            var operation = new SqlOperation { ProcedureName = "ApplicationMessage_RET_ALL" };
            return operation;
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            var operation = new SqlOperation { ProcedureName = "ApplicationMessage_RET" };
            var pojo = (ApplicationMessage)entity;

            operation.AddIntParam(DB_COL_Id, pojo.Id);

            return operation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var pojo = (ApplicationMessage)entity;

            var operation = new SqlOperation
            {
                ProcedureName = "ApplicationMessages_UPD"
            };

            operation.AddBigIntParam(DB_COL_Id, pojo.Id);
            operation.AddVarcharParam(DB_COL_Mensaje, pojo.Message);

            return operation;
        }
    }
}
