﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Todo.ScheduledTasks.Tasks;

namespace Todo.ScheduledTasks.Infrastructure
{
    public static class DependencyConfiguration
    {
        public static IServiceCollection AddScheduledTasks(this IServiceCollection service)
        {
            service.AddTransient<IHostedService, TodoTask>();

            return service;
        }
    }
}