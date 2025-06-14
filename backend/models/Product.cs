using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        public string? ImageUrl { get; set; }
        public string? CloudinaryPublicId { get; set; }

        // Category relationship
        public int? CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }

        // SubCategory relationship
        public int? SubCategoryId { get; set; }
        [ForeignKey("SubCategoryId")]
        public Category? SubCategory { get; set; }

        // Brand relationship
        // public int BrandId { get; set; }
        // [ForeignKey("BrandId")]
        // public Brand Brand { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
} 