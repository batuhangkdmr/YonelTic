using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        // Parent category (null if this is a top-level category)
        public int? ParentId { get; set; }
        
        [ForeignKey("ParentId")]
        public Category? Parent { get; set; }

        // Child categories
        public ICollection<Category> SubCategories { get; set; } = new List<Category>();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
} 