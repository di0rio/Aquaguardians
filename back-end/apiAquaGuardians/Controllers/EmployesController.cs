using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apiAquaGuardians.Data;
using apiAquaGuardians.Models;

namespace apiAquaGuardians.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Employes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        // GET: api/Employes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(Guid id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

		[HttpGet("name/{name}")]
		public async Task<ActionResult<Employee>> GetEmployeeByName(string name)
		{
			var employee = await _context.Employees.FirstOrDefaultAsync(c => c.Name == name);

			if (employee == null)
			{
				return NotFound();
			}

			return employee;
		}

		[HttpGet("position/{position}")]
		public async Task<ActionResult<Employee>> GetEmployeeByPosition(string position)
		{
			var employee = await _context.Employees.FirstOrDefaultAsync(c => c.Position == position);

			if (employee == null)
			{
				return NotFound();
			}

			return employee;
		}

		// Busca por Ano de Nascimento
		[HttpGet("year/{year}")]
		public async Task<ActionResult<List<Employee>>> GetEmployeesByYearOfBirth(int year)
		{
			var employees = await _context.Employees
				.Where(e => e.DateOfBirth.HasValue && e.DateOfBirth.Value.Year == year)
				.ToListAsync();

			if (employees == null || !employees.Any())
			{
				return NotFound();
			}

			return employees;
		}

		// Busca por Mês de Nascimento
		[HttpGet("month/{month}")]
		public async Task<ActionResult<List<Employee>>> GetEmployeesByMonthOfBirth(int month)
		{
			var employees = await _context.Employees
				.Where(e => e.DateOfBirth.HasValue && e.DateOfBirth.Value.Month == month)
				.ToListAsync();

			if (employees == null || !employees.Any())
			{
				return NotFound();
			}

			return employees;
		}

		// Busca por Dia de Nascimento
		[HttpGet("day/{day}")]
		public async Task<ActionResult<List<Employee>>> GetEmployeesByDayOfBirth(int day)
		{
			var employees = await _context.Employees
				.Where(e => e.DateOfBirth.HasValue && e.DateOfBirth.Value.Day == day)
				.ToListAsync();

			if (employees == null || !employees.Any())
			{
				return NotFound();
			}

			return employees;
		}

		[HttpGet("salary/{minSalary}/{maxSalary}")]
		public async Task<ActionResult<List<Employee>>> GetEmployeesBySalaryRange(decimal minSalary, decimal maxSalary)
		{
			// Verifica se os valores mínimos e máximos são válidos
			if (minSalary < 0 || maxSalary < 0 || minSalary > maxSalary)
			{
				return BadRequest("Salário mínimo ou máximo inválido.");
			}

			var employees = await _context.Employees
				.Where(e => e.Salary.HasValue && e.Salary >= minSalary && e.Salary <= maxSalary)
				.ToListAsync();

			if (employees == null || !employees.Any())
			{
				return NotFound();
			}

			return employees;
		}

		[HttpGet("hiredate/{date}")]
		public async Task<ActionResult<List<Employee>>> GetEmployeesByHireDate(DateTime date)
		{
			var employees = await _context.Employees
				.Where(e => e.HireDate.Date == date.Date) // Comparar apenas a data, ignorando a hora
				.ToListAsync();

			if (employees == null || !employees.Any())
			{
				return NotFound();
			}

			return employees;
		}

		[HttpGet("station/{stationId}")]
		public async Task<ActionResult<List<Employee>>> GetEmployeesByStation(Guid stationId)
		{
			var employees = await _context.Employees
				.Where(e => e.RobotStationId == stationId) // Agora a comparação funciona corretamente
				.ToListAsync();

			if (employees == null || !employees.Any())
			{
				return NotFound();
			}

			return employees;
		}

		// PUT: api/Employes/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(Guid id, Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.EmployeeId }, employee);
        }

        // DELETE: api/Employes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(Guid id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }
    }
}
