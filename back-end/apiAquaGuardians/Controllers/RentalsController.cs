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
    public class RentalsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RentalsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Rentals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rental>>> GetRobotRentals()
        {
            return await _context.RobotRentals.ToListAsync();
        }

        // GET: api/Rentals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rental>> GetRental(Guid id)
        {
            var rental = await _context.RobotRentals.FindAsync(id);

            if (rental == null)
            {
                return NotFound();
            }

            return rental;
        }

        [HttpGet("rentalDateStart/{dateStart}")]
        public async Task<ActionResult<List<Rental>>> GetRentalStartDate(DateTime date)
        {
            var rentals = await _context.RobotRentals
                .Where(e => e.RentalStartDate.Date == date.Date) // Comparar apenas a data, ignorando a hora
                .ToListAsync();

            if (rentals == null || !rentals.Any())
            {
                return NotFound();
            }

            return rentals;
        }

        [HttpGet("rentalPrice/{minPrice}/{maxPrice}")]
        public async Task<ActionResult<List<Rental>>> GetRentalBySalaryRange(decimal minPrice, decimal maxPrice)
        {
            // Verifica se os valores mínimos e máximos são válidos
            if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice)
            {
                return BadRequest("Salário mínimo ou máximo inválido.");
            }

            var rentals = await _context.RobotRentals
                .Where(e => e.Price.HasValue && e.Price >= minPrice && e.Price <= maxPrice)
                .ToListAsync();

            if (rentals == null || !rentals.Any())
            {
                return NotFound();
            }

            return rentals;
        }

        // PUT: api/Rentals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRental(Guid id, Rental rental)
        {
            if (id != rental.RentalId)
            {
                return BadRequest();
            }

            _context.Entry(rental).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentalExists(id))
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

        // POST: api/Rentals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Rental>> PostRental(Rental rental)
        {
            _context.RobotRentals.Add(rental);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRental", new { id = rental.RentalId }, rental);
        }

        // DELETE: api/Rentals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRental(Guid id)
        {
            var rental = await _context.RobotRentals.FindAsync(id);
            if (rental == null)
            {
                return NotFound();
            }

            _context.RobotRentals.Remove(rental);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RentalExists(Guid id)
        {
            return _context.RobotRentals.Any(e => e.RentalId == id);
        }
    }
}
