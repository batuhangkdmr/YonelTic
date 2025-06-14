using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

public class SliderImageUploadDto
{
    public IFormFile Image { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class SliderImagesController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly CloudinaryService _cloudinaryService;

    public SliderImagesController(ApplicationDbContext context, CloudinaryService cloudinaryService)
    {
        _context = context;
        _cloudinaryService = cloudinaryService;
    }

    // GET: api/SliderImages
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetSliderImages()
    {
        var images = await _context.SliderImages.OrderByDescending(x => x.Id).ToListAsync();
        return Ok(images);
    }

    // POST: api/SliderImages
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> UploadSliderImage([FromForm] SliderImageUploadDto dto)
    {
        if (dto.Image == null || dto.Image.Length == 0)
            return BadRequest("Resim dosyası gereklidir.");

        var (url, publicId) = await _cloudinaryService.UploadImageAsync(dto.Image);
        var sliderImage = new SliderImage
        {
            ImageUrl = url,
            CloudinaryPublicId = publicId
        };
        _context.SliderImages.Add(sliderImage);
        await _context.SaveChangesAsync();
        return Ok(sliderImage);
    }

    // DELETE: api/SliderImages/{id}
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteSliderImage(int id)
    {
        var sliderImage = await _context.SliderImages.FindAsync(id);
        if (sliderImage == null)
            return NotFound();

        await _cloudinaryService.DeleteImageAsync(sliderImage.CloudinaryPublicId);
        _context.SliderImages.Remove(sliderImage);
        await _context.SaveChangesAsync();
        return NoContent();
    }
} 