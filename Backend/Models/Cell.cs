

namespace Backend.Models
{
    public class Cell
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}