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
    public class RobotsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RobotsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Robots
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Robot>>> GetRobots()
        {
            return await _context.Robots.ToListAsync();
        }

        // GET: api/Robots/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Robot>> GetRobot(Guid id)
        {
            var robot = await _context.Robots.FindAsync(id);

            if (robot == null)
            {
                return NotFound();
            }

            return robot;
        }

        // PUT: api/Robots/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRobot(Guid id, Robot robot)
        {
            if (id != robot.RobotId)
            {
                return BadRequest();
            }

            _context.Entry(robot).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RobotExists(id))
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

        // POST: api/Robots
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Robot>> PostRobot(Robot robot)
        {
            _context.Robots.Add(robot);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRobot", new { id = robot.RobotId }, robot);
        }

        // DELETE: api/Robots/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRobot(Guid id)
        {
            var robot = await _context.Robots.FindAsync(id);
            if (robot == null)
            {
                return NotFound();
            }

            _context.Robots.Remove(robot);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RobotExists(Guid id)
        {
            return _context.Robots.Any(e => e.RobotId == id);
        }
    }
}
