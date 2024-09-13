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
    public class RobotRentalsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RobotRentalsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/RobotRentals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RobotRental>>> GetRobotRentals()
        {
            return await _context.RobotRentals.ToListAsync();
        }

        // GET: api/RobotRentals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RobotRental>> GetRobotRental(Guid id)
        {
            var robotRental = await _context.RobotRentals.FindAsync(id);

            if (robotRental == null)
            {
                return NotFound();
            }

            return robotRental;
        }

        // PUT: api/RobotRentals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRobotRental(Guid id, RobotRental robotRental)
        {
            if (id != robotRental.RobotRentalId)
            {
                return BadRequest();
            }

            _context.Entry(robotRental).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RobotRentalExists(id))
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

        // POST: api/RobotRentals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RobotRental>> PostRobotRental(RobotRental robotRental)
        {
            _context.RobotRentals.Add(robotRental);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRobotRental", new { id = robotRental.RobotRentalId }, robotRental);
        }

        // DELETE: api/RobotRentals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRobotRental(Guid id)
        {
            var robotRental = await _context.RobotRentals.FindAsync(id);
            if (robotRental == null)
            {
                return NotFound();
            }

            _context.RobotRentals.Remove(robotRental);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RobotRentalExists(Guid id)
        {
            return _context.RobotRentals.Any(e => e.RobotRentalId == id);
        }
    }
}
