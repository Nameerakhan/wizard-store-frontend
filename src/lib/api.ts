/**
 * API utilities for connecting to Python backend
 * Backend runs on http://localhost:8000
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ChatRequest {
  query: string;
  top_k?: number;
  verbose?: boolean;
}

export interface ChatResponse {
  answer: string;
  context?: any[];
  intent?: string;
  error?: string;
}

/**
 * Send a chat query to the backend
 */
export async function sendChatQuery(request: ChatRequest): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending chat query:', error);
    throw error;
  }
}

/**
 * Health check for backend API
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}

/**
 * Get product recommendations
 */
export async function getProductRecommendations(query: string): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
}
