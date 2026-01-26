import instance from "./Axios";

/**
 * Analytics API Service
 * Analize sayfası için tüm API çağrılarını yönetir
 */

const analyticsService = {
  /**
   * Kullanıcı bazlı aylık istatistikleri getirir
   * GET /statistics/company/{companyId}/users/monthly
   * @param {number} companyId - Şirket ID
   * @param {Object} params - Query parametreleri (startDate, endDate)
   * @returns {Promise} API response - Array of user statistics
   */
  getUsersMonthlyStats: async (companyId, params = {}) => {
    try {
      const response = await instance.get(
        `/statistics/company/${companyId}/users/monthly`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Users Monthly Stats API Error:", error);
      throw error;
    }
  },

  /**
   * Grup bazlı aylık istatistikleri getirir
   * GET /statistics/company/{companyId}/monthly
   * @param {number} companyId - Şirket ID
   * @param {Object} params - Query parametreleri (startDate, endDate)
   * @returns {Promise} API response - Object with group names as keys
   */
  getGroupsMonthlyStats: async (companyId, params = {}) => {
    try {
      const response = await instance.get(
        `/statistics/company/${companyId}/monthly`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Groups Monthly Stats API Error:", error);
      throw error;
    }
  },

  /**
   * Kart etkileşimlerini getirir (Event Table için)
   * GET /card-interaction/company/{companyId}/interactions
   * @param {number} companyId - Şirket ID
   * @param {Object} params - Query parametreleri (startDate, endDate)
   * @returns {Promise} API response - Array of interactions
   */
  getInteractions: async (companyId, params = {}) => {
    try {
      const response = await instance.get(
        `/card-interaction/company/${companyId}/interactions`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Interactions API Error:", error);
      throw error;
    }
  },
};

export default analyticsService;