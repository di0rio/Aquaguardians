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
    public class TransactionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TransactionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            return await _context.Transactions.ToListAsync();
        }

        // GET: api/Transactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(Guid id)
        {
            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return transaction;
        }

        // GET: api/Transactions/Date
        [HttpGet("transactiondate/{date}")]
        public async Task<ActionResult<List<Transaction>>> GeTransactionDate(DateTime date)
        {
            var transaction = await _context.Transactions
                .Where(e => e.TransactionDate.Date == date.Date) // Comparar apenas a data, ignorando a hora
                .ToListAsync();

            if (transaction == null || !transaction.Any())
            {
                return NotFound();
            }

            return transaction;
        }

        [HttpGet("transactionbyplayerid/{id}")]
        public async Task<ActionResult<Transaction>> GetTransactionByPlayerId(Guid id)
        {
            var transaction = await _context.Transactions.FirstOrDefaultAsync(c => c.PlayerId == id);

            if (transaction == null)
            {
                return NotFound();
            }

            return transaction;
        }

        [HttpGet("transactionbytype/{type}")]
        public async Task<ActionResult<Transaction>> GetTransactionByType(string type)
        {
            var transaction = await _context.Transactions.FirstOrDefaultAsync(c => c.Type == type);

            if (transaction == null)
            {
                return NotFound();
            }

            return transaction;
        }

        [HttpGet("transactionbyIdPaymentMethod/{paymentMethod}")]
        public async Task<ActionResult<Transaction>> GetTransactionByIdPaymentMethod(Guid PaymentMethodId)
        {
            var listTransactions = await _context.Transactions.Where(t => t.PaymentMethodId == PaymentMethodId).ToListAsync();
            if (listTransactions.Count == 0) 
            { 
                return NotFound();
            }
            return Ok(listTransactions);
        }

        [HttpGet("transactionbyNamePaymentMethod/{paymentMethod}")]
        public async Task<ActionResult<Transaction>> GetTransactionByNamePaymentMethod(string namePayment)
        {
            var UserPaymentMethod = await _context.PaymentMethods.Where(m => m.Name.Contains("namePayment")).FirstOrDefaultAsync();
            if (UserPaymentMethod == null)
            {
                return NotFound(); 
            }
            
            var listTransactions = await _context.Transactions.Where(t => t.PaymentMethodId == UserPaymentMethod.PaymentMethodId).ToListAsync();
            if(listTransactions.Count == 0)
            {
                return NotFound();
            }
            return Ok(listTransactions);
         
        }

        // PUT: api/Transactions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaction(Guid id, Transaction transaction)
        {
            if (id != transaction.TransactionId)
            {
                return BadRequest();
            }

            _context.Entry(transaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(id))
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

        // POST: api/Transactions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransaction", new { id = transaction.TransactionId }, transaction);
        }

        // DELETE: api/Transactions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(Guid id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransactionExists(Guid id)
        {
            return _context.Transactions.Any(e => e.TransactionId == id);
        }
    }
}
