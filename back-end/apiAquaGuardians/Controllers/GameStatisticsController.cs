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
    public class GameStatisticsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GameStatisticsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/GameStatistics
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameStatistic>>> GetGameStatistics()
        {
            return await _context.GameStatistics.ToListAsync();
        }

        // GET: api/GameStatistics/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GameStatistic>> GetGameStatistic(Guid id)
        {
            var gameStatistic = await _context.GameStatistics.FindAsync(id);

            if (gameStatistic == null)
            {
                return NotFound();
            }

            return gameStatistic;
        }

		[HttpGet("gamedate/{date}")]
		public async Task<ActionResult<List<GameStatistic>>> GetGameEstatisticsByGameDate(DateTime date)
		{
			var gameStatistic = await _context.GameStatistics
				.Where(e => e.GameDate.Date == date.Date) // Comparar apenas a data, ignorando a hora
				.ToListAsync();

			if (gameStatistic == null || !gameStatistic.Any())
			{
				return NotFound();
			}

			return gameStatistic;
		}

		[HttpGet("playerid/{id}")]
		public async Task<ActionResult<GameStatistic>> GetGameStatistcByPlayerId(Guid id)
		{
			var gameStatistic = await _context.GameStatistics.FirstOrDefaultAsync(c => c.PlayerId == id);

			if (gameStatistic == null)
			{
				return NotFound();
			}

			return gameStatistic;
		}

		[HttpGet("robotid/{id}")]
		public async Task<ActionResult<GameStatistic>> GetGameStatistcByRobotId(Guid id)
		{
			var gameStatistic = await _context.GameStatistics.FirstOrDefaultAsync(c => c.RobotId == id);

			if (gameStatistic == null)
			{
				return NotFound();
			}

			return gameStatistic;
		}
		// PUT: api/GameStatistics/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
        public async Task<IActionResult> PutGameStatistic(Guid id, GameStatistic gameStatistic)
        {
            if (id != gameStatistic.GameStatisticId)
            {
                return BadRequest();
            }

            _context.Entry(gameStatistic).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameStatisticExists(id))
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

        // POST: api/GameStatistics
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GameStatistic>> PostGameStatistic(GameStatistic gameStatistic)
        {
            _context.GameStatistics.Add(gameStatistic);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGameStatistic", new { id = gameStatistic.GameStatisticId }, gameStatistic);
        }

        // DELETE: api/GameStatistics/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGameStatistic(Guid id)
        {
            var gameStatistic = await _context.GameStatistics.FindAsync(id);
            if (gameStatistic == null)
            {
                return NotFound();
            }

            _context.GameStatistics.Remove(gameStatistic);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GameStatisticExists(Guid id)
        {
            return _context.GameStatistics.Any(e => e.GameStatisticId == id);
        }
    }
}
