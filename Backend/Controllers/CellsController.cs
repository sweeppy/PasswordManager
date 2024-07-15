using Backend.Dto;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CellsController : ControllerBase
    {
        private readonly ICellRepository _cellRepository;

        private readonly ILogger<CellsController> _logger;

        public CellsController(ICellRepository cellRepository, ILogger<CellsController> logger)
        {
            _cellRepository = cellRepository;
            _logger = logger;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllCells()
        {
            var cells = await _cellRepository.GetCellsAsync();

            if (cells == null) return NotFound("Cells not found");

            return Ok(cells);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateNewCell(CreateCellRequest request)
        {
            try
            {
                var cells = await _cellRepository.GetCellsAsync();
                foreach (var cell in cells)
                {
                    if (cell.Name == request.Name) return BadRequest("Password for this name already exists.");
                }
                await _cellRepository.CreateCell(request);
                return Ok("Cell was created successfully!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest("Something went wrong.");
            }
        }
    }
}