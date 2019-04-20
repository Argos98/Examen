using System;
using System.Collections.Generic;

using DataAccess.Dao;
using Entities;

namespace DataAccess.Mapper
{
    class UsuarioMapper : EntityMapper, ISqlStaments, IObjectMapper
    {

        private const string BD_COL_Nombre_Usuario = "nombreUsuario";

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var usuario = new Usuario
            {
                nombreUsuario = GetStringValue(row, BD_COL_Nombre_Usuario)

            };

            return usuario;

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
            var operation = new SqlOperation
            {
                ProcedureName = "Crear_Usuario"
            };

            var pojo = (Usuario)entity;
            operation.AddVarcharParam(BD_COL_Nombre_Usuario, pojo.nombreUsuario);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveAllStatement()
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetriveStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
