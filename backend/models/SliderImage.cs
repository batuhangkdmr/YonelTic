using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class SliderImage
    {
        public int Id { get; set; }
        
        [Required]
        public string ImageUrl { get; set; }
        
        public string CloudinaryPublicId { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
} 