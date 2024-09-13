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
    public class RewardsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RewardsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Rewards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reward>>> GetRewards()
        {
            return await _context.Rewards.ToListAsync();
        }

        // GET: api/Rewards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reward>> GetReward(Guid id)
        {
            var reward = await _context.Rewards.FindAsync(id);

            if (reward == null)
            {
                return NotFound();
            }

            return reward;
        }

        // PUT: api/Rewards/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReward(Guid id, Reward reward)
        {
            if (id != reward.RewardId)
            {
                return BadRequest();
            }

            _context.Entry(reward).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RewardExists(id))
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

        // POST: api/Rewards
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Reward>> PostReward(Reward reward)
        {
            _context.Rewards.Add(reward);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReward", new { id = reward.RewardId }, reward);
        }

        // DELETE: api/Rewards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReward(Guid id)
        {
            var reward = await _context.Rewards.FindAsync(id);
            if (reward == null)
            {
                return NotFound();
            }

            _context.Rewards.Remove(reward);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RewardExists(Guid id)
        {
            return _context.Rewards.Any(e => e.RewardId == id);
        }
    }
}
