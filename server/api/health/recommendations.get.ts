export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    
    const temp = parseFloat(query.temp as string)
    const humidity = parseFloat(query.humidity as string)
    
    if (isNaN(temp) || isNaN(humidity)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid temperature or humidity values'
      })
    }
    
    console.log('Health API called with:', { temp, humidity }) // Debug log
    
    const recommendations: string[] = []

    if (temp > 25) {
      recommendations.push("Stay hydrated - temperatures are high");
    }
    if (temp < 5) {
      recommendations.push("Dress warmly - cold weather alert");
    }
    if (temp >= 15 && temp <= 25) {
      recommendations.push("Perfect temperature for outdoor activities");
    }

    if (humidity > 60) {
      recommendations.push("High humidity - consider indoor activities");
    }
    if (humidity < 30) {
      recommendations.push("Low humidity - use moisturizer");
    }
    if (humidity >= 30 && humidity <= 60) {
      recommendations.push("Optimal humidity levels");
    }

    if (temp > 30 && humidity > 70) {
      recommendations.push("Very uncomfortable conditions - stay in air conditioning");
    }

    return {
      recommendations,
      airQualityAdvice: "Air quality data will be added in v2",
    };
  } catch (error) {
    console.error("Health API error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to generate health recommendations",
    });
  }
});
