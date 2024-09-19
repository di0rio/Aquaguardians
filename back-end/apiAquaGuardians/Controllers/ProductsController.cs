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
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(Guid id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

		[HttpGet("name/{name}")]
		public async Task<ActionResult<Product>> GetProductByName(string name)
		{
			var player = await _context.Products.FirstOrDefaultAsync(c => c.Name == name);

			if (player == null)
			{
				return NotFound();
			}

			return player;
		}

		[HttpGet("Price/{minPrice}/{maxPrice}")]
		public async Task<ActionResult<List<Product>>> GetProductsByPriceRange(decimal minPrice, decimal maxPrice)
		{
			// Verifica se os valores mínimos e máximos são válidos
			if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice)
			{
				return BadRequest("Preço mínimo ou máximo inválido.");
			}

			var products = await _context.Products
				.Where(e => e.Price.HasValue && e.Price >= minPrice && e.Price <= maxPrice)
				.ToListAsync();

			if (products == null || !products.Any())
			{
				return NotFound();
			}

			return products;
		}

		[HttpGet("Stock/{minStock}/{maxStock}")]
		public async Task<ActionResult<List<Product>>> GetProductsByStockRange(decimal minStock, decimal maxStock)
		{
			// Verifica se os valores mínimos e máximos são válidos
			if (minStock < 0 || maxStock < 0 || minStock > maxStock)
			{
				return BadRequest("Estoque mínimo ou máximo inválido.");
			}

			var products = await _context.Products
				.Where(e => e.Price.HasValue && e.Price >= minStock && e.Price <= maxStock)
				.ToListAsync();

			if (products == null || !products.Any())
			{
				return NotFound();
			}

			return products;
		}

		[HttpGet("productbyIdProductCategory/{product}")]
		public async Task<ActionResult<Product>> GetProductByIdProductCategory(long ProductCategoryId)
		{
			var listProducts = await _context.Products.Where(t => t.ProductCategoryId == ProductCategoryId).ToListAsync();
			if (listProducts.Count == 0)
			{
				return NotFound();
			}
			return Ok(listProducts);
		}

		[HttpGet("productbyNameProductCategory/{product}")]
		public async Task<ActionResult<Product>> GetProductByNameProductCategory(long NameProductCategory)
		{
			var CategoryMethod = await _context.ProductCategories.Where(m => m.Name.Contains("NameProductCategory")).FirstOrDefaultAsync();
			if (CategoryMethod == null)
			{
				return NotFound();
			}

			var listProducts = await _context.ProductCategories.Where(t => t.ProductCategoryId == CategoryMethod.ProductCategoryId).ToListAsync();
			if (listProducts.Count == 0)
			{
				return NotFound();
			}
			return Ok(listProducts);

		}

		// PUT: api/Products/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(Guid id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(Guid id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
