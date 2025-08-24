export default defineCachedEventHandler(
  async (event) => {
    const { lat = 44.4268, lon = 26.1025 } = getQuery(event) // Default to BUCHAREST
    
    const weatherData: any = await $fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature&hourly=temperature_2m&timezone=auto`
    )
    
    return {
      current: weatherData.current,
      location: { lat, lon },
      timestamp: new Date().toISOString()
    }
  },
  { maxAge: 60 * 15 } // Cache for 15 minutes
)