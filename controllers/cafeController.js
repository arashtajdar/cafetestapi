import cafeService from '../services/cafeService.js';

/**
 * Controller to handle all HTTP requests for cafes and favorites
 */
class CafeController {
  /**
   * Get all cafes
   */
  getAllCafes(req, res) {
    try {
      const cafes = cafeService.getAllCafes();
      return res.status(200).json(cafes);
    } catch (error) {
      console.error('Error in getAllCafes:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get a single cafe by ID
   */
  getCafeById(req, res) {
    try {
      const { id } = req.params;
      const cafe = cafeService.getCafeById(id);
      if (!cafe) {
        return res.status(404).json({ error: `Cafe with ID ${id} not found` });
      }
      return res.status(200).json(cafe);
    } catch (error) {
      console.error('Error in getCafeById:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Search cafes by name
   */
  searchCafes(req, res) {
    try {
      const query = req.query.q;
      // If query is missing, we can return empty or all cafes, let's return search results
      const results = cafeService.searchCafes(query);
      return res.status(200).json(results);
    } catch (error) {
      console.error('Error in searchCafes:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get all favorite cafes
   */
  getFavorites(req, res) {
    try {
      const favorites = cafeService.getFavorites();
      return res.status(200).json(favorites);
    } catch (error) {
      console.error('Error in getFavorites:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Add a cafe to favorites
   */
  addFavorite(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ error: 'Cafe ID is required in request body' });
      }

      const cafe = cafeService.getCafeById(id);
      if (!cafe) {
        return res.status(404).json({ error: `Cafe with ID ${id} not found` });
      }

      const addedCafe = cafeService.addFavorite(id);
      return res.status(201).json(addedCafe);
    } catch (error) {
      console.error('Error in addFavorite:', error);
      return res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }

  /**
   * Remove a cafe from favorites
   */
  removeFavorite(req, res) {
    try {
      const { id } = req.params;
      const removed = cafeService.removeFavorite(id);
      if (!removed) {
        return res.status(404).json({ error: `Cafe with ID ${id} is not in favorites` });
      }
      return res.status(200).json({ message: `Cafe with ID ${id} removed from favorites successfully` });
    } catch (error) {
      console.error('Error in removeFavorite:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new CafeController();
