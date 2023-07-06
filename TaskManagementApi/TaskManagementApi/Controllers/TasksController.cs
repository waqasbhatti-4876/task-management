using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace TaskManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly IConfiguration _config;

        public TasksController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet]
        public async Task<ActionResult<List<Tasks>>> GetAllTasks()
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            IEnumerable<Tasks> tasks = await GetAllTasks(connection);
            return Ok(tasks);
        }

        private static async Task<IEnumerable<Tasks>> GetAllTasks(SqlConnection connection)
        {
            return await connection.QueryAsync<Tasks>("select t.Id,t.Title,t.AssignedTo,t.Status, e.Name from Tasks t Inner join Employees e on e.Id = t.AssignedTo");
        }

        [HttpGet("employees")]
        public async Task<ActionResult<List<Employee>>> GetAllEmployees()
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var employees = await connection.QueryAsync<Employee>("select * from employees");
            return Ok(employees);
        }

        [HttpPost]
        public async Task<ActionResult<Tasks>> CreateTask(Tasks task)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync("insert into tasks (title, assignedto, status) values (@Title, @AssignedTo, @Status)",task);
            return Ok(await GetAllTasks(connection));
        }

        [HttpPut]
        public async Task<ActionResult<Tasks>> UpdateTask(Tasks task)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync("update tasks set title = @Title, assignedTo= @AssignedTo, status = @Status where id = @Id", task);
            return Ok(await GetAllTasks(connection));
        }

        [HttpDelete("{taskId}")]
        public async Task<ActionResult<Tasks>> DeleteTask(int taskId)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync("delete from tasks where id = @Id", new { Id = taskId});
            return Ok(await GetAllTasks(connection));
        }
    }
}
