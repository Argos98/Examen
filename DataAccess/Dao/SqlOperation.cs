using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace DataAccess.Dao
{
    public class SqlOperation
    {
        public string ProcedureName { get; set; }
        public List<SqlParameter> Parameters { get; set;}

        public SqlOperation()
        {
            Parameters=new List<SqlParameter>();
        }

        public void AddBigIntParam(string paramName, long paramValue)
        {
            var param = new SqlParameter("@P_" + paramName, SqlDbType.BigInt)
            {
                Value = paramValue
            };
            Parameters.Add(param);
        }

        public void AddVarcharParam(string paramName, string paramValue)
        {
            var param = new SqlParameter("@P_" + paramName, SqlDbType.VarChar)
            {
                Value = paramValue                            
            };
            Parameters.Add(param);
        }

        public void AddIntParam(string paramName, int paramValue)
        {
            var param = new SqlParameter("@P_" + paramName, SqlDbType.Int)
            {
                Value = paramValue
            };
            Parameters.Add(param);
        }

        public void AddDoubleParam(string paramName, double paramValue)
        {
            var param = new SqlParameter("@P_" + paramName, SqlDbType.Decimal)
            {
                Value = paramValue
            };
            Parameters.Add(param);
        }

        public void AddDateTimeParam(string paramName, DateTime paramValue)
        {
            var param = new SqlParameter("@P_" + paramName, SqlDbType.DateTime)
            {
                Value = paramValue
            };
            Parameters.Add(param);
        }

        public void AddFloatParam(string paramName, float paramValue)
        {
            var param = new SqlParameter("@P_" + paramName, SqlDbType.Real)
            {
                Value = paramValue
            };
            Parameters.Add(param);
        }

        public void AddBoolParam(string paramName, bool paramValue)
        {
            var param = new SqlParameter("@P_" + paramName, SqlDbType.Bit)
            {
                Value = paramValue
            };
            Parameters.Add(param);
        }

        public void AddNullableBoolParam(string paramName, bool? paramValue)
        {
            var param = new SqlParameter("@P_" + paramName, SqlDbType.Bit)
            {
                Value = paramValue
            };
            Parameters.Add(param);
        }

        public void AddNullableDateTimeParam(string paramName, Nullable<DateTime> paramValue)
        {
            var param = new SqlParameter("@P_" + paramName, SqlDbType.DateTime)
            {
                Value = paramValue, IsNullable = true
            };
            Parameters.Add(param);
        }

        public void AddNullableDecimalParam(string paramName, decimal? paramValue)
        {
            var param = new SqlParameter("@P_" + paramName, SqlDbType.Decimal)
            {
                Value = paramValue
            };
            Parameters.Add(param);
        }
    }
}
