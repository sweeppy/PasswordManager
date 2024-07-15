using Backend.Dto;
using Backend.Models;

namespace Backend.Repositories
{
    public interface ICellRepository
    {
        public Task<List<Cell>> GetCellsAsync();

        public Task CreateCell(CreateCellRequest request);
    }
}