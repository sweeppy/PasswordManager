

using Backend.Data;
using Backend.Dto;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class CellRepository : ICellRepository
    {
        private readonly ApplicationDbContext _db;

        public CellRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task CreateCell(CreateCellRequest request)
        {
            Cell cell = new Cell
            {
                Name = request.Name,
                Password = request.Password,
                CreatedAt = DateTime.Now,
            };
            await _db.Cells.AddAsync(cell);
            await _db.SaveChangesAsync();
        }

        public async Task<List<Cell>> GetCellsAsync()
        {
            return await _db.Cells.ToListAsync();
        }
    }
}