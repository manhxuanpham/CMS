﻿using CMS.Core.Models.Royalty;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Core.Service
{
    public interface IRoyaltyService
    {
        Task<List<RoyaltyReportByUserDto>> GetRoyaltyReportByUserAsync(Guid? userId, int fromMonth, int fromYear, int toMonth, int toYear);
        Task<List<RoyaltyReportByMonthDto>> GetRoyaltyReportByMonthAsync(Guid? userId, int fromMonth, int fromYear, int toMonth, int toYear);
        Task PayRoyaltyForUserAsync(Guid fromUserId, Guid toUserId);
    }
}
