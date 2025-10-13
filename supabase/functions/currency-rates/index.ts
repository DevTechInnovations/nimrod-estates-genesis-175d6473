import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Cache for rates (in-memory, resets when function cold starts)
let cachedRates: { rates: any; timestamp: number } | null = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching currency conversion rates...');

    // Check if we have valid cached rates
    const now = Date.now();
    if (cachedRates && (now - cachedRates.timestamp) < CACHE_DURATION) {
      console.log('Returning cached rates');
      return new Response(
        JSON.stringify(cachedRates.rates),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Fetch fresh rates from ExchangeRate-API
    console.log('Fetching fresh rates from API...');
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the rates we need
    const rates = {
      USD: 1,
      ZAR: data.rates.ZAR || 18.5, // Fallback to approximate rate
      AED: data.rates.AED || 3.67   // Fallback to approximate rate
    };

    // Cache the rates
    cachedRates = {
      rates,
      timestamp: now
    };

    console.log('Successfully fetched rates:', rates);

    return new Response(
      JSON.stringify(rates),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error fetching currency rates:', error);
    
    // Return fallback rates if API fails
    const fallbackRates = {
      USD: 1,
      ZAR: 18.5,
      AED: 3.67
    };

    return new Response(
      JSON.stringify(fallbackRates),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  }
});
