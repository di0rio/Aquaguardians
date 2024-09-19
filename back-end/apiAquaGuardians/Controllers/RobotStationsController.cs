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

        // GET: api/RobotStations/nome
        [HttpGet("name/{name}")]
        public async Task<ActionResult<RobotStation>> GetRobotStationByName(string name)
        {
            var robotStation = await _context.RobotStations.FirstOrDefaultAsync(c => c.Name == name);
            if (robotStation == null)
            {
                return NotFound();
            }
            return robotStation;
        }

        // GET: api/RobotStations/localização
        [HttpGet("location/{location}")]
        public async Task<ActionResult<RobotStation>> GetRobotStationByLocation(string location)
        {
            var robotStation = await _context.RobotStations.FirstOrDefaultAsync(c => c.Location == location);
            if (robotStation == null)
            {
                return NotFound();
            }
            return robotStation;
        }

        // GET: api/RobotStations/statusDeFuncionamento
        [HttpGet("status/{status}")]
        public async Task<ActionResult<RobotStation>> GetRobotStationByStatus(string status)
        {
            var robotStation = await _context.RobotStations.FirstOrDefaultAsync(c => c.Status == status);
            if (robotStation == null)
            {
                return NotFound();
            }
            return robotStation;
        }

        // GET: api/RobotStations/CapacidadeDeRobôs
        [HttpGet("capacity/{minCapacity}/{maxCapacity}")]
        public async Task<ActionResult<List<RobotStation>>> GetRobotStationByCapacityRange(int minCapacity, int maxCapacity)
        {
            // Verifica se os valores mínimos e máximos são válidos
            if (minCapacity < 0 || maxCapacity <= 0 || minCapacity > maxCapacity)
            {
                return BadRequest("Não é possível encontrar localizações com essa capacidade");
            }

            var robotStation = await _context.RobotStations
                .Where(r => r.Capacity.HasValue && r.Capacity >= minCapacity && r.Capacity <= maxCapacity)
                .ToListAsync();

            if (robotStation == null || !robotStation.Any())
            {
                return NotFound();
            }

            return robotStation;
        }


        private bool RobotStationExists(Guid id)
        {
            return _context.RobotStations.Any(e => e.RobotStationId == id);
        }
    }
}
