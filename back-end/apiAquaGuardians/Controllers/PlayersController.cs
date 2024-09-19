using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using apiAquaGuardians.Data;
using apiAquaGuardians.Models;
using System.Security.Claims;

namespace apiAquaGuardians.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PlayersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Players
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
        {
            return await _context.Players.ToListAsync();
        }

        // GET: api/Players/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(Guid id)
        {
            var player = await _context.Players.FindAsync(id);

            if (player == null)
            {
                return NotFound();
            }

            return player;
        }

		[HttpGet("nickname/{nickname}")]
		public async Task<ActionResult<Player>> GetEmployeeByName(string nickname)
		{
			var player = await _context.Players.FirstOrDefaultAsync(c => c.Nickname == nickname);

			if (player == null)
			{
				return NotFound();
			}

			return player;
		}

		[HttpGet("createat/{date}")]
		public async Task<ActionResult<List<Player>>> GetPlayerByCreateAt(DateTime date)
		{
			var CreatedAt = await _context.Players
				.Where(e => e.CreatedAt.Date == date.Date) // Comparar apenas a data, ignorando a hora
				.ToListAsync();

			if (CreatedAt == null || !CreatedAt.Any())
			{
				return NotFound();
			}

			return CreatedAt;
		}

		// PUT: api/Players/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
        public async Task<IActionResult> PutPlayer(Guid id, Player player)
        {
            if (id != player.PlayerId)
            {
                return BadRequest();
            }

            _context.Entry(player).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayerExists(id))
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

        // POST: api/Players
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Player>> PostPlayer(Player player)
        {
			// Obter o ID do usuário de forma mais segura
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			if (string.IsNullOrEmpty(userId))
			{
				return Unauthorized("Usuário não autenticado");
			}
			player.UserId = userId;
            var user = User;

            player.Email = user.Identity.Name;
			_context.Players.Add(player);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlayer", new { id = player.PlayerId }, player);
        }

        // DELETE: api/Players/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer(Guid id)
        {
			
			var player = await _context.Players.FindAsync(id);
            if (player == null)
            {
                return NotFound();
            }

            _context.Players.Remove(player);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlayerExists(Guid id)
        {
            return _context.Players.Any(e => e.PlayerId == id);
        }
    }
}
