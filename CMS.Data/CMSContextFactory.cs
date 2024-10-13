using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Data
{
    public class CMSContextFactory:IDesignTimeDbContextFactory<CMSContext>
    {
        public CMSContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                 .SetBasePath(Directory.GetCurrentDirectory())
                 .AddJsonFile("appsettings.json")
                 .Build();
            var builder = new DbContextOptionsBuilder<CMSContext>();
            builder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            return new CMSContext(builder.Options);
        }
    }
}
