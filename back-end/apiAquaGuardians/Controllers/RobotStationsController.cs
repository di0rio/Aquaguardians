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
    public class RobotStationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RobotStationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/RobotStations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RobotStation>>> GetRobotStations()
        {
            return await _context.RobotStations.ToListAsync();
        }

        // GET: api/RobotStations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RobotStation>> GetRobotStation(Guid id)
        {
            var robotStation = await _context.RobotStations.FindAsync(id);

            if (robotStation == null)
            {
                return NotFound();
            }

            return robotStation;
        }

        // PUT: api/RobotStations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRobotStation(Guid id, RobotStation robotStation)
        {
            if (id != robotStation.RobotStationId)
            {
                return BadRequest();
            }

            _context.Entry(robotStation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RobotStationExists(id))
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

        // POST: api/RobotStations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RobotStation>> PostRobotStation(RobotStation robotStation)
        {
            _context.RobotStations.Add(robotStation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRobotStation", new { id = robotStation.RobotStationId }, robotStation);
        }

        // DELETE: api/RobotStations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRobotStation(Guid id)
        {
            var robotStation = await _context.RobotStations.FindAsync(id);
            if (robotStation == null)
            {
                return NotFound();
            }

            _context.RobotStations.Remove(robotStation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RobotStationExists(Guid id)
        {
            return _context.RobotStations.Any(e => e.RobotStationId == id);
        }
    }
}
