using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Data.SeedWorks
{
    public class RepositoryBase<T,Key> :IRepository<T ,Key> where T:class
    {
        private readonly DbSet<T> _dbSet;
        protected readonly CMSContext _context;
        public RepositoryBase(CMSContext context)
        {
            _dbSet = context.Set<T>();
            _context = context;

        }
        public void Add(T entity)
        {
            _dbSet.AddAsync(entity);
        }
        public void AddRange(IEnumerable<T> entities)
        {
            _dbSet.AddRange(entities);
        }
        public IEnumerable<T> Find(Expression<Func<T, bool>> expression)
        {
            return _dbSet.Where(expression);
        }
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }
        public async Task<T> GetByIdAsync(Key id)
        {
            return await _dbSet.FindAsync(id);
        }
        public void Remove(T entity)
        {
            _dbSet.Remove(entity);
        }
        public void RemoveRange(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        //#region Dapper Methods
        //public async Task<IEnumerable<TResult>> QueryAsync<TResult>(string sql, object param = null, int? commandTimeout = null)
        //{
        //    using (var connection = _context.Database.GetDbConnection())
        //    {
        //        if (connection.State == System.Data.ConnectionState.Closed)
        //            await connection.OpenAsync();

        //        return await connection.QueryAsync<TResult>(sql, param, commandTimeout: commandTimeout);
        //    }
        //}

        //public async Task<TResult> QueryFirstOrDefaultAsync<TResult>(string sql, object param = null, int? commandTimeout = null)
        //{
        //    using (var connection = _context.Database.GetDbConnection())
        //    {
        //        if (connection.State == System.Data.ConnectionState.Closed)
        //            await connection.OpenAsync();

        //        return await connection.QueryFirstOrDefaultAsync<TResult>(sql, param, commandTimeout: commandTimeout);
        //    }
        //}

        //public async Task<int> ExecuteAsync(string sql, object param = null, int? commandTimeout = null)
        //{
        //    using (var connection = _context.Database.GetDbConnection())
        //    {
        //        if (connection.State == System.Data.ConnectionState.Closed)
        //            await connection.OpenAsync();

        //        return await connection.ExecuteAsync(sql, param, commandTimeout: commandTimeout);
        //    }
        //}
        //#endregion

    }
}
