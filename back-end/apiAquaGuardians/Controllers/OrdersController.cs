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
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(Guid id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

		[HttpGet("orderbyPlayerId/{playerId}")]
		public async Task<ActionResult<Order>> GetOrderByPlayerId(Guid playerId)
		{
			var listOrders = await _context.Orders.Where(t => t.PlayerId == playerId).ToListAsync();
			if (listOrders.Count == 0)
			{
				return NotFound();
			}
			return Ok(listOrders);
		}

		[HttpGet("orderDate/{orderDate}")]
		public async Task<ActionResult<List<Order>>> GetOrderByOrderDate(DateTime orderDate)
		{
			var orders = await _context.Orders
				.Where(e => e.OrderDate.Date == orderDate.Date) // Comparar apenas a data, ignorando a hora
				.ToListAsync();

			if (orders == null || !orders.Any())
			{
				return NotFound();
			}

			return orders;
		}

		[HttpGet("Amount/{minAmount}/{maxAmount}")]
		public async Task<ActionResult<List<Order>>> GetOrdersByAmountRange(decimal minAmount, decimal maxAmount)
		{
			// Verifica se os valores mínimos e máximos são válidos
			if (minAmount < 0 || maxAmount < 0 || minAmount > maxAmount)
			{
				return BadRequest("Montante mínimo ou máximo inválido.");
			}

			var orders = await _context.Orders
				.Where(e => e.TotalAmount.HasValue && e.TotalAmount >= minAmount && e.TotalAmount <= maxAmount)
				.ToListAsync();

			if (orders == null || !orders.Any())
			{
				return NotFound();
			}

			return orders;
		}

		// "PUT: api/Orders/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(Guid id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(Guid id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
