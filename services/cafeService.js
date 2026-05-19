import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to cafes.json
const cafesPath = path.join(__dirname, '../data/cafes.json');

// Load cafes from the JSON file
let cafes = [];
try {
  const fileContent = fs.readFileSync(cafesPath, 'utf-8');
  cafes = JSON.parse(fileContent);
} catch (error) {
  console.error('Failed to load cafes data:', error);
}

// In-memory storage for favorite cafe IDs (single user)
const favoriteIds = new Set();

/**
 * Service to handle cafe and favorites business logic
 */
class CafeService {
  /**
   * Get all cafes
   * @returns {Array} Array of all cafe objects
   */
  getAllCafes() {
    return cafes;
  }

  /**
   * Get a single cafe by ID
   * @param {string|number} id Cafe ID
   * @returns {Object|null} Cafe object or null if not found
   */
  getCafeById(id) {
    const numericId = Number(id);
    const cafe = cafes.find(c => c.id === numericId);
    return cafe || null;
  }

  /**
   * Search cafes by name
   * @param {string} query Search query string
   * @returns {Array} Array of matched cafe objects
   */
  searchCafes(query) {
    if (!query) {
      return cafes;
    }
    const cleanQuery = query.toLowerCase().trim();
    return cafes.filter(cafe => cafe.name.toLowerCase().includes(cleanQuery));
  }

  /**
   * Get all favorite cafes (full objects)
   * @returns {Array} Array of favorite cafe objects
   */
  getFavorites() {
    return cafes.filter(cafe => favoriteIds.has(cafe.id));
  }

  /**
   * Add a cafe to favorites
   * @param {string|number} id Cafe ID
   * @returns {Object} Added cafe object
   * @throws {Error} If cafe not found or already in favorites
   */
  addFavorite(id) {
    const numericId = Number(id);
    const cafe = this.getCafeById(numericId);
    if (!cafe) {
      throw new Error(`Cafe with ID ${id} not found`);
    }
    if (favoriteIds.has(numericId)) {
      return cafe; // Already a favorite, return idempotently
    }
    favoriteIds.add(numericId);
    return cafe;
  }

  /**
   * Remove a cafe from favorites
   * @param {string|number} id Cafe ID
   * @returns {boolean} True if removed, false if not in favorites
   */
  removeFavorite(id) {
    const numericId = Number(id);
    if (!favoriteIds.has(numericId)) {
      return false;
    }
    return favoriteIds.delete(numericId);
  }
}

export default new CafeService();
